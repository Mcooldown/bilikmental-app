import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Select from "../../components/atoms/Select";
import Pagination from "../../components/atoms/Pagination";
import Gap from "../../components/atoms/Gap";
import Loader from "../../components/atoms/Loader";
import Layout from "../../components/Layout";
import QuoteCard from "../../components/molecules/QuoteCard";
import SubPageCard from "../../components/molecules/SubPageCard";
import styles from "../../styles/SubPage.module.css";

const Quotes = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [isLoading, setIsLoading] = useState(true);

     const categoryOptions = [
          "All","Achievement","Self Improvement","Extrinsic", "Fear", "Investment", "Social", "Behavior"
     ];

     const [quotes, setQuotes] = useState(null);
     const perPageOptions = [2,4,8,12,16];
     
     const [category, setCategory] = useState("All");
     const [perPage, setPerPage] = useState(2);
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
                    const url = urlAPI + '/v1/quotes';
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
                         setQuotes(json);
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
          <Layout pageTitle="Quotes">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Quotes</h1>
                              <Gap height={20} />
                              <SubPageCard options={categoryOptions} selectedOption={category} handleSetCategory={(option) => handleSetCategory(option)} />
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
                                   />
                                   <Gap width={10} />
                                   <h5 className="m-0 text-dark-1">quotes</h5>
                              </div>
                              <Gap height={40} />
                              {
                                   quotes && !isLoading ?
                                   <Fragment>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                                             {
                                                  quotes.data.length > 0 ?
                                                  quotes.data.map(quote => {
                                                       return (
                                                            <div className="col-span-1" key={quote._id}>
                                                                 <QuoteCard onClick={() => router.push(`/quotes/${quote._id}`)} id={quote._id} quote={quote.text} author={quote.user.name.first + " " + quote.user.name.last} />
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
                                   quotes &&
                                   <Pagination currentPage={currentPage} totalPage={quotes.total_page} handleSetCurrentPage={(page) => handleSetCurrentPage(page)} />
                              }
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default Quotes
