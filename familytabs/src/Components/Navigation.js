import React from 'react';
import {Link} from 'react-router-dom'
import styled from "styled-components";


const NavBarStyling = styled.div`
    border: 2px solid orange;
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-direction: column;
    width: 280px;
    background-color: skyblue;
    border: 1px solid rgb(122, 122, 122);
    border-radius: 0.1rem;
    position: fixed;
    top: 0;
    height: 100%;
`;

const Links = styled(Link)`
    border: 4px solid orange;
    display: flex;
    align-items: center;
    color: white;
    font-weight: 300;
    border: 1px solid #86AEB1;
    width: 100%;
    height: 60px;
    padding-left: 15px;
    border-radius: 0.1rem;
    text-decoration: none;
`;

const Buttons = styled.button`
    border: 4px solid orange;
    background-color: skyblue;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    color: white;
    font-weight: 300;
    border: 1px solid #86AEB1;
    width: 100%;
    height: 60px;
    padding-left: 15px;
    border-radius: 0.1rem;
    text-decoration: none;
    font-size: 16px;
`;

const NavButtonsContainer = styled.div`
    margin: 0.5rem 0 0 0;

    flex-direction: column;
`;

const StyledH1 = styled.h1`
   font-family: 'Fredoka One';
   color: white;
   font-size: 18px;
   width: 100%;
   height: 60px;
   padding-left: 15px;
   padding-top: 30px;
   display: flex;
`;

const Navigation = props => {
    return (
      <NavBarStyling>
       <StyledH1>Family Tabs</StyledH1>
        <NavButtonsContainer>
            <Links to='/home/tabs'>Family Tabs</Links>
            <Links to='/home/notifications'>Notifications</Links>
            <Links to='/home/settings'>Account Settings</Links>
            <Links to='/home/household'>Household</Links>
            <Links to='/home/billing' className="nav_button">Billing</Links>

            <Buttons onClick={props.auth.logout}>Log out</Buttons>
        </NavButtonsContainer>
       </NavBarStyling>
    )
  }
  
  export default Navigation;
  