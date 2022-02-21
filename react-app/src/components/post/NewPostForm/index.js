import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addOnePost } from "../../../store/posts";
import './NewPostForm.css'



const NewPostForm = () => {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [imgURL, setImgURL] = useState('');
    const [caption, setCaption] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const validUrl = require('valid-url')

    const validate = () => {

        const errors = [];
        if (!imgURL || !validUrl.isUri(imgURL)) {
             errors.push("Please provide an image URL for your photo.")
         }
         if (!caption) {
            errors.push("Please provide a caption for your photo.")
        }
         else if (caption.length > 2200) {
             errors.push("Character limit is 2200.")
         }
        return errors
    }

    const submit = async (e) => {
        e.preventDefault();
        const errors = validate();

        if (errors.length > 0) return setErrors(errors);

        const newPost = {
            user_id: user.id,
            imgURL,
            caption,
        }
        let submited = await dispatch(addOnePost(newPost)
        )
         if (submited) {
             history.push(`/feed`)

            //  if (submited) {
            //     history.push(`/users/${user.id}`)
         }

    }

    const updateImgURL = e => {
        setImgURL(e.target.value)
    }
    console.log(imgURL)

    const updateCaption = e => {
        setCaption(e.target.value)
    }

    //const empty = (imgURL === "")

    if (!user) {
        return (
            <Redirect to='/unix'/>
        )
    }
    return (
        <div className="macbook-pro-145 clip-contents">

        <div className="newpost">
            <form className="newpostForm" onSubmit={submit}>
                <div className="errors">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                        <div className="container flex-col-hcenter clip-contents">
      <div className="card flex-col-hcenter-vsb">
        <div className="ob-forms-imgurl clip-contents"
        >

          <p className="txt-464">imgUrl</p>
          <input className="frame flex-col clip-contents"
                                  name='imgURL'
                                  type='text'
                                  placeholder="Image URL"
                                  value={imgURL}
                                  onChange={updateImgURL}
                                  width="600px"
          />


        </div>
        <div className="card-_content flex-col-vsb clip-contents">
          <div className="ob-forms-caption flex-col clip-contents"
          >
            <p className="txt-762">caption</p>

            <textarea className="frame-1 flex-col clip-contents"
            name='caption'
            type='text'
            placeholder="Write a caption..."
            value={caption}
            onChange={updateCaption}/>


              <div className="minheight"
              />

          </div>
          <button type='submit' className="button-post">
            <p className="name-2 flex-hcenter">post</p>
          </button>
        </div>
      </div>
    </div>
                </div>

            </form>
            </div>
        </div>

    )


}


export default NewPostForm
