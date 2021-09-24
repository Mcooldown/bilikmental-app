import Gap from '../../atoms/Gap';
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
          <div key={id} className="card-shadow cursor-pointer scale-hover p-7" onClick={onClick}>
               <h1 className={styles.textQuote + " text-size-4 font-bold text-blue-1"}>{quote}</h1>
               <Gap height={9} />
               <p className="text-size-6 text-gray-1">- {author}</p>
               <Gap height={6} />
          </div>
     )
}

export default QuoteCard;
