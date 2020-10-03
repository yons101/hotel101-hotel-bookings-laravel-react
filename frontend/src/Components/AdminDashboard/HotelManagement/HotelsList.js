import React, { useEffect } from "react";
import HotelItem from "./HotelItem";
import { useSelector, useDispatch } from "react-redux";
import { getAllHotels } from "../../../redux/actions/hotels";
import { setSuccess } from "../../../redux/actions/global";
import { Link } from "react-router-dom";
import Loading from "../../Global/Loading";
import ErrorMessage from "../../Global/ErrorMessage";
import SuccessMessage from "../../Global/SuccessMessage";
import Pagination from "../../Global/Pagination";

function HotelsList() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    useEffect(() => {
        getAllHotels(dispatch, state.auth.token);
        document.title = `Hotels Management`;
    }, []); // eslint-disable-line

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [state.hotels.success]); // eslint-disable-line

    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  rounded-t-none md:rounded-t-md">
            <h2 className="text-xl font-semibold">All Hotels</h2>
            {state.hotels.loading && <Loading />}
            {state.hotels.success === false && (
                <ErrorMessage errors={state.hotels.errors} />
            )}
            {state.hotels.success && <SuccessMessage message="Success" />}
            <Link
                to="/add-hotel"
                className="mt-5 px-2 py-1 inline-block rounded-sm  text-gray-100 bg-green-600 hover:bg-green-900 "
            >
                Add a Hotel
            </Link>

            {state.hotels.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.hotels}
                    method={getAllHotels}
                    params={[dispatch, state.auth.token]}
                />
            )}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {state &&
                    state.hotels.allHotels.map((hotel) => {
                        return <HotelItem key={hotel.id} hotel={hotel} />;
                    })}
            </div>
            {state.hotels.allHotels.length === 0 && (
                <div className="mt-10">There are no hotels!</div>
            )}
            {state.hotels.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.hotels}
                    method={getAllHotels}
                    params={[dispatch, state.auth.token]}
                />
            )}
        </div>
    );
}

export default HotelsList;
