import React from 'react';
import './Navigation.css';
import {Link} from 'react-router-dom'

const Navigation = () => {
    return (
      <div className='nav_container'>
       <h1>Family Tabs</h1>
       <div className='nav_buttons_container'>
       <Link to='/home/tabs' className="nav_button">Family Tabs</Link>
       <Link to='/home/notifications' className="nav_button">Notifications</Link>
       <Link to='/home/settings' className="nav_button">Account Settings</Link>
       <Link to='/home/household' className="nav_button">Household</Link>
       <Link to='/home/billing' className="nav_button">Billing</Link>
       </div>
      </div>
    )
  }
  
  export default Navigation;
  