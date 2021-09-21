import router from "next/router";
import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import QuoteCard from "../../components/molecules/QuoteCard";
import styles from "../../styles/SubPage.module.css";

const Quotes = () => {
     return (
          <Layout pageTitle="Quotes">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className={styles.title}>Quotes</h1>
                              <Gap height={20} width={0} />
                              <div className={styles.cardContent + " flex"}>
                                   <Button type={2} title="All" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Achievement" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Self Improvement" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Extrinsic" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Fear" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Investment" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Social" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Behaviour" onClick={() => { }} isFull={false} />
                              </div>
                              <Gap height={20} width={0} />
                              <h1 className={styles.titleSub}>Category: All</h1>
                              <Gap height={10} width={0} />
                              <hr />
                              <Gap height={15} width={0} />
                              <div className="flex items-center">
                                   <h5 className="m-0 text-dark-1">Show</h5>
                                   <Gap width={10} height={0} />
                                   {/* <Select
                                        width={100}
                                        options={perPageOptions}
                                        defaultValue={perPage}
                                        value={perPage}
                                        onChange={(e) => { setPerPage(e.target.value); setCounter(1) }}
                                   /> */}
                                   <Gap width={10} height={0} />
                                   <h5 className="m-0 text-dark-1">quotes</h5>
                              </div>
                              <Gap height={40} width={0} />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                                   <div className="col-span-1">
                                        <QuoteCard onClick={() => router.push('/quotes/detail')} id="1" quote="Don’t stop when you’re tired. Stop when you’re done." author="Wesley Snipes" />
                                   </div>
                                   <div className="col-span-1">
                                        <QuoteCard id="2" quote="Your time is limited, so don’t waste it living someone els..." author="Steve Jobs" />
                                   </div>
                                   <div className="col-span-1">
                                        <QuoteCard id="3" quote="People begin to become successful the minute they are bla bla bla bla" author="Harvey Mackay" />
                                   </div>
                                   <div className="col-span-1">
                                        <QuoteCard id="4" quote="Don’t count the days, make the days count." author="Muhammad Ali" />
                                   </div>
                              </div>
                              <Gap height={120} width={0} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default Quotes
