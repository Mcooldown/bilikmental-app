import router from "next/router";
import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Meditation = () => {
     return (
          <Layout pageTitle="Meditation">
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
                                   <Button type={1} title="Consultation" onClick={() => router.push('/consultation')} />
                                   <Gap width={10} />
                                   <Button type={2} title="Meditation" onClick={() => router.push('/meditation')} />
                                   <Gap width={10} />
                                   <Button type={1} title="My Quotes" />
                                   <Gap width={10} />
                                   <Button type={1} title="My Articles" />
                              </div>
                              <Gap height={40} />
                              <div className="flex justify-between items-center">
                                   <h1 className="text-size-3 font-bold">Meditation</h1>
                                   <Button type={2} onClick={() => router.push('/meditation/new')}>
                                        <FontAwesomeIcon icon={faPlus} size="lg" className="text-white mr-3" />
                                        <span className="text-white">New Meditation</span>
                                   </Button>
                              </div>
                              <Gap height={10} />
                              <hr />
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default Meditation;
