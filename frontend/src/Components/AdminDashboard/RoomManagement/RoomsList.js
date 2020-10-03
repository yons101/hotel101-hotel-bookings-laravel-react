import React, { useEffect } from "react";
import RoomItem from "./RoomItem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllRooms } from "../../../redux/actions/rooms";
import { setSuccess } from "../../../redux/actions/global";
import ErrorMessage from "../../Global/ErrorMessage";
import Loading from "../../Global/Loading";
import SuccessMessage from "../../Global/SuccessMessage";
import Pagination from "../../Global/Pagination";

function RoomsList() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    useEffect(() => {
        getAllRooms(dispatch, state.auth.token);
        document.title = `Rooms Management`;
    }, []); // eslint-disable-line

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [state.rooms.success]); // eslint-disable-line
    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  ">
            <h2 className="text-xl font-semibold">All Rooms</h2>
            {state.rooms.loading && <Loading />}
            {state.rooms.success === false && (
                <ErrorMessage errors={state.rooms.errors} />
            )}
            {state.rooms.success && <SuccessMessage message="Success" />}
            <Link
                to="/add-room"
                className="mt-5 px-2 py-1 inline-block rounded-sm  text-gray-100 bg-green-600 hover:bg-green-900"
            >
                Add a Room
            </Link>
            {state.rooms.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.rooms}
                    method={getAllRooms}
                    params={[dispatch, state.auth.token]}
                />
            )}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {state &&
                    state.rooms.allRooms.map((room) => {
                        return <RoomItem key={room.id} room={room} />;
                    })}
            </div>
            {state.rooms.allRooms.length === 0 && (
                <div className="mt-10">There are no rooms!</div>
            )}
            {state.rooms.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.rooms}
                    method={getAllRooms}
                    params={[dispatch, state.auth.token]}
                />
            )}
        </div>
    );
}

export default RoomsList;
