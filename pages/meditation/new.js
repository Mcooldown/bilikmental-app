import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Select from "../../components/atoms/Select";
import Pagination from "../../components/atoms/Pagination";
import Gap from "../../components/atoms/Gap";
import Loader from "../../components/atoms/Loader";
import Layout from "../../components/Layout";
import SubPageCard from "../../components/molecules/SubPageCard";
import styles from "../../styles/SubPage.module.css";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import MeditationCard from "../../components/molecules/MeditationCard";

const NewMeditation = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [isLoading, setIsLoading] = useState(true);
     const [userName, setUserName] = useState('');
     const [userId, setUserId] = useState(null);

     const dashboardOptions = [
          "Profile","Consultation","Meditation","My Quotes", "My Articles"
     ];

     const [meditations, setMeditations] = useState(null);
     const perPageOptions = [10,20,40];
     
     const [perPage, setPerPage] = useState(10);
     const [currentPage, setCurrentPage] = useState(1);

     const [params, setParams] = useState({
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

          const perPageValue = type === "perPage" ? value : perPage;
          const currentPageValue = type === "currentPage" ? value : type === "perPage" ? 1 :currentPage;

          setParams({
               currentPage: currentPageValue,
               perPage: perPageValue,
          });
     }

     const fetchMeditations = async (signal) => {
          try {
               const url = urlAPI + '/v1/meditations';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         params: params
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setMeditations(json);
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
               setUserId(localStorage.getItem('userId'));
               setUserName(localStorage.getItem('userName'));
               setIsLoading(true);
               fetchMeditations(abortCont.signal)
               .then(() => {
                    setIsLoading(false);
               });
          }

          return () => abortCont.abort();
     }, [params]);

     const enrollMeditation = async (meditationId) => {

          setIsLoading(true);
          const abortCont = new AbortController();
          try {
               const url = urlAPI + '/v1/meditations/user/add';
               const options = {
                    signal: abortCont.signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         userId: userId,
                         meditationId: meditationId,
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Submit error");
               }else{
                    Swal.fire({ icon: 'success', title: 'Success', text: 'New Meditation Enrolled', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, })
                    .then(() => {
                         setIsLoading(false);
                         router.push('/meditation/my');
                    });
               }
          } catch (error) {
               setIsLoading(false);
               console.log(error);
          }

          return () => abortCont.abort();
     }

     return (
          <Layout pageTitle="New Meditation">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12"> 
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Welcome, {userName ? userName : ''}</h1>
                              <Gap height={20} />
                              <SubPageCard options={dashboardOptions} selectedOption={"Meditation"} handleSetOption={(option) => handleSetOption(option)} />
                              <Gap height={40} />
                              <div className="flex justify-between items-center">
                                   <h1 className="text-size-3 font-bold">New Meditation</h1>
                                   <div className="inline-flex items-center cursor-pointer" onClick={() => router.push('/meditation/my')}>
                                        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" className="text-gray-1 mr-3" />
                                        <span className="text-gray-1">Back to Meditation</span>
                                   </div>
                              </div>
                              <Gap height={10} />
                              <hr />
                              <Gap height={20} />
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
                                   <h5 className="m-0 text-dark-1">meditations</h5>
                              </div>
                              <Gap height={40} />
                              {
                                   !isLoading ?
                                   <Fragment>
                                        {
                                             meditations && meditations.data.length > 0 ?
                                             meditations.data.map(meditation => {
                                                  return (
                                                       <Fragment>
                                                            <MeditationCard id={meditation._id} name={meditation.name} description={meditation.description} image={meditation.image}
                                                            videoProvided={meditation.withVideo} time={meditation.duration + " " + meditation.durationType} onClick={() => enrollMeditation(meditation._id)} />
                                                            
                                                            <Gap height={30} />
                                                       </Fragment>
                                                  )                                             
                                             })
                                             :
                                             <p>No result found.</p>
                                        }
                                        <Gap height={50} />
                                   </Fragment>
                                   :
                                   <Fragment>
                                        <Loader />
                                        <Gap height={50} />
                                   </Fragment>
                              }
                              {
                                   meditations &&
                                   <Pagination currentPage={currentPage} totalPage={meditations.total_page} handleSetCurrentPage={(page) => handleSetCurrentPage(page)} />
                              }
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default NewMeditation;