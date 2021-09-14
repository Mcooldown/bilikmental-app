import styles from './ArticleCard.module.css';

interface propsObj {
     id: String;
     title: String;
     date: String;
     author: String;
}

const ArticleCard = (props: propsObj) => {
     return (
          <div className={styles.cardArticle}>
               <img src="/assets/images/articleSample.jpeg" className={styles.image} />
               <div className="p-5">
                    <p className="text-gray-1 mb-1">{props.date}</p>
                    <h1 className={styles.titleArticle + " text-blue-1"}>{props.title}</h1>
                    <p className="text-gray-1 my-1">by {props.author}</p>
               </div>
          </div>
     )
}

export default ArticleCard;
