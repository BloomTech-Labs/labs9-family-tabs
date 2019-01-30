import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import FTLogo4 from './images/FT_Logo_4.jpg';


const ImageStyles = styled.img `
    width: 100%;
    height: 100%;
    border-radius: 25%;
`;

const LogoStyles = styled.a`
    width: 30%;
    height: 30%;
    margin-bottom: 10px;
    :hover {
        cursor: pointer;
    }
`;

const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 7.5px;
`;

const NavBarStyling = styled.div`
    border: 2px solid orange;
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 280px;
    background-color: #242943;
    border: 1px solid rgb(122, 122, 122);
    border-radius: 0.1rem;
    top: 0;
    height: 100%;
`;


const NavLinksContainer = styled.div`
    margin: 0.5rem 0 0 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
`;

const NavLink = styled(Link) `
    color: white;
    background: #242943;
    display: flex;
    justify-content: center;
    width: 100%; 
    height: 50px;
    margin-bottom: 6.5px;
    :hover {
    text-decoration: none;
    color: #3985ac;
}
`;

const LogoutButton = styled.button`
    color: white;
    background: #242943;
    display: flex;
    justify-content: center;
    border: none;
    width: 100%; 
    height: 50px;
    margin-bottom: 6.5px;
    :hover {
      cursor: pointer;
      color: #3985ac;
}
`;


class Navigation extends Component {

    render(){
    return (
      <NavBarStyling>
       <ImgWrapper>
       <LogoStyles href='/home/tabs'>
       <ImageStyles src={FTLogo4} alt="FTLogo3"></ImageStyles>
       </LogoStyles>
       </ImgWrapper>
        <NavLinksContainer>
            <NavLink to='/home/tabs'>Family Tabs</NavLink>
            <NavLink to='/home/notifications'>Notifications</NavLink>
            <NavLink to='/home/settings'>Settings</NavLink>
            <NavLink to='/home/household'>Household</NavLink>
            <NavLink to='/home/billing'>Billing</NavLink>
        </NavLinksContainer>
       <LogoutButton onClick={this.props.auth.logout}>Log out</LogoutButton>
        </NavBarStyling>
    )
  }
  }
  export default Navigation;





