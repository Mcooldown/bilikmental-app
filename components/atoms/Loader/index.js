import style from "./Loader.module.css";

const Loader = () => {
     return (
          <div class=" flex justify-center items-center">
               <div class={ style.loader +  " ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"}></div>
          </div>  
     )
}

export default Loader;
