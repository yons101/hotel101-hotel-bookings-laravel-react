import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useSecureLs from "../Global/useSecureLs";

function UserDropDown() {
    const [id] = useSecureLs("user_id");

    let location = useLocation();
    const [currentPage, setCurrentPage] = useState("0");
    useEffect(() => {
        switch (location.pathname) {
            case `/user-profile/${id}`:
                setCurrentPage("My Profile");
                break;
            case `/user-bookings/${id}`:
                setCurrentPage("My Bookings");
                break;
            case `/user-reviews/${id}`:
                setCurrentPage("My Reviews");
                break;
            default:
                break;
        }
    }, []); // eslint-disable-line

    return (
        <div className="bg-gray-200 p-5 md:hidden rounded-t-md w-full">
            <div className="dropdown px-5">
                <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-sm w-full">
                    <span><h1>{currentPage} 🠋 </h1></span>
                </button>
                <ul className="dropdown-content hidden text-gray-700 pt-2">
                    <li>
                        <Link
                            to={`/user-profile/${id}`}
                            className="rounded-sm bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                            <i className="fas fa-user-alt mr-2"></i>
                            <span className="mt-2 lg:mt-0">My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/user-bookings/${id}`}
                            className="rounded-sm bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                            <i className="fas fa-ticket-alt mr-2"></i>
                            <span className="mt-2 lg:mt-0">My Bookings</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/user-reviews/${id}`}
                            className="rounded-sm bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        >
                            <i className="fas fa-pen mr-2"></i>
                            <span className="mt-2 lg:mt-0">My Reviews</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserDropDown;
