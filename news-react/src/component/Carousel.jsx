import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomLeftArrow, CustomRightArrow } from './CustomArrows';
export  default  function carousel (props) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: props.xl || 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div>
            <Carousel
                containerClass="container"
                keyBoardControl
                arrows
                swipeable
                autoPlaySpeed={3000}
                autoPlay={true}
                customLeftArrow={<CustomLeftArrow/>}
                customRightArrow={<CustomRightArrow/>}
                infinite={true}
                responsive={responsive}
                className="w-[80%] mx-auto my-5 z-10 overflow-y-auto">
                {props.callback}
            </Carousel>
        </div>
    );

}
