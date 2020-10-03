import React, { useEffect, useState } from "react";
import Header from "../Global/Header";
import Footer from "../Global/Footer";
import Border from "../Global/Border";
import TitleSection from "../Global/TitleSection";
import Loading from "../Global/Loading";

import HotelHero from "./HotelHero";
import HotelRooms from "./HotelRooms";
import GuestReviewsList from "./GuestReviewsList";
import ReviewForm from "./ReviewForm";
import HotelGoogleMap from "./HotelGoogleMap";

import { getHotel } from "../../redux/actions/hotels";
import { getHotelReviews } from "../../redux/actions/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useSecureLs from "../Global/useSecureLs";

function Hotel(props) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    let { id } = useParams();
    const [_user_id] = useSecureLs("user_id");
    const [userId, setUserId] = useState(_user_id);

    useEffect(() => {
        getHotel(dispatch, id);
    }, [state.reviews]); // eslint-disable-line
    useEffect(() => {
        setUserId(userId);
        getHotelReviews(dispatch, id, userId);
    }, []); // eslint-disable-line

    let history = useHistory();
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!state.hotels.hotel) {
                history.push({
                    pathname: "/404",
                    state: {
                        message:
                            "There is no such hotel, you'll be redirected in a bit"
                    }
                });
            }
        }, 3000);
        document.title = `${state.hotels.hotel.name} Hotel`;
        return () => clearTimeout(timer);
    }, [state.hotels.hotel]); // eslint-disable-line
    return (
        <>
            {state.reviews.loading && <Loading />}

            <Header hotelId={id} />

            <HotelHero hotel={state.hotels.hotel} />

            {state.hotels.hotel && (
                <TitleSection title={`${state.hotels.hotel.name}'s Rooms`} />
            )}

            <HotelRooms hotel={state.hotels.hotel} />

            {state && state.reviews.reviews.length > 0 && (
                <>
                    <Border />

                    <TitleSection
                        title={`What guests say about ${
                            state.hotels.hotel && state.hotels.hotel.name
                        } Hotel`}
                    />
                    <GuestReviewsList reviews={state.reviews.reviews} />
                </>
            )}

            {state.auth.isAuthenticated && state.reviews.hasBooked ? (
                <>
                    <ReviewForm {...props} /> <Border />
                </>
            ) : (
                ""
            )}

            <Border my="16" />

            {state.hotels.hotel && (
                <TitleSection
                    title={`Where to find ${state.hotels.hotel.name} Hotel`}
                />
            )}

            {state.hotels.hotel && (
                <div className="relative w-full" style={{ height: "400px" }}>
                    <HotelGoogleMap
                        x={state.hotels.hotel.x_coordinate}
                        y={state.hotels.hotel.y_coordinate}
                    />
                </div>
            )}

            <Border />

            <Footer />
        </>
    );
}

export default Hotel;
