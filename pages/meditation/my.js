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
import Swal from "sweetalert2";
import UserMeditationCard from "../../components/molecules/UserMeditationCard";

const UserMeditation = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [isLoading, setIsLoading] = useState(true);
     const [userId, setUserId] = useState('');
     const [userName, setUserName] = useState('');

     const dashboardOptions = [
          "Profile","Consultation","Meditation","My Quotes", "My Articles"
     ];

     const [userMeditations, setuserMeditations] = useState(null);
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

     const fetchData = async (signal, userId) => {
          try {
               const url = urlAPI + '/v1/meditations/user';
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
                    setuserMeditations(json);
               }
          } catch (error) {
               console.log(error);
          }
     }

     const cancelMeditation = async (userMeditationId, signal) => {

          try {
               const url = urlAPI + '/v1/meditations/user/delete';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         userMeditationId: userMeditationId,
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

     const handleCancelMeditation = (userMeditationId) => {

          const abortCont = new AbortController();
          
          Swal.fire({
               title: 'Do you want to cancel this meditation?',
               showCancelButton: true,
               confirmButtonColor: '#278AFF',
               cancelButtonColor: "red",
               confirmButtonText: 'Yes',
               }).then((result) => {
               if (result.isConfirmed) {

                    cancelMeditation(userMeditationId, abortCont.signal).then(() => {
                         fetchData(userId, abortCont.signal).then(() => {
                              Swal.fire({ icon: 'success', title: 'Success', text: 'Meditation canceled', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });

                         })
                    })
               }
          });

          return () => abortCont.abort();
     }

     return (
          <Layout pageTitle="Meditation">
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
                                   <h1 className="text-size-3 font-bold">My Meditation</h1>
                                   <Button type={2} onClick={() => router.push('/meditation/new')}>
                                        <FontAwesomeIcon icon={faPlus} size="lg" className="text-white mr-3" />
                                        <span className="text-white">New Meditation</span>
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
                                   <h5 className="m-0 text-dark-1">meditations</h5>
                              </div>
                              <Gap height={40} />
                              {
                                   !isLoading ?
                                   <Fragment>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-start">
                                             {
                                                  userMeditations && userMeditations.data.length > 0 ?
                                                       userMeditations.data.map(userMeditation => {
                                                            return (
                                                            <div className="col-span-1" key={userMeditation._id}>
                                                                 <UserMeditationCard id={userMeditation._id} title={userMeditation.meditation.name} 
                                                                 progress={(Math.round((userMeditation.currentStep-1)*100/userMeditation.totalStep))}
                                                                 image={userMeditation.meditation.image}
                                                                 enrolledAt={userMeditation.createdAt}
                                                                 onClick={() => router.push('/meditation/' + userMeditation._id)}
                                                                 onCancel={() => handleCancelMeditation(userMeditation._id)} />
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
                                   userMeditations &&
                                   <Pagination currentPage={currentPage} totalPage={userMeditations.total_page} handleSetCurrentPage={(page) => handleSetCurrentPage(page)} />
                              }
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default UserMeditation
