import React, { useState, useEffect } from "react";
import useSecureLs from "../Global/useSecureLs";

function BookingDetails({ booking, setBooking }) {
    const [price, setPrice] = useState(0);
    const [room_id] = useSecureLs("room_id");
    const [room_name] = useSecureLs("room_name");
    const [room_price] = useSecureLs("room_price");
    const [room_image] = useSecureLs("room_image");
    const room = {
        room_id,
        name: room_name,
        price: room_price,
        image: room_image
    };

    const calcPrice = () => {
        if (booking.check_in !== "" && booking.check_out !== "") {
            const oneDay = 24 * 60 * 60 * 1000;
            const check_out = new Date(booking.check_out);
            const check_in = new Date(booking.check_in);
            const diffDays = Math.floor((check_out - check_in) / oneDay);

            if (diffDays > 0) {
                setPrice(room.price * diffDays);
            }
        }
    };

    useEffect(() => {
        calcPrice();
        setBooking({
            ...booking,
            amount: price
        });
    }, [booking.check_in, booking.check_out, price]); // eslint-disable-line
    return (
        <>
            <h1 className="sr-only">Book Room</h1>
            <h2 className="pl-5 text-2xl">Step 1: Check Details</h2>

            <div className="p-5 ">
                <div className="flex flex-col md:flex-row md:justify-between w-full bg-gray-200 rounded-sm  overflow-hidden shadow-xl">
                    <div className="md:w-1/4">
                        <img // eslint-disable-line
                            src={
                                room_image
                                    ? `${process.env.REACT_APP_BASE_URL}/img/rooms/${room_image}`
                                    : "http://placehold.it/300x300?text=image not available"
                            }
                            alt="room image"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="p-5 md:w-3/4">
                        <div className="font-semibold text-2xl flex flex-col md:flex-row md:justify-between">
                            <span>{room.name}</span>
                            <span>
                                <span>{price}</span>$
                            </span>
                        </div>
                        <div className="mt-8">
                            <div className="flex flex-col md:flex-row md:justify-between items-center">
                                <label
                                    htmlFor="check-in"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    Check-in
                                </label>
                                <input
                                    id="check-in"
                                    className="mt-2 md:mt-0 px-6 py-3 wf w-full md:w-3/4"
                                    type="date"
                                    value={booking.check_in}
                                    onChange={(e) => {
                                        calcPrice();
                                        setBooking({
                                            ...booking,
                                            check_in: e.target.value,
                                            amount: price
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
                                <label
                                    htmlFor="check-out"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    Check-out
                                </label>
                                <input
                                    id="check-out"
                                    className="mt-2 md:mt-0 px-6 py-3 wf w-full md:w-3/4"
                                    type="date"
                                    value={booking.check_out}
                                    onChange={(e) => {
                                        calcPrice();
                                        setBooking({
                                            ...booking,
                                            check_out: e.target.value,
                                            amount: price
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingDetails;
