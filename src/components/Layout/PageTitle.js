import { Typography } from "@mui/material";

const PageTitle = ({title}) => {

    return (
        <Typography variant="h5"  align="center" sx={{
            color:'gray',
            marginTop: '5rem',
            fontWeight: '700'
        }}>{title}</Typography>
    )
}

export default PageTitle