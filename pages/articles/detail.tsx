import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import stylesDetail from "../../styles/Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useState } from "react";
import Input from "../../components/atoms/Input";
import Image from "next/image";

const ArticleDetail = () => {

     const [showAdd, setShowAdd] = useState(false);

     return (
          <Layout pageTitle="Article Detail">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={stylesDetail.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <div className="grid grid-cols-12 gap-6">
                                   <div className="col-span-8">
                                        <div className="card-shadow px-6 py-8">
                                             <h5 className="text-gray-1">Articles / Mood Disorders</h5>
                                             <h1 className="text-size-3 font-bold text-blue-1">3 Steps to encourage yourself while in down situation</h1>
                                             <Gap height={10} />
                                             <div className="flex justify-between">
                                                  <p className="text-gray-1">Posted by Wesley Snipes at 1/9/2021</p>
                                                  <FontAwesomeIcon icon={faShareAlt} size="lg" className="text-gray-1" />
                                             </div>
                                             <Gap height={20} />
                                             <Image src="/assets/images/articleSample.jpeg" layout="responsive" width={3} height={2} objectFit="cover" />
                                             <Gap height={20} />
                                             <p className="text-dark-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione ipsum est recusandae voluptas rem distinctio mollitia at eligendi deserunt delectus, cum nesciunt architecto voluptatum tenetur! Ut at et ea minima.
                                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ut doloremque itaque voluptatibus id veniam nisi tenetur esse blanditiis, consectetur dolorum, ipsa, laborum totam molestias molestiae atque sint excepturi alias?
                                                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore harum sint eum. Suscipit porro pariatur illo atque, assumenda nam reiciendis! Natus odit repellat incidunt cumque, corporis aliquam facere blanditiis quia!</p>
                                             <Gap height={15} />
                                        </div>
                                        <Gap height={20} />
                                        <div className="card-shadow px-6 py-8">
                                             <div className="flex justify-between items-center">
                                                  <h1 className="text-size-5 font-bold">Comments</h1>
                                                  <div className="inline-flex items-center cursor-pointer" onClick={() => setShowAdd(true)}>
                                                       <FontAwesomeIcon icon={faPlusCircle} size="lg" className="text-gray-1" />
                                                       <Gap width={10} />
                                                       <small className="text-gray-1">Add New Comment</small>
                                                  </div>
                                             </div>
                                             <Gap height={10} />
                                             {
                                                  showAdd &&
                                                  <Fragment>
                                                       <hr />
                                                       <Gap height={20} />
                                                       <Input type="text" id="commentContent" name="commentContent" placeholder="Write your comment here" isFull />
                                                       <Gap height={15} />
                                                       <div className="flex justify-end">
                                                            <Button type={1} title="Cancel" onClick={() => setShowAdd(false)} />
                                                            <Gap width={10} />
                                                            <Button type={2} title="Submit" onClick={() => setShowAdd(false)} />
                                                       </div>
                                                       <Gap height={20} />
                                                  </Fragment>
                                             }
                                             <hr />
                                             <Gap height={20} />
                                             <div className="flex justify-between">
                                                  <div className="flex items-start">
                                                       <img src="/assets/images/commentSample.jpg" className="rounded-full w-12 h-12" alt="imageComment" />
                                                       <Gap width={20} />
                                                       <div>
                                                            <h1 className="text-size-6 text-blue-1 font-bold">Vincent Hadinata</h1>
                                                            <p className="text-dark-1">Bagus</p>
                                                       </div>
                                                  </div>
                                                  <p className="text-gray-1">1/9/2021</p>
                                             </div>
                                             <Gap height={20} />
                                             <hr />
                                             <Gap height={20} />
                                             <div className="flex justify-between">
                                                  <div className="flex items-start">
                                                       <img src="/assets/images/commentSample.jpg" className="rounded-full w-12 h-12" alt="imageComment" />
                                                       <Gap width={20} />
                                                       <div>
                                                            <h1 className="text-size-6 text-blue-1 font-bold">Vincent Hadinata</h1>
                                                            <p className="text-dark-1">Bagus banget</p>
                                                       </div>
                                                  </div>
                                                  <p className="text-gray-1">1/9/2021</p>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col-span-4">
                                        <div className="card-shadow px-6 py-8">
                                             <h1 className="text-size-5 font-bold">Also read this</h1>
                                             <Gap height={10} />
                                             <hr />
                                             <Gap height={15} />
                                             <div className="grid grid-cols-12">
                                                  <div className="col-span-4">
                                                       <Image src="/assets/images/articleSample.jpeg" layout="responsive" width={3} height={2} objectFit="cover" />
                                                  </div>
                                                  <div className="col-span-8 ml-3">
                                                       <h1 className={"text-size-5 font-bold text-blue-1 " + stylesDetail.moreHeight}>Your time is limited, so don’t waste it living someone else without you</h1>
                                                  </div>
                                             </div>
                                             <Gap height={10} />
                                             <hr />
                                             <Gap height={15} />
                                             <div className="grid grid-cols-12">
                                                  <div className="col-span-4">
                                                       <Image src="/assets/images/articleSample.jpeg" layout="responsive" width={3} height={2} objectFit="cover" />
                                                  </div>
                                                  <div className="col-span-8 ml-3">
                                                       <h1 className={"text-size-5 font-bold text-blue-1 " + stylesDetail.moreHeight}>Your time is limited, so don’t waste it living someone else without you</h1>
                                                  </div>
                                             </div>
                                             <Gap height={10} />
                                             <hr />
                                             <Gap height={15} />
                                             <div className="grid grid-cols-12">
                                                  <div className="col-span-4">
                                                       <Image src="/assets/images/articleSample.jpeg" layout="responsive" width={3} height={2} objectFit="cover" />
                                                  </div>
                                                  <div className="col-span-8 ml-3">
                                                       <h1 className={"text-size-5 font-bold text-blue-1 " + stylesDetail.moreHeight}>Your time is limited, so don’t waste it living someone else without you</h1>
                                                  </div>
                                             </div>
                                             <Gap height={10} />
                                             <hr />
                                             <Gap height={15} />
                                             <div className="grid grid-cols-12">
                                                  <div className="col-span-4">
                                                       <Image src="/assets/images/articleSample.jpeg" layout="responsive" width={3} height={2} objectFit="cover" />
                                                  </div>
                                                  <div className="col-span-8 ml-3">
                                                       <h1 className={"text-size-5 font-bold text-blue-1 " + stylesDetail.moreHeight}>Your time is limited, so don’t waste it living someone else without you</h1>
                                                  </div>
                                             </div>
                                             <Gap height={10} />
                                        </div>
                                   </div>
                              </div>
                              <Gap height={120} />
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default ArticleDetail
