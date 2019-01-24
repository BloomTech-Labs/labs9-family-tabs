import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 
import styled from "styled-components";



const  SignUpTop = styled.div`
  border: 2px solid red; 
  max-width: 100%;
  max-height: 100%;
  /* display: flex; 
  align-items: center; 
  justify-content: center; */
`;


class SignUp extends Component { 

    render() {
      
      return (
        <div>
          <SignUpTop>
              <h1>Join Family Tabs today! Choose from our standard or premium account options.</h1>
              <p>Family Tabs free accounts automatically offers a single parent account with up to two children. For only 9.99 a month the Premium account includes three admins and and unlimited amount of children accounts. Your information is always safe with us, and will never be sold to third parties under any circumstances. With Family Tabs we make it easy to keep tabs on the whole family!</p>
              <h3>Standard Family Tabs Option</h3>
              <p>Enjoy two Admin accounts and two child accounts with our free standard option</p>
              <Link to="/verify">Sign Up for Family Tabs!</Link>
              <h3>Premium Family Tabs Option</h3>
              <p>Have a larger brood? Add an extra Admin account, and unlimited child accounts with our Premium option for just $9.99 a month!</p>
              <Link to="/verify">Sign Up for Family Tabs Premium!</Link>

            
            
              
          </SignUpTop>
        </div>
      )
    }
  }
  
  export default SignUp;