import React, { useEffect, useState} from "react";
import { NavLink, useHistory, useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, deleteOnePost } from "../../../store/posts";
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

    useEffect(() => {
        dispatch(getAllPosts())
}, [])

    if (!user) {
        return (
            <Redirect to='/'/>
        )
    }

    const handleDelete = (id) => {
        dispatch(deleteOnePost(id))
        history.push(`/`)
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

             </div>

            </div>
    )

}


export default SinglePost
