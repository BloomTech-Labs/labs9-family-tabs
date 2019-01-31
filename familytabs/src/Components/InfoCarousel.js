import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import Family1 from './images/Family_Play_1.jpg';
import Family2 from './images/Family_Play_2.jpg';
import Family3 from './images/Family_Play_3.jpg';
import Family4 from './images/Family_Play_4.jpg';
import Family5 from './images/Family_Play_5.jpg';


const StyledCarousel = styled(Carousel)`
    /* height: 45%;
    width: 45%; */
`;
 
class InfoCarousel extends Component {
    render() {
        return (
            <StyledCarousel  showArrows={true} >
                <div>
                     <img src={Family1}/>
                    <p className="legend">Time for Play!</p>
                </div>
                <div>
                     <img src={Family2}/>
                    <p className="legend">Time for Hanging Out!</p>
                </div>
                <div>
                     <img src={Family3}/>
                    <p className="legend">Time for Learning!</p>
                </div>
                <div>
                     <img src={Family4}/>
                    <p className="legend">Time for Activities!</p>
                </div>
                <div>
                     <img src={Family5}/>
                    <p className="legend">Keep Tabs on the Whole Family!</p>
                </div>
            </StyledCarousel>
        );
    }
};



// onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}

export default InfoCarousel;