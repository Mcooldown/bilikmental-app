import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Select from "../../components/atoms/Select";
import Pagination from "../../components/atoms/Pagination";
import Gap from "../../components/atoms/Gap";
import Loader from "../../components/atoms/Loader";
import Layout from "../../components/Layout";
import SubPageCard from "../../components/molecules/SubPageCard";
import ConsultantCard from "../../components/molecules/ConsultantCard";
import styles from "../../styles/SubPage.module.css";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Swal from "sweetalert2";

const NewConsultation = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [isLoading, setIsLoading] = useState(true);
     const [buttonLoading, setButtonLoading] = useState(false);
     const [section, setSection] = useState(1);
     const [userName, setUserName] = useState('');
     const [userId, setUserId] = useState(null);

     const dashboardOptions = [
          "Profile","Consultation","Meditation","My Quotes", "My Articles"
     ];
     const availableShifts = ["08:00 - 10:00", "10:00 - 12:00", "13:00 - 15:00", "15:00 - 17:00", "19:00 - 21:00"];

     const [consultants, setConsultants] = useState(null);
     const [consultant, setConsultant] = useState(null);
     const perPageOptions = [10,20,40];
     
     const [perPage, setPerPage] = useState(10);
     const [currentPage, setCurrentPage] = useState(1);

     const [params, setParams] = useState({
          currentPage: currentPage,
          perPage: perPage,
     });

     const [date, setDate] = useState('');
     const [errDate, setErrDate] = useState('');
     const [shift, setShift] = useState('');
     const [errShift, setErrShift] = useState('');

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

     const fetchConsultants = async (signal) => {
          try {
               const url = urlAPI + '/v1/consultants';
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
                    setConsultants(json);
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
               fetchConsultants(abortCont.signal)
               .then(() => {
                    setIsLoading(false);
               });
          }

          return () => abortCont.abort();
     }, [params]);

     const fetchConsultant = async (consultantId) => {

          const abortCont = new AbortController();
          try {
               const url = urlAPI + '/v1/consultants/get-by-id';
               const options = {
                    signal: abortCont.signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         consultantId: consultantId
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setConsultant(json.data);
               }
          } catch (error) {
               console.log(error);
          }

          return () => abortCont.abort();
     }

     const handleSelectConsultant = (consultantId) => {
          setConsultant(null);
          setSection(2);
          fetchConsultant(consultantId);
     }

     const submitConsultation = async () => {
          const abortCont = new AbortController();
          try {
               const url = urlAPI + '/v1/consultations/add';
               const options = {
                    signal: abortCont.signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         userId: userId,
                         consultantId: consultant._id,
                         date: date,
                         shift : shift,
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setConsultant(json.data);
               }
          } catch (error) {
               console.log(error);
          }

          return () => abortCont.abort();
     }

     const handleSubmit = () => {

          setButtonLoading(true);
          let pass = true;

          if(date === ''){
               setErrDate("Date must be selected");
               pass = false;
          }
          if(shift === ''){
               setErrShift("Shift must be selected");
               pass =false;
          }

          if(pass){
               submitConsultation().then(() =>{
                    Swal.fire({ icon: 'success', title: 'Success', text: 'New Consultation Created', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, })
                    .then(() => {
                         router.push('/consultation/my');
                    });
               });
          }else{
               setButtonLoading(false);
          }
     }

     return (
          <Layout pageTitle="New Consultation">
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
                                   <h1 className="text-size-3 font-bold">New Consultation</h1>
                                   <div className="inline-flex items-center cursor-pointer" onClick={() => router.push('/consultation/my')}>
                                        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" className="text-gray-1 mr-3" />
                                        <span className="text-gray-1">Back to Consultation</span>
                                   </div>
                              </div>
                              <Gap height={10} />
                              <hr />
                              <Gap height={20} />
                              {
                                   section === 1 ?
                                   <Fragment>
                                        <p className="text-gray-1 text-size-6 font-bold">Select your consultant first</p>
                                        <Gap height={30} />
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
                                             <h5 className="m-0 text-dark-1">consultants</h5>
                                        </div>
                                        <Gap height={40} />
                                        {
                                             !isLoading ?
                                             <Fragment>
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                                                       {
                                                            consultants && consultants.data.length > 0 ?
                                                            consultants.data.map(consultant => {
                                                                 return (
                                                                      <div className="col-span-1" key={consultant._id}>
                                                                           <ConsultantCard clickable id={consultant._id} name={consultant.name} description={consultant.description} image={consultant.photo} onClick={() => handleSelectConsultant(consultant._id)} />
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
                                             consultants &&
                                             <Pagination currentPage={currentPage} totalPage={consultants.total_page} handleSetCurrentPage={(page) => handleSetCurrentPage(page)} />
                                        }
                                   </Fragment>
                                   :
                                   <Fragment>
                                        <div className="grid grid-cols-2 gap-10">
                                             <div className="col-span-1">
                                                  {
                                                       consultant ?
                                                       <ConsultantCard id={consultant._id} name={consultant.name} description={consultant.description} />
                                                       : <Fragment>
                                                            <Gap height={20} />
                                                            <Loader />
                                                       </Fragment>
                                                  }
                                             </div>
                                             <div className="col-span-1">
                                                  <p className="text-gray-1 text-size-6 font-bold">Select your preferred schedule</p>
                                                  <Gap height={20} />
                                                  <Input type="date" value={date} onChange={(e) => {setDate(e.target.value);setErrDate('')}} label="Date" id="date" name="date" errorMessage={errDate} isFull />
                                                  <Gap height={20} />
                                                  <Select label="Available Shifts" value={shift} defaultValue="" onChange={(e) => {setShift(e.target.value);setErrShift('')}} id="shift" name="shift" isFull options={availableShifts} errorMessage={errShift} />
                                             </div>

                                        </div>
                                        <Gap height={40} />
                                        <hr />
                                        <Gap height={20} />
                                        <div className="flex justify-end">
                                             <Button type={2} title="Book New Consultation" onClick={handleSubmit} isLoading={buttonLoading} />
                                        </div>
                                   </Fragment>
                              }
                              <Gap height={150} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default NewConsultation;
