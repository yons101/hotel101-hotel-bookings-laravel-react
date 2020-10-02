import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default class SimpleSlider extends React.Component {
    state = {
        photoIndex: 0,
        isOpen: false,
        images: []
    };
    componentDidUpdate(prevProps) {
        if (this.props.images !== prevProps.images) {
            this.setState({
                ...this.state,
                images: this.props.images
            });
        }
    }

    render() {
        const { photoIndex, isOpen, images } = this.state;

        var settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            arrows: true,
            className: "rounded-md overflow-x-hidden shadow-xl",
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };
        return (
            <>
                {images.length !== 0 && (
                    <div className="mt-10" data-aos="fade-up">
                        {isOpen && (
                            <Lightbox
                                mainSrc={`${process.env.REACT_APP_BASE_URL}/img/hotels/${images[photoIndex].image}`}
                                nextSrc={
                                    images[(photoIndex + 1) % images.length]
                                }
                                prevSrc={
                                    images[
                                        (photoIndex + images.length - 1) %
                                            images.length
                                    ]
                                }
                                onCloseRequest={() =>
                                    this.setState({
                                        ...this.state,
                                        isOpen: false
                                    })
                                }
                                onMovePrevRequest={() =>
                                    this.setState({
                                        ...this.state,
                                        photoIndex:
                                            (photoIndex + images.length - 1) %
                                            images.length
                                    })
                                }
                                onMoveNextRequest={() =>
                                    this.setState({
                                        ...this.state,
                                        photoIndex:
                                            (photoIndex + 1) % images.length
                                    })
                                }
                            />
                        )}
                        <div className="mt-5 md:mt-0 relative">
                            <Slider {...settings}>
                                {images.map((element, i) => (
                                    <img
                                        src={`${process.env.REACT_APP_BASE_URL}/img/hotels/${element.image}`}
                                        key={i}
                                        alt="slider"
                                        className="h-64 w-full object-cover cursor-pointer"
                                        onClick={() =>
                                            this.setState({
                                                ...this.state,
                                                photoIndex: i,
                                                isOpen: true
                                            })
                                        }
                                    />
                                ))}
                            </Slider>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
