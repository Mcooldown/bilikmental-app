import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import Button from "../../atoms/Button";
import Gap from "../../atoms/Gap";
import Input from "../../atoms/Input";

const Comment = (props) => {
     
     const {comment, editId, commentText, handleUpdateComment, handleCancelComment,
           handleEditComment, handleDeleteComment, buttonLoading, userId,
          handleSetCommentText} = props;

     return (
          <Fragment key={comment._id}>
               <Gap height={20} />
               <div className={editId !== comment._id ? "flex justify-between" : ""}>
                    <div className="flex items-start">
                         <img src={comment.user.photo} className="rounded-full w-12 h-12" alt={comment._id} />
                         <Gap width={20} />
                         <div>
                              <div className="flex items-center">
                                   <h1 className="text-size-6 font-bold text-blue-1">{comment.user.name.first + " " + comment.user.name.last}</h1>
                                   {
                                        comment.isEdited && 
                                        <Fragment>
                                             <Gap width={10} />
                                             <small className="text-gray-1">Edited</small>
                                        </Fragment>
                                   }
                              </div>
                              {
                                   editId !== comment._id &&
                                   <p className="text-dark-1">{comment.text}</p>
                              }
                         </div>
                    </div>
                    {
                         editId === comment._id &&
                         <div>
                              <Gap height={20} />
                              <Input type="text" value={commentText} onChange={(e) => handleSetCommentText(e.target.value) } id="commentText" 
                                   name="commentText" placeholder="Write your comment here" isFull />
                              <Gap height={15} />
                              <div className="flex justify-end">
                                   <Button type={1} title="Cancel" onClick={handleCancelComment} />
                                   <Gap width={10} />
                                   <Button type={2} title="Update" isLoading={buttonLoading ? true : false} onClick={handleUpdateComment} />
                              </div>
                         </div>
                    }
                    {
                         userId && comment.user._id === userId && editId !== comment._id &&
                         <div className="flex">
                              <p className="text-gray-1">{new Date(comment.createdAt).toLocaleString('en-US',{day: "numeric", month: "long", year: "numeric"})}</p>
                                   <Fragment>
                                        <Gap width={15} />
                                        <FontAwesomeIcon icon={faEdit} size="lg" className="text-gray-600 cursor-pointer" onClick={() => handleEditComment(comment._id, comment.text) } />
                                        <Gap width={10} />
                                        <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500 cursor-pointer" onClick={() => handleDeleteComment(comment._id)} />
                                   </Fragment>
                         </div>
                    }
               </div>
               <Gap height={20} />
          </Fragment>
     )
}

export default Comment;
