import Gap from '../../atoms/Gap';
import styles from './ArticleCard.module.css';

interface propsObj {
     id: string;
     title: string;
     date: string;
     author: string;
     category: string;
     isConfirmed?: boolean;
     onClick?: VoidFunction;
     image?: string,
}

const ArticleCard = (props: propsObj) => {

     const { id, title, date, author, onClick, category, isConfirmed, image } = props;

     return (
          <div id={id} className="card-shadow cursor-pointer scale-hover" onClick={isConfirmed ? onClick : () => { }}>
               <img src={image ? image : "/assets/images/articleDefault.png"} className={styles.image} />
               <div className="p-5">
                    <p className="text-gray-1">{category} {
                         !isConfirmed &&
                         <span className="text-yellow-500">&nbsp;(Waiting for confirmation)</span>
                    }
                    </p>
                    <Gap height={5} />
                    <h1 className={styles.titleArticle + " text-size-4 font-bold text-blue-1"}>{title}</h1>
                    <Gap height={5} />
                    <p className="text-gray-1">by {author} | {date}</p>
                    <Gap height={5} />
               </div>
          </div>
     )
}

export default ArticleCard;
