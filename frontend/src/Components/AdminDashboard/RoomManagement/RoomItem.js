import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Confirm from "../../Global/Confirm";

function RoomItem({ room: { id, room_name, hotel_name, image }, room }) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [_image, setImage] = useState("");

    useEffect(() => {
        try {
            let images = image.split(",");
            setImage(images[0]);
        } catch (error) {}
    }, [image]); // eslint-disable-line

    return (
        <div className="mt-5 flex shadow-xl  w-full h-56 relative">
            {confirmDelete.open && (
                <Confirm
                    confirmDelete={confirmDelete}
                    setConfirmDelete={setConfirmDelete}
                    room={room}
                />
            )}
            <img
                className="w-1/3 object-cover rounded-l-sm "
                src={
                    _image
                        ? `${process.env.REACT_APP_BASE_URL}/img/rooms/${_image}`
                        : "http://placehold.it/300x300?text=image not available"
                }
                alt="bag"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                        "http://placehold.it/300x300?text=image not available";
                }}
            />

            <div className="w-2/3 px-4 py-4 bg-white rounded-r-sm ">
                <h2 className="text-md text-gray-700 mt-4">
                    Room Name :{" "}
                    <span className="font-semibold">{room_name}</span>
                </h2>
                <h2 className="text-md text-gray-700 mt-4">
                    Hotel : <span className="font-semibold">{hotel_name}</span>
                </h2>

                <div className="mt-5 text-gray-200 absolute bottom-0 right-0 mb-5 mr-5">
                    <button
                        className="text-xs font-semibold px-2 py-1 bg-red-600 rounded-sm hover:bg-red-900 focus:outline-none"
                        onClick={() =>
                            setConfirmDelete({
                                ...confirmDelete,
                                open: true
                            })
                        }
                    >
                        Delete
                    </button>
                    <Link
                        to={`/edit-room/${id}`}
                        className="ml-2 text-xs font-semibold px-2 py-1 bg-blue-600 rounded-sm hover:bg-blue-900 cursor-pointer"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RoomItem;
