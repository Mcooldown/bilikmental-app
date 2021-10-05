import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Select from "../../components/atoms/Select";
import Pagination from "../../components/atoms/Pagination";
import Gap from "../../components/atoms/Gap";
import Loader from "../../components/atoms/Loader";
import Layout from "../../components/Layout";
import SubPageCard from "../../components/molecules/SubPageCard";
import styles from "../../styles/SubPage.module.css";
import ArticleCard from "../../components/molecules/ArticleCard";

const Articles = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [isLoading, setIsLoading] = useState(true);

     const categoryOptions = [
          "All","Mood Disorders","Anxiety Disorders","Personality Disorders", "Psychotic Disorders", "Eating Disorders",
           "Trauma-related Disorders", "Substance Abuse Disorders"
     ];

     const [articles, setArticles] = useState(null);
     const perPageOptions = [10,20,40];
     
     const [category, setCategory] = useState("All");
     const [perPage, setPerPage] = useState(10);
     const [currentPage, setCurrentPage] = useState(1);

     const [params, setParams] = useState({
          category: category,
          currentPage: currentPage,
          perPage: perPage,
     });

     const handleSetPerPage = (value) => {
          setPerPage(value);
          setCurrentPage(1);
          handleSetParams("perPage", value);
     }
     
     const handleSetCurrentPage = (value) => {
          setCurrentPage(value);
          handleSetParams("currentPage", value);
          window.scrollTo(0,0);
     }

     const handleSetCategory = (value) => {
          setCategory(value);
          handleSetParams("category", value);
     }

     const handleSetParams = (type, value) => {

          const categoryValue  = type === "category" ? value : category;
          const perPageValue = type === "perPage" ? value : perPage;
          const currentPageValue = type === "currentPage" ? value : type === "perPage" ? 1 :currentPage;

          setParams({
               category: categoryValue,
               currentPage: currentPageValue,
               perPage: perPageValue,
          });
     }

     useEffect(() => {
          const abortCont = new AbortController();
          
          const fetchData = async () => {
               try {
                    const url = urlAPI + '/v1/articles';
                    const options = {
                         signal: abortCont.signal,
                         method: "POST",
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({
                              params: params,
                         })
                    };
                    const res = await fetch(url, options);

                    if(!res.ok){
                         throw Error("Data not fetched");
                    }else{
                         const json = await res.json();
                         setArticles(json);
                    }
               } catch (error) {
                    console.log(error);
               }
          }
          setIsLoading(true);
          fetchData().then(() => {
               setIsLoading(false);
          });

          return () => abortCont.abort();
     }, [params]);

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
                              <SubPageCard options={categoryOptions} selectedOption={category} handleSetOption={(option) => handleSetCategory(option)} />
                              <Gap height={40} />
                              <h1 className="text-size-3 font-bold">Category: {category}</h1>
                              <Gap height={10} />
                              <hr />
                              <Gap height={15} />
                              <div className="flex items-center">
                                   <h5 className="m-0 text-dark-1">Show</h5>
                                   <Gap width={10} />
                                   <Select
                                        width={60}
                                        options={perPageOptions}
                                        defaultValue={perPage}
                                        value={perPage}
                                        onChange={(e) => handleSetPerPage(e.target.value)}
                                        withoutChoose
                                   />
                                   <Gap width={10} />
                                   <h5 className="m-0 text-dark-1">articles</h5>
                              </div>
                              <Gap height={40} />
                              {
                                   !isLoading ?
                                   <Fragment>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                                             {
                                                  articles && articles.data.length > 0 ?
                                                  articles.data.map(article => {
                                                       return (
                                                            <div className="col-span-1" key={article._id}>
                                                                 <ArticleCard id={article._id} title={article.title} author={article.user.name.first + " " + article.user.name.last} date={new Date(article.createdAt).toLocaleString('en-US',{day:"numeric", month:"long", year:"numeric"})}
                                                                      onClick={() => router.push('/articles/' + article._id)} category={article.category} isConfirmed={article.isConfirmed}
                                                                      image={article.image} />
                                                            </div>
                                                       )                                             
                                                  })
                                                  :
                                                  <p>No result found.</p>
                                             }
                                        </div>
                                        <Gap height={50} />
                                   </Fragment>
                                   :
                                   <Fragment>
                                        <Loader />
                                        <Gap height={50} />
                                   </Fragment>
                              }
                              {
                                   articles &&
                                   <Pagination currentPage={currentPage} totalPage={articles.total_page} handleSetCurrentPage={(page) => handleSetCurrentPage(page)} />
                              }
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default Articles
