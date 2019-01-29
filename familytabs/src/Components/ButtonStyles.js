import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Colors} from "@blueprintjs/core";

class ButtonStyles extends Component {
    render() {
        return (
            <Button 
            style={{ color: Colors.WHITE, background: "#242943", border: "2px solid #ffffff", padding: "1% 2% 2% 2%", width:"250px", height: "50px"}} 
            fill={false} 
            rightIcon="arrow-right" 
            large={true}
            text={this.props.text}
            ></Button>
        )
    }
}

export default ButtonStyles;