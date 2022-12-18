import "../styles/globals.css"
import Head from 'next/head'
import Layout from "../components/layout/Layout"
import { AppProvider } from '../context/AppContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>


    </>
  )
}

export default MyApp
