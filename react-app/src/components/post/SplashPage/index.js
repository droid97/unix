import React from 'react';
import { NavLink } from 'react-router-dom';
import './SplashPage.css'

const SplashPage = () => {
    return (
        <div className="macbook-pro-141 clip-contents">
        <div className="footer-version-10 clip-contents">
          <div className="group-1023 flex-row-hsb">


    </div>
        </div>
        <div className="group-599">
        <div style={{ backgroundImage: "" }}/>

        </div>
        <div className="group-8">
          <div className="group-6 flex-col-vsb">
            <div className="group-5">
              <p className="txt-669">Join our community of gamers</p>
            </div>
            <p className="txt-373">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard.
            </p>
          </div>
          <div className="group-7">
            <NavLink to='/login' exact={true}>
            <p className="txt-469">Log in</p>
            </NavLink>
          </div>
        </div>
        <div className="group-71">
        <NavLink to='/sign-up' exact={true}>
          <p className="txt-876">Sign up</p>
          </NavLink>
        </div>
      </div>
    )

}

export default SplashPage;
