import Typography from "@mui/material/Typography";

const PageHeader = ({ title }) => {
    return (
        <Typography variant="h2" component="h1">
            {title}
        </Typography>
    );
}

export default PageHeader;