import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelItem({ hotel }) {
    const [rating, setRating] = useState([]);
    useEffect(() => {
        switch (Math.round(parseInt(hotel.rating))) {
            case 10:
                setRating(["10/10", "Amazing"]);
                break;
            case 9:
                setRating(["9/10", "Great"]);
                break;
            case 8:
                setRating(["8/10", "Very Good"]);
                break;
            case 7:
                setRating(["7/10", "Good"]);
                break;
            case 6:
                setRating(["6/10", "Fine"]);
                break;
            case 5:
                setRating(["5/10", "Average"]);
                break;
            case 4:
                setRating(["4/10", "Bad"]);
                break;
            case 3:
                setRating(["3/10", "Very Bad"]);
                break;
            case 2:
                setRating(["2/10", "Horrible"]);
                break;
            case 1:
                setRating(["1/10", "Appaling"]);
                break;

            default:
                setRating(["?", "Not Rated Yet"]);
                break;
        }
    }, [hotel]); // eslint-disable-line

    return (
        <div className="p-5 relative">
            <div className="bg-gray-200 flex flex-col md:flex-row md:justify-between md:items-center w-full rounded-sm  overflow-hidden ">
                <div className="md:w-1/4 relative text-sm">
                    <img
                        src={
                            hotel.image
                                ? `${process.env.REACT_APP_BASE_URL}/img/hotels/${hotel.image}`
                                : "http://placehold.it/300x300?text=hotel"
                        }
                        className="w-full h-40 object-cover"
                        alt="hotel"
                    />
                    <div className="text-xs flex items-center justify-evenly absolute bottom-0 w-f p-2 rounded-tr-lg overflow-hidden">
                        <div className="h-8 w-8 rounded-full border-2 border-gray-100 flex justify-center items-center z-10">
                            <span className="text-gray-100 font-semibold">
                                {rating[0]}
                            </span>
                        </div>
                        <span className="ml-2 text-gray-100 font-semibold z-10">
                            {rating[1]}
                        </span>
                        <div className="bg-gray-600 absolute w-full h-full opacity-75"></div>
                    </div>
                </div>
                <div className="p-5 md:w-3/4">
                    <div className="font-semibold text-2xl flex flex-col md:flex-row md:justify-between">
                        <Link
                            to={`/hotel/${hotel.id}`}
                            className="text-orange-900 hover:text-orange-700"
                        >
                            <span>{hotel.name}</span>
                        </Link>
                        <span className="font-normal text-base flex flex-col md:justify-center md:items-center">
                            <span className="">Starting From</span>
                            <span className="font-semibold text-2xl">
                                {hotel.min_price}DH
                            </span>
                        </span>
                    </div>
                    <div className="mt-5">
                        <div className="flex flex-col md:flex-row justify-between md:items-center">
                            <div className="mr-5 text-gray-900">
                                {Array(hotel.star)
                                    .fill()
                                    .map((x, i) => (
                                        <i
                                            className="fas fa-star fa-xs text-orange-400"
                                            key={i}
                                        ></i>
                                    ))}
                            </div>
                            <Link
                                to={`/hotel/${hotel.id}`}
                                className="mt-5 md:mt-0 bg-yellow-600 rounded-sm text-center text-white hover:bg-yellow-700 text-sm px-8 py-2 shadow
                    hover:shadow-lg"
                                type="button"
                            >
                                CHECK ROOMS
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelItem;
