import { faCheckCircle, faLock, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import { Fragment } from "react";
import Button from "../../atoms/Button";
import Gap from "../../atoms/Gap"

interface propsObj {
     step: number,
     status: number,
     name: string,
     description?: string,
     resourceFile?: string,
     video?: string,
}

const MeditationStepCard = (props: propsObj) => {

     const { step, status, name, description, resourceFile, video } = props;

     return (
          <div className="card-shadow px-8 py-6">
               <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2 lg:col-span-1">
                         {
                              status === 1 ?
                                   <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" size="4x" />
                                   : status === 2 ?
                                        <div className="rounded-full bg-yellow-300 w-16 h-16 flex items-center justify-center">
                                             <FontAwesomeIcon icon={faThumbtack} className="text-white" size="2x" />
                                        </div>
                                        : status === 3 ?
                                             <div className="rounded-full bg-gray-400 w-16 h-16 flex items-center justify-center">
                                                  <FontAwesomeIcon icon={faLock} className="text-white" size="2x" />
                                             </div>
                                             : null

                         }
                    </div>
                    <div className="col-span-10 lg:col-span-11">
                         <h1 className="text-blue-1 text-size-5 font-bold">Step {step}: {name}</h1>
                    </div>
               </div>
               {
                    status === 2 &&
                    <Fragment>
                         <Gap height={20} />
                         <hr />
                         <Gap height={15} />
                         <p className="text-gray-1">{description ? description : "No description available"}</p>
                         {
                              (resourceFile || video) &&
                              <Fragment>
                                   <Gap height={15} />
                                   <div className="flex">
                                        {
                                             resourceFile &&
                                             <Button type={1} title="View Resource File" onClick={() => router.push(resourceFile)} />
                                        }
                                        {
                                             video &&
                                             <Fragment>
                                                  <Gap width={10} />
                                                  <Button type={1} title="View Resource File" onClick={() => router.push(resourceFile)} />
                                             </Fragment>
                                        }
                                   </div>
                              </Fragment>
                         }
                         <Gap height={15} />
                         <hr />
                         <Gap height={15} />
                         <div className="flex justify-end">
                              <Button type={2} title="I'm Done" onClick={() => router.push('/meditation/detail')} />
                         </div>

                    </Fragment>
               }
          </div>
     )
}

export default MeditationStepCard
