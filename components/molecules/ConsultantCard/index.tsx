import Gap from "../../atoms/Gap"

interface propsConsultant {
     id: string;
     image?: string;
     name: string;
     description?: string;
     clickable?: boolean;
     onClick?: VoidFunction;
}

const ConsultantCard = (props: propsConsultant) => {

     const { id, image, name, description, clickable, onClick } = props;

     return (
          <div id={id} className={"card-shadow px-8 py-6 " + (clickable && "scale-hover cursor-pointer")} onClick={onClick}>
               <div className="grid grid-cols-12 gap-7 items-center">
                    <div className="col-span-12 lg:col-span-4">
                         <img src={image ? image : "/assets/images/defaultProfilePhoto.jpg"} className="rounded-full w-36 h-36 object-cover" alt="imageConsultant" />
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                         <h1 className="text-blue-1 text-size-5 font-bold">{name}</h1>
                         <Gap height={5} />
                         <p className="text-gray-1">{description ? description : "No description"}</p>
                    </div>
               </div>
          </div>
     )
}

export default ConsultantCard
