import { Fragment } from 'react';
import Gap from '../Gap';
import styles from './Input.module.css';

interface inputProps {
     name?: string,
     id?: string,
     value?: string,
     disabled?: boolean,
     width?: number,
     label?: string,
     type?: string,
     placeholder?: string,
     isFull?: boolean,
     onChange?: (e?: any) => void,
     required?: boolean,
     errorMessage?: string,
}

const Input = (props: inputProps) => {

     const { name, id, value, disabled, width, label, type, placeholder, isFull,
          onChange, required, errorMessage } = props;

     return (
          <Fragment>
               {
                    label &&
                    <Fragment>
                         <label className="block text-gray-1" htmlFor={id}>
                              {label} {required && <span className="text-red-500">*</span>}
                         </label>
                         <Gap height={4} />
                    </Fragment>
               }
               <input value={value} disabled={disabled} style={{ width: width }} className={styles.input + " " + (errorMessage ? styles.inputError : styles.inputDefault) + (isFull ? " w-full" : "") + " py-2 px-3 focus:outline-none"} id={name} type={type} placeholder={placeholder}
                    onChange={onChange} />
               {
                    errorMessage && <small className="text-red-400">{errorMessage}</small>
               }
          </Fragment>
     )
}

export default Input
