import { Container, FormGroup, Typography, TextField,
    FormControl, Select, MenuItem, InputLabel, 
    Button ,FormControlLabel, Checkbox , Grid, Box} from "@mui/material";


import { useState } from "react";


const UpdateCommunity = (props) => {
    const initialCommunityName = props.communityName
    const initialCommunityManager = props.communityManager
    const initialIsActive = props.isActive
    const initialCommunityDescription = props.communityDescription

    const [communityName, setCommunityName] = useState(initialCommunityName)
    const [communityManager, setCommunityManager] = useState(initialCommunityManager)
    const [isActive, setIsActive] = useState(initialIsActive)
    const [communityDescription, setCommunityDescription] = useState(initialCommunityDescription)


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

    const handleOnSave = (e) => {


    console.log(communityName)
    console.log(communityManager)
    console.log(isActive)
    console.log(communityDescription)
    }

    return ( 
    <Container maxWidth='lg' sx={{ 
        
        borderRadius: '3vh',  
        backgroundColor: "#F3F6F8",  
        }} >
        
        <img src="/CSV Logo.svg" width="250" style={{marginTop: "3vh"}}></img>

        <Typography variant="h5" align="center" sx={{
            color:'#808080'
        }}>Community Update Page</Typography>

            <Grid container >
                <Grid item xs={12} sm={5}>
                    <TextField fullWidth 
                        value={communityName} 
                        onChange={handleCommunityNameChange} 
                        id="communityName" 
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
                        <MenuItem value={'Baron'}>Baron</MenuItem>
                        <MenuItem value={'Lloyd'}>Lloyd</MenuItem>

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
                        <FormControlLabel control={<Checkbox checked={isActive} 
                            onChange={handleActiveChange}/>} 
                            label="Active" 
                            align='center' />
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
                        backgroundColor: "#FFFFFF",
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
                            }} onClick={handleOnSave}>Update</Button>

                </Grid>
            </Grid>
    </Container>
    );
}

export default UpdateCommunity;