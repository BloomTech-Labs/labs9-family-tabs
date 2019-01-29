import React, { Component } from 'react';
import CalendarComponent from './Calendar';
//import {Redirect} from 'react-router-dom'
//import styled from "styled-components";




class ParentHome extends Component {
    render() {
      // if (this.props.family.length ===1){
      //   return <Redirect to='/home/household'></Redirect>
      // }
      return (
        <>
            <h1>Parent Homepage</h1>
            <CalendarComponent {...this.props}/>
            
        </>
      );
    }
  }
  
  export default ParentHome;