import { Fragment, useEffect, useState } from "react"
import Footer from "../components/molecules/Footer";
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import Input from "../components/atoms/Input";
import Head from "next/head";
import Button from "../components/atoms/Button";
import Link from "next/link";
import Gap from "../components/atoms/Gap";
import router from "next/router";
import Swal from "sweetalert2";

const Login = () => {

     const urlAPI = "https://bilikmental-api.vercel.app";
     // const urlAPI = "http://localhost:4000";
     const [buttonLoading, setButtonLoading] = useState(false);

     const [email, setEmail] = useState('');
     const [errEmail, setErrEmail] = useState('');

     const [password, setPassword] = useState('');
     const [errPassword, setErrPassword] = useState('');

     useEffect(() => {

          const userId = localStorage.getItem('userId');
          if (userId) {
               Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Already logged in', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
               router.push('/profile');
          }
     }, []);

     const login = async () => {
          const options = {
               method: "POST",
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                    email: email, password: password
               })
          };
          const res = await fetch(urlAPI + "/v1/auth/login", options);
          return await res.json();
     }

     const handleSubmit = () => {

          let pass = true;

          if (email === '') {
               setErrEmail("Email must be filled");
               pass = false;
          }
          if (password === '') {
               setErrPassword("Password must be filled");
               pass = false;
          }

          if (pass) {
               setButtonLoading(true);
               login().then(res => {
                    if (res.data) {
                         localStorage.setItem('userId', res.data._id);
                         localStorage.setItem('userName', res.data.name.first);
                         localStorage.setItem('role', res.role);
                         Swal.fire({ icon: 'success', title: 'Success', text: 'Login success', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
                         router.push('/profile');
                    } else {
                         Swal.fire({ icon: 'error', title: 'Error', text: 'Invalid email or password', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
                    }
                    setButtonLoading(false);
               });
          }

     }

     return (
          <Fragment>
               <Head>
                    <title>Bilik Mental | Login</title>
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
                                             <h1 className="text-size-3 font-bold text-dark-1">Login</h1>
                                             <Gap height={10} />
                                             <p className="text-gray-1">Not have an account? <Link href="/register"><span className="text-blue-1 cursor-pointer">Create New Account</span></Link></p>
                                             <Gap height={20} />
                                             <hr />
                                             <Gap height={20} />
                                             <Input type="text" label="Email" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrEmail('') }} errorMessage={errEmail} required isFull />
                                             <Gap height={15} />
                                             <Input type="password" label="Password" id="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value); setErrPassword('') }} errorMessage={errPassword} required isFull />
                                             <Gap height={5} />
                                             <div className="flex justify-end">
                                                  <small className="text-gray-1">Forgot your password?</small>
                                             </div>
                                             <Gap height={40} />
                                             {
                                                  buttonLoading ?
                                                       <Button type={2} title="Please wait..." disabled isFull />
                                                       :
                                                       <Button type={2} title="Login" onClick={handleSubmit} isFull />
                                             }
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
