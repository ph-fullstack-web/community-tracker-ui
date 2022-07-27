import { useEffect, useState } from "react"
import {
    MenuItem, Grid, Box, Card
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetManagers } from "hooks";
import { FormSelect, FormTextField } from "components";
import AppButton from "components/common/AppButton";
import UploadButton from "components/common/UploadButton";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageIcon from '@mui/icons-material/Image';
import { useSwitchThemeContext } from "hooks";
import { WHITE } from "theme";

const CommunityForm = ({ onClickHandler, buttonText, community }) => {

    const { currentTheme, currentThemePalette } = useSwitchThemeContext();

    const [communityDetails, setCommunityDetails] = useState({
        communityName: '',
        communityManagerId: '',
        isActive: true,
        communityDescription: '',
        selectedFile: null
    })
    const { isLoading, data: communityManagers } = useGetManagers();
    const { id } = useParams()

    useEffect(() => {
        if (community) {
            setCommunityDetails(community)
        }
    }, [community])

    const handleFieldChange = (e) => {
        setCommunityDetails({ ...communityDetails, [e.target.name]: e.target.value });
    }

    const handleOnButtonClick = (e) => {
        e.preventDefault()

        const data = {
            community_name: communityDetails.communityName,
            community_manager: communityDetails.communityManagerId,
            community_description: communityDetails.communityDescription,
            icon: communityDetails.selectedFile
        }

        onClickHandler({ id, data })
    }

    const image = '';

    const fileSelectedHandler = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);

        setCommunityDetails({
            ...communityDetails,
            selectedFile: base64
        })
    };

    const convertBase64 = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    };

    return (
        <Box component='form' onSubmit={handleOnButtonClick}>
            <Grid container>
                <Grid item xs={12} md={5}>
                    <FormTextField 
                        inputProps={{
                            readOnly: community ? true : false,
                        }}
                        required={community ? false : true}
                        fullWidth
                        value={communityDetails.communityName}
                        onChange={handleFieldChange}
                        id="communityName"
                        name='communityName'
                        label="Name of Community"
                        variant="outlined"
                        sx={{
                            mt: 5,
                        }}
                    />
                </Grid>
                <Grid item xs={0} sm={7}>
                </Grid>

                <Grid item xs={12} md={5}>
                    <FormSelect
                        FormControlProps={{
                            sx: {
                                mt: 5
                            },
                            fullWidth: true
                        }}
                        InputLabelProps={{
                            id: "communityAssigned"
                        }}
                        InputLabelChildren="Community Assigned To"
                        SelectProps={{
                            inputProps: { readOnly: community ? true : false },
                            required: true,
                            id: "communityManager",
                            name: "communityManagerId",
                            value: communityDetails.communityManagerId,
                            label: "Community Assigned To",
                            onChange: handleFieldChange,
                        }}
                    >
                        {!isLoading && communityManagers && (
                            communityManagers.map((manager) => {
                                return (
                                    <MenuItem key={manager.people_id} value={manager.people_id}> {manager.first_name + " " + manager.last_name} </MenuItem>
                                )
                            })
                        )}
                    </FormSelect>
                </Grid>
                <Grid item xs={12} sm={7}>
                </Grid>
                <Grid item xs={12} md={7}>
                    <FormTextField
                        InputProps={{
                            readOnly: community ? true : false,
                        }}
                        required
                        fullWidth
                        id="communityDescription"
                        name="communityDescription"
                        label="Community Description"
                        multiline
                        rows={6}
                        sx={{
                            mt: 5
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
                <Grid item xs={12} md={7}
                    sx={{
                        mt: {
                            xs: "2rem"
                        },
                        display: 'flex'
                }}>
                    <Card sx={{
                        display: 'flex',
                        width: '120px',
                        height: '120px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        border: `1px solid ${currentThemePalette.main}`,
                        backgroundColor: currentTheme === "dark" ? currentThemePalette.light : WHITE
                    }}>
                        {communityDetails.selectedFile ? <img width='100' height='100' src={communityDetails.selectedFile} alt='icon preview' /> : <ImageIcon sx={{width: 100, height: 100}}/>}
                    </Card>
                    <UploadButton
                        onChangeEvent={fileSelectedHandler}
                        sx={{
                            height: '3rem',
                            alignSelf: 'center'
                        }}
                    >
                        <PhotoCamera sx={{
                            marginRight: "1rem"
                        }}/>
                        Upload Icon
                    </UploadButton>
                </Grid>
            </Grid>
        </Box>


    )
}

export default CommunityForm