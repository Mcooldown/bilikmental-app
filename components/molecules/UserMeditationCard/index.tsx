import Button from '../../atoms/Button';
import Gap from '../../atoms/Gap';
import styles from './UserMeditation.module.css';

interface propsObj {
     id: string;
     title: string;
     progress: number;
     onClick?: VoidFunction;
     image?: string;
     onCancel?: VoidFunction;
     enrolledAt: string;
}

const UserMeditationCard = (props: propsObj) => {

     const { id, title, progress, onClick, image, onCancel, enrolledAt } = props;

     return (
          <div id={id} className="card-shadow cursor-pointer scale-hover">
               <img src={image ? image : "/assets/images/articleDefault.png"} className={styles.image} />
               <div className="p-5">
                    <h1 className={styles.titleMeditation + " text-size-4 font-bold text-blue-1"}>{title}</h1>
                    <Gap height={5} />
                    <p className="text-gray-1">{progress}% completed
                         <br />
                         Enrolled at {new Date(enrolledAt).toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <Gap height={30} />
                    <div className="lg:flex justify-end">
                         <Button type={1} title="Cancel" onClick={onCancel} />
                         <Gap width={15} />
                         <Button type={2} title="Do Meditation" onClick={onClick} />
                    </div>
                    <Gap height={5} />
               </div>
          </div>
     )
}

export default UserMeditationCard;
