import React from 'react';
import styled from "styled-components";
 

const NavBarStyling = styled.div`
    font-family: sans-serif;
`;
const StyledNav = styled(NavBarStyling)`
    h1 {
     text-align: center;
    }

   .NavButtonsContainer a {
    display: block;
    padding: .7rem 15px;
    color: inherit;
    text-decoration: none;

    .NavButtonsContainer a:hover {
    color: inherit;
    text-decoration: none;
    background-color: #eee;
}

    .NavButtonsContainer a:focus {
    text-decoration: none;
}

    .NavButtonsContainer a:visited {
    color: inherit;
}
}
`;


class Navigation extends React.Component {

    render(){
       
    return (
      <NavBarStyling>
      <StyledNav>
       <h1>Family Tabs</h1>
        <div classname = 'NavButtonsContainer'>
            <a href='/home/tabs'>Family Tabs</a>
            <a href='/home/notifications'>Notifications</a>
            <a href='/home/settings'>Account Settings</a>
            <a href='/home/household'>Household</a>
            <a href='/home/billing' className="nav_button">Billing</a>

            {/* <Buttons onClick={this.props.auth.logout}>Log out</Buttons> */}
        </div>
        </StyledNav>
       </NavBarStyling>
    
    )
  }
  }
  export default Navigation;
  