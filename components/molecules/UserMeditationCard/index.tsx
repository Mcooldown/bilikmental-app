import Gap from '../../atoms/Gap';
import styles from './UserMeditation.module.css';

interface propsObj {
     id: string;
     title: string;
     progress: number;
     onClick?: VoidFunction;
}

const UserMeditationCard = (props: propsObj) => {

     const { id, title, progress, onClick } = props;

     return (
          <div id={id} className="card-shadow cursor-pointer scale-hover" onClick={onClick}>
               <img src="/assets/images/articleSample.jpeg" className={styles.image} />
               <div className="p-5">
                    <h1 className={styles.titleMeditation + " text-size-4 font-bold text-blue-1"}>{title}</h1>
                    <Gap height={5} />
                    <p className="text-gray-1">{progress}% completed</p>
                    <Gap height={5} />
               </div>
          </div>
     )
}

export default UserMeditationCard;
