import {useState} from 'react';
import {Grid, Box} from '@mui/material';
import {FormTextField} from 'components';
import AppButton from 'components/common/AppButton';

const initialValue = {
  cognizantId: '',
  name: '',
  email: '',
};

const ManagerInviteForm = ({
  onClickHandler,
  isProcessing,
  buttonText = 'invite',
}) => {
  const [managerDetails, setManagerDetails] = useState(initialValue);

  const handleFieldChange = e => {
    setManagerDetails({...managerDetails, [e.target.name]: e.target.value});
  };
  const handleOnButtonClick = e => {
    e.preventDefault();
    onClickHandler(managerDetails);
  };

  return (
    <Box component="form" onSubmit={handleOnButtonClick}>
      <Grid container>
        <Grid item xs={12} md={5}>
          <FormTextField
            required={true}
            fullWidth
            autoComplete="off"
            value={managerDetails.cognizantId}
            onChange={handleFieldChange}
            name="cognizantId"
            label="Cognizant Id"
            variant="outlined"
            sx={{
              mt: 5,
            }}
          />
        </Grid>
        <Grid item xs={0} sm={7} />
        <Grid item xs={12} md={5}>
          <FormTextField
            required={true}
            fullWidth
            autoComplete="off"
            value={managerDetails.name}
            onChange={handleFieldChange}
            name="name"
            label="Name"
            variant="outlined"
            sx={{
              mt: 5,
            }}
          />
        </Grid>
        <Grid item xs={0} sm={7} />
        <Grid item xs={12} md={5}>
          <FormTextField
            required={true}
            fullWidth
            autoComplete="off"
            value={managerDetails.email}
            onChange={handleFieldChange}
            name="email"
            label="Email"
            variant="outlined"
            sx={{
              mt: 5,
            }}
          />
        </Grid>
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
            disabled={isProcessing}
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
      </Grid>
    </Box>
  );
};

export default ManagerInviteForm;
