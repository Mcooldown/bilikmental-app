import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
     title?: String;
     type: Number;
     onClick?: VoidFunction;
     isFull?: boolean;
     isLoading?: boolean;
     children?: ReactNode;
     disabled?: boolean;
}

const Button = (props: ButtonProps) => {

     const { title, type, onClick, isFull, isLoading, children, disabled } = props;

     const style =
          type === 1 ? styles.type1 :
               type === 2 ? styles.type2 : '';

     return (
          <button className={style + " disabled:opacity-50 " + styles.default + (isFull ? " w-full" : "")} onClick={onClick} disabled={disabled}>{children ? children : isLoading ? 'Please wait...' : title}</button>
     )
}

export default Button
