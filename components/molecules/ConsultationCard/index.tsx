import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Gap from "../../atoms/Gap"

interface consultationProps {
     name: string;
     description?: string;
     image?: string;
     status: number;
     date: string;
     shift: string;
     onCancel?: VoidFunction;
}

const ConsultationCard = (props: consultationProps) => {

     const { name, description, image, status, date, shift, onCancel } = props;

     return (
          <div className="card-shadow px-8 py-6">
               <div className="grid grid-cols-12 gap-7 items-center">
                    <div className="col-span-12 lg:col-span-2">
                         <img src={image ? image : "/assets/images/commentSample.jpg"} className="rounded-full w-36 h-36 object-cover" alt="imageConsultant" />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                         <h1 className="text-blue-1 text-size-5 font-bold">{name}</h1>
                         <Gap height={5} />
                         <p className="text-gray-1">{description ? description : "No Description Available"}</p>
                         <Gap height={5} />
                         <p className="text-gray-1">Status:&nbsp;
                              {
                                   status === 0 ?
                                        <span className="text-yellow-400 font-bold">Upcoming</span>
                                        : status === 1 ?
                                             <span className="text-green-500 font-bold">Done</span>
                                             : status === -1 ?
                                                  <span className="text-red-500 font-bold">Canceled</span>
                                                  : null
                              }
                         </p>
                    </div>
                    <div className="col-span-10 lg:col-span-3">
                         <p className="lg:text-right text-gray-1">
                              {date}
                         </p>
                         <Gap height={5} />
                         <h1 className="lg:text-right text-blue-1 text-size-5 font-bold">{shift}</h1>
                    </div>
                    {
                         onCancel &&
                         <div className="col-span-2 lg:col-span-1">
                              <FontAwesomeIcon icon={faTimesCircle} size="3x" className="text-red-500 cursor-pointer scale-hover" onClick={onCancel} />
                         </div>
                    }
               </div>
          </div>
     )
}

export default ConsultationCard
