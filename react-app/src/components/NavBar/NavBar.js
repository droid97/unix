
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserOptions from '../UserOptions/UserOptions';
import { ImPacman } from "react-icons/im";
import { SiAboutdotme } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { getAllPosts } from '../../store/posts';
import logo from "./unity.PNG"
import './NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const [profileInfoOpen, setProfileInfoOpen] = useState(false)
  const user = useSelector(state => {
    if (state.session.user) {
      return state.session.user
    }
  })
  let circleProfile = profileInfoOpen ? 'clicked-circle' : ""
  const onClick = () => {
    dispatch(getAllPosts())
  }

  return (
    <nav>
       <div id='navBarDiv'>
       {user?.id && (
              <NavLink to='/feed' exact={true} activeClassName='active'>
          <img id='logo' src={logo} alt=''/>
        </NavLink>
       )}

        {user?.id && (
          <div id='iconsDiv'>


          <NavLink to='/new-post' exact={true} activeClassName='active'>
          <ImPacman className="iconwhite" onClick={onClick} id='addPostIcon' />
          </NavLink>








<div id='profilePicDiv'>
            <div id='profilePicInnerDiv'>
              <CgProfile id='profileButton' className={circleProfile} src={user?.profileURL} alt={user?.username}
                onClick={() => setProfileInfoOpen(!profileInfoOpen)}
                />
            </div>
            {profileInfoOpen && (
              <div id='userOptionsDiv' className='dropdown-content'
              onMouseLeave={() => setProfileInfoOpen(false)}
              onClick={() => setProfileInfoOpen(false)}
              >
                <UserOptions />
              </div>
            )}
          </div>
          </div>
)}


</div>
    </nav>
  );
}

export default NavBar;
