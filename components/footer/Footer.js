import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors'

const Footer = () => {

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: grey[200]
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h3" component="p">
                    Footer
                </Typography>

            </Container>
        </Box>
    );
}

export default Footer;