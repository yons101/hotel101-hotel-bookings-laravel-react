import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useSecureLs from "../Global/useSecureLs";

function AdminSiderBar() {
    const state = useSelector((state) => state);
    const [id] = useSecureLs("user_id");
    let history = useHistory();
    useEffect(() => {
        if (!state.auth.is_admin) {
            history.push({
                pathname: "/401",
                state: {
                    message:
                        "You are not authorized, you'll be redirected in a bit"
                }
            });
        }
    }, [state.auth.is_admin]); // eslint-disable-line

    let location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        switch (location.pathname) {
            case `/admin-profile/${id}`:
                setCurrentPage(1);
                break;
            case "/hotel-management":
                setCurrentPage(2);
                break;
            case "/room-management":
                setCurrentPage(3);
                break;
            case "/add-room":
                setCurrentPage(3);
                break;
            case "/booking-management":
                setCurrentPage(4);
                break;
            case "/review-management":
                setCurrentPage(5);
                break;
            default:
                break;
        }

        if (location.pathname.slice(0, 11) === "/edit-room/") {
            setCurrentPage(3);
        }
    }, []); // eslint-disable-line
    return (
        <div className="hidden md:block w-full md:w-4/12 xl:w-3/12 bg-gray-200 pt-5 lg:p-5 rounded-sm ">
            <div className="flex flex-col w-full">
                <Link
                    to={`/admin-profile/${id}`}
                    className={`block py-2 px-4 rounded-sm hover:bg-gray-400 ${
                        currentPage === 1 && "bg-gray-400"
                    }`}
                >
                    <i className="fas fa-user-alt md:mr-2"></i>
                    <span className="mt-2 lg:mt-0">My Profile</span>
                </Link>

                <div className="hidden md:block border-t w-2/3 my-5"></div>

                <Link
                    to="/hotel-management"
                    className={`block py-2 px-4 rounded-sm hover:bg-gray-400 ${
                        currentPage === 2 && "bg-gray-400"
                    }`}
                >
                    <i className="fas fa-building md:mr-2"></i>
                    <span className="mt-2 lg:mt-0">Hotels Management</span>
                </Link>

                <div className="hidden md:block border-t w-2/3 my-5"></div>

                <Link
                    to="/room-management"
                    className={`block py-2 px-4 rounded-sm hover:bg-gray-400 ${
                        currentPage === 3 && "bg-gray-400"
                    }`}
                >
                    <i className="fas fa-bed md:mr-2"></i>
                    <span className="mt-2 lg:mt-0">Rooms Management</span>
                </Link>

                <div className="hidden md:block border-t w-2/3 my-5"></div>

                <Link
                    to="/booking-management"
                    className={`block py-2 px-4 rounded-sm hover:bg-gray-400 ${
                        currentPage === 4 && "bg-gray-400"
                    }`}
                >
                    <i className="fas fa-ticket-alt md:mr-2"></i>
                    <span className="mt-2 lg:mt-0">Bookings Management</span>
                </Link>
                <div className="hidden md:block border-t w-2/3 my-5"></div>

                <Link
                    to="/review-management"
                    className={`block py-2 px-4 rounded-sm hover:bg-gray-400 ${
                        currentPage === 5 && "bg-gray-400"
                    }`}
                >
                    <i className="fas fa-pen md:mr-2"></i>
                    <span className="mt-2 lg:mt-0">Reviews Management</span>
                </Link>
            </div>
        </div>
    );
}

export default AdminSiderBar;
