import { Fragment } from "react"
import Footer from "../components/molecules/Footer";
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import Input from "../components/atoms/Input";
import Head from "next/head";
import Button from "../components/atoms/Button";
import Link from "next/link";
import Gap from "../components/atoms/Gap";
import Select from "../components/atoms/Select";

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
                              <div className="mt-3 cursor-pointer">
                                   <Image src="/assets/images/logoOriginal.png" width={155} height={50} />
                              </div>
                         </Link>
                         <div className={styles.authRowWrapper}>
                              <div className="grid grid-cols-5 lg:grid-cols-11">
                                   <div className="col-span-3"></div>
                                   <div className="col-span-5">
                                        <div className="card-shadow p-10">
                                             <h1 className="text-size-3 font-bold text-dark-1">Create New Account</h1>
                                             <Gap height={10} />
                                             <p className="text-gray-1">Already have an account? <Link href="/login"><span className="text-blue-1 cursor-pointer">Login</span></Link></p>
                                             <Gap height={40} />
                                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                                  <div className="col-span-1">
                                                       <Input type="text" label="First Name" id="firstName" name="firstName" isFull />
                                                  </div>
                                                  <div className="col-span-1">
                                                       <Input type="text" label="Last Name" id="lastName" name="lastName" isFull />
                                                  </div>
                                             </div>
                                             <Gap height={20} />
                                             <Select label="Gender" defaultValue="" id="gender" name="gender" isFull options={["Male", "Female"]} />
                                             <Gap height={20} />
                                             <Input type="date" label="Date of Birth" id="dateOfBirth" name="dateOfBirth" isFull />
                                             <Gap height={20} />
                                             <Input type="text" label="Address" id="address" name="address" isFull />
                                             <Gap height={20} />
                                             <Input type="text" placeholder="e.g 62xxxxx" label="Phone Number" id="phoneNumber" name="phoneNumber" isFull />
                                             <Gap height={20} />
                                             <Input type="text" label="Email" id="email" name="email" isFull />
                                             <Gap height={20} />
                                             <Input type="password" placeholder="Min 6 characters" label="Password" id="password" name="password" isFull />
                                             <Gap height={20} />
                                             <Input type="password" placeholder="Must match with registered password" label="Confirm Password" id="confirmPassword" name="confirmPassword" isFull />
                                             <Gap height={40} />
                                             <Button type={2} title="Create New Account" isFull />
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

export default Register;
