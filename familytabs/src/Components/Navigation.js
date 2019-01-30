import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import styled from "styled-components";
import {AnchorButton, Button, Colors} from "@blueprintjs/core";
import FTLogo4 from './images/FT_Logo_4.jpg';

const ImageStyles = styled.img `
    width: 25%;
    height: 10%;
    border-radius: 25%;
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
    width: 280px;
    background-color: #242943;
    border: 1px solid rgb(122, 122, 122);
    border-radius: 0.1rem;
    /* position: fixed; */
    top: 0;
    height: 100%;
`;


const NavButtonsContainer = styled.div`
    margin: 0.5rem 0 0 0;
    flex-direction: column;
`;


class Navigation extends Component {


    render(){
    return (
      <NavBarStyling>
       <ImgWrapper>
       <ImageStyles src={FTLogo4} alt="FTLogo3"></ImageStyles>
       </ImgWrapper>
        <NavButtonsContainer>
            <AnchorButton minimal={true} style={{ color: Colors.WHITE, colorbackground: "#242943",  width:"100%", height: "50px", marginBottom: "6.5px"}} href="/home/tabs" text="Family Tabs" />
            <AnchorButton minimal={true} style={{ color: Colors.WHITE, colorbackground: "#242943",  width:"100%", height: "50px", marginBottom: "6.5px"}} href="/home/notifications" text="Notifications" />
            <AnchorButton minimal={true} style={{ color: Colors.WHITE, colorbackground: "#242943",  width:"100%", height: "50px", marginBottom: "6.5px"}} href="/home/settings" text="Settings" />
            <AnchorButton minimal={true} style={{ color: Colors.WHITE, colorbackground: "#242943",  width:"100%", height: "50px", marginBottom: "6.5px"}} href="/home/household" text="Household" />
            <AnchorButton minimal={true} style={{ color: Colors.WHITE, colorbackground: "#242943",  width:"100%", height: "50px", marginBottom: "6.5px"}} href="/home/billing" text="Billing" />
        </NavButtonsContainer>
       <Button minimal={true} style={{ color: Colors.WHITE, colorbackground: "#242943", width:"100%", height: "50px"}} onClick={this.props.auth.logout}>Log out</Button>
        </NavBarStyling>
    )
  }
  }
  export default Navigation;





// import React from 'react';
// import styled from "styled-components";
 

// const NavBarStyling = styled.div`
//     font-family: sans-serif;
// `;
// const StyledNav = styled(NavBarStyling)`
//     h1 {
//      text-align: center;
//     }

//    .NavButtonsContainer a {
//     display: block;
//     padding: .7rem 15px;
//     color: inherit;
//     text-decoration: none;

//     .NavButtonsContainer a:hover {
//     color: inherit;
//     text-decoration: none;
//     background-color: #eee;
// }

//     .NavButtonsContainer a:focus {
//     text-decoration: none;
// }

//     .NavButtonsContainer a:visited {
//     color: inherit;
// }
// }
// `;


// class Navigation extends React.Component {

//     render(){
       
//     return (
//       <NavBarStyling>
//       <StyledNav>
//        <h1>Family Tabs</h1>
//         <div classname = 'NavButtonsContainer'>
//             <a href='/home/tabs'>Family Tabs</a>
//             <a href='/home/notifications'>Notifications</a>
//             <a href='/home/settings'>Account Settings</a>
//             <a href='/home/household'>Household</a>
//             <a href='/home/billing' className="nav_button">Billing</a>

//             {/* <Buttons onClick={this.props.auth.logout}>Log out</Buttons> */}
//         </div>
//         </StyledNav>
//        </NavBarStyling>
    
//     )
//   }
//   }
//   export default Navigation;
  