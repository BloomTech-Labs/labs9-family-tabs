import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
    height: 45%;
    width: 45%;

`;
 
class InfoCarousel extends Component {
    render() {
        return (
            <StyledCarousel  showArrows={true} >
                <div>
                     <img src ="https://www.thesprucepets.com/thmb/810a_HYIb2E8DxkedI6V-3gtkys=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg"/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://www.thesprucepets.com/thmb/810a_HYIb2E8DxkedI6V-3gtkys=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://www.thesprucepets.com/thmb/810a_HYIb2E8DxkedI6V-3gtkys=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </StyledCarousel>
        );
    }
};



// onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}

export default InfoCarousel;