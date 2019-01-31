import React, { Component } from 'react'
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'
import Navigation from './Navigation'
import styled from 'styled-components'

const LogoutButton = styled.button`
    color: white;
    background: #242943;
    display: flex;
    justify-content: center;
    border: none; 
    height: 50px;
    margin-bottom: 6.5px;
    padding: 25px;

    :hover {
      cursor: pointer;
      color: #3985ac;
    }
`;

class NavBurger extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
    }
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  render() {
    return (
    this.props.familyID && this.props.profile.isAdmin ?
    <div>
      <CheeseburgerMenu
        // right={true}
        isOpen={this.state.menuOpen}
        closeCallback={this.closeMenu.bind(this)}>
        <Navigation auth={this.props.auth} closeCallback={this.closeMenu.bind(this)}/>
      </CheeseburgerMenu>
      
      <HamburgerMenu
        isOpen={this.state.menuOpen}
        menuClicked={this.openMenu.bind(this)}
        width={32}
        height={24}
        strokeWidth={3}
        rotate={0}
        color='#3985ac'
        borderRadius={0}
        animationDuration={0.5}
      />
      </div> : <LogoutButton onClick={this.props.auth.logout}>LOG OUT</LogoutButton>)
  }
}

export default NavBurger;