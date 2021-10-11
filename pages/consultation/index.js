import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Select from "../../components/atoms/Select";
import Pagination from "../../components/atoms/Pagination";
import Gap from "../../components/atoms/Gap";
import Loader from "../../components/atoms/Loader";
import Layout from "../../components/Layout";
import ConsultationCard from "../../components/molecules/ConsultationCard";
import SubPageCard from "../../components/molecules/SubPageCard";
import styles from "../../styles/SubPage.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/atoms/Button";
import Swal from "sweetalert2";

const UserConsultation = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [isLoading, setIsLoading] = useState(true);
     const [userId, setUserId] = useState('');
     const [userName, setUserName] = useState('');

     const dashboardOptions = [
          "Profile","Consultation","Meditation","My Quotes", "My Articles"
     ];

     const [consultations, setConsultations] = useState(null);
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
          else if(value === "Consultation") router.push('/consultation');
          else if(value === "Meditation") router.push('/meditation');
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

     const fetchData = async (signal, userId) => {
          try {
               const url = urlAPI + '/v1/consultations/user';
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
                    setConsultations(json);
               }
          } catch (error) {
               console.log(error);
          }
     }

     const cancelConsultation = async (consultationId, signal) => {

          try {
               const url = urlAPI + '/v1/consultations/delete';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         consultationId: consultationId
                    })
               };
               const res = await fetch(url, options);
               if(!res.ok){
                    throw Error("Data not deleted");
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
               setUserId(userId);
               setUserName(localStorage.getItem('userName'));
               setIsLoading(true);
               fetchData(abortCont.signal, userId)
               .then(() => {
                    setIsLoading(false);
               });
          }

          return () => abortCont.abort();
     }, [params]);

     const handleCancelConsultation = (consultantId) => {

          const abortCont = new AbortController();

          Swal.fire({
               title: 'Do you want to cancel the consultation',
               showCancelButton: true,
               confirmButtonColor: '#278AFF',
               cancelButtonColor: "red",
               confirmButtonText: 'Yes',
               }).then((result) => {
               if (result.isConfirmed) {

                    cancelConsultation(consultantId, abortCont.signal).then(() => {
                         fetchData(userId, abortCont.signal).then(() => {
                              Swal.fire({ icon: 'success', title: 'Success', text: 'Consultation canceled', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });

                         })
                    })
               }
          });

          return () => abortCont.abort();
     }

     return (
          <Layout pageTitle="Consultation">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Welcome, {userName ? userName : ''}</h1>
                              <Gap height={20} />
                              <SubPageCard options={dashboardOptions} selectedOption={"Consultation"} handleSetOption={(option) => handleSetOption(option)} />
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
                                   <h5 className="m-0 text-dark-1">quotes</h5>
                              </div>
                              <Gap height={40} />
                              {
                                   !isLoading ?
                                   <Fragment>
                                        {
                                             consultations && consultations.data.length > 0 ?
                                             consultations.data.map(consultation => {
                                                  return (
                                                       <Fragment key={consultation._id}>
                                                            <ConsultationCard image={consultation.consultant.photo} name={consultation.consultant.name} description={consultation.consultant.description ? consultation.consultant.description : "No description"} 
                                                            status={consultation.status}
                                                                 date={new Date(consultation.date).toLocaleString('en-US',{day: "numeric", month:"long", year:"numeric"})} shift={consultation.shift} onCancel={() => handleCancelConsultation(consultation._id)} />
                                                            <Gap height={20} />
                                                       </Fragment>
                                                  )                                             
                                             })
                                             :
                                             <p>No result found.</p>
                                        }
                                        <Gap height={20} />
                                   </Fragment>
                                   :
                                   <Fragment>
                                        <Loader />
                                        <Gap height={50} />
                                   </Fragment>
                              }
                              {
                                   consultations &&
                                   <Pagination currentPage={currentPage} totalPage={consultations.total_page} handleSetCurrentPage={(page) => handleSetCurrentPage(page)} />
                              }
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default UserConsultation
