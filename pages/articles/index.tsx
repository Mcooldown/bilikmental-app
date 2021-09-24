import router from "next/router";
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
                              <h1 className="text-size-2 font-bold text-white">Articles</h1>
                              <Gap height={20} />
                              <div className="card-shadow px-6 py-8 flex">
                                   <Button type={2} title="All" />
                                   <Gap width={10} />
                                   <Button type={1} title="Mood Disorders" />
                                   <Gap width={10} />
                                   <Button type={1} title="Anxiety Disorders" />
                                   <Gap width={10} />
                                   <Button type={1} title="Personality Disorders" />
                                   <Gap width={10} />
                                   <Button type={1} title="Psychotic Disorders" />
                                   <Gap width={10} />
                                   <Button type={1} title="Eating Disorders" />
                                   <Gap width={10} />
                                   <Button type={1} title="Trauma-Related Disorders" />
                                   <Gap width={10} />
                                   <Button type={1} title="Substance Abuse Disorders" />
                              </div>
                              <Gap height={40} />
                              <h1 className="text-size-3 font-bold">Category: All</h1>
                              <Gap height={10} />
                              <hr />
                              <Gap height={15} />
                              <div className="flex items-center">
                                   <h5 className="m-0 text-dark-1">Show</h5>
                                   <Gap width={10} />
                                   {/* <Select
                                        width={100}
                                        options={perPageOptions}
                                        defaultValue={perPage}
                                        value={perPage}
                                        onChange={(e) => { setPerPage(e.target.value); setCounter(1) }}
                                   /> */}
                                   <Gap width={10} />
                                   <h5 className="m-0 text-dark-1">articles</h5>
                              </div>
                              <Gap height={40} />
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-start">
                                   <div className="col-span-1">
                                        <ArticleCard id="1" title="3 Steps to encourage
                                        yourself while in down situation" author="Vincent Hadinata" date="09-09-2021"
                                             onClick={() => router.push('/articles/detail')} />
                                   </div>
                                   <div className="col-span-1">
                                        <ArticleCard id="2" title="Feel insecure to the others? Do these things to overcome it" author="Vincent" date="09-09-2021" />
                                   </div>
                                   <div className="col-span-1">
                                        <ArticleCard id="3" title="10 tips to make your life better" author="Vincent" date="09-09-2021" />
                                   </div>
                              </div>
                              <Gap height={120} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default Articles;
