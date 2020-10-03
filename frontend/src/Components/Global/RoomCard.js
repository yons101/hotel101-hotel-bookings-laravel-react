import React, { useEffect, useState } from "react";
function RoomCard({ room }) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        try {
            let images = room && room.image.split(",");
            room && setImage(images[0]);
        } catch (error) {}
    }, [room]); // eslint-disable-line
    return (
        <>
            <a
                className="mx-5 rounded-t-lg overflow-hidden shadow-xl mt-5 "
                data-aos="fade-up"
                href={`/room/${room.id}`}
            >
                <div className="relative">
                    <img
                        src={
                            room && room.image && typeof image === "string"
                                ? `${process.env.REACT_APP_BASE_URL}/img/rooms/${image}`
                                : "http://placehold.it/300x300?text=room image"
                        }
                        className="w-full h-64 object-cover"
                        alt="room"
                    />
                    <div className="absolute bottom-0 text-gray-100 flex">
                        <div className="bg-orange-600 py-2 px-6 rounded-tr-lg flex flex-col items-center">
                            <span className="line-through text-gray-300 text-sm">
                                {parseFloat(room.price) + 100} $
                            </span>
                            <span className="text-xl">{room.price} $</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 py-5 px-2">
                    <h3 className="text-2xl font-medium text-center hover:text-gray-600">
                        {room.name}
                    </h3>
                </div>
            </a>
        </>
    );
}

export default RoomCard;
