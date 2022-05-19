import { Container, FormGroup, Typography, TextField,
         FormControl, Select, MenuItem, InputLabel, 
         Button ,FormControlLabel, Checkbox , Grid, Box} from "@mui/material";


import { useState } from "react";


const AddCommunity = (props) => {
    
    const [communityName, setCommunityName] = useState('')
    const [communityManager, setCommunityManager] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [communityDescription, setCommunityDescription] = useState('')


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
        //put http request here using axios
        //POST request to add community endpoint

        console.log(communityName)
        console.log(communityManager)
        console.log(isActive)
        console.log(communityDescription)
    }

    return ( 
        <Container maxWidth='lg' sx={{ 
            
            borderRadius: '15px',  //use vh or rem
            backgroundColor: "#F3F6F8",  
            }} >
            
            <img src="/CSV Logo.svg" width="250" style={{marginTop: "20px"}}></img>

            <Typography variant="h5" align="center" sx={{
                color:'gray'
            }}>Community Input Page</Typography>

                <Grid container >
                    <Grid item xs={12} sm={5}>
                        <TextField fullWidth value={communityName} onChange={handleCommunityNameChange} id="communityName" 
                            label="Name of Community" 
                            variant="outlined" 
                            sx={{
                                mt: 5,
                                backgroundColor: 'white'  // use hex code
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
                                backgroundColor: "white"  //use hex code
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
                                }} onClick={handleOnSave}>Save</Button>

                    </Grid>
                </Grid>
        </Container>
     );
}
 
export default AddCommunity;