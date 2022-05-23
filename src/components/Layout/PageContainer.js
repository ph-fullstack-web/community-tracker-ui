import { Container } from "@mui/material"

const PageContainer = ({children}) => {
    return (
        <Container maxWidth='xl' sx={{ 
            borderRadius: '15px',
            backgroundColor: "#F3F6F8",
            padding: '1px'
            }} 
        >
            {children}
        </Container>
    )
}

export default PageContainer;