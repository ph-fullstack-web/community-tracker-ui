import { Typography } from "@mui/material";

const PageTitle = ({title = "Page Title"}) => {

    return (
        <Typography variant="h5"  align="center" sx={{
            color:'#b0c0cb',
            marginTop: '5rem',
            fontWeight: '700'
        }}>{title}</Typography>
    )
}

export default PageTitle