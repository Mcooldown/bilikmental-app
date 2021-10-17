import { useRouter } from "next/router";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import MeditationStepCard from "../../components/molecules/MeditationStepCard";
import { Fragment, useEffect, useState } from "react";
import SubPageCard from "../../components/molecules/SubPageCard";
import Loader from "../../components/atoms/Loader";
import Swal from "sweetalert2";

const MeditationDetail = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";
     
     const dashboardOptions = [
          "Profile","Consultation","Meditation","My Quotes", "My Articles"
     ];
     const [userMeditation, setUserMeditation] = useState(null);
     const [meditationSteps, setMeditationSteps] = useState(null);
     const [isLoading, setIsLoading] = useState(null);
     const [userId, setUserId] = useState('');
     const [userName, setUserName] = useState('');
     const [meditationId, setMeditationId] = useState('');
     const [buttonLoading, setButtonLoading] = useState(false);
     const router = useRouter();

     const handleSetOption = (value) => {
          if(value === "Profile") router.push('/profile');
          else if(value === "Consultation") router.push('/consultation/my');
          else if(value === "Meditation") router.push('/meditation/my');
          else if(value === "My Quotes") router.push('/quotes/my');
          else if(value === "My Articles") router.push('/articles/my');
     }

     const fetchUserMeditation = async (signal) => {

          try {
               const url = urlAPI + '/v1/meditations/user/get-by-id';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         userMeditationId: router.query.id,
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setUserMeditation(json.data);
                    return setMeditationId(json.data.meditation._id);
               }
          } catch (error) {
               console.log(error);
          }
     }

     const fetchMeditationSteps = async (signal) => {
          try {
               const url = urlAPI + '/v1/meditations/steps';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         meditationId: meditationId,
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setMeditationSteps(json.data);
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
               
               if(router.query.id){
                    fetchUserMeditation(abortCont.signal)
                    .then(() => {
                         fetchMeditationSteps(abortCont.signal)
                         .then(() => {
                              setIsLoading(false);
                         })
                    });
               }
          }

          return () => abortCont.abort();
     }, [router, meditationId]);

     const changeStep = async (signal) => {
          try {
               const url = urlAPI + '/v1/meditations/steps/change';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         userMeditationId: userMeditation._id,
                         step: userMeditation.currentStep+1,
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    Swal.fire({ icon: 'success', title: 'Success', text: ('Step ' + userMeditation.currentStep + " Completed"), confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, })
                    fetchUserMeditation(signal);
               }
          } catch (error) {
               console.log(error);
          }
     }

     const handleDone = () => {
          const abortCont = new AbortController();

          setIsLoading(true);
          changeStep(abortCont.signal)
          .then(() => {
               setIsLoading(false);
          });

          return () => abortCont.abort();
     }

     return (
          <Layout pageTitle="Meditation Detail">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Welcome, Vincent Hadinata</h1>
                              <Gap height={20} />
                              <SubPageCard options={dashboardOptions} selectedOption={"Meditation"} handleSetOption={(option) => handleSetOption(option)} />
                              <Gap height={40} />
                              <div className="flex justify-between items-center">
                                   <h1 className="text-size-3 font-bold">Meditation: Love Meditation</h1>
                                   <div className="inline-flex items-center cursor-pointer" onClick={() => router.push('/meditation/my')}>
                                        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" className="text-gray-1 mr-3" />
                                        <span className="text-gray-1">Back to Meditation</span>
                                   </div>
                              </div>
                              <Gap height={10} />
                              <hr />
                              <Gap height={40} />
                              {
                                   !isLoading && meditationSteps ?
                                   <Fragment>
                                        {
                                             meditationSteps.map((meditationStep) => {
                                                  return (
                                                       <Fragment key={meditationStep._id}>
                                                            <MeditationStepCard step={meditationStep.step} key={meditationStep._id}
                                                            status={userMeditation.currentStep < meditationStep.step ?  3  
                                                            : userMeditation.currentStep === meditationStep.step ? 2 : 1} name={meditationStep.name}
                                                            video={meditationStep.video} resourceFile={meditationStep.resourceFile} onDone={handleDone} />
                                                            <Gap height={20} />
                                                       </Fragment>
                                                  )   
                                             })
                                        }
                                        {
                                             userMeditation.currentStep > userMeditation.totalStep &&
                                             <Fragment>
                                                  <Gap height={20} />
                                                  <h1 className="text-size-5 font-bold text-center text-gray-1">You've completed this meditation</h1>
                                             </Fragment>
                                        }
                                   </Fragment>
                                   : <Fragment>
                                        <Loader />
                                        <Gap height={50} />
                                   </Fragment>
                              }
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default MeditationDetail;
