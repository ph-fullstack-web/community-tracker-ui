import { useState } from "react"
import {
    Grid, Box, Card
} from "@mui/material";
import { FormTextField } from "components";
import AppButton from "components/common/AppButton";
import { useSwitchThemeContext } from "hooks";

const initialValue = {
    cognizantId: '',
    firstName: '',
    lastName: '',
    email: '',
    defaultPassword: ''
}

const AdminInviteForm = ({ onClickHandler, buttonText = "invite" }) => {

    const [adminDetails, setAdminDetails] = useState(initialValue)
    const { currentTheme, currentThemePalette } = useSwitchThemeContext();

    const handleFieldChange = (e) => {
        setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
    }
    const handleOnButtonClick = (e) => {
        e.preventDefault()
        const details = JSON.stringify(adminDetails)

        onClickHandler(details)

        //clear
        setAdminDetails(initialValue)
    }


    return (
        <Box component='form' onSubmit={handleOnButtonClick}>
            <Card
                sx={{ padding: "2rem", backgroundColor: currentThemePalette.cardSecondary }}>
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
                            size="small"
                            sx={{
                                mt: "auto",
                                width: "8rem",
                                height: "3.3rem",
                            }}
                        >
                            {buttonText}
                        </AppButton>

                    </Grid>
                </Grid>
            </Card>

        </Box>
    )
}

export default AdminInviteForm