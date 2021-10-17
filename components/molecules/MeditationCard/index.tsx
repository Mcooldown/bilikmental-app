import { Fragment } from "react";
import Button from "../../atoms/Button";
import Gap from "../../atoms/Gap"
import styles from "./MeditationCard.module.css";

interface propsMeditation {
     id: string;
     image?: string;
     name: string;
     description?: string;
     onClick?: VoidFunction;
     videoProvided?: boolean;
     time?: number;
}

const MeditationCard = (props: propsMeditation) => {

     const { id, image, name, description, onClick, videoProvided, time } = props;

     return (
          <div className={"card-shadow p-8"}>
               <div className="grid grid-cols-12 gap-7 items-center">
                    <div className="col-span-12 lg:col-span-3">
                         <img src={image ? image : "/assets/images/articleDefault.png"} className="w-full h-48 object-cover rounded-xl" alt="imageMeditation" />
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                         <h1 className="text-blue-1 text-size-4 font-bold">{name}</h1>
                         <Gap height={5} />

                         <p className={"text-gray-1 " + styles.description}>{description ? description : "No description available"}
                         </p>
                         <Gap height={20} />
                         <div className="flex justify-between">
                              <div className="inline-flex">
                                   {
                                        videoProvided &&
                                        <Button type={1} title="Video Provided" />
                                   }
                                   {
                                        time &&
                                        <Fragment>
                                             <Gap width={10} />
                                             <Button type={1} title={time.toString() + " mins"} />
                                        </Fragment>
                                   }
                              </div>
                              <Button type={2} title="Enroll this meditation" onClick={onClick} />
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default MeditationCard
