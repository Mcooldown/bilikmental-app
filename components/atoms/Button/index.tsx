import styles from './Button.module.css';

interface ButtonProps {
     title: String;
     type: Number;
     onClick: VoidFunction;
     isFull: boolean;
}

const Button = (props: ButtonProps) => {

     const { title, type, onClick, isFull } = props;

     const style =
          type === 1 ? styles.type1 :
               type === 2 ? styles.type2 : '';

     return (
          <button className={style + " " + styles.default + (isFull ? " w-full" : "")} onClick={onClick}>{title}</button>
     )
}

export default Button
