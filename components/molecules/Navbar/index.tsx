import styles from './Navbar.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../atoms/Button';


const Navbar = () => {

     const [collapsed, setCollapsed] = useState(true);
     const [isMobile, setIsMobile] = useState(false);

     useEffect(() => {
          setIsMobile(window.matchMedia('(max-device-width: 576px)').matches ? true : false);
     }, [])

     const toggleCollapse = () => {
          setCollapsed(collapsed ? false : true);
     }

     return (
          <nav className="navbar">
               <div className="container mx-auto flex items-center justify-between flex-wrap p-3 md:p-4 ">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                         <Image src="/assets/images/logoOriginal.png" width={130} height={40} />
                    </div>
                    <div className="block lg:hidden">
                         <button className="flex items-center px-3 py-2 border rounded text-gray border-black hover:text-gray hover:border-gray" onClick={toggleCollapse}>
                              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                         </button>
                    </div>
                    {
                         (!isMobile || !collapsed) &&
                         <div className="w-full block lg:flex lg:items-center lg:w-auto">
                              <div className="text-sm lg:flex-grow text-white lg:mr-5">
                                   <Link href="#"><a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-1 mr-4">Quotes</a></Link>
                                   <Link href="#"><a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-1 mr-4">Consultation</a></Link>
                                   <Link href="#"><a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-1 mr-4">Articles</a></Link>
                                   <Link href="#"><a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-1">Meditation</a></Link>
                              </div>
                              <div>
                                   <Button title="Login" type={1} />
                                   <div className="inline-flex mx-1"></div>
                                   <Button title="Register" type={2} />
                              </div>
                         </div>
                    }
               </div>
          </nav>
     );
}

export default Navbar;
