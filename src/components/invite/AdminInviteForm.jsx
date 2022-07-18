import { useState } from "react"
import { Grid, Box
} from "@mui/material";
import {FormTextField } from "components";
import AppButton from "components/common/AppButton";
import { useNotificationContext } from "contexts/notification/NotificationContext";

const initialValue = {
    cognizantId: '',
    firstName: '',
    lastName: '',
    email: '',
    defaultPassword:''
}

const AdminInviteForm = ({  buttonText = "save" }) => {

    const { dispatch: notificationDispatch } = useNotificationContext();

    const [adminDetails, setAdminDetails] = useState(initialValue)

    const handleFieldChange = (e) => {
        setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
    }
    const handleOnButtonClick = (e) => {
        e.preventDefault()
        const details = JSON.stringify(adminDetails)

        //notify
        notificationDispatch({
            type: 'NOTIFY',
            payload: {
              type: 'success',
              message: `${details}`
            }
          });
          //clear
          setAdminDetails(initialValue)
    }


    return (
        <Box component='form' onSubmit={handleOnButtonClick}>
            <Grid container>
                <Grid item xs={12} md={5}>
                    <FormTextField
                        inputProps={{
                            readOnly: false,
                        }}
                        required={true}
                        fullWidth
                        value={adminDetails.cognizantId}
                        onChange={handleFieldChange}
                        id="cognizantId"
                        name='cognizantId'
                        label="Cognizant Id"
                        variant="outlined"
                        sx={{
                            mt: 5,
                        }}
                    />
                </Grid>
                <Grid item xs={0} sm={7}>
                </Grid>
                <Grid item xs={12} md={5}>
                    <FormTextField
                        inputProps={{
                            readOnly: false,
                        }}
                        required={true}
                        fullWidth
                        value={adminDetails.firstName}
                        onChange={handleFieldChange}
                        id="firstName"
                        name='firstName'
                        label="First Name"
                        variant="outlined"
                        sx={{
                            mt: 5,
                        }}
                    />
                </Grid>
                <Grid item xs={0} sm={7}>
                </Grid>
                <Grid item xs={12} md={5}>
                    <FormTextField
                        inputProps={{
                            readOnly: false,
                        }}
                        required={true}
                        fullWidth
                        value={adminDetails.lastName}
                        onChange={handleFieldChange}
                        id="lastName"
                        name='lastName'
                        label="Last Name"
                        variant="outlined"
                        sx={{
                            mt: 5,
                        }}
                    />
                </Grid>
                <Grid item xs={0} sm={7}>
                </Grid>
                <Grid item xs={12} md={5}>
                    <FormTextField
                        inputProps={{
                            readOnly: false,
                        }}
                        required={true}
                        fullWidth
                        value={adminDetails.email}
                        onChange={handleFieldChange}
                        id="email"
                        name='email'
                        label="Email"
                        variant="outlined"
                        sx={{
                            mt: 5,
                        }}
                    />
                </Grid>
                <Grid item xs={0} sm={7}>
                </Grid>
                <Grid item xs={12} md={5}>
                    <FormTextField
                        inputProps={{
                            readOnly: false,
                        }}
                        required={true}
                        fullWidth
                        value={adminDetails.defaultPassword}
                        onChange={handleFieldChange}
                        id="defaultPassword"
                        name='defaultPassword'
                        label="Default Password"
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
                        display: "flex",
                        alignContent: "center",
                        ml: {
                            md: "3rem"
                        },
                        mt: {
                            xs: "2rem"
                        }
                    }}>
                    <AppButton
                        type='submit'
                        size="large"
                        sx={{
                            mt: "auto",
                            width: "10rem",
                            height: "4rem",
                        }}
                    >
                        {buttonText}
                    </AppButton>

                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminInviteForm