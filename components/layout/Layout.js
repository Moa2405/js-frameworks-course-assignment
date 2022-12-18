import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Layout = ({ children }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Navbar />
            <Container component="main" sx={{ mt: 6, mb: 2 }} maxWidth="xl">
                {children}
            </Container>
            <Footer />
        </Box>
    );
}

export default Layout;