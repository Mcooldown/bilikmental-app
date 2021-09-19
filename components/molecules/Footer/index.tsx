import styles from './Footer.module.css';
import Image from 'next/image';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../atoms/Button';

const Footer = () => {
     return (
          <div className={styles.footerWrapper + " pt-10 pb-8"}>
               <div className="container mx-auto px-4 lg:px-12">
                    <div className="grid lg:grid-cols-11 mb-8">
                         <div className="col-span-4 lg:mr-16">
                              <Image src="/assets/images/logoOriginal.png" width={388} height={121} />
                              <p className="text-gray-1 mt-4">Bilik Mental Tower, Jl. Prof. DR. Vincent Hadinata No.1, Karet Semanggi, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12950</p>
                         </div>
                         <div className="col-span-2">
                              <h1 className={styles.titleFooter + " text-blue-1"}>Explore</h1>
                              <ul className="list-none text-gray-1 mt-3">
                                   <li className="mt-1">Quotes</li>
                                   <li className="mt-1">Consultation</li>
                                   <li className="mt-1">Articles</li>
                                   <li className="mt-1">Meditation</li>
                              </ul>
                         </div>
                         <div className="col-span-2">
                              <h1 className={styles.titleFooter + " text-blue-1"}>Contact Us</h1>
                              <ul className="list-none text-gray-1 mt-3">
                                   <li className="mt-1"><FontAwesomeIcon icon={faEnvelope} /> bilikmental@gmail.com</li>
                                   <li className="mt-1"><FontAwesomeIcon icon={faPhone} /> +62 833 9293 0293</li>
                                   <li className="mt-1"><FontAwesomeIcon icon={faInstagram} /> @bilikmental</li>
                                   <li className="mt-1"><FontAwesomeIcon icon={faFacebook} /> Bilik Mental</li>
                              </ul>
                         </div>
                         <div className="col-span-3 lg:ml-4">
                              <h1 className={styles.titleFooter + " text-blue-1 mb-5"}>Take care of your
                                   mental from now!</h1>
                              <Button type={2} title="Register Now" />
                         </div>
                    </div>
                    <hr />
                    <p className="text-center text-gray-1 mt-3">Copyright &copy; 2021 Vincent Hadinata</p>
               </div>
          </div >
     )
}

export default Footer;