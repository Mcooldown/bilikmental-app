import { Fragment } from "react"
import Footer from "../components/molecules/Footer";
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import Input from "../components/atoms/Input";
import Head from "next/head";
import Button from "../components/atoms/Button";
import Link from "next/link";

const Login = () => {
     return (
          <Fragment>
               <Head>
                    <title>Bilik Mental | Login</title>
                    <meta name="description" content="Bilik Mental" />
               </Head>
               <div className={styles.authWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <Link href="/">
                              <div className="mt-3" style={{ cursor: "pointer" }}>
                                   <Image src="/assets/images/logoOriginal.png" width={155} height={50} />
                              </div>
                         </Link>
                         <div className="pt-24 pb-48 flex justify-center">
                              <div className={styles.cardAuth + " p-10"}>
                                   <h1 className={styles.textAuth + " mb-2 text-dark-1"}>Login</h1>
                                   <p className="text-gray-1 mb-10">Not have an account? <Link href="/register"><span className="text-blue-1" style={{ cursor: "pointer" }}>Create an Account</span></Link></p>

                                   <div className="mb-4">
                                        <Input type="text" label="Email" id="email" name="email" width={400} disabled={false} placeholder="" />
                                   </div>
                                   <Input type="password" label="Password" id="password" name="password" width={400} disabled={false} placeholder="" />
                                   <div className="flex justify-end mb-10 mt-2">
                                        <small className="text-gray-1">Forgot your password?</small>
                                   </div>

                                   <Button type={2} title="Login" onClick={() => { }} isFull={true} />
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </Fragment>
     )
}

export default Login;
