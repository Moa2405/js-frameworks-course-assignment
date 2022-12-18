import Head from "next/head";
import axios from "axios";
import PageHeader from "../../components/pageHeader/PageHeader";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "../../styles/Home.module.css"
import { productsUrl } from "../../common/api";

export const getStaticPaths = async () => {

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const response = await axios.get(BASE_URL + productsUrl);

        const paths = response.data.map(product => {
            return {
                params: { id: product.id.toString() }
            }
        })
        return {
            paths,
            fallback: false
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const getStaticProps = async ({ params }) => {

    const id = params.id;

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    let product = null;
    try {
        const response = await axios.get(BASE_URL + productsUrl + id);
        product = response.data;
    }
    catch (error) {
        console.log(error)
    }

    return {
        props: { product: product }
    }
}

const Detail = ({ product }) => {

    console.log(product.prices.price);

    const description = () => {
        return { __html: product.description }
    }

    const priceFormatter = (price) => {
        return new Intl.NumberFormat('en-NO', { style: 'currency', currency: 'NOK' }).format(price)
    }

    return (
        <>
            <Head>
                <title>{product.name} | JS-Frameworks MA 3</title>
                <meta name="description" content={`${product.name} | Ja-Frameworks CA`} />
            </Head>
            <PageHeader title={product.name} />
            <Grid
                container
                maxWidth={900}
                spacing={{ xs: 2, md: 3 }}

            >
                <Grid item xs={12} sm={12} md={6}>
                    <div className={styles.container}>
                        <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </Grid>
                <Grid
                    item
                    display="flex"
                    flexDirection="column"
                    xs={12} sm={12} md={6}

                >
                    <div dangerouslySetInnerHTML={description()}></div>
                    <Typography variant="h3" component="p">
                        {priceFormatter(product.prices.price)}
                    </Typography>
                </Grid>
            </Grid>
        </>

    )
}

export default Detail;
