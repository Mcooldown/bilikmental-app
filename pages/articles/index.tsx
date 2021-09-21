import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Input from "../../components/atoms/Input";
import Layout from "../../components/Layout";
import ArticleCard from "../../components/molecules/ArticleCard";
import QuoteCard from "../../components/molecules/QuoteCard";
import styles from "../../styles/SubPage.module.css";

const Articles = () => {
     return (
          <Layout pageTitle="Articles">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className={styles.title}>Articles</h1>
                              <Gap height={20} width={0} />
                              <div className={styles.cardContent + " flex"}>
                                   <Button type={2} title="All" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Mood Disorders" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Anxiety Disorders" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Personality Disorders" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Psychotic Disorders" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Eating Disorders" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Trauma-Related Disorders" onClick={() => { }} isFull={false} />
                                   <Gap height={0} width={10} />
                                   <Button type={1} title="Substance Abuse Disorders" onClick={() => { }} isFull={false} />
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
                                   <h5 className="m-0 text-dark-1">articles</h5>
                              </div>
                              <Gap height={40} width={0} />
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-start">
                                   <div className="col-span-1">
                                        <ArticleCard id="1" title="3 Steps to encourage
                                        yourself while in down situation" author="Vincent Hadinata" date="09-09-2021" />
                                   </div>
                                   <div className="col-span-1">
                                        <ArticleCard id="2" title="Feel insecure to the others? Do these things to overcome it" author="Vincent" date="09-09-2021" />
                                   </div>
                                   <div className="col-span-1">
                                        <ArticleCard id="3" title="10 tips to make your life better" author="Vincent" date="09-09-2021" />
                                   </div>
                              </div>
                              <Gap height={120} width={0} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default Articles;
