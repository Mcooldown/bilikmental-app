import { Fragment, useEffect, useState } from "react"
import Footer from "../components/molecules/Footer";
import Image from 'next/image';
import styles from '../styles/Auth.module.css';
import Input from "../components/atoms/Input";
import Head from "next/head";
import Button from "../components/atoms/Button";
import Link from "next/link";
import Gap from "../components/atoms/Gap";
import Select from "../components/atoms/Select";
import router from "next/router";
import Swal from "sweetalert2";

const Register = () => {

     const urlAPI = "https://bilikmental-api.vercel.app";
     // const urlAPI = "http://localhost:4000";
     const [section, setSection] = useState(1);
     const [buttonLoading, setButtonLoading] = useState(false);

     // Form
     const [firstName, setFirstName] = useState('');
     const [errFirstName, setErrFirstName] = useState('');

     const [lastName, setLastName] = useState('');
     const [errLastName, setErrLastName] = useState('');

     const [gender, setGender] = useState('');
     const [errGender, setErrGender] = useState('');

     const [dateOfBirth, setDateOfBirth] = useState('');
     const [errDateOfBirth, setErrDateOfBirth] = useState('');

     const [address, setAddress] = useState('');
     const [errAddress, setErrAddress] = useState('');

     const [phoneNumber, setPhoneNumber] = useState('');
     const [errPhoneNumber, setErrPhoneNumber] = useState('');

     const [image, setImage] = useState('');
     const [errImage, setErrImage] = useState('');

     const [email, setEmail] = useState('');
     const [errEmail, setErrEmail] = useState('');

     const [password, setPassword] = useState('');
     const [errPassword, setErrPassword] = useState('');

     const [confirmPassword, setConfirmPassword] = useState('');
     const [errConfirmPassword, setErrConfirmPassword] = useState('');

     useEffect(() => {

          const userId = localStorage.getItem('userId');
          if (userId) {
               Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Already logged in', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
               router.push('/profile');
          }
     }, []);

     const handleToSectionTwo = () => {

          let pass = true;

          if (firstName === '') {
               setErrFirstName("First Name must be filled");
               pass = false;
          }
          if (lastName === '') {
               setErrLastName("Last name must be filled");
               pass = false;
          }
          if (gender !== 'Male' && gender !== 'Female') {
               setErrGender("Gender must be selected");
               pass = false;
          }
          if (dateOfBirth === '') {
               setErrDateOfBirth("Date of Birth must be filled");
               pass = false;
          }
          if (address === '') {
               setErrAddress("Address must be filled");
               pass = false;
          }

          if (phoneNumber === '') {
               setErrPhoneNumber("Phone Number must be filled");
               pass = false;
          } else {

               let isNumeric = /^\d+$/.test(phoneNumber);

               if (!isNumeric) {
                    setErrPhoneNumber("Phone Number must be numeric value");
                    pass = false;
               }
          }

          return pass && setSection(2);
     }

     const handleImageUpload = (e: any) => {

          setErrImage('');
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
               setImage(reader.result as string);
          }
     }

     const handleToSectionThree = () => {
          setErrImage('');
          return setSection(3);
     }

     const handleChangeEmail = async (value: any) => {

          setErrEmail('');
          setEmail(value);

          const options = {
               method: "POST",
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email: value })
          }

          const res = await fetch(urlAPI + "/v1/auth/check-email", options);
          const response = await res.json();

          if (response.emailExist) {
               setErrEmail("Email already exist");
          }
     }

     const addUser = async () => {
          const options = {
               method: "POST",
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                    name: {
                         first: firstName,
                         last: lastName,
                    },
                    gender, dateOfBirth, address, phoneNumber,
                    photo: image,
                    email, password
               })
          };

          const res = await fetch(urlAPI + "/v1/auth/add-user", options);
          return res;
     }

     const handleSubmit = () => {

          setButtonLoading(true);

          let pass = true;

          if (email === '') {
               setErrEmail("Email must be filled");
               pass = false;
          } else {
               if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                    setErrEmail("Email must be valid");
                    pass = false;
               } else {
                    if (errEmail) {
                         pass = false;
                    }
               }
          }

          if (password === '') {
               setErrPassword("Password must be filled");
               pass = false;
          } else {
               if (password.length < 6) {
                    setErrPassword("Password length must minimum 6 characters");
                    pass = false;
               }
          }

          if (confirmPassword === '') {
               setErrConfirmPassword("Password confirmation must be filled");
               pass = false;
          } else {
               if (password !== confirmPassword) {
                    setErrConfirmPassword("Password confirmation must match");
                    pass = false;
               }
          }

          if (pass) {
               addUser().then(res => {
                    if (res.status === 200) {
                         Swal.fire({ icon: 'success', title: 'Success', text: 'Register Success', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, })
                              .then(() => {
                                   router.push('/login');
                              });
                    } else {
                         Swal.fire({ icon: 'error', title: 'Error', text: 'Server Error', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
                    }
               })
          } else {
               return setButtonLoading(false);
          }
     }

     return (
          <Fragment>
               <Head>
                    <title>Bilik Mental | Register</title>
                    <meta name="description" content="Bilik Mental" />
               </Head>
               <div className={styles.authWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <Link href="/">
                              <div className="mt-3 cursor-pointer">
                                   <Image src="/assets/images/logoOriginal.png" width={155} height={50} />
                              </div>
                         </Link>
                         <div className={styles.authRowWrapper}>
                              <div className="grid grid-cols-5 lg:grid-cols-11">
                                   <div className="col-span-3"></div>
                                   <div className="col-span-5">
                                        <div className="card-shadow p-10">
                                             <h1 className="text-size-3 font-bold text-dark-1">Create New Account</h1>
                                             <Gap height={10} />
                                             <p className="text-gray-1">Already have an account? <Link href="/login"><span className="text-blue-1 cursor-pointer">Login</span></Link></p>
                                             <Gap height={20} />
                                             <hr />
                                             <Gap height={20} />
                                             <div className="grid grid-cols-12 gap-3 text-center">
                                                  <div className="col-span-4">
                                                       <h1 className={(section === 1 ? "text-blue-1" : "text-gray-2") + " font-bold text-size-4"}>1</h1>
                                                       <p className={section === 1 ? "text-blue-1" : "text-gray-2"}>Personal Data</p>
                                                  </div>
                                                  <div className="col-span-4">
                                                       <h1 className={(section === 2 ? "text-blue-1" : "text-gray-2") + " font-bold text-size-4"}>2</h1>
                                                       <p className={section === 2 ? "text-blue-1" : "text-gray-2"}>Profile Photo</p>
                                                  </div>
                                                  <div className="col-span-4">
                                                       <h1 className={(section === 3 ? "text-blue-1" : "text-gray-2") + " font-bold text-size-4"}>3</h1>
                                                       <p className={section === 3 ? "text-blue-1" : "text-gray-2"}>Credentials</p>
                                                  </div>
                                             </div>
                                             <Gap height={30} />
                                             <hr />
                                             <Gap height={20} />
                                             {
                                                  section === 1 &&
                                                  <Fragment>
                                                       <h1 className="text-size-6 font-bold text-dark-1">Fill your personal data</h1>
                                                       <Gap height={20} />
                                                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                                            <div className="col-span-1">
                                                                 <Input type="text" label="First Name" id="firstName" name="firstName"
                                                                      value={firstName} onChange={(e) => { setFirstName(e.target.value); setErrFirstName(''); }} isFull
                                                                      errorMessage={errFirstName} required />
                                                            </div>
                                                            <div className="col-span-1">
                                                                 <Input type="text" label="Last Name" id="lastName" name="lastName" value={lastName}
                                                                      onChange={(e) => { setLastName(e.target.value); setErrLastName(''); }} isFull
                                                                      errorMessage={errLastName} required />
                                                            </div>
                                                       </div>
                                                       <Gap height={20} />
                                                       <Select label="Gender" defaultValue="" id="gender" name="gender" isFull options={["Male", "Female"]} value={gender}
                                                            onChange={(e) => { setGender(e.target.value); setErrGender('') }} errorMessage={errGender} required />
                                                       <Gap height={20} />
                                                       <Input type="date" label="Date of Birth" id="dateOfBirth" name="dateOfBirth" isFull value={dateOfBirth}
                                                            onChange={(e) => { setDateOfBirth(e.target.value); setErrDateOfBirth('') }} errorMessage={errDateOfBirth} required />
                                                       <Gap height={20} />
                                                       <Input type="text" label="Address" id="address" name="address" isFull value={address}
                                                            onChange={(e) => { setAddress(e.target.value); setErrAddress('') }} errorMessage={errAddress} required />
                                                       <Gap height={20} />
                                                       <Input type="text" placeholder="e.g 62xxxxx" label="Phone Number" id="phoneNumber" name="phoneNumber" isFull
                                                            value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value); setErrPhoneNumber(''); }} errorMessage={errPhoneNumber} required />
                                                       <Gap height={50} />
                                                       <Button type={2} title="Next" onClick={handleToSectionTwo} isFull />
                                                  </Fragment>
                                             }
                                             {
                                                  section === 2 &&
                                                  <Fragment>
                                                       <h1 className="text-size-6 font-bold text-dark-1">Upload your profile photo</h1>
                                                       <Gap height={30} />
                                                       <div className="grid grid-cols-3 gap-5 items-center">
                                                            <div className="col-span-3 lg:col-span-1">
                                                                 <img className="w-40 h-40 object-cover rounded-full" src={image ? image : "/assets/images/defaultProfilePhoto.jpg"} alt="imagePreview" />
                                                            </div>
                                                            <div className="col-span-3 lg:col-span-2">
                                                                 <Input type="file" id="photo" name="photo" onChange={(e) => handleImageUpload(e)} isFull errorMessage={errImage} />
                                                            </div>
                                                       </div>
                                                       <Gap height={50} />
                                                       <div className="grid grid-cols-2 gap-4">
                                                            <div className="col-span-1">
                                                                 <Button type={1} title="Back" onClick={() => setSection(1)} isFull />
                                                            </div>
                                                            <div className="col-span-1">
                                                                 <Button type={2} title="Next" onClick={handleToSectionThree} isFull />
                                                            </div>
                                                       </div>
                                                  </Fragment>
                                             }
                                             {
                                                  section === 3 &&
                                                  <Fragment>
                                                       <h1 className="text-size-6 font-bold text-dark-1">Fill your credentials</h1>
                                                       <Gap height={20} />
                                                       <Input type="text" label="Email" id="email" name="email" isFull value={email} onChange={(e) => handleChangeEmail(e.target.value)} errorMessage={errEmail} required />
                                                       <Gap height={20} />
                                                       <Input type="password" placeholder="Min 6 characters" label="Password" id="password" name="password" isFull value={password} onChange={(e) => { setPassword(e.target.value); setErrPassword(''); }} errorMessage={errPassword} required />
                                                       <Gap height={20} />
                                                       <Input type="password" placeholder="Must match with registered password" label="Confirm Password" id="confirmPassword" name="confirmPassword" isFull
                                                            value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setErrConfirmPassword(''); }} errorMessage={errConfirmPassword} required />
                                                       <Gap height={50} />
                                                       <div className="grid grid-cols-2 gap-4">
                                                            <div className="col-span-1">
                                                                 <Button type={1} title="Back" onClick={() => setSection(2)} isFull />
                                                            </div>
                                                            <div className="col-span-1">
                                                                 {
                                                                      buttonLoading ?
                                                                           <Button type={2} title="Please wait..." isFull disabled />
                                                                           :
                                                                           <Button type={2} title="Create New Account" isFull onClick={handleSubmit} />
                                                                 }
                                                            </div>
                                                       </div>
                                                  </Fragment>
                                             }
                                             <Gap height={15} />
                                        </div>
                                   </div>
                                   <div className="col-span-3"></div>
                              </div>
                         </div>
                    </div>
               </div>
               <Footer />
          </Fragment>
     )
}

export default Register;
