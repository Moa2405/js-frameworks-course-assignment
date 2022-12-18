import Head from "next/head";
import PageHeader from "../components/pageHeader/PageHeader";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from 'next/router';

const Admin = () => {

    const [token] = useContext(AppContext);
    const navigate = useRouter();

    useEffect(() => {
        const user = () => {
            if (!token) {
                navigate.push('/login')
            }
        }
        user()
    }, [])


    return (
        <>
            <Head>
                <title>Admin | Js-Frameworks CA</title>
                <meta name="description" content="Js-Frameworks CA" />
            </Head>
            <PageHeader title="Admin" />
        </>
    );
}

export default Admin;