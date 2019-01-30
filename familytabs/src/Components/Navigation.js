import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import styled from "styled-components";
import {AnchorButton, Colors} from "@blueprintjs/core";;

const Buttons = styled.button`
    border: 4px solid orange;
    background-color: #242943;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    color: white;
    font-weight: 300;
    border: 1px solid #86AEB1;
    width: 100%;
    height: 30px;
    padding-left: 15px;
    border-radius: 0.1rem;
    text-decoration: none;
    font-size: 12px;
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

const NavButtonsContainer = styled.div`
    margin: 0.5rem 0 0 0;
    flex-direction: column;
`;

const StyledH1 = styled.h1`
   font-family: 'Roboto';
   color: white;
   font-size: 18px;
   width: 100%;
   height: 60px;
   padding-left: 15px;
   padding-top: 30px;
   display: flex;
`;

class Navigation extends Component {


    render(){
    return (
      <NavBarStyling>
       <StyledH1>Family Tabs</StyledH1>
        <NavButtonsContainer>
            <AnchorButton style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", width:"100%", height: "50px"}} href="/home/tabs" text="Family Tabs" />
            <AnchorButton style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", width:"100%", height: "50px"}} href="/home/notifications" text="Notifications" />
            <AnchorButton style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", width:"100%", height: "50px"}} href="/home/settings" text="Settings" />
            <AnchorButton style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", width:"100%", height: "50px"}} href="/home/household" text="Household" />
            <AnchorButton style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", width:"100%", height: "50px"}} href="/home/billing" text="Billing" />
        </NavButtonsContainer>
       <Buttons onClick={this.props.auth.logout}>Log out</Buttons>
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
  