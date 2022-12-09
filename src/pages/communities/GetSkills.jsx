import React, {useState, useEffect} from 'react';
import PageContainer from 'layout/PageContainer';
import {Box, Card, Stack} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {AutocompleteInputChip, NoDataTable} from '../../components/index.js';
import {useGetSkills} from 'hooks';
import AppButton from 'components/common/AppButton.jsx';
import MemberSkillsTable from './GetMemberSkillsTable';
import {useSwitchThemeContext} from 'hooks';
import {MEMBERS_TABLE_SKILLS} from 'utils/constants';
import ExportButton from 'components/members/ExportButton';
import {MEMBERS_BY_SKILL_TABLE_HEADERS} from 'utils/constants';
import {Typography, Grid, CardContent} from '@mui/material';
import SkillsCard from 'components/skills/SkillsCard';

const GetSkills = () => {
  const {data: skillsData, isLoading: getSkillsLoading} = useGetSkills();
  const [options, setOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]); //selected values include existing and new values
  const [selectedPayload, setSelectedPayload] = useState();
  const [newValues, setNewValues] = useState([]); //new values
  const [showData, setShowData] = useState(false);
  const [memberSkillsData, setMemberSkillsData] = useState([]);
  const [skillsLabel, setSkillsLabel] = useState([]);
  const [chartData, setChartData] = useState([]);
  const fileName = 'MembersBySkills';
  useEffect(() => {
    if (!getSkillsLoading) {
      setOptions(
        skillsData?.map(skl => {
          return {id: skl.peopleskills_id, label: skl.peopleskills_desc};
        })
      );
    }
  }, [skillsData, getSkillsLoading]);

  // function prepareInput(skl, idx, arr) {
  //   postSkills({ peopleskills_desc: skl.label, is_active: true });
  // }
  const onSave = async () => {
    // //save new skills to peopleskills db
    // if (newValues.length > 0) newValues.forEach(prepareInput);
    const skillsId = [];
    const skills = [];
    selectedSkills.forEach(arrayItem => {
      let x = arrayItem.id;
      let sk = arrayItem.label;
      skills.push(sk);
      skillsId.push(x);
    });
    const skillsPayload = {
      skills: skillsId.toString(),
    };
    setSkillsLabel(skills);
    setSelectedPayload(skillsPayload);
    if (skillsId.length > 0) {
      setShowData(true);
    } else {
      setMemberSkillsData([]);
      setShowData(false);
    }
  };
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();

  const sortData = (a, b) => {
    const skillsCountA = a.skills.length;
    const skillsCountB = b.skills.length;

    if (skillsCountA > skillsCountB) return -1;
    if (skillsCountA < skillsCountB) return 1;

    if (a.project_status === 'In a Project' && b.project_status === 'Bench')
      return 1;
    if (b.project_status === 'In a Project' && a.project_status === 'Bench')
      return -1;

    const resourceA = a.full_name.toLowerCase();
    const resourceB = b.full_name.toLowerCase();

    if (resourceA < resourceB) return -1;
    if (resourceA > resourceB) return 1;
    return 0;
  };

  return (
    <PageContainer>
      <Typography
        component="label"
        sx={{
          padding: '0.25em',
          fontWeight: '700',
          display: 'block',
          fontSize: '35px',
          paddingBottom: '25px !important',
          color: currentTheme === 'dark' ? '#FFFFFF' : '#242323',
        }}
      >
        People By Skills
      </Typography>
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
              {options.length >= 0 && (
                <AutocompleteInputChip
                  options={options}
                  setOptions={setOptions}
                  setSelectedValue={setSelectedSkills}
                  newValues={newValues}
                  setNewValues={setNewValues}
                />
              )}
            </Box>
            <Box>
              <AppButton
                variant={'contained'}
                sx={{width: 150, height: 50, ml: {xs: 1, sm: 3}}}
                startIcon={<SearchIcon />}
                onClick={onSave}
              >
                Search
              </AppButton>
            </Box>
          </Stack>
          {showData && (
            <>
              <Grid
                container
                spacing={2}
                className="skills-list"
                wrap="nowrap"
                style={{
                  width: '1385px',
                  overflow: 'auto',
                  color: '#FFFFFF',
                  // padding: "0px 2rem 0px 2rem",
                  margin: '0px 1rem 20px 1rem',
                }}
              >
                {(chartData || []).map(data => (
                  <SkillsCard
                    key={data.community_name}
                    id={data.community_name}
                    name={data.community_name}
                    chartData={[
                      {
                        name: 'percentage',
                        value: parseInt(data.percentage),
                        fill: `${
                          currentTheme === 'dark'
                            ? '#0a7578'
                            : currentThemePalette.dark
                        }`,
                      },
                      {
                        name: 'max',
                        value: 100 - data.percentage,
                        fill: `${
                          currentTheme === 'dark'
                            ? 'rgba(250, 250, 250, .07)'
                            : '#b6bbc2'
                        }`,
                      },
                    ]}
                    percentage={data.percentage}
                  />
                ))}
              </Grid>
            </>
          )}
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
            {!showData && <NoDataTable columns={MEMBERS_TABLE_SKILLS} />}
            {showData && (
              <>
                <Stack direction="row" sx={{}}>
                  <Box sx={{ml: 'auto'}}>
                    <ExportButton
                      rowData={memberSkillsData.sort(sortData).map(skl => {
                        return {
                          full_name: skl.full_name,
                          skills: skl.skills.join(' ,'),
                          project_status: skl.project_status,
                        };
                      })}
                      isLoading={memberSkillsData.length > 0 ? false : true}
                      tableHeaders={MEMBERS_BY_SKILL_TABLE_HEADERS}
                      fileNameData={fileName}
                    />
                  </Box>
                </Stack>
                <MemberSkillsTable
                  isSelectedValue={selectedPayload}
                  getMemberSkillsData={setMemberSkillsData}
                  getSkillsLabel={skillsLabel}
                  getChartData={setChartData}
                />
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default GetSkills;
