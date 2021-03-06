import style from "./Loader.module.css";

const Loader = () => {
     return (
          <div className=" flex justify-center items-center">
               <div className={ style.loader +  " ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"}></div>
          </div>  
     )
}

export default Loader;
