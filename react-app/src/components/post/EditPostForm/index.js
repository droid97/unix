import React, { useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateOnePost } from "../../../store/posts";
import './EditPostForm.css'



const EditPostForm = () => {
    const history = useHistory();
    const id = useParams().id
    const [errors, setErrors] = useState([]);
    const [caption, setCaption] = useState('');
    const oldCaption = useSelector(state => state?.posts[id]?.caption)
    const post = useSelector(state => state?.post);
console.log(post, "postttttt")

    const validate = () => {

        const errors = [];

        if (!caption) {
            errors.push("Please provide a caption for your post!")
        }
        else if (caption.length > 2200) {
            errors.push("Character limit is 2200.")
        }
        return errors
    }

    const user = useSelector(state => state?.session.user);
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }})
    const image = useSelector(state => {
        return state?.posts[id]?.imgURL
    })

    useEffect(() => {
        setCaption(oldCaption)
    }, [oldCaption])



    const dispatch = useDispatch();

    const updateCaption = e => {
        setCaption(e.target.value)
    }

    const onEdit = async e => {


        e.preventDefault();
        const errors = validate();

        if (errors.length > 0) return setErrors(errors);

        const editedPost = {
            id: +id,
            user_id: userId,
            imgURL: image,
            caption
        }

        let submitted = await dispatch(updateOnePost(editedPost))
        if (submitted) {
            history.push(`/posts/${id}`)
        }
    }

    if (!user) {
        return (
            <Redirect to='/'/>
        )
    }

    return (
        <form onSubmit={onEdit} >
            <div className="edit-container" >
                <div>
                <div className="errors-edit-post">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                    </div>
                </div>
                <div>
                    <img src={image} width="600px"></img>
                </div>
                    <div>
                <div>
                    <label  className='edit-caption' htmlFor='caption'>Caption</label>
                    <textarea className='edit-caption'
                        name='caption'
                        type='text'
                        placeholder="Write a caption"
                        value={caption}
                        onChange={updateCaption}
                    />
                </div>
                <button className='edit-form-button'  type='submit'>Post Edit</button>
            </div>
            </div>
        </form>
    )
}

export default EditPostForm
