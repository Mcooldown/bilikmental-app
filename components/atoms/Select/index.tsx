import { Fragment } from 'react';
import styles from './Select.module.css';

interface selectProps {
     name?: string,
     id?: string,
     value?: string,
     disabled?: boolean,
     width?: number,
     label?: string,
     isFull?: boolean,
     onChange?: (e?: any) => void,
     options: Array<string>,
     defaultValue: string,
     required?: boolean,
     errorMessage?: string,
     withoutChoose?: boolean
}

const Select = (props: selectProps) => {

     const { name, id, value, options, disabled, width, label, isFull, defaultValue,
          onChange, required, errorMessage, withoutChoose } = props;

     return (
          <Fragment>
               {
                    label &&
                    <label className="block text-gray-1 mb-1" htmlFor={id}>
                         {label} {required && <span className="text-red-500">*</span>}
                    </label>
               }
               <select defaultValue={defaultValue} value={value} disabled={disabled} style={{ width: width }} className={styles.select + " " + (errorMessage ? styles.selectError : styles.selectDefault) + (isFull ? " w-full" : "") + " p-2 focus:outline-none"} id={name}
                    onChange={onChange}>
                    {
                         !withoutChoose &&
                         <option value="">Choose...</option>
                    }
                    {
                         options.map(option => {
                              return <option key={option} value={option}>{option}</option>
                         })
                    }
               </select>
               {
                    errorMessage && <small className="text-red-400">{errorMessage}</small>
               }
          </Fragment>
     )
}

export default Select;
