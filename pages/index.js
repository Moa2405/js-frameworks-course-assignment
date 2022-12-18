import Head from "next/head";
import PageHeader from "../components/pageHeader/PageHeader";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ProductCard } from "../components/product/ProductCard"
import { productsUrl } from "../common/api";
import { useState } from "react";

export const getStaticProps = async () => {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  let products = [];

  try {
    const response = await axios(BASE_URL + productsUrl);

    response.data.map((p) => {
      const product = {
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.images[0].src,
        alt: p.images[0].alt
      }

      products.push(product);
    })
  }
  catch (error) {
    console.log(error);
  }

  return {
    props: { products: products }
  }
}

const Home = ({ products }) => {

  return (
    <>
      <Head>
        <title>Js-Frameworks CA</title>
        <meta name="description" content="Js-Frameworks CA" />
      </Head>
      <Container
        component="section"
        // style={{ maxWidth: "600px" }}
        sx={{
          display: 'flex',
          flexDirection: "column",
          padding: 0
        }}
      >
        <PageHeader title="Home" />
        <Grid
          container
          justifyContent="space-around"
          gap={3}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products.map((p) => {
            return (
              <ProductCard key={p.id} id={p.id} name={p.name} image={p.image} alt={p.alt} />
            )
          })}
        </Grid>
      </Container>
    </>
  );
}

export default Home;


