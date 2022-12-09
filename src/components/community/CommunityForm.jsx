import {useEffect, useState} from 'react';
import {
  MenuItem,
  Grid,
  Box,
  Card,
  IconButton,
  FormControlLabel,
  Tooltip,
} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useGetCommunityManagers} from 'hooks';
import {FormSelect, FormTextField, FormSwitch} from 'components';
import AppButton from 'components/common/AppButton';
import UploadButton from 'components/common/UploadButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSwitchThemeContext} from 'hooks';
import {WHITE} from 'theme';
import {styled} from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';

const ImageContainer = styled('div')({
  position: 'relative',
  width: '50%',
  '&:hover .image': {
    opacity: 0.3,
  },
  '&:hover .middle': {
    opacity: 1,
  },
});

const Image = styled('img')({
  opacity: 1,
  display: 'block',
  width: '100%',
  height: 'auto',
  transition: '.5s ease',
  backfaceVisibility: 'hidden',
});

const ImageButton = styled('div')({
  transition: '.5s ease',
  opacity: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

const CommunityForm = ({onClickHandler, buttonText, community}) => {
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();

  const [communityDetails, setCommunityDetails] = useState({
    communityName: '',
    communityManagerId: '',
    isActive: true,
    communityDescription: '',
    selectedFile: null,
  });

  const [fileValidation, setFileValidation] = useState({
    errorMessage: '',
    error: false,
  });

  const {isLoading, data: communityManagers} = useGetCommunityManagers();
  const {id} = useParams();

  useEffect(() => {
    if (community) {
      setCommunityDetails(community);
    }
  }, [community]);

  const handleFieldChange = e => {
    setCommunityDetails(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnButtonClick = e => {
    e.preventDefault();

    const data = {
      community_name: communityDetails.communityName,
      community_manager: communityDetails.communityManagerId,
      community_description: communityDetails.communityDescription,
      icon: communityDetails.selectedFile,
      is_active: communityDetails.isActive,
    };

    onClickHandler({id, data});
  };

  const handleDeleteIconClick = () => {
    setCommunityDetails({
      ...communityDetails,
      selectedFile: '',
    });
  };

  const onActiveChange = () => {
    setCommunityDetails(prevState => ({
      ...prevState,
      isActive: !prevState.isActive,
    }));
  };

  const fileSelectedHandler = async e => {
    const file = e.target.files[0];
    if (file?.size > 5000) {
      setFileValidation({
        errorMessage: 'File size exceeds 5mb',
        error: true,
      });
      return;
    } else {
      setFileValidation({
        errorMessage: '',
        error: false,
      });
      const base64 = await convertBase64(file);

      setCommunityDetails({
        ...communityDetails,
        selectedFile: base64,
      });
      setCommunityDetails({
        ...communityDetails,
        selectedFile: base64,
      });
    }
  };

  const convertBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  return (
    <Box component="form" onSubmit={handleOnButtonClick}>
      <Grid container>
        <Grid item xs={12} md={5}>
          <FormTextField
            required={community ? false : true}
            fullWidth
            value={communityDetails.communityName}
            onChange={handleFieldChange}
            id="communityName"
            name="communityName"
            label="Name of Community"
            variant="outlined"
            sx={{
              mt: 5,
            }}
          />
        </Grid>
        <Grid item xs={0} sm={7}></Grid>

        <Grid item xs={12} md={5}>
          <FormSelect
            FormControlProps={{
              sx: {
                mt: 5,
              },
              fullWidth: true,
            }}
            InputLabelProps={{
              id: 'communityAssigned',
            }}
            InputLabelChildren="Community Assigned To"
            SelectProps={{
              required: true,
              id: 'communityManager',
              name: 'communityManagerId',
              value: communityDetails.communityManagerId,
              label: 'Community Assigned To',
              onChange: handleFieldChange,
            }}
          >
            {!isLoading &&
              communityManagers &&
              communityManagers.map(manager => {
                return (
                  <MenuItem key={manager.id} value={manager.id}>
                    {' '}
                    {manager.name}{' '}
                  </MenuItem>
                );
              })}
          </FormSelect>
        </Grid>
        <Grid item xs={12} sm={7}></Grid>
        <Grid item xs={12} md={7}>
          <FormTextField
            required
            fullWidth
            id="communityDescription"
            name="communityDescription"
            label="Community Description"
            multiline
            rows={6}
            sx={{
              mt: 5,
            }}
            value={communityDetails.communityDescription}
            onChange={handleFieldChange}
          />
        </Grid>
        {/* <Grid item sm={5} />
                <Grid item sm={8} /> */}
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            alignContent: 'center',
            ml: {
              md: '3rem',
            },
            mt: {
              xs: '2rem',
            },
          }}
        >
          <AppButton
            type="submit"
            size="large"
            sx={{
              mt: 'auto',
              width: '10rem',
              height: '4rem',
            }}
          >
            {buttonText}
          </AppButton>
        </Grid>
        {community && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={11}
            alignSelf="flex-start"
            sx={{mt: 2}}
          >
            <FormControlLabel
              sx={{
                color: currentThemePalette.text,
              }}
              value={communityDetails.isActive}
              control={
                <FormSwitch
                  onChange={onActiveChange}
                  sx={{
                    '& .MuiSvgIcon-root': {fontSize: 28},
                  }}
                  checked={communityDetails.isActive}
                />
              }
              label="Active"
            />
            <Tooltip
              title="Setting to inactive will hide this record. Contact your system administrator for re-activation."
              placement="right"
            >
              <IconButton>
                <InfoIcon sx={{color: currentThemePalette.main}} />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            mt: {
              xs: '2rem',
            },
            display: 'flex',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              width: '120px',
              height: '120px',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem',
              border: `1px solid ${currentThemePalette.main}`,
              backgroundColor:
                currentTheme === 'dark' ? currentThemePalette.light : WHITE,
            }}
          >
            {communityDetails.selectedFile ? (
              <ImageContainer>
                <Image
                  src={communityDetails.selectedFile}
                  alt="icon preview"
                  className="image"
                  width="100"
                  height="100"
                />
                <ImageButton className="middle">
                  <IconButton
                    sx={{
                      color:
                        currentTheme === 'dark'
                          ? currentThemePalette.dark
                          : currentThemePalette.light,
                    }}
                    onClick={handleDeleteIconClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ImageButton>
              </ImageContainer>
            ) : (
              <ImageIcon
                sx={{
                  width: 100,
                  height: 100,
                  color:
                    currentTheme === 'dark'
                      ? currentThemePalette.dark
                      : currentThemePalette.light,
                }}
              />
            )}
          </Card>
          <UploadButton
            onChangeEvent={fileSelectedHandler}
            sx={{
              height: '3rem',
              alignSelf: 'center',
            }}
          >
            <PhotoCamera
              sx={{
                marginRight: '1rem',
              }}
            />
            Upload Icon
          </UploadButton>
          {fileValidation.error ? (
            <div
              style={{
                color: 'red',
                alignSelf: 'center',
                marginLeft: '1rem',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {fileValidation.errorMessage}
            </div>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommunityForm;
