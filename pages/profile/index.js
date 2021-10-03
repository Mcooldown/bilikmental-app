import router from "next/router";
import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Profile = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";
     const [userData, setUserData] = useState(null);
     const [userName, setUserName] = useState('');

     useEffect(() => {
          
          const userId = localStorage.getItem('userId');
          const abortCont = new AbortController();
          
          const fetchData = async () => {
               try {
                    const url = urlAPI + '/v1/auth/get-user-data';
                    const options = {
                         signal: abortCont.signal,
                         method: "POST",
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({
                              userId: localStorage.getItem('userId')
                         })
                    };
                    const res = await fetch(url, options);

                    if(!res.ok){
                         throw Error("Data not fetched");
                    }else{
                         const json = await res.json();
                         setUserData(json.data);
                    }
               } catch (error) {
                    console.log(error);
               }
          }

          if (!userId) {
               Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Please login first', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
               router.push('/login');
          } else {
               setUserName(localStorage.getItem('userName'));
               fetchData();
          }

          return () => abortCont.abort();
     }, []);

     return (
          <Layout pageTitle="Profile">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Welcome, {userName ? userName : ''}</h1>
                              <Gap height={20} />
                              <div className="card-shadow px-6 py-8 flex">
                                   <Button type={2} title="Profile" onClick={() => router.push('/profile')} />
                                   <Gap width={10} />
                                   <Button type={1} title="Consultation" onClick={() => router.push('/consultation')} />
                                   <Gap width={10} />
                                   <Button type={1} title="Meditation" onClick={() => router.push('/meditation')} />
                                   <Gap width={10} />
                                   <Button type={1} title="My Quotes" />
                                   <Gap width={10} />
                                   <Button type={1} title="My Articles" />
                              </div>
                              <Gap height={40} />
                              <h1 className="text-size-3 font-bold">Profile</h1>
                              <Gap height={10} />
                              <hr />
                              <Gap height={40} />
                              {
                                   userData &&
                                   <div className="grid grid-cols-12 gap-7 items-start">
                                        <div className="col-span-12 lg:col-span-3">
                                             <img src="/assets/images/commentSample.jpg" className="rounded-full w-60 h-60" alt="imageComment" />
                                        </div>
                                        <div className="col-span-12 lg:col-span-9">
                                             <h1 className="text-size-4 font-bold text-blue-1">
                                                  {userData.name.first} {userData.name.last}
                                             </h1>
                                             <Gap height={15} />
                                             <div className="text-gray-1 text-size-6">
                                                  <span className="font-bold">Gender</span> : {userData.gender}<br />
                                                  <span className="font-bold">Date of Birth</span> : {new Date(userData.dateOfBirth).toLocaleString("en-US",{day: "numeric", month:"long", year:"numeric" })}<br />
                                                  <span className="font-bold">Address</span> : {userData.address}<br />
                                                  <span className="font-bold">Phone Number</span> : {userData.phoneNumber}<br />
                                                  <span className="font-bold">Email</span> : {userData.email}<br />
                                             </div>
                                        </div>
                                   </div>
                              }
                              <Gap height={40} />
                              <hr />
                              <Gap height={40} />
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
                                   <div className="col-span-1">
                                        <div className="card-shadow px-8 py-6">
                                             <div className="grid grid-cols-12 gap-7 items-center">
                                                  <div className="col-span-4">
                                                       <Image src="/assets/images/consultIllust.png" layout="responsive" width={1} height={1} />
                                                  </div>
                                                  <div className="col-span-8">
                                                       <h1 className="text-blue-1 text-size-1 font-bold">12</h1>
                                                       <p className="text-size-6 text-gray-1">Upcoming Consultation</p>
                                                       <Gap height={15} />
                                                       <Button type={1} title="Go to Consultation" />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col-span-1">
                                        <div className="card-shadow px-8 py-6">
                                             <div className="grid grid-cols-12 gap-7 items-center">
                                                  <div className="col-span-4">
                                                       <Image src="/assets/images/meditationIllust.png" layout="responsive" width={1} height={1} />
                                                  </div>
                                                  <div className="col-span-8">
                                                       <h1 className="text-blue-1 text-size-1 font-bold">1</h1>
                                                       <p className="text-size-6 text-gray-1">On-going Meditation</p>
                                                       <Gap height={15} />
                                                       <Button type={1} title="Go to Meditation" />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col-span-1">
                                        <div className="card-shadow px-8 py-6">
                                             <div className="grid grid-cols-12 gap-7 items-center">
                                                  <div className="col-span-8">
                                                       <h1 className="text-blue-1 text-size-1 font-bold">2</h1>
                                                       <p className="text-size-6 text-gray-1">Quotes Published</p>
                                                       <Gap height={15} />
                                                  </div>
                                                  <div className="col-span-4">
                                                       <Button type={2} title="My Quotes" isFull />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col-span-1">
                                        <div className="card-shadow px-8 py-6">
                                             <div className="grid grid-cols-12 gap-7 items-center">
                                                  <div className="col-span-8">
                                                       <h1 className="text-blue-1 text-size-1 font-bold">3</h1>
                                                       <p className="text-size-6 text-gray-1">Articles Published</p>
                                                       <Gap height={15} />
                                                  </div>
                                                  <div className="col-span-4">
                                                       <Button type={2} title="My Articles" isFull />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default Profile;
