import router from "next/router";
import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import Image from "next/image";

const Profile = () => {
     return (
          <Layout pageTitle="Profile">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Welcome, Vincent Hadinata</h1>
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
                              <div className="grid grid-cols-12 gap-7 items-start">
                                   <div className="col-span-12 lg:col-span-3">
                                        <img src="/assets/images/commentSample.jpg" className="rounded-full w-60 h-60" alt="imageComment" />
                                   </div>
                                   <div className="col-span-12 lg:col-span-9">
                                        <h1 className="text-size-4 font-bold text-blue-1">
                                             Vincent Hadinata
                                        </h1>
                                        <Gap height={15} />
                                        <div className="text-gray-1 text-size-6">
                                             <span className="font-bold">Gender</span> : Male<br />
                                             <span className="font-bold">Date of Birth</span> : 1 August 2021<br />
                                             <span className="font-bold">Address</span> : Jl. Sama kamu No.37, Kelapa Tiga, Jakarta Selatan, DKI Jakarta 20293<br />
                                             <span className="font-bold">Phone Number</span> : 62 822 9392 0547<br />
                                             <span className="font-bold">Email</span> : vincenthadinata00@gmail.com<br />
                                        </div>
                                   </div>
                              </div>
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
