import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function UserSiderBar() {
    const state = useSelector((state) => state);

    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        // eslint-disable-next-line
        if (state.auth.user_id != id) {
            history.push({
                pathname: "/401",
                state: {
                    message:
                        "You are not authorized, you'll be redirected in a bit"
                }
            });
        }
    }, [state.auth.user_id]); // eslint-disable-line

    let location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        switch (location.pathname) {
            case `/user-profile/${id}`:
                setCurrentPage(1);
                break;
            case `/user-bookings/${id}`:
                setCurrentPage(2);
                break;
            case `/user-reviews/${id}`:
                setCurrentPage(3);
                break;
            default:
                break;
        }
    }, []); // eslint-disable-line
    return (
        <div className="hidden md:block w-full md:w-4/12 xl:w-3/12 bg-gray-200 pt-5 lg:p-5 rounded-sm ">
            <Link
                to={`/user-profile/${id}`}
                className={`block py-2 px-4 rounded-sm hover:bg-gray-400 ${
                    currentPage === 1 && "bg-gray-400"
                }`}
            >
                <i className="fas fa-user-alt md:mr-2"></i>
                <span className="mt-2 lg:mt-0">My Profile</span>
            </Link>

            <div className="hidden md:block border-t w-2/3 my-5"></div>

            <Link
                to={`/user-bookings/${id}`}
                className={`block py-2 px-4 rounded-sm hover:bg-gray-400 ${
                    currentPage === 2 && "bg-gray-400"
                }`}
            >
                <i className="fas fa-ticket-alt md:mr-2"></i>
                <span className="mt-2 lg:mt-0">My Bookings</span>
            </Link>

            <div className="hidden md:block border-t w-2/3 my-5"></div>

            <Link
                to={`/user-reviews/${id}`}
                className={`block py-2 px-4 rounded-sm hover:bg-gray-400 ${
                    currentPage === 3 && "bg-gray-400"
                }`}
            >
                <i className="fas fa-pen md:mr-2"></i>
                <span className="mt-2 lg:mt-0">My Reviews</span>
            </Link>
        </div>
    );
}

export default UserSiderBar;
