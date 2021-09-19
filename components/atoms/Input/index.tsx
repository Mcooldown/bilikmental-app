import { Fragment } from 'react';
import styles from './Input.module.css';

interface inputProps {
     name: string,
     id: string,
     disabled: boolean,
     width: number,
     label: string,
     type: string,
     placeholder: string,
}

const Input = (props: inputProps) => {

     const { name, id, disabled, width, label, type, placeholder } = props;

     return (
          <Fragment>
               {
                    label &&
                    <label className="block text-gray-1 mb-1" htmlFor={id}>
                         {label}
                    </label>
               }
               <input disabled={disabled} style={{ width: width }} className={styles.input + " py-2 px-3 focus:outline-none"} id={name} type={type} placeholder={placeholder} />
          </Fragment>
     )
}

export default Input
