import {
  Typography,
  Card,
  CardContent,
  Grid,
  styled,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  IconButton,
} from '@mui/material';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import {Link} from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useSwitchThemeContext} from 'hooks';
import {PieChartDashBoard} from 'components';
import InfoIcon from '@mui/icons-material/Info';
import {useAuthContext} from 'contexts/auth/AuthContext';

const CommunityCard = ({
  id,
  image,
  name,
  description,
  manager,
  percentage,
  chartData,
  members,
}) => {
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();
  const {
    state: {
      isAuthenticated,
      credentials: {isMember},
    },
  } = useAuthContext();
  const label = 'Members';
  const managerValue = `Manager: ${manager}`;
  const contrastingColors =
    currentTheme === 'dark'
      ? currentThemePalette.light
      : currentThemePalette.medium;
  const HtmlTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor:
        currentTheme === 'dark' ? 'rgba(20, 20, 20, .8)' : '#ffffff',
      maxWidth: 300,
    },
  }));
  return (
    <Grid
      key={id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      style={{
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      <Card
        elevation={2}
        className="community-list-item"
        sx={{
          width: '100%',
          display: 'block',
          flexDirection: 'column',
          marginTop: '1rem',
          backgroundColor: `${
            currentTheme === 'dark' ? 'rgba(20, 20, 20, .4)' : '#ffffff'
          }!important`,
          paddingTop: '0px',
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: `${
                  currentTheme === 'dark'
                    ? '#141414'
                    : currentThemePalette.light
                }`,
                color: `${
                  currentTheme === 'dark' ? '#ffffff' : '#141414'
                }!important`,
              }}
            >
              {image && <img width="30" height="30" src={image} alt="icon" />}
              {!image && name.charAt(0)}
            </Avatar>
          }
          action={
            isAuthenticated &&
            !isMember && (
              <IconButton
                sx={{
                  color: `${
                    currentTheme === 'dark'
                      ? '#0a7578'
                      : currentThemePalette.dark
                  }`,
                }}
                aria-label="settings"
                component={Link}
                to={`/communities/update/${id}`}
              >
                <SettingsIcon />
              </IconButton>
            )
          }
          titleTypographyProps={{
            fontWeight: 600,
            color: `${
              currentTheme === 'dark' ? '#ffffff' : '#141414'
            }!important`,
          }}
          subheaderTypographyProps={{
            fontSize: '12px',
            color: `${
              currentTheme === 'dark'
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(0, 0, 0, 0.6)'
            }!important`,
          }}
          title={name}
          subheader={managerValue}
        />
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px !important',
            backgroundColor: currentThemePalette.opacityBackground,
          }}
        >
          <PieChartDashBoard
            chartData={chartData}
            percentage={percentage}
            label={label}
          ></PieChartDashBoard>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={
              <VisibilityIcon
                sx={{
                  color: `${
                    currentTheme === 'dark'
                      ? '#0a7578'
                      : currentThemePalette.dark
                  }`,
                }}
              />
            }
            sx={{
              fontSize: '12px',
              borderWidth: 1,
              borderColor: `${
                currentTheme === 'dark' ? '#0a7578' : currentThemePalette.dark
              }`,
              backgroundColor: currentThemePalette.bgPrimary,
              color: `${currentTheme === 'dark' ? '#FFFFFF' : '#141414'}`,
              '&:hover': {
                borderWidth: 2,
                borderColor: contrastingColors,
                backgroundColor:
                  currentTheme === 'dark' ? '#293A46 !important' : null,
              },
              '&:disabled': {
                borderWidth: 1,
                borderColor:
                  currentTheme === 'dark' ? currentThemePalette.medium : null,
                backgroundColor:
                  currentTheme === 'dark' ? '#293A46 !important' : null,
              },
            }}
            component={Link}
            to={`/members/${id}`}
          >
            {members && members > 0
              ? `View (${members}) Members`
              : 'View Members'}
          </Button>
          <HtmlTooltip
            title={
              <>
                <Card
                  sx={{
                    maxWidth: 345,
                    backgroundColor: `${
                      currentTheme === 'dark' ? '#141414' : '#ffffff'
                    }`,
                    marginBottom: '5px',
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontWeight: '540',
                        fontSize: '0.875rem',
                        color: `${
                          currentTheme === 'dark' ? '#ffffff' : '#141414'
                        }`,
                      }}
                      variant="body2"
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            }
          >
            <IconButton
              aria-label="add to favorites"
              sx={{
                marginLeft: 'auto',
                color: `${
                  currentTheme === 'dark' ? '#0a7578' : currentThemePalette.dark
                }`,
              }}
            >
              <InfoIcon />
            </IconButton>
          </HtmlTooltip>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CommunityCard;
