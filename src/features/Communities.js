import { Typography, Card, Divider, CardContent, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect } from "react";
import useGetCommunities from "hooks/useGetCommunities";
import Logo from "components/Layout/Logo";
import PageTitle from "components/Layout/PageTitle";
import PageContainer from "components/Layout/PageContainer";


const Communities = () => {
    const {loading, data: communityData} = useGetCommunities();
    useEffect(() => {
        console.log(loading, communityData)
    }, [loading, communityData])
    
    return (
        <PageContainer>
            <Logo/>
            <PageTitle title={"Community selection page"} />
            <Card style={{
                marginTop: '3rem',
                marginBottom: '1rem',
                border: '3px solid #9fafc1'
            }}>
                <Typography component="label"  align="center" sx={{
                        color:'#798da3',
                        padding: '0.25em',
                        fontWeight: '700',
                        display: "block",
                        backgroundColor: '#e6e6e6',
                        
                    }}
                >List of Communities
                </Typography>
                <Divider style={{border: '2px solid #9fafc1'}} />
                <CardContent className="community-container">
                    <div className="community-list" style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto auto',
                        gap: '5px',
                        alignItems: 'center',
                        justifyItems: 'center',
                        color:'#FFFFFF',
                    }}>

                        {
                            (communityData || []).map(community => (
                                <Card key={community.name} elevation={2} className="community-list-item" style={{
                                    width: '250px',
                                    height: '150px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                    padding: '0.5rem',
                                    marginTop: '1rem',
                                    color: '#FFFFFF',
                                    backgroundColor: community.color,
                                    cursor: 'pointer'
                                }}>
                                    <CardContent style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        paddingTop: '0.2em'
                                    }}>
                                        <img src={community.image}
                                            height="50px"
                                            width="50px"
                                            alt="cpver"
                                        />
                                        <Typography component="label"  align="center" sx={{
                                                color:'#FFFFFF',
                                                padding: '0.75rem',
                                                paddingTop: '0',
                                                fontWeight: '600',
                                                fontStyle: 'italic',
                                                display: "block"
                                            }}
                                        >{community.name}
                                        </Typography>
                                    </CardContent>
                                    <Divider style={{borderColor: '#FFFFFF'}}/>
                                </Card>
                            ))
                        }
                        
                        <IconButton title="Go to input community" color="primary" size="large" aria-label="Add community">
                            <AddCircleOutlineIcon style={{
                                color: '#74808d'
                            }}/>
                        </IconButton>
                    </div>
                </CardContent>
            </Card>

        </PageContainer>
    )
}

export default Communities;