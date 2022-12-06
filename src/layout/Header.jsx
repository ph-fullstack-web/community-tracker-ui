import React from 'react'
import { Typography } from "@mui/material";
import { useAuthContext } from 'contexts/auth/AuthContext';

const Header = () => {
    const { state: { credentials : { data: { email } }} } = useAuthContext();
    const pageHeaderStyle = {
      textAlign: "right",
      marginTop: "1rem",
      paddingRight: "1.5rem",
      position: "relative",
      right: "-50%",
      width: "50%",
      wordBreak: "break-all"
    };

    return (
        <Typography variant="subtitle2" component="div" sx={{...pageHeaderStyle}}>
            {email}
        </Typography>
    )
}

export default Header