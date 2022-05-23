import { Container, Typography, Card, Divider, CardContent} from "@mui/material";
import { useEffect } from "react";
import useGetCommunities from "hooks/useGetCommunities";


const Communities = () => {
    const {loading, data: communityData} = useGetCommunities();
    useEffect(() => {
        console.log(loading, communityData)
    }, [loading, communityData])
    
    return (
        <Container maxWidth='xl' sx={{ 
            borderRadius: '15px',
            backgroundColor: "#F3F6F8",
            padding: '1px'
            }} 
        >

            <img alt="CSV Logo" src="/CSV Logo.svg" width="250" style={{marginTop: "20px"}}></img>

            <Typography variant="h5"  align="center" sx={{
                color:'gray',
                marginTop: '5rem',
                fontWeight: '700'
            }}>Community selection page.</Typography>

            <Card style={{
                marginTop: '3rem',
                marginBottom: '1rem'
            }}>
                <Typography component="label"  align="center" sx={{
                        color:'gray',
                        padding: '0.75rem',
                        fontWeight: '700',
                        display: "block"
                    }}
                >List of Communities
                </Typography>
                <Divider/>
                <CardContent className="community-container">
                    <div className="community-list" style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto auto',
                        gap: '5px',
                        alignItems: 'center',
                        justifyItems: 'center',
                        color:'#FFFFFF'
                    }}>

                    {
                        (communityData || []).map(community => (
                            <Card key={community.name} elevation={2} className="community-list-item" style={{
                                width: '300px',
                                height: '150px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center',
                                padding: '0.5rem',
                                marginTop: '1rem',
                                color: '#FFFFFF',
                                backgroundColor: community.color,
                                cursor: 'pointer'
                            }}>
                                 <CardContent>
                                        {community.name}
                                </CardContent>
                                <Divider/>
                            </Card>
                        ))
                    }

                    </div>
                </CardContent>
            </Card>

        </Container>
    )
}

export default Communities;