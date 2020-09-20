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
            let _images =
                this.props.images !== null ? this.props.images.split(",") : [];
            this.setState({
                ...this.state,
                images: _images
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
            arrows: false,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        };
        return (
            <>
                {images.length !== 0 && (
                    <div className="flex flex-col mt-5 h-64 md:mt-0 md:flex-row">
                        <div className="flex md:justify-center md:items-center md:w-1/4">
                            <h2 className="text-2xl text-orange-800  font-semibold mt-5 pl-5">
                                In Pictures
                            </h2>
                        </div>
                        {isOpen && (
                            <Lightbox
                                mainSrc={`${process.env.REACT_APP_BASE_URL}/img/rooms/${images[photoIndex]}`}
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
                        <div className="mt-5 md:mt-0 md:w-3/4 relative">
                            <Slider {...settings}>
                                {images.map((image, i) => (
                                    <img
                                        src={`${process.env.REACT_APP_BASE_URL}/img/rooms/${image}`}
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
