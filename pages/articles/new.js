import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Select from "../../components/atoms/Select";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import SubPageCard from "../../components/molecules/SubPageCard";
import styles from "../../styles/SubPage.module.css";
import { faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import Swal from "sweetalert2";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewArticle = () => {

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";

     const [buttonLoading, setButtonLoading] = useState(false);
     const [userName, setUserName] = useState('');
     const [userId, setUserId] = useState('');

     const [category, setCategory] = useState('');
     const [errCategory, setErrCategory] = useState('');

     const [title, setTitle] = useState('');
     const [errTitle, setErrTitle] = useState('');
     const [content, setContent] = useState('');
     const [errContent, setErrContent] = useState('');
     const [image, setImage] = useState(null);
     const [errImage, setErrImage] = useState('');

     const dashboardOptions = [
          "Profile","Consultation","Meditation","My Quotes", "My Articles"
     ];
     const categoryOptions = [
          "Mood Disorders","Anxiety Disorders","Personality Disorders", "Psychotic Disorders", "Eating Disorders", "Trauma-related Disorders", "Substance Abuse Disorders"
     ];
    
     const handleSetOption = (value) => {
          if(value === "Profile") router.push('/profile');
          else if(value === "Consultation") router.push('/consultation');
          else if(value === "Meditation") router.push('/meditation');
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

     const handleImageUpload = (e) => {

          setErrImage("");
          const file = e.target.files[0];

          if (file.size > 3000000) {
               return setErrImage("Image must less than 3MB");
          } else {
               const extension = file.name.split('.').pop();

               if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                    return setErrImage("Profile Photo must in JPG, JPEG, or PNG format");
               }
          }

          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               setImage(reader.result);
          }
     }

     
     const handleSubmit = () => {
          
          const abortCont = new AbortController();
          
          const addArticle = async () => {
               const options = {
                    method: "POST",
                    signal: abortCont.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         userId: userId,
                         category: category,
                         title: title,
                         content: content,
                         image: image,
                    })
               };
               
               const res = await fetch(urlAPI + "/v1/articles/add", options);
               
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
          if(title === ''){
               setErrTitle("Title must be filled");
               pass = false;
          }
          if(content === ''){
               setErrContent("Content must be filled");
               pass = false;
          }

          if(pass){
               addArticle()
               .then(() => {
                    return Swal.fire({ icon: 'success', title: 'Success', text: 'Article submitted. Please wait for admin confirmation to publish your quote publicly', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, })
                    .then(() => {
                         router.push('/articles/my');
                    });
               })
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
                              <SubPageCard options={dashboardOptions} selectedOption={"My Articles"} handleSetOption={(option) => handleSetOption(option)} />
                              <Gap height={40} />
                              <div className="flex justify-between items-center">
                                   <h1 className="text-size-3 font-bold">Publish New Article</h1>
                                   <div className="inline-flex items-center cursor-pointer" onClick={() => router.push('/articles/my')}>
                                        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" className="text-gray-1" />
                                        <Gap width={12} />
                                        <span className="text-gray-1">Back to My Articles</span>
                                   </div>
                              </div>
                              <Gap height={10} />
                              <hr />
                              <Gap height={40} />
                              
                              <p className="text-gray-1 text-size-6 font-bold">Please fill the details below</p>
                              <Gap height={20} />
                              <Select label="Category" defaultValue="" id="category" name="category" isFull options={categoryOptions} value={category}
                                   onChange={(e) => { setCategory(e.target.value); setErrCategory('') }} errorMessage={errCategory} required />
                              <Gap height={20} />
                              <Input required label="Title" value={title} name="title" id="title" isFull onChange={(e) => {setTitle(e.target.value);setErrTitle('')}} errorMessage={errTitle} />
                              <Gap height={20} />
                              <label className="block text-gray-1" htmlFor="content">
                                   Content <span className="text-red-500">*</span>
                              </label>
                              <Gap height={4} />
                              <CKEditor
                                   editor={ ClassicEditor }
                                   data=""
                                   onChange={ ( event, editor ) => 
                                   {setContent(editor.getData());setErrContent('')}}
                              />
                              {errContent && <small className="text-red-400">{errContent}</small>}
                              <Gap height={40} />
                              <div className="grid grid-cols-3 gap-5 items-center">
                                   <div className="col-span-3 lg:col-span-1">
                                        <img className="w-full" src={image ? image : "/assets/images/articleDefault.png"} alt="imagePreview" />
                                   </div>
                                   <div className="col-span-3 lg:col-span-2">
                                        <Input type="file" label="Image" name="image" id="image" isFull onChange={(e) => handleImageUpload(e)} errorMessage={errImage} />
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

export default NewArticle;
