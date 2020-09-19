import React, { useEffect } from "react";
import HotelCard from "./HotelCard";
import TitleSection from "../Global/TitleSection";
import { getFeaturedHotels } from "../../redux/actions/hotels";
import { useSelector, useDispatch } from "react-redux";

function FeaturedHotels() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    useEffect(() => getFeaturedHotels(dispatch), []); // eslint-disable-line

    return (
        <section className="px-5 xl:px-48">
            <TitleSection title="Featured Hotels" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {state &&
                    state.hotels.featuredHotels.map((hotel) => (
                        <HotelCard hotel={hotel} key={hotel.id} />
                    ))}
            </div>
        </section>
    );
}

export default FeaturedHotels;
