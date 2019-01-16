import React from 'react';
import './Navigation.css';
import {Link} from 'react-router-dom'
import styled from "styled-components";

const NavBarStyling = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 220px;
    height: 100vh;
    background-color: #D3D3D3;
    border: 1px solid rgb(122, 122, 122);
    border-radius: 0.1rem;
    position: fixed;
    top: 0; 
`;

const Navigation = props => {
    return (
      <NavBarStyling>
       <h1>Family Tabs</h1>
       <div className='nav_buttons_container'>
       <Link to='/home/tabs' className="nav_button">Family Tabs</Link>
       <Link to='/home/notifications' className="nav_button">Notifications</Link>
       <Link to='/home/settings' className="nav_button">Account Settings</Link>
       <Link to='/home/household' className="nav_button">Household</Link>
       <Link to='/home/billing' className="nav_button">Billing</Link>
       <button onClick={props.auth.logout}>Log out</button>
       </div>
       </NavBarStyling>
    )
  }
  
  export default Navigation;
  