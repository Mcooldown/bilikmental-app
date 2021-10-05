import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import Comment from "../../components/molecules/Comment";
import Layout from "../../components/Layout";
import styles from "../../styles/SubPage.module.css";
import stylesDetail from "../../styles/Detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faShareAlt} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import Input from "../../components/atoms/Input";
import { useRouter } from "next/router";
import Loader from "../../components/atoms/Loader";
import Swal from "sweetalert2";
import Image from "next/image";

const ArticleDetail = () => {

     const router = useRouter();
     const [articleId, setArticleId] = useState(null);

     // const urlAPI = "http://localhost:4000";
     const urlAPI = "https://bilikmental-api.vercel.app";
     const [article, setArticle] = useState(null);
     const [moreArticles, setMoreArticles] = useState(null);
     const [comments, setComments] = useState(null);

     const [commentText, setCommentText] = useState('');
     const [buttonLoading, setButtonLoading] = useState(false);
     const [showAdd, setShowAdd] = useState(false);
     const [userId, setUserId] = useState(null);
     const [editId, setEditId] = useState(0);

     const fetchArticle = async (signal) => {
          try {
               const url = urlAPI + '/v1/articles/get-by-id';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         articleId: articleId,
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setArticle(json.data);
               }
          } catch (error) {
               console.log(error);
          }
     }

    const fetchMoreArticles = async (signal) => {
          try {
               const url = urlAPI + '/v1/articles';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         params: {
                              category: "All",
                              currentPage: 1,
                              perPage: 5,
                         }
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setMoreArticles(json.data);
               }
          } catch (error) {
               console.log(error);
          }
     }

     const fetchComments = async (signal) => {
          try {
               const url = urlAPI + '/v1/comments';
               const options = {
                    signal: signal,
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         type: "article",
                         contentId : articleId,
                    })
               };
               const res = await fetch(url, options);

               if(!res.ok){
                    throw Error("Data not fetched");
               }else{
                    const json = await res.json();
                    setComments(json.data);
               }
          } catch (error) {
               console.log(error);
          }
     }

     useEffect(() => {
          const abortCont = new AbortController();
          
          if(router.query.id){
               setUserId(localStorage.getItem('userId'));
               setArticleId(router.query.id);
               fetchArticle(abortCont.signal);
               fetchMoreArticles(abortCont.signal);
               fetchComments(abortCont.signal);
          }

          return () => abortCont.abort();
     }, [router,articleId]);


     const handleClickMoreArticle =(id) => {
          setShowAdd(false);
          setArticle(null);
          setMoreArticles(null);
          setComments(null);
          router.push('/articles/' + id);
     }

     const handleSubmitComment = () => {
          const abortCont = new AbortController();
          
          const submitComment = async() => {
               try {
                    const url = urlAPI + '/v1/comments/add';
                    const options = {
                         signal: abortCont.signal,
                         method: "POST",
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({
                              type: "article",
                              contentId: articleId,
                              text: commentText,
                              userId: userId,
                         })
                    };
                    const res = await fetch(url, options);

                    if(!res.ok){
                         throw Error("Error submit comment");
                    }
               } catch (error) {
                    console.log(error);
               }
          }

          setButtonLoading(true);
          submitComment().then(() => {
               Swal.fire({ icon: 'success', title: 'Success', text: 'New Comment Created', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
               setButtonLoading(false);
               setCommentText('');
               setShowAdd(false);
               fetchComments();
          } );

          return () => abortCont.abort();
     }

     const handleUpdateComment = (id) => {
          const abortCont = new AbortController();
          
          const updateComment = async() => {
               try {
                    const url = urlAPI + '/v1/comments/update';
                    const options = {
                         signal: abortCont.signal,
                         method: "POST",
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({
                              commentId: editId,
                              text: commentText,
                         })
                    };
                    const res = await fetch(url, options);

                    if(!res.ok){
                         throw Error("Error submit comment");
                    }
               } catch (error) {
                    console.log(error);
               }
          }

          setButtonLoading(true);
          updateComment().then(() => {
               Swal.fire({ icon: 'success', title: 'Success', text: 'Comment updated', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
               setButtonLoading(false);
               setCommentText('');
               setEditId(0);
               fetchComments();
          } );

          return () => abortCont.abort();
     }

     const handleDeleteComment = (id) => {
          const abortCont = new AbortController();
          
          const deleteComment = async() => {
               try {
                    const url = urlAPI + '/v1/comments/delete';
                    const options = {
                         signal: abortCont.signal,
                         method: "POST",
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({
                              commentId: id,
                         })
                    };
                    const res = await fetch(url, options);

                    if(!res.ok){
                         throw Error("Error delete comment");
                    }
               } catch (error) {
                    console.log(error);
               }
          }

          Swal.fire({
               icon: "warning",
               title: 'Do you want to delete this comment?',
               showDenyButton: true,
               confirmButtonText: 'Yes, delete it',
               confirmButtonColor: '#278AFF',
               denyButtonText: `Cancel`,
          }).then((result) => {
               if (result.isConfirmed) {
                    deleteComment().then(() => {
                         Swal.fire({ icon: 'success', title: 'Success', text: 'Comment successfully deleted', confirmButtonColor: '#278AFF', confirmButtonText: 'OK', timer: 5000, });
                         fetchComments();
                    })
               }
          })

          return () => abortCont.abort();
     }

     const handleAddComment = () => {
          setEditId(0);
          setShowAdd(true);
          setCommentText('');
     }

     const handleEditComment = (id, text) => {
          setEditId(id);
          setShowAdd(false);
          setCommentText(text);
     }

     const handleCancelComment = () => {
          setShowAdd(false);
          setCommentText('');
          setEditId(0);
     }

     return (
          <Layout pageTitle="Article Detail">
               {/* HEADER */}
               <div className={styles.subHeader}>
               </div>
               <div className={stylesDetail.contentWrapper}>
                    <div className="container mx-auto px-4 lg:px-12">
                         <div className={styles.content}>
                              <div className="grid grid-cols-12 gap-6">
                                   <div className="col-span-8">
                                        <div className="card-shadow px-6 py-8">
                                             {
                                                  article ?
                                                  <Fragment>
                                                       <h5 className="text-gray-1">Articles / {article.category}</h5>
                                                       <h1 className="text-size-3 font-bold text-blue-1">{article.title}</h1>
                                                       <Gap height={10} />
                                                       <div className="flex justify-between">
                                                            <p className="text-gray-1">Posted by {article.user.name.first + ' ' + article.user.name.last} at {new Date(article.updatedAt).toLocaleString('en-US',{day: "numeric", month: "long", year: "numeric"})}</p>
                                                            <FontAwesomeIcon icon={faShareAlt} size="lg" className="text-gray-1" />
                                                       </div>
                                                       <Gap height={20} />
                                                       {
                                                            article.image &&
                                                            <Image className="rounded" src={article.image} layout="responsive" width={4} height={2} objectFit="cover" />
                                                       }
                                                       <Gap height={20} />
                                                       <div dangerouslySetInnerHTML={{__html:article.content}}></div>
                                                       <Gap height={15} />
                                                  </Fragment>
                                                  : <Loader />
                                             }
                                        </div>
                                        <Gap height={20} />
                                        <div className="card-shadow px-6 py-8">
                                             <div className="flex justify-between items-center">
                                                  <h1 className="text-size-5 font-bold">Comments</h1>
                                                  {
                                                       !userId ? <p className="text-gray-1 cursor-pointer" 
                                                       onClick={() => router.push('/login')}>Login to write new comment</p>
                                                       : !showAdd ?
                                                       <div className="inline-flex items-center cursor-pointer" onClick={handleAddComment}>
                                                            <FontAwesomeIcon icon={faPlusCircle} size="lg" className="text-gray-1" />
                                                            <Gap width={10} />
                                                            <small className="text-gray-1">Add New Comment</small>
                                                       </div>
                                                       : null
                                                  }
                                             </div>
                                             <Gap height={10} />
                                             {
                                                  showAdd &&
                                                  <Fragment>
                                                       <hr />
                                                       <Gap height={20} />
                                                       <Input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value) } id="commentText" 
                                                       name="commentText" placeholder="Write your comment here" isFull />
                                                       <Gap height={15} />
                                                       <div className="flex justify-end">
                                                            <Button type={1} title="Cancel" onClick={handleCancelComment} />
                                                            <Gap width={10} />
                                                            <Button type={2} title="Submit" isLoading={buttonLoading ? true : false} onClick={handleSubmitComment} />
                                                       </div>
                                                       <Gap height={20} />
                                                  </Fragment>
                                             }
                                             <hr />
                                             {
                                                  comments && comments.length > 0 ? comments.map((comment, index) => {
                                                       return (
                                                            <Fragment key={comment._id}>
                                                                 <Comment comment={comment} commentText={commentText} editId={editId} userId={userId}
                                                                 buttonLoading={buttonLoading} handleUpdateComment={handleUpdateComment} handleCancelComment={handleCancelComment}
                                                                 handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment}
                                                                 handleSetCommentText={(text) => setCommentText(text)}  />
                                                                 {index !== comments.length-1 ? <hr /> : ''}
                                                            </Fragment>
                                                            )    
                                                       }
                                                  ) : comments ? 
                                                  <Fragment>
                                                       <Gap height={20} />
                                                       <p className="text-gray-1">No comments found</p>
                                                  </Fragment>
                                                  :
                                                  <Fragment>
                                                       <Gap height={30} />
                                                       <Loader />
                                                  </Fragment>
                                             }
                                        </div>
                                   </div>
                                   <div className="col-span-4">
                                        <div className="card-shadow px-6 py-8">
                                             <h1 className="text-size-5 font-bold">More articles</h1>
                                             <Gap height={10} />
                                             <hr />
                                             {
                                                  moreArticles ? moreArticles.map((article, index) => {
                                                       if(articleId !== article._id){
                                                            return (
                                                                 <div key={article._id} onClick={() => handleClickMoreArticle(article._id)} className="cursor-pointer">
                                                                      <Gap height={15} />
                                                                      <div className="grid grid-cols-12">
                                                                           <div className="col-span-4">
                                                                                <Image className="rounded" src={article.image ? article.image : "/assets/images/articleDefault.png"} layout="responsive" width={3} height={2} objectFit="cover" />
                                                                           </div>
                                                                           <div className="col-span-8 ml-4">
                                                                                <h1 className={"text-size-5 font-bold text-blue-1 " + stylesDetail.moreHeight}>{article.title}</h1>
                                                                           </div>
                                                                      </div>
                                                                      <Gap height={10} />
                                                                      {index < (moreArticles.length-1) && <hr />}
                                                                 </div>
                                                            )
                                                       }
                                                  })
                                                  : <Fragment>
                                                       <Gap height={30} />
                                                       <Loader />
                                                  </Fragment>
                                                  
                                             }
                                        </div>
                                   </div>
                              </div>
                              <Gap height={120} />
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default ArticleDetail;
