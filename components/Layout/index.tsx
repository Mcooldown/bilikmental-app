import { Fragment, ReactNode } from "react";
import Head from "next/head";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";

interface LayoutProps {
     children: ReactNode;
     pageTitle?: String;
}

const Layout = (props: LayoutProps) => {

     const { children, pageTitle } = props;

     return (
          <Fragment>
               <Head>
                    <title>Bilik Mental | {pageTitle}</title>
                    <meta name="description" content="Web based platform for mental health consultation and meditation" />
                    <meta name="keywords" content="Bilik Mental" />
               </Head>
               <Navbar />
               {children}
               <Footer />
          </Fragment>
     )
}

export default Layout
