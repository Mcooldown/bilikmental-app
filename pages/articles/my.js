import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Select from "../../components/atoms/Select";
import Pagination from "../../components/atoms/Pagination";
import Gap from "../../components/atoms/Gap";
import Loader from "../../components/atoms/Loader";
import Layout from "../../components/Layout";
import SubPageCard from "../../components/molecules/SubPageCard";
import styles from "../../styles/SubPage.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/atoms/Button";
import ArticleCard from "../../components/molecules/ArticleCard";

const UserArticles = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [isLoading, setIsLoading] = useState(true);
     const [userName, setUserName] = useState('');

     const dashboardOptions = [
          "Profile","Consultation","Meditation","My Quotes", "My Articles"
     ];

     const [articles, setArticles] = useState(null);
     const perPageOptions = [10,20,40];
     
     const [perPage, setPerPage] = useState(10);
     const [currentPage, setCurrentPage] = useState(1);

     const [params, setParams] = useState({
          userId: null,
          category: "All",
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
          if (window !== undefined) {
               // browser code
               window.scrollTo(0,0);
          }
     }

     const handleSetOption = (value) => {
          if(value === "Profile") router.push('/profile');
          else if(value === "Consultation") router.push('/consultation/my');
          else if(value === "Meditation") router.push('/meditation/my');
          else if(value === "My Quotes") router.push('/quotes/my');
          else if(value === "My Articles") router.push('/articles/my');
     }

     const handleSetParams = (type, value) => {

          const userId = type === "userId" ? value : localStorage.getItem('userId');
          const perPageValue = type === "perPage" ? value : perPage;
          const currentPageValue = type === "currentPage" ? value : type === "perPage" ? 1 :currentPage;

          setParams({
               userId: userId,
               category: "All",
               currentPage: currentPageValue,
               perPage: perPageValue,
          });
     }

     const fetchData = async (signal, userId) => {
          try {
               const url = urlAPI + '/v1/articles/user';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         params: params,
                         userId: userId
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

     useEffect(() => {
          const userId = localStorage.getItem('userId');
          const abortCont = new AbortController();
     
          if (!userId) {
               Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Please login first', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
               router.push('/login');
          } else {
               setUserName(localStorage.getItem('userName'));
               setIsLoading(true);
               fetchData(abortCont.signal, userId)
               .then(() => {
                    setIsLoading(false);
               });
          }

          return () => abortCont.abort();
     }, [params]);

     return (
          <Layout pageTitle="My Articles">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Welcome, {userName ? userName : ''}</h1>
                              <Gap height={20} />
                              <SubPageCard options={dashboardOptions} selectedOption={"My Articles"} handleSetOption={(option) => handleSetOption(option)} />
                              <Gap height={40} />
                              <div className="flex justify-between items-center">
                                   <h1 className="text-size-3 font-bold">My Articles</h1>
                                   <Button type={2} onClick={() => router.push('/articles/new')}>
                                        <FontAwesomeIcon icon={faPlus} size="lg" className="text-white mr-3" />
                                        <span className="text-white">Publish New Article</span>
                                   </Button>
                              </div>
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

export default UserArticles;
