import router from "next/router";
import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
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
                              <div className="grid grid-cols-2 gap-10">
                                   <div className="col-span-1">
                                        <ConsultantCard id="1" name="Cheon Soo Ryeon" description="Psychiatrist at Cheong B Medical Center" />
                                   </div>
                                   <div className="col-span-1">
                                        <p className="text-gray-1 text-size-6 font-bold">Select your preferred schedule</p>
                                        <Gap height={20} />
                                        <Input type="date" label="Date" id="date" name="date" isFull />
                                        <Gap height={20} />
                                        <Select label="Available Shifts" defaultValue="" id="shift" name="shift" isFull options={["08:00 - 10:00", "10:00 - 12:00", "13:00 - 15:00", "15:00 - 17:00", "19:00 - 21:00"]} />
                                   </div>

                              </div>
                              <Gap height={40} />
                              <hr />
                              <Gap height={20} />
                              <div className="flex justify-end">
                                   <Button type={2} title="Book New Consultation" onClick={() => router.push('/consultation')} />
                              </div>
                              <Gap height={120} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default NewConsultation;
