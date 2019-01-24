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

class Navigation extends React.Component {

    render(){
       
    return (
      <NavBarStyling>
       <StyledH1>Family Tabs</StyledH1>
        <NavButtonsContainer>
            <Links to='/home/tabs'>Family Tabs</Links>
            <Links to='/home/notifications'>Notifications</Links>
            <Links to='/home/settings'>Settings</Links>
            <Links to='/home/household'>Household</Links>
            <Links to='/home/billing' className="nav_button">Billing</Links>
        </NavButtonsContainer>
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
  