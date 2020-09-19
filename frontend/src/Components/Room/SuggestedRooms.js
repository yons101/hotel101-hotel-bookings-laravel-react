import React from "react";
import TitleSection from "../Global/TitleSection";
import RoomCard from "../Global/RoomCard";

function SuggestedRooms({ suggestedRooms }) {
    return (
        <section className="my-8 md:px-16 xl:px-24">
            <TitleSection title="Other Rooms You Might Like" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {suggestedRooms.map((room) => {
                    return <RoomCard key={room.id} room={room} />;
                })}
            </div>
        </section>
    );
}

export default SuggestedRooms;
