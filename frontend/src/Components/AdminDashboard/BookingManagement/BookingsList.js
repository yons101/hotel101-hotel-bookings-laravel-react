import React, { useEffect } from "react";

import BookingItem from "./BookingItem";
import { useSelector, useDispatch } from "react-redux";
import { getAllBookings } from "../../../redux/actions/bookings";
import Pagination from "../../Global/Pagination";
import Loading from "../../Global/Loading";

function BookingsList() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    useEffect(() => {
        getAllBookings(dispatch, state.auth.token);
        document.title = `Bookings Management`;
    }, []); // eslint-disable-line

    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  ">
            <h2 className="text-xl font-semibold">All Bookings</h2>
            {state.bookings.loading && <Loading />}
            {state.bookings.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.bookings}
                    method={getAllBookings}
                    params={[dispatch, state.auth.token]}
                />
            )}

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {state &&
                    state.bookings.allBookings.map((booking) => {
                        return (
                            <BookingItem key={booking.id} booking={booking} />
                        );
                    })}
            </div>
            {state.bookings.allBookings.length === 0 && (
                <div className="mt-10">There are no bookings!</div>
            )}
            {state.bookings.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.bookings}
                    method={getAllBookings}
                    params={[dispatch, state.auth.token]}
                />
            )}
        </div>
    );
}

export default BookingsList;
