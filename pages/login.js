import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import AppContext from '../context/AppContext';
import useAxios from '../hooks/useAxios';
import PageHeader from "../components/pageHeader/PageHeader";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/system/Stack";
import Backdrop from "@mui/material/Backdrop";
import { authToken } from "../common/api";
import style from "../styles/Home.module.css";


const schema = yup.object().shape({
    username: yup.string().required("Please enter your user name").min(3).max(30),
    password: yup.string().required("Please enter an valid password").min(3).max(40)
});

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [token, setToken] = useContext(AppContext);

    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(null);

    const navigate = useRouter();
    const http = useAxios()

    const onSubmit = async (data) => {

        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        try {
            setLoading(true);
            const response = await http.post(BASE_URL + authToken, data)

            if (response.status === 200) {
                setError(false);
                setToken(response.data.token);
                navigate.push("/admin");
            }
        }
        catch (error) {
            console.log(error.response);
            setError(true);
            setErrorMessage(error.response.data.message);
        }
        finally {
            setLoading(false)
        }
    }

    const formattedErrorMessage = () => {
        return { __html: errorMessage.toString() }
    }

    return (
        <>
            <Head>
                <title>Login || Js-Frameworks CA</title>
                <meta name="description" content="Login || Js-Frameworks CA" />
            </Head>
            <Container
                component="section"
                style={{ maxWidth: "400px" }}
                sx={{
                    display: 'flex',
                    flexDirection: "column"
                }}
            >
                <PageHeader title="Login" />
                <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    component="form"
                    style={{ padding: "0px" }}
                    maxWidth="600"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {loading &&
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}
                        >
                            Loading...
                        </Backdrop>
                    }
                    {error &&
                        <div className={style.errorMessage} dangerouslySetInnerHTML={formattedErrorMessage()} severity="error"></div>
                    }
                    <Stack spacing={1} sx={{ m: 0, p: 0 }}>
                        <label>Username</label>
                        <input {...register("username")} />
                        {errors.username &&
                            <Typography color="error" variant="body2">{errors.username.message}</Typography>
                        }
                    </Stack>
                    <Stack spacing={1} sx={{ m: 0, p: 0 }}>
                        <label>Password</label>
                        <input type="password" {...register("password")} />
                        {errors.password &&
                            <Typography color="error" variant="body2">{errors.password.message}</Typography>
                        }
                    </Stack>
                    <Button
                        sx={{ mt: 3 }}
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        component="button"
                    >
                        Login
                    </Button>

                </Grid>
            </Container>
        </>
    );
}

export default LoginForm;
