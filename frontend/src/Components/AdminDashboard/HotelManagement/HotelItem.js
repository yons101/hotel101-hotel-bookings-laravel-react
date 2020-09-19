import React, { useState } from "react";
import { Link } from "react-router-dom";
import Confirm from "../../Global/Confirm";

function HotelItem({
    hotel: { id, name, image, rooms_count, bookings_count },
    hotel
}) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <div className="mt-5 flex shadow-xl w-full h-56 relative">
            {confirmDelete.open && (
                <Confirm
                    confirmDelete={confirmDelete}
                    setConfirmDelete={setConfirmDelete}
                    hotel={hotel}
                />
            )}
            <img
                className="w-1/3 object-cover rounded-l-sm "
                src={
                    image
                        ? `${process.env.REACT_APP_BASE_URL}/img/hotels/${image}`
                        : "http://placehold.it/300x300?text=image not available"
                }
                alt="bag"
            />
            <div className="w-2/3 px-4 py-4 bg-gray-100 rounded-r-sm ">
                <h2 className="text-md text-gray-700 mt-4">
                    Hotel <span className="font-semibold">{name}</span>
                </h2>
                <h2 className="text-md text-gray-700 mt-4">
                    Rooms Count :{" "}
                    <span className="font-semibold">{rooms_count}</span>
                </h2>
                <h2 className="text-md text-gray-700 mt-4">
                    Bookings Count :{" "}
                    <span className="font-semibold">{bookings_count}</span>
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
                        to={`/edit-hotel/${id}`}
                        className="ml-2 text-xs font-semibold px-2 py-1 bg-blue-600 rounded-sm hover:bg-blue-900"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HotelItem;
