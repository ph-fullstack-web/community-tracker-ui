import { useState, useEffect } from "react"
import { TextField,FormControl, Select, MenuItem, InputLabel, 
    Button ,FormControlLabel, Checkbox , Grid, Box} from "@mui/material";
import { useParams } from "react-router-dom";
import useGetManagers from "hooks/People/useGetManagers";

const CommunityForm = ({onClickHandler, buttonText}) => {
    const [communityName, setCommunityName] = useState('')
    const [communityManager, setCommunityManager] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [communityDescription, setCommunityDescription] = useState('')
    const { isLoading, data: communityManagers, isError, error } = useGetManagers();
    const { id } = useParams()


    const handleCommunityNameChange = (e) => {
        setCommunityName(e.target.value)
    }

    const handleManagerChange = (e) => {
        setCommunityManager(e.target.value)
    }

    const handleActiveChange = (e) => {
        setIsActive(!isActive)
    }

    const handleDescriptionChange = (e) => {
        setCommunityDescription(e.target.value)
    }

    const handleOnButtonClick = async(e) => {

        const data = {
            Communityname: communityName,
            Communitymgrpeopleid: communityManager,
            Isactive: isActive,
            Communitydescription: communityDescription
        }

        const responseStatus = await onClickHandler(id,data)

        
    }      


    return (
    <Grid container >
        <Grid item xs={12} sm={5}>
            <TextField fullWidth value={communityName} onChange={handleCommunityNameChange} id="communityName" 
                label="Name of Community" 
                variant="outlined" 
                sx={{
                    mt: 5,
                    backgroundColor: '#FFFFFF'
                }}/>
        </Grid>
        <Grid item xs={0} sm={7}>
        </Grid>

        <Grid item xs={12} sm={5}>
            <FormControl sx={{
                mt: 5
            }} fullWidth>
            <InputLabel id="communityAssigned">Community Assigned To</InputLabel>
            <Select
                
                id="communityManager"
                value={communityManager}
                label="Community Assigned To"
                onChange={handleManagerChange}
                sx={{
                    backgroundColor: "#FFFFFF"
                }}
            >

                {!isLoading && communityManagers && (
                    communityManagers.map((manager) => {
                        return(
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
                display :"flex",
                mt: 5,
                pt: 3,
                justifyContent: "center",
                
            }}>
                <FormControlLabel control={<Checkbox checked={isActive} onChange={handleActiveChange}/>} label="Active" align='center' />
            </Box>

        </Grid>
        <Grid item xs={12} sm={7}>
        <TextField
            fullWidth
            id="communityDesc"
            label="Community Description"
            multiline
            rows={6}
            sx={{
                backgroundColor: "white",
                mt:5
            }}
            value={communityDescription}
            onChange={handleDescriptionChange}
        />                        
        </Grid>
        <Grid item sm={5}/>
        <Grid item sm={8}/>
        <Grid item xs={12} sm={4}>
            <Button variant="contained" sx={{
                    mt: 5,
                    mb: 5,
                    width: "100%"
                    }} onClick={handleOnButtonClick}>{buttonText}</Button>

        </Grid>
    </Grid>
    )
}

export default CommunityForm