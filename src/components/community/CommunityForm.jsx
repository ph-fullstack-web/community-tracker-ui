import { useEffect, useState } from "react"
import {
    TextField, FormControl, Select, MenuItem, InputLabel,
    Button, FormControlLabel, Checkbox, Grid, Box
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetManagers } from "hooks";

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
            Communityname: communityDetails.communityName,
            Communitymgrpeopleid: communityDetails.communityManagerId,
            Isactive: communityDetails.isActive,
            Communitydescription: communityDetails.communityDescription
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
                    <Box sx={{
                        display: "flex",
                        mt: 5,
                        pt: 3,
                        justifyContent: "center",

                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="isActive"
                                    checked={communityDetails.isActive}
                                    onChange={!community ? (e) => setCommunityDetails({ ...communityDetails, [e.target.name]: !communityDetails.isActive }) : () => { }} />} label="Active" align='center' />
                    </Box>

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
                <Grid item sm={5} />
                <Grid item sm={8} />
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" sx={{
                        mt: 5,
                        mb: 5,
                        width: "100%"
                    }} type='submit'>{buttonText}</Button>

                </Grid>
            </Grid>
        </Box>


    )
}

export default CommunityForm