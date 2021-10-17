import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Select from "../../components/atoms/Select";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import QuoteCard from "../../components/molecules/QuoteCard";
import SubPageCard from "../../components/molecules/SubPageCard";
import styles from "../../styles/SubPage.module.css";
import { faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Swal from "sweetalert2";

const NewQuote = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [buttonLoading, setButtonLoading] = useState(false);
     const [userName, setUserName] = useState('');
     const [userId, setUserId] = useState(null);
     const [category, setCategory] = useState('');
     const [errCategory, setErrCategory] = useState(null);
     const [text, setText] = useState('');
     const [errText, setErrText] = useState(null);

     const dashboardOptions = [
          "Profile","Consultation","Meditation","My Quotes", "My Articles"
     ];
     const categoryOptions = [
          "Achievement","Self Improvement","Extrinsic", "Fear", "Investment", "Social", "Behavior"
     ];
    
     const handleSetOption = (value) => {
          if(value === "Profile") router.push('/profile');
          else if(value === "Consultation") router.push('/consultation/my');
          else if(value === "Meditation") router.push('/meditation/my');
          else if(value === "My Quotes") router.push('/quotes/my');
          else if(value === "My Articles") router.push('/articles/my');
     }

     useEffect(() => {
          const userId = localStorage.getItem('userId');
     
          if (!userId) {
               Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Please login first', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
               router.push('/login');
          }else{
               setUserId(localStorage.getItem('userId'));
               setUserName(localStorage.getItem('userName'));
          }

     });

     
     const handleSubmit = () => {
          
          const abortCont = new AbortController();
          
          const addQuote = async () => {
               const options = {
                    method: "POST",
                    signal: abortCont.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         text: text,
                         category: category,
                         userId: userId,
                    })
               };
     
               const res = await fetch(urlAPI + "/v1/quotes/add", options);
               
               if(!res.ok){
                    throw Error("Submit error");
               }else{
                    return res;
               }
          }

          setButtonLoading(true);
          let pass = true;

          if(category === ''){
               setErrCategory("Category must be selected");
               pass = false;
          }
          if(text === ''){
               setErrText("Quote must be filled");
               pass = false;
          }

          if(pass){
               addQuote()
               .then(() => {
                    return Swal.fire({ icon: 'success', title: 'Success', text: 'Quote submitted. Please wait for admin confirmation to publish your quote publicly', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, })
               })
               .then(() => {
                    router.push('/quotes/my');
               });
          }else{
               setButtonLoading(false);
          }
     }

     return (
          <Layout pageTitle="Publish New Quotes">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={styles.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <h1 className="text-size-2 font-bold text-white">Welcome, {userName ? userName : ''}</h1>
                              <Gap height={20} />
                              <SubPageCard options={dashboardOptions} selectedOption={"My Quotes"} handleSetOption={(option) => handleSetOption(option)} />
                              <Gap height={40} />
                              <div className="flex justify-between items-center">
                                   <h1 className="text-size-3 font-bold">Publish New Quote</h1>
                                   <div className="inline-flex items-center cursor-pointer" onClick={() => router.push('/quotes/my')}>
                                        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" className="text-gray-1" />
                                        <Gap width={12} />
                                        <span className="text-gray-1">Back to My Quotes</span>
                                   </div>
                              </div>
                              <Gap height={10} />
                              <hr />
                              <Gap height={40} />
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                   <div className="col-span-1 lg:order-2">
                                        <p className="text-gray-1 text-size-6 font-bold">Please fill the details below</p>
                                        <Gap height={20} />
                                        <Select label="Category" defaultValue="" id="category" name="category" isFull options={categoryOptions} value={category}
                                             onChange={(e) => { setCategory(e.target.value); setErrCategory('') }} errorMessage={errCategory} required />
                                        <Gap height={20} />
                                        <Input required label="Quote" value={text} name="text" id="text" isFull onChange={(e) => {setText(e.target.value);setErrText('')}} errorMessage={errText} />

                                   </div>
                                   <div className="col-span-1 lg:order-1">
                                        <p className="text-gray-1 text-size-6 font-bold">Quote Preview</p>
                                        <Gap height={20} />
                                        <QuoteCard isConfirmed author={userName} quote={text} category={category}  />
                                   </div>
                              </div>
                              <Gap height={40} />
                              <hr />
                              <Gap height={20} />
                              <div className="flex justify-end">
                                   <Button type={2} title="Submit" onClick={handleSubmit} isLoading={buttonLoading} />
                              </div>
                              <Gap height={120} />
                         </div>
                    </div>
               </div>

          </Layout>
     )
}

export default NewQuote
