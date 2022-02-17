import React, { useEffect, useState} from "react";
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, deleteOnePost } from "../../../store/posts";
import { getAllComments, addOneComment, deleteOneComment } from "../../../store/comments";
import { RiFileEditFill} from "react-icons/ri";
import { CgTrash } from "react-icons/cg";






const SinglePost = () => {

    const postId = useParams().id
    //const post_id = useParams().post_id
    const id = useParams().id
    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const history = useHistory()

    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }
    })

        //comments
        const commentsObj = useSelector(state => state.comments);
        const comments = Object.values(commentsObj);
        const commentForEachPost = comments.filter((comment) => comment.post_id === +id)

       //comments
        const sessionUser = useSelector(state => state.session.user);
        const [errors, setErrors] = useState([]);
        const [comment_text, setCommentText] = useState('');

        const validate = () => {

            const errors = [];

            if (!comment_text) {
                errors.push("Please provide a comment!")
            }
            else if (comment_text.length > 2200) {
                errors.push("Character limit is 2200.")
            }
            return errors
        }

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllComments(id))
}, [])

    if (!user) {
        return (
            <Redirect to='/'/>
        )
    }

    const handleDelete = (id) => {
        dispatch(deleteOnePost(id))
        history.push(`/feed`)
    }



    const handleComment = async e => {
        e.preventDefault();

        const errors = validate();

        if (errors.length > 0) return setErrors(errors);


        const newComment = {
            user_id: user.id,
            post_id: postId,
            comment_text
        };

        //dispatch(addOneComment(newComment))
        let submitted = dispatch(addOneComment(newComment))
        if (submitted) {
            history.push(`/posts/${postId}`)
            setCommentText('')
        }
    }


      const handleDeleteComment = (id) => {
        dispatch(deleteOneComment(id));
        history.push(`/posts/${postId}`);
      }
    return (
        <div className='singlepost'>
            <div>
                <img src={post[id]?.imgURL}   width="600px"></img>
                <p>{post[id]?.caption}</p>
            </div>

            <div>


                {post[id]?.user_id === userId && (
                  <NavLink to={`/posts/${id}/edit`}>
                        <RiFileEditFill/>
                    </NavLink>

                    )}
                    {post[id]?.user_id === userId && (
                        <CgTrash className="trash" onClick={() => handleDelete(id)}/>
                    )}

                    {sessionUser &&
                 <form onSubmit={handleComment} className='card-form' id='commentsForm'>
                  <div className="errors-comment">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                  </div>
                   <div className="commentF" id='commentsForm'>
                     <textarea
                       id='textCommentArea'
                       className="input-field-text-area"
                       onChange={(e) => setCommentText(e.target.value)}
                       value={comment_text}
                       placeholder='Comment here...'
                     />
                   <div className='commentButtonDiv'>
                     <button type='submit' className='commentButton'>Post Comment</button>
                   </div>
                   </div>
                 </form>
               }


             </div>

            </div>
    )

}


export default SinglePost
