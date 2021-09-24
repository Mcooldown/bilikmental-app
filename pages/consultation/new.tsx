import router from "next/router";
import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import ConsultantCard from "../../components/molecules/ConsultantCard";

const NewConsultation = () => {
     return (
          <Layout pageTitle="New Consultation">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Welcome, Vincent Hadinata</h1>
                              <Gap height={20} />
                              <div className="card-shadow px-6 py-8 flex">
                                   <Button type={1} title="Profile" onClick={() => router.push('/profile')} />
                                   <Gap width={10} />
                                   <Button type={2} title="Consultation" onClick={() => router.push('/NewConsultation')} />
                                   <Gap width={10} />
                                   <Button type={1} title="Meditation" onClick={() => router.push('/meditation')} />
                                   <Gap width={10} />
                                   <Button type={1} title="My Quotes" />
                                   <Gap width={10} />
                                   <Button type={1} title="My Articles" />
                              </div>
                              <Gap height={40} />
                              <div className="flex justify-between items-center">
                                   <h1 className="text-size-3 font-bold">New Consultation</h1>
                                   <div className="inline-flex items-center cursor-pointer" onClick={() => router.push('/consultation')}>
                                        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" className="text-gray-1 mr-3" />
                                        <span className="text-gray-1">Back to Consultation</span>
                                   </div>
                              </div>
                              <Gap height={10} />
                              <hr />
                              <Gap height={20} />
                              <p className="text-gray-1 text-size-6 font-bold">Select your consultant first</p>
                              <Gap height={30} />
                              <div className="grid grid-cols-2 gap-7">
                                   <div className="col-span-1">
                                        <ConsultantCard clickable id="1" name="Cheon Soo Ryeon" description="Psychiatrist at Cheong B Medical Center" onClick={() => router.push('/consultation/form')} />
                                   </div>
                                   <div className="col-span-1">
                                        <ConsultantCard clickable id="2" name="Claudio Richard" description="Therapist at Patah Hati Foundation" onClick={() => router.push('/consultation/form')} />
                                   </div>
                                   <div className="col-span-1">
                                        <ConsultantCard clickable id="3" name="Nam Do San" onClick={() => router.push('/consultation/form')} />
                                   </div>
                              </div>
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default NewConsultation;
