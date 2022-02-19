
import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoButton from './auth/DemoUser';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/unix' exact={true} activeClassName='active'>
            Unix
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/new-post' exact={true} activeClassName='active'>
            Make a post
          </NavLink>
        </li>
        <li>
          <NavLink to='/feed' exact={true} activeClassName='active'>
            Feed
          </NavLink>
        </li>
        <li>
          <DemoButton />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
