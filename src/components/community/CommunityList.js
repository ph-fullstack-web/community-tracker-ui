import { Typography, Card, Divider, CardContent, IconButton, Grid } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CommunityList = ({
    communities = [],
    loading
}) => {
    return (
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
                <Grid container spacing={3} className="community-list" style={{
                    color:'#FFFFFF',
                }}>

                    {
                        (communities || []).map(community => (
                            <Grid key={community.id} item xs={12} sm={6} md={4} lg={3} xl={3} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                justifyItems: 'center',
                            }}>
                                <Card elevation={2} className="community-list-item" style={{
                                    width: '100%',
                                    height: '10rem',
                                    display: 'block',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                    marginTop: '1rem',
                                    color: '#FFFFFF',
                                    backgroundColor: community.color,
                                    
                                }}>
                                    <CardContent style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        paddingTop: '1em',
                                        cursor: 'pointer'
                                    }}>
                                        <img src={community.image}
                                            height="60px"
                                            width="60px"
                                            alt="community icon"
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
                            </Grid>
                        ))
                    }
                    <Grid item xs={12} sm={12} md={4} lg={3} style={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems: 'center'
                    }}>
                        <IconButton title="Go to input community" color="primary" size="large" aria-label="Add community"
                            style={{
                                height: '5rem',
                                width: '5rem'
                            }}
                        >
                            <AddCircleOutlineIcon fontSize="large" style={{
                                color: '#74808d',
                                fontWeight:'700'
                            }}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} style={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems: 'center'
                    }}>
                        <IconButton disabled title="Go to input community" color="primary" size="large" aria-label="Add community"
                            style={{
                                height: '5rem',
                                width: '5rem'
                            }}
                        >
                            <AddCircleOutlineIcon fontSize="large" style={{
                                color: '#74808d',
                                opacity: '0.4',
                                fontWeight:'700'
                            }}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} style={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems: 'center'
                    }}>
                        <IconButton disabled title="Go to input community" color="primary" size="large" aria-label="Add community"
                            style={{
                                height: '5rem',
                                width: '5rem'
                            }}
                        >
                            <AddCircleOutlineIcon fontSize="large" style={{
                                color: '#74808d',
                                opacity: '0.4',
                                fontWeight:'700'
                            }}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}


export default CommunityList;