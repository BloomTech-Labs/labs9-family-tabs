import React from 'react';
import './Navigation.css';


const Navigation = () => {
    return (
      <div className='nav_container'>
       <h1>Family Tabs</h1>
       <div className='nav_buttons_container'>
       <button className="nav_button">Family Tabs</button>
       <button className="nav_button">Notifications</button>
       <button className="nav_button">Account Settings</button>
       <button className="nav_button">Household</button>
       <button className="nav_button">Billing</button>
       </div>
      </div>
    )
  }
  
  export default Navigation;
  