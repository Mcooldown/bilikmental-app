import { Fragment } from "react"
import Footer from "../components/molecules/Footer";
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import Input from "../components/atoms/Input";
import Head from "next/head";
import Button from "../components/atoms/Button";
import Link from "next/link";
import Gap from "../components/atoms/Gap";

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
                         <div className={styles.authRowWrapper}>
                              <div className="grid grid-cols-5 lg:grid-cols-11">
                                   <div className="col-span-3"></div>
                                   <div className="col-span-5">
                                        <div className={styles.cardAuth + " p-10"}>
                                             <h1 className={styles.textAuth + " text-dark-1"}>Login</h1>
                                             <Gap height={10} />
                                             <p className="text-gray-1">Not have an account? <Link href="/register"><span className="text-blue-1" style={{ cursor: "pointer" }}>Create an Account</span></Link></p>
                                             <Gap height={40} />

                                             <Input type="text" label="Email" id="email" name="email" isFull />
                                             <Gap height={15} />
                                             <Input type="password" label="Password" id="password" name="password" isFull />
                                             <Gap height={5} />
                                             <div className="flex justify-end">
                                                  <small className="text-gray-1">Forgot your password?</small>
                                             </div>
                                             <Gap height={40} />
                                             <Button type={2} title="Login" onClick={() => { }} isFull={true} />
                                             <Gap height={15} />
                                        </div>
                                   </div>
                                   <div className="col-span-3"></div>
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </Fragment>
     )
}

export default Login;
