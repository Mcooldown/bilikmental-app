import styles from './Button.module.css';

interface ButtonProps {
     title: String;
     type: Number;
}

const Button = (props: ButtonProps) => {

     const { title, type } = props;

     const style =
          type === 1 ? styles.type1 :
               type === 2 ? styles.type2 : '';

     return (
          <button className={style + " " + styles.default}>{title}</button>
     )
}

export default Button
