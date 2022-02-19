import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import PostListing from './components/post/PostListing';
import SinglePost from './components/post/SinglePost';
import EditPostForm from './components/post/EditPostForm';
import EditCommentForm from './components/post/EditCommentForm';
import NewPostForm from './components/post/NewPostForm';
import SplashPage from './components/post/SplashPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';



import { authenticate } from './store/session';
import { getAllPosts } from './store/posts'
import { getAllComments } from './store/comments';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllPosts());
      await dispatch(getAllComments());
      setLoaded(true);
    })();
  }, [dispatch]);

  const comments = Object.values(useSelector(state => state.comments))

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
      <Route path='/unix' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/feed' exact={true}>
          <PostListing />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/new-post' exact={true}>
          <NewPostForm />
        </Route>
        <Route path='/posts/:id' exact={true}>
          <SinglePost/>
        </Route>
        <Route path='/posts/:id/edit'>
          <EditPostForm />
        </Route>
        <Route path='/comments/:id/edit' exact={true}>
          <EditCommentForm comments={comments}/>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
