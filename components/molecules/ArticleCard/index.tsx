import Gap from '../../atoms/Gap';
import styles from './ArticleCard.module.css';

interface propsObj {
     id: string;
     title: string;
     date: string;
     author: string;
     onClick?: VoidFunction;
}

const ArticleCard = (props: propsObj) => {

     const { id, title, date, author, onClick } = props;

     return (
          <div id={id} className="card-shadow cursor-pointer scale-hover" onClick={onClick}>
               <img src="/assets/images/articleSample.jpeg" className={styles.image} />
               <div className="p-5">
                    <p className="text-gray-1">{date}</p>
                    <Gap height={5} />
                    <h1 className={styles.titleArticle + " text-size-4 font-bold text-blue-1"}>{title}</h1>
                    <Gap height={5} />
                    <p className="text-gray-1">by {author}</p>
                    <Gap height={5} />
               </div>
          </div>
     )
}

export default ArticleCard;
