import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { CgProfile } from "react-icons/cg";




const UserOptions = () => {
    const userId = useSelector(state => state?.session.user?.id)
    const user = useSelector(state => {
        if (state.session.user) {
          return state.session.user
        }
      })
    return (
        <div className="drop-downmenu">
            <NavLink to={`/users/${userId}`}>
                <p className="textProfileDropDown"><CgProfile id='profileProfile'  />{user?.username}</p>
            </NavLink>

            <div className="textProfileDropDown" id="logoutButtomDiv">
             <LogoutButton/>
            </div>
        </div>

    )
}

export default UserOptions
