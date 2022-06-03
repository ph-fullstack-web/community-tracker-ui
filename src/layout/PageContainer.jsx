import { Container } from "@mui/material"
import { Link } from "react-router-dom";

const PageContainer = ({children}) => {
    return (
        <Container maxWidth='xl' sx={{ 
            borderRadius: '15px',
            backgroundColor: "#F3F6F8",
            padding: '1px',
            marginTop: '2rem'
            }} 
        >
            {children}
        </Container>
    )
}

export default PageContainer;