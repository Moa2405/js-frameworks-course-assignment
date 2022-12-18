import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import Stack from "@mui/system/Stack";
import Alert from '@mui/material/Alert';

const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your name").min(3).max(30),
    lastName: yup.string().required("You must provide a last name").min(4).max(30),
    email: yup.string().required().email("Please enter an valid email").max(50),
    subject: yup.string("react", "next").matches(/(react|next)/, "Please choose a subject").required("You must select a subject"),
    message: yup.string().required("You must write a message").min(10).max(200)
});

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [formValidated, setFormValidated] = useState(null)

    const onSubmit = (data) => {
        setFormValidated(true);
        console.log(data);
    }

    return (
        <>
            <Head>
                <title>Contact | Js-Frameworks CA</title>
                <meta name="description" content="Contact | Js-Frameworks CA" />
            </Head>
            <Container
                component="section"
                style={{ maxWidth: "600px" }}
                sx={{
                    display: 'flex',
                    flexDirection: "column",
                    padding: 0,
                }}
            >
                <PageHeader title="Contact" />
                <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    component="form"
                    style={{ padding: "0px" }}
                    maxWidth="600"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={1} sx={{ marginX: 0, marginY: 0, padding: 0 }}>
                        <label>First name *</label>
                        <input {...register("firstName")} />
                        {errors.firstName &&
                            <Typography color="error" variant="body2">{errors.firstName.message}</Typography>
                        }
                    </Stack>
                    <Stack spacing={1}>
                        <label>Last name *</label>
                        <input {...register("lastName")} />
                        {errors.lastName &&
                            <Typography color="error" variant="body2">{errors.lastName.message}</Typography>
                        }
                    </Stack>
                    <Stack spacing={1}>
                        <label> Email *</label>
                        <input {...register("email")} />
                        {errors.email &&
                            <Typography color="error" variant="body2">{errors.email.message}</Typography>
                        }
                    </Stack>
                    <Stack spacing={1}>
                        <label>Subject *</label>
                        <select {...register("subject")}>
                            <option>--choose a subject--</option>
                            <option value="react" name="react">React</option>
                            <option value="next" name="next">Next</option>
                        </select>
                        {errors.subject &&
                            <Typography color="error" variant="body2">{errors.subject.message}</Typography>
                        }
                    </Stack>
                    <Stack spacing={1} >
                        <label>Message *</label>
                        <textarea {...register("message")} rows="5" />
                        {errors.message &&
                            <Typography color="error" variant="body2">{errors.message.message}</Typography>
                        }
                    </Stack>

                    <Button
                        sx={{ mt: 3 }}
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        component="button"
                        endIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                    <div style={{ marginTop: "1rem" }}>
                        {formValidated && <Alert severity="success">Message <strong>successfully</strong> sent </Alert>}
                    </div>
                </Grid>
            </Container>
        </>
    );
}

export default Contact;

