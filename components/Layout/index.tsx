import { Fragment, ReactNode } from "react";
import Head from "next/head";
import Navbar from "../molecules/Navbar";

interface LayoutProps {
     children: ReactNode;
     pageTitle: String;
}

const Layout = (props: LayoutProps) => {

     const { children, pageTitle } = props;

     return (
          <Fragment>
               <Head>
                    <title>Bilik Mental | {pageTitle}</title>
                    <meta name="description" content="Website NextJS Basic" />
               </Head>
               <Navbar />
               {children}
          </Fragment>
     )
}

export default Layout
