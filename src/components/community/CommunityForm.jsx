import { useEffect, useState } from "react"
import {
    TextField, FormControl, Select, MenuItem, InputLabel,
    Button, Grid, Box
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetManagers } from "hooks";
import { CustomButton } from "components";

const CommunityForm = ({ onClickHandler, buttonText, community }) => {

    const [communityDetails, setCommunityDetails] = useState({
        communityName: '',
        communityManagerId: '',
        isActive: true,
        communityDescription: ''
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
            community_description: communityDetails.communityDescription
        }

        onClickHandler({ id, data })


    }


    return (
        <Box component='form' onSubmit={handleOnButtonClick}>
            <Grid container >
                <Grid item xs={12} sm={5}>
                    <TextField
                        inputProps={{
                            readOnly: community ? true : false,
                        }}
                        required={community ? false : true}
                        fullWidth value={communityDetails.communityName}
                        onChange={handleFieldChange}
                        id="communityName"
                        name='communityName'
                        label="Name of Community"
                        variant="outlined"
                        sx={{
                            mt: 5,
                            backgroundColor: '#FFFFFF'
                        }} />
                </Grid>
                <Grid item xs={0} sm={7}>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <FormControl sx={{
                        mt: 5
                    }} fullWidth>
                        <InputLabel id="communityAssigned">Community Assigned To</InputLabel>
                        <Select
                            inputProps={{ readOnly: community ? true : false }}
                            required
                            id="communityManager"
                            name="communityManagerId"
                            value={communityDetails.communityManagerId}
                            label="Community Assigned To"
                            onChange={handleFieldChange}
                            sx={{
                                backgroundColor: "#FFFFFF"
                            }}
                        >

                            {!isLoading && communityManagers && (
                                communityManagers.map((manager) => {
                                    return (
                                        <MenuItem key={manager.people_id} value={manager.people_id}> {manager.first_name + " " + manager.last_name} </MenuItem>
                                    )
                                })
                            )
                            }

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={7}>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
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
                            backgroundColor: "white",
                            mt: 5
                        }}
                        value={communityDetails.communityDescription}
                        onChange={handleFieldChange}
                    />
                </Grid>


            </Grid>
            <CustomButton variant="contained" type='submit' marginY={2} width="10rem" name={buttonText} />
        </Box>


    )
}

export default CommunityForm