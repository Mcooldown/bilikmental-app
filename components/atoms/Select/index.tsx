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
     onChange?: VoidFunction,
     options: Array<string>,
     defaultValue: string,
}

const Select = (props: selectProps) => {

     const { name, id, value, options, disabled, width, label, isFull, defaultValue, onChange } = props;

     return (
          <Fragment>
               {
                    label &&
                    <label className="block text-gray-1 mb-1" htmlFor={id}>
                         {label}
                    </label>
               }
               <select defaultValue={defaultValue} value={value} disabled={disabled} style={{ width: width }} className={styles.select + (isFull ? " w-full" : "") + " p-2 focus:outline-none"} id={name}
                    onChange={onChange}>
                    <option value="">Choose gender...</option>
                    {
                         options.map(option => {
                              return <option value={option}>{option}</option>
                         })
                    }
               </select>
          </Fragment>
     )
}

export default Select;
