import {useState, useMemo} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import moment from 'moment';
import {
  Box,
  Stack,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {FormTextField, PlusIconButton} from 'components';
import {
  useGetMembers,
  useGetPeopleDetails,
  useGetPeopleDetailsDesc,
  useGetProjects,
  useGetWorkState,
  useGetJobLevel,
} from 'hooks';
import ExportButton from 'components/members/ExportButton';
import MembersTable from './MembersTable';
import {useSwitchThemeContext} from 'hooks';
import {useEffect} from 'react';
import {WHITE} from 'theme';
import {TABLE_HEADERS} from 'utils/constants';
import {useAuthContext} from 'contexts/auth/AuthContext';
import AppButton from 'components/common/AppButton.jsx';
import SearchIcon from '@mui/icons-material/Search';

const MembersMainContainer = () => {
  const {
    state: {
      isAuthenticated,
      credentials: {isMember},
    },
  } = useAuthContext();
  const {communityId} = useParams();
  const navigate = useNavigate();
  const navigateToCreate = communityId => {
    navigate(`/members/${communityId}/create`);
  };

  const {
    isLoading,
    data: membersData,
    isError,
    error,
    refetch,
  } = useGetMembers(communityId);

  const {data: peopleDetails} = useGetPeopleDetails();

  const {data: peopleDetailsDesc} = useGetPeopleDetailsDesc();

  const {data: projects} = useGetProjects();

  const {data: workStates} = useGetWorkState();

  const {data: jobLevels} = useGetJobLevel();

  useEffect(() => {
    refetch();
  }, [communityId, refetch]);

  const sortMembers = (a, b) => {
    const memberA = a.full_name.toLowerCase();
    const memberB = b.full_name.toLowerCase();

    if (memberA < memberB) return -1;
    if (memberA > memberB) return 1;
    return 0;
  };

  const rowData = useMemo(
    () =>
      membersData
        ? membersData.members.sort(sortMembers).map(member => ({
            people_id: member.people_id,
            full_name: member.full_name,
            assigned_to: membersData.manager?.name,
            hired_date_formatted: moment(member.hired_date).format(
              'MM/DD/YYYY'
            ),
            job_level:
              jobLevels?.find(
                level => level.job_level_id === member.joblevel_id
              )?.job_level_desc ?? '',
            work_state:
              workStates?.find(
                workState => workState.work_state_id === member.workstate_id
              )?.work_state_desc ?? '',
            project:
              projects?.find(project => project.id === member.project_id)
                ?.project ?? '',
            is_probationary: member.is_probationary,
          }))
        : null,
    [membersData, projects, jobLevels, workStates]
  );
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState('');
  const [filteredRowData, setFilteredRowData] = useState(rowData);
  const [isIncludeProbationaryFields, setIsIncludeProbationaryFields] =
    useState(false);
  const [exportHeaders, setExportHeaders] = useState(TABLE_HEADERS);
  const [exportData, setExportData] = useState(
    filteredRowData?.map(data => {
      return {
        ...data,
        is_probationary: data.is_probationary ? 'Probationary' : 'Regular',
      };
    })
  );
  const handleSearch = event => {
    setSearch(event.target.value);
  };
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();

  const handleSearchClick = () => {
    setSearchField(search);
  };

  const handleIsIncludeProbationaryFieldsCheckboxChange = () => {
    setIsIncludeProbationaryFields(prev => !prev);
  };

  useEffect(() => {
    if (!isIncludeProbationaryFields) {
      setExportHeaders(TABLE_HEADERS);
      return;
    }

    const probationaryFieldsHeaders = peopleDetailsDesc.map(desc => {
      return {
        value: desc.people_details_desc_id,
        name: desc.people_details_desc,
      };
    });

    setExportHeaders([...TABLE_HEADERS, ...probationaryFieldsHeaders]);
  }, [isIncludeProbationaryFields, peopleDetailsDesc]);

  useEffect(() => {
    const data = filteredRowData?.map(data => {
      const isProbationary = data.is_probationary ? 'Probationary' : 'Regular';

      if (isIncludeProbationaryFields) {
        peopleDetailsDesc.forEach(desc => {
          const exist = peopleDetails.some(
            detail =>
              detail.people_id === data.people_id &&
              detail.people_details_desc_id === desc.people_details_desc_id
          );

          data[desc.people_details_desc_id] = exist ? 'Yes' : 'No';
        });
      }

      return {...data, is_probationary: isProbationary};
    });
    setExportData(data);
  }, [
    filteredRowData,
    isIncludeProbationaryFields,
    peopleDetailsDesc,
    peopleDetails,
  ]);

  return (
    <Box
      style={{
        marginBottom: '1rem',
      }}
    >
      <Card
        sx={{
          backgroundColor: currentThemePalette.cardSecondary,
          maxWidth: '1430px !important',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{padding: '2rem 2rem 0px 2rem'}}
        >
          <Box sx={{width: {xs: '100%', lg: '135ch'}, flex: '0 1 auto'}}>
            <FormTextField
              sx={{width: '100%'}}
              placeholder="Search"
              label="Search"
              autoComplete="off"
              onChange={handleSearch}
            />
          </Box>
          <Box>
            <AppButton
              variant={'contained'}
              sx={{width: 150, height: 50, ml: {xs: 1, sm: 3}}}
              startIcon={<SearchIcon />}
              onClick={handleSearchClick}
            >
              Search
            </AppButton>
          </Box>
        </Stack>
        <CardContent
          sx={{
            marginTop: '24px',
            padding: '14px 2rem 0px 2rem',
            backgroundColor:
              currentTheme === 'dark'
                ? 'rgba(20, 20, 20, .4)'
                : 'rgba(191, 191, 191, 0.1)',
          }}
        >
          <Stack direction="row">
            {isAuthenticated && !isMember && (
              <Box>
                <PlusIconButton
                  title="Go to Input Page"
                  ariaLabel="Go to Input Page"
                  onClickCallback={() => navigateToCreate(communityId)}
                  sxProp={{
                    '& .MuiSvgIcon-root': {
                      color: `${
                        currentTheme === 'dark'
                          ? WHITE
                          : currentThemePalette.dark
                      }!important`,
                    },
                    '&:hover .MuiSvgIcon-root': {
                      color: `${
                        currentTheme === 'dark' ? '#141414' : WHITE
                      } !important`,
                    },
                    '&:hover': {
                      backgroundColor:
                        currentTheme === 'dark'
                          ? WHITE
                          : currentThemePalette.border,
                    },
                    padding: 0,
                  }}
                />
              </Box>
            )}
            <Box sx={{ml: 'auto'}}>
              <FormControlLabel
                sx={{
                  color: currentThemePalette.text,
                }}
                control={
                  <Checkbox
                    checked={isIncludeProbationaryFields}
                    onChange={handleIsIncludeProbationaryFieldsCheckboxChange}
                    sx={{
                      color: currentThemePalette.main,
                    }}
                  />
                }
                label="Include probationary fields in export"
              />
              <ExportButton
                isLoading={isLoading}
                membersData={membersData}
                rowData={exportData}
                isError={isError}
                error={error}
                tableHeaders={exportHeaders}
              />
            </Box>
          </Stack>
          <MembersTable
            search={searchField}
            isLoading={isLoading}
            membersData={membersData}
            rowData={rowData}
            isError={isError}
            error={error}
            setFilteredRowData={setFilteredRowData}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default MembersMainContainer;
