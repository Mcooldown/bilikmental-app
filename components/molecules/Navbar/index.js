import styles from './Navbar.module.css';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../atoms/Button';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const Navbar = () => {

     const router = useRouter();

     const [collapsed, setCollapsed] = useState(true);
     const [isMobile, setIsMobile] = useState(true);
     const [navbarClassName, setnavbarClassName] = useState('navbar-white');

     useEffect(() => {

          async function validateMobile() {
               return await setIsMobile(window.matchMedia('(max-device-width: 576px)').matches ? true : false);
          }

          validateMobile().then(() => {
               if (!isMobile && router.pathname === '/') {
                    setnavbarClassName('navbar-transparent');
               }

               document.addEventListener("scroll", () => {
                    setnavbarClassName(window.scrollY < 50 && !isMobile && router.pathname === '/' ? 'navbar-transparent' : 'navbar-white');
               });
          })

     }, [isMobile]);

     const handleLogout = () => {
          localStorage.clear();
          Swal.fire({ icon: 'success', title: 'Success', text: 'Logout Success', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
          router.push('/login')
     }

     return (
          <nav className={styles.navbar + " " + (navbarClassName === 'navbar-white' ? styles.navbarWhite : styles.navbarTransparent) + " fixed w-full"}>
               <div className="container mx-auto flex items-center justify-between flex-wrap p-3 lg:px-12">
                    <Link href="/">
                         <div className="flex items-center flex-shrink-0 mr-6" style={{ cursor: "pointer" }}>
                              <Image src="/assets/images/logoOriginal.png" width={155} height={50} />
                         </div>
                    </Link>
                    <div className="block lg:hidden">
                         <button className={"flex items-center px-3 py-2 " + styles.hamburger} onClick={() => setCollapsed(collapsed ? false : true)}>
                              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                         </button>
                    </div>
                    {
                         (!isMobile || !collapsed) &&
                         <div className="w-full block lg:flex lg:items-center lg:w-auto">
                              <div className="text-white lg:flex-grow lg:mr-5">
                                   <Link href="/consultation/my"><a href="#" className="block text-center text-gray-1 mt-4 lg:inline-block lg:mt-0 lg:mr-4">Consultation</a></Link>
                                   <Link href="/meditation/my"><a href="#" className="block text-center text-gray-1 mt-4 lg:inline-block lg:mt-0 lg:mr-4">Meditation</a></Link>
                                   <Link href="/quotes"><a href="#" className="block text-center text-gray-1 mt-4 lg:inline-block lg:mt-0 lg:mr-4">Quotes</a></Link>
                                   <Link href="/articles"><a href="#" className="block text-center text-gray-1 mt-4 lg:inline-block lg:mt-0">Articles</a></Link>
                                   {
                                        localStorage.getItem('userId') ?
                                        <Fragment>
                                                  <Link href="/profile"><a href="#" className="block text-center text-gray-1 mt-4 lg:inline-block lg:mt-0 lg:ml-4">Your Dashboard</a></Link>
                                                  <a href="#" className="block text-center text-gray-1 mt-4 lg:inline-block lg:mt-0 lg:ml-4" onClick={handleLogout}>Logout</a>
                                             </Fragment>
                                             : null
                                   }
                              </div>
                              {
                                   !localStorage.getItem('userId') &&
                                   <Fragment>
                                        <div className="block text-center mt-4 lg:inline-block lg:mr-4 lg:mt-0">
                                             <Button title="Login" type={1} onClick={() => router.push('/login')} isFull={false} />
                                        </div>
                                        <div className="block text-center mt-4 lg:inline-block lg:mt-0">
                                             <Button title="Register" type={2} onClick={() => router.push('/register')} isFull={false} />
                                        </div>
                                   </Fragment>
                              }
                         </div>
                    }
               </div>
          </nav>
     );
}

export default Navbar;
