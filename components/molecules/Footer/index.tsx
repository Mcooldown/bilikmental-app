import styles from './Footer.module.css';
import Image from 'next/image';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../atoms/Button';
import router from 'next/router';
import Gap from '../../atoms/Gap';

const Footer = () => {

     return (
          <div className={styles.footerWrapper}>
               <div className="container mx-auto px-4 lg:px-12">
                    <div className="grid grid-cols-4 lg:grid-cols-11">
                         <div className="col-span-4 lg:mr-16 my-2 lg:my-0">
                              <Image src="/assets/images/logoOriginal.png" width={388} height={121} />
                              <Gap height={12} />
                              <p className="text-gray-1">Bilik Mental Tower, Jl. Prof. DR. Vincent Hadinata No.1, Karet Semanggi, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12950</p>
                         </div>
                         <div className="col-span-4 lg:col-span-2 my-3 lg:my-0">
                              <h1 className="text-size-4 font-bold text-blue-1">Explore</h1>
                              <Gap height={9} />
                              <ul className="list-none text-gray-1">
                                   <li className="mt-1">Quotes</li>
                                   <li className="mt-1">Consultation</li>
                                   <li className="mt-1">Articles</li>
                                   <li className="mt-1">Meditation</li>
                              </ul>
                         </div>
                         <div className="col-span-4 lg:col-span-2 my-3 lg:my-0">
                              <h1 className="text-size-4 font-bold text-blue-1">Contact Us</h1>
                              <Gap height={9} />
                              <ul className="list-none text-gray-1">
                                   <li className="mt-1"><FontAwesomeIcon icon={faEnvelope} /> bilikmental@gmail.com</li>
                                   <li className="mt-1"><FontAwesomeIcon icon={faPhone} /> +62 833 9293 0293</li>
                                   <li className="mt-1"><FontAwesomeIcon icon={faInstagram} /> @bilikmental</li>
                                   <li className="mt-1"><FontAwesomeIcon icon={faFacebook} /> Bilik Mental</li>
                              </ul>
                         </div>
                         <div className="col-span-3 lg:ml-4 my-3 lg:my-0">
                              <h1 className="text-size-4 font-bold text-blue-1 mb-5">Take care of your
                                   mental from now!</h1>
                              <Button type={2} title="Register Now" onClick={() => router.push('/register')} isFull={false} />
                         </div>
                    </div>
                    <Gap height={30} />
                    <hr />
                    <Gap height={15} />
                    <p className="text-center text-gray-1">Copyright &copy; 2021 Vincent Hadinata</p>
               </div>
          </div >
     )
}

export default Footer;