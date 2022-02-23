import React, { useEffect } from "react";
import { Redirect,  NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from "../../../store/posts";
import './PostListing.css'


const PostListing = () => {
    const posts = useSelector(state => state.posts);
    const userInfo = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const user = useSelector(state => {
        if (state.session.user) {
            return state.session.user
        }
    })


    const feed = Object.values(posts)
    feed.sort((a, b) => (a.color > b.color) ? 1 : -1)


    useEffect(() => {
      dispatch(getAllPosts());
  }, [dispatch])


    if (!user) {
        return (
            <Redirect to='/'/>
        )
    }

    return (
<div className='imgsContainer'>
<>
        {feed?.map((post, index) => (
            <NavLink to={`posts/${post?.id}`} key={index}>
            <img key={index} alt={post?.caption} src={post?.imgURL} height="400px" width="400px"></img>

          </NavLink>


        ))}
         </>
      </div>
    )
}

export default PostListing;
