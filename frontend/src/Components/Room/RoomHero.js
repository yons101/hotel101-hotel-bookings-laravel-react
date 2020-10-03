import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "./Slider";
import useSecureLs from "../Global/useSecureLs";

function RoomHero({ room }) {
    const [room_id, setRoomId] = useSecureLs("room_id"); // eslint-disable-line
    const [room_name, setRoomName] = useSecureLs("room_name"); // eslint-disable-line
    const [room_price, setRoomPrice] = useSecureLs("room_price"); // eslint-disable-line
    const [room_image, setRoomImage] = useSecureLs("room_image"); // eslint-disable-line

    const [_image, setImage] = useState("");

    useEffect(() => {
        try {
            let images = room && room.image.split(",");
            room && setImage(images[0]);
        } catch (error) {}
        setRoomId(room.id);
        setRoomName(room.name);
        setRoomPrice(room.price);
        setRoomImage(_image);
    }, [room, _image]); // eslint-disable-line
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <img
                        src={
                            _image
                                ? `${process.env.REACT_APP_BASE_URL}/img/rooms/${_image}`
                                : "http://placehold.it/300x300?text=image not available"
                        }
                        alt="room"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="px-5 mt-5 md:pl-10 md:px-5 md:py-10">
                    <h1 className="text-2xl text-orange-800  font-semibold">
                        {room && room.name}
                    </h1>
                    <p className="mt-5 w-10/12">{room && room.description}</p>

                    {room && room.features.length > 0 && (
                        <>
                            <h2 className="text-2xl text-orange-800  font-semibold mt-5">
                                Features
                            </h2>

                            <div className="flex">
                                <ul className="mt-5 ">
                                    {room.features.slice(0, 5).map((f, i) => {
                                        return (
                                            <li className="mt-2" key={i}>
                                                <i className="fas fa-star fa-xs text-yellow-600 mr-2"></i>
                                                {f.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <ul className="mt-5 ml-5">
                                    {room.features.slice(5, 10).map((f, i) => {
                                        return (
                                            <li className="mt-2" key={i}>
                                                <i className="fas fa-star fa-xs text-yellow-600 mr-2"></i>
                                                {f.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </>
                    )}
                    <Link
                        to="/book"
                        className="bg-orange-600 mt-10 py-2 px-6 text-3xl text-gray-200 block text-center w-10/12 mx-auto hover:bg-orange-900 rounded-sm"
                    >
                        BOOK
                    </Link>
                </div>
            </div>

            <Slider images={room && room.image} />
        </section>
    );
}

export default RoomHero;
