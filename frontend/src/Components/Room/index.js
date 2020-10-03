import React, { useEffect } from "react";
import Header from "../Global/Header";
import Footer from "../Global/Footer";
import Border from "../Global/Border";
import RoomHero from "./RoomHero";
import SuggestedRooms from "./SuggestedRooms";

import { getRoom } from "../../redux/actions/rooms";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function Room() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    let { id } = useParams();

    useEffect(() => {
        getRoom(dispatch, id);
    }, []); // eslint-disable-line
    useEffect(() => {
        document.title = `${state.rooms.room.name} Room`;
    }, [state.rooms.room]); // eslint-disable-line
    return (
        <>
            <Header />

            <RoomHero room={state.rooms.room} />

            {state.rooms.suggestedRooms.length > 0 && (
                <>
                    <Border />

                    <SuggestedRooms
                        suggestedRooms={state.rooms.suggestedRooms}
                    />
                </>
            )}

            <Border />

            <Footer />
        </>
    );
}

export default Room;
