import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function SuccessMessage({ message }) {
    const state = useSelector((state) => state);

    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        state.bookings.success ||
        state.users.success ||
        state.hotels.success ||
        state.rooms.success ||
        state.reviews.success
            ? setHidden(false)
            : setHidden(true);
        const timer = setTimeout(() => {
            setHidden(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [
        state.bookings.success,
        state.users.success,
        state.hotels.success,
        state.rooms.success,
        state.reviews.success
    ]); // eslint-disable-line
    return (
        <div
            className={
                hidden
                    ? "hidden"
                    : "w-11/12 md:w-1/2 text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-sm fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-0 z-50 mt-5"
            }
            role="alert"
        >
            <span className="block sm:inline">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                    className="fill-current h-6 w-6 text-green-500 hover:text-green-700"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    onClick={() => setHidden(true)}
                >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
        </div>
    );
}

export default SuccessMessage;
