import React, { useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateOneComment } from "../../../store/comments";
import './EditCommentForm.css'

const EditCommentForm = () => {

    const history = useHistory();

    const commentId = useParams().id

    const comments = Object.values(useSelector(state => state.comments))

    const comment = comments.find(comment => comment.id === +commentId)
    console.log(comment, "comment")

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [comment_text, setComment] = useState('');
    const oldComment = useSelector(state => state?.comments[comment.id]?.comment_text)

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

    const user = useSelector(state => state?.session.user);
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }})
    // const commentId = useSelector(state => {
    //     if(state.comments)
    // }
    useEffect(() => {
        setComment(oldComment)
    }, [oldComment]) //aquiiiiiiiiiiiiii

    const updateComment = e => {
        setComment(e.target.value)
    }

    const onEdit = async e => {
        e.preventDefault()

        const errors = validate();

        if (errors.length > 0) return setErrors(errors);

        const editComment = {
            id: commentId,
            user_id: userId,
            post_id: comment.post_id,
            comment_text
        }
        let submitted = await dispatch(updateOneComment(editComment))
        if (submitted) {
            history.push(`/posts/${comment.post_id}`)
        }
    }

    if (!user) {
        return (
            <Redirect to='/unix'/>
        )
    }


    return (
        <form onSubmit={onEdit}>
            <div className="edit-container">
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                     className="edit-comment-input"
                        name='comment'
                        type='text'
                        placeholder="comment..."
                        value={comment_text}
                        onChange={updateComment}
                    />
                </div>
                <button type='submit' className="edit-form-button-comment">Post Comment</button>
            </div>
        </form>
    )
}

export default EditCommentForm
