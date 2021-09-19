import router from 'next/router';
import Button from '../../atoms/Button';
import styles from './QuoteCard.module.css';

interface propsObj {
     id: String;
     quote: String;
     author: String;
}

const QuoteCard = (props: propsObj) => {
     return (
          <div className={styles.cardQuote}>
               <h1 className={styles.textQuote + " mb-3 text-blue-1"}>{props.quote}</h1>
               <p className={styles.textAuthor + " mb-5 text-gray-1"}>- {props.author}</p>
               <Button type={1} title="Read More" isFull={false} onClick={() => router.push('/quotes')} />
          </div>
     )
}

export default QuoteCard;
