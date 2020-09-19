import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview, deleteUserReview } from "../../redux/actions/reviews";
import { deleteHotel } from "../../redux/actions/hotels";
import { deleteRoom } from "../../redux/actions/rooms";

function Confirm({ setConfirmDelete, review, hotel, room }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    return (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center px-12">
            <div
                className="overlay w-full h-screen bg-gray-900 absolute opacity-50 z-10"
                onClick={() => setConfirmDelete(false)}
            ></div>

            <div className="z-20 flex flex-col items-center bg-gray-300 rounded-sm  shadow-2xl p-5 m-5 w-full sm:w-6/12 xl:w-4/12">
                <div className="flex flex-col items-center justify-center md:flex-row">
                    <i className="fas fa-exclamation-triangle fa-lg text-red-600 md:mr-5"></i>
                    <span className="mt-2">Are you sure?</span>
                </div>
                <div className="flex flex-col items-center justify-center md:flex-row mt-5">
                    <button
                        className="rounded-sm  bg-gray-200 text-gray-900 hover:bg-gray-300 uppercase text-sm px-6 py-2 shadow
                    hover:shadow-lg  md:mr-5"
                        onClick={() => setConfirmDelete(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="mt-2 md:mt-0 rounded-sm  bg-red-600 text-white hover:bg-red-700 uppercase text-sm px-6 py-2 shadow
                    hover:shadow-lg"
                        onClick={() => {
                            if (review) {
                                if (state.auth.is_admin) {
                                    deleteReview(
                                        dispatch,
                                        state.auth.token,
                                        review
                                    );
                                } else {
                                    deleteUserReview(
                                        dispatch,
                                        state.auth.token,
                                        review
                                    );
                                }
                            }
                            if (hotel) {
                                deleteHotel(
                                    dispatch,
                                    hotel.id,
                                    state.auth.token
                                );
                            }
                            if (room) {
                                deleteRoom(dispatch, room.id, state.auth.token);
                            }
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirm;
