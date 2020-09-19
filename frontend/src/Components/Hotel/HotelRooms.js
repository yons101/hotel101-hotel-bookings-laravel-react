import React from "react";
import RoomCard from "../Global/RoomCard";

function HotelRooms({ hotel }) {
    return (
        <section className="my-8 md:px-16 xl:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {hotel &&
                    hotel.rooms.map((room) => {
                        return <RoomCard key={room.id} room={room} />;
                    })}
            </div>
        </section>
    );
}

export default HotelRooms;
