import styles from './QuoteCard.module.css';

interface propsObj {
     id: string;
     quote: String;
     author: String;
     onClick?: VoidFunction;
}

const QuoteCard = (props: propsObj) => {

     const { id, quote, author, onClick } = props;

     return (
          <div key={id} className={styles.cardQuote} onClick={onClick}>
               <h1 className={styles.textQuote + " mb-3 text-blue-1"}>{quote}</h1>
               <p className={styles.textAuthor + " mb-3 text-gray-1"}>- {author}</p>
          </div>
     )
}

export default QuoteCard;
