import styles from './Button.module.css';

interface ButtonProps {
     title: String;
     type: Number;
}

const Button = (props: ButtonProps) => {

     const { title, type } = props;

     const style = type === 1 ? styles.type1 : styles.type2;

     return (
          <button className={style}>{title}</button>
     )
}

export default Button
