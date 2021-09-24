import router from "next/router";
import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ConsultationCard from "../../components/molecules/ConsultationCard";

const Consultation = () => {
     return (
          <Layout pageTitle="Consultation">
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
                                   <Button type={2} title="Consultation" onClick={() => router.push('/consultation')} />
                                   <Gap width={10} />
                                   <Button type={1} title="Meditation" onClick={() => router.push('/meditation')} />
                                   <Gap width={10} />
                                   <Button type={1} title="My Quotes" />
                                   <Gap width={10} />
                                   <Button type={1} title="My Articles" />
                              </div>
                              <Gap height={40} />
                              <div className="flex justify-between items-center">
                                   <h1 className="text-size-3 font-bold">Consultation</h1>
                                   <Button type={2} onClick={() => router.push('/consultation/new')}>
                                        <FontAwesomeIcon icon={faPlus} size="lg" className="text-white mr-3" />
                                        <span className="text-white">New Consultation</span>
                                   </Button>
                              </div>
                              <Gap height={10} />
                              <hr />
                              <Gap height={40} />
                              <ConsultationCard name="Cheon Soo Ryeon" description="Psychiatrist at Cheong B Medical Center" status={0}
                                   date="Saturday, 18 September 2021" shift="18:00 - 20:00" onCancel={() => alert('Canceled')} />
                              <Gap height={20} />
                              <ConsultationCard image="/assets/images/articleSample.jpeg" name="Claudio Richard" description="Therapist at Patah Hati Foundation" status={1}
                                   date="Saturday, 17 September 2021" shift="18:00 - 20:00" />
                              <Gap height={20} />
                              <ConsultationCard name="Cheon Soo Ryeon" description="Psychiatrist at Cheong B Medical Center" status={-1}
                                   date="Saturday, 16 September 2021" shift="18:00 - 20:00" />
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default Consultation;
