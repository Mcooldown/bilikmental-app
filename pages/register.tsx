import { Fragment } from "react"
import Footer from "../components/molecules/Footer";
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import Input from "../components/atoms/Input";
import Head from "next/head";
import Button from "../components/atoms/Button";
import Link from "next/link";

const Register = () => {
     return (
          <Fragment>
               <Head>
                    <title>Bilik Mental | Register</title>
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
                                   <h1 className={styles.textAuth + " mb-2 text-dark-1"}>Create New Account</h1>
                                   <p className="text-gray-1 mb-10">Already have an account? <Link href="/register"><span className="text-blue-1" style={{ cursor: "pointer" }}>Login</span></Link></p>

                                   <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="col-span-1">
                                             <Input type="text" label="First Name" id="firstName" name="firstName" width={193} disabled={false} placeholder="" />
                                        </div>
                                        <div className="col-span-1">
                                             <Input type="text" label="Last Name" id="lastName" name="lastName" width={193} disabled={false} placeholder="" />
                                        </div>
                                   </div>
                                   <div className="mb-4">
                                        <Input type="text" label="Gender" id="gender" name="gender" width={400} disabled={false} placeholder="" />
                                   </div>
                                   <div className="mb-4">
                                        <Input type="text" label="Date of Birth" id="dateOfBirth" name="dateOfBirth" width={400} disabled={false} placeholder="" />
                                   </div>
                                   <div className="mb-4">
                                        <Input type="text" label="Address" id="address" name="address" width={400} disabled={false} placeholder="" />
                                   </div>
                                   <div className="mb-4">
                                        <Input type="text" label="Phone Number" id="phoneNumber" name="phoneNumber" width={400} disabled={false} placeholder="" />
                                   </div>
                                   <div className="mb-4">
                                        <Input type="text" label="Email" id="email" name="email" width={400} disabled={false} placeholder="" />
                                   </div>
                                   <div className="mb-4">
                                        <Input type="password" label="Password" id="password" name="password" width={400} disabled={false} placeholder="" />
                                   </div>
                                   <div className="mb-10">
                                        <Input type="password" label="Confirm Password" id="confirmPassword" name="confirmPassword" width={400} disabled={false} placeholder="" />
                                   </div>

                                   <Button type={2} title="Create New Account" onClick={() => { }} isFull={true} />
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </Fragment>
     )
}

export default Register;
