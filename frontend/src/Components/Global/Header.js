import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useSecureLs from "../Global/useSecureLs";
import SecureLS from "secure-ls";

function Header({ hotelId }) {
    useEffect(() => {
        let _firstLogin = localStorage.getItem("first_login");
        if (_firstLogin === "true" && state.auth.isAuthenticated) {
            setFirstLogin(true);
        }
    }, []); // eslint-disable-line

    const [dropDown, setDropDown] = useState(false);
    const state = useSelector((state) => state);
    const [id] = useSecureLs("user_id");
    let ls = new SecureLS({ encodingType: "aes", isCompression: false });
    const [firstLogin, setFirstLogin] = useState(false);
    return (
        <header className="relative">
            <nav
                className={
                    window.location.pathname === "/" ||
                    window.location.pathname === `/hotel/${hotelId}`
                        ? "bg-gray-900 flex justify-between items-center p-5 xl:px-24 text-gray-100 absolute top-0 w-full"
                        : "bg-gray-900 flex justify-between items-center p-5 xl:px-24 text-gray-100 w-full"
                }
                style={{
                    boxShadow: "inset 0px -90px 20px rgba(0, 0, 0, 0.5)"
                }}
            >
                <Link
                    to="/"
                    className="z-50 text-2xl sm:text-2xl text-yellow-600 "
                >
                    <img
                        src="/assets/img/logo.png"
                        className="w-16 inline-block "
                        alt="logo"
                    />
                    <span className="hidden md:inline-block font-serif">
                        Hotel101
                    </span>
                </Link>

                <ul
                    id="flex-menu"
                    className="z-40 md:flex items-center text-lg font-sans"
                >
                    {!state.auth.isAuthenticated ? (
                        <>
                            <li
                                aria-label="dropdown button"
                                className="mr-5 hover:text-yellow-500 "
                                onClick={() => setDropDown(!dropDown)}
                            >
                                <span className="pb-2 pl-24">
                                    <i className="fas fa-caret-down fa-lg fa-2x cursor-pointer"></i>
                                </span>
                                <br />
                            </li>

                            <div
                                onClick={() => setDropDown(!dropDown)}
                                onMouseLeave={() => setDropDown(false)}
                                className="absolute right-0 md:mt-24 mr-10 xl:mr-24 w-48 rounded-sm  shadow-lg py-1 bg-gray-100 text-sm"
                                style={
                                    !dropDown
                                        ? { display: "none" }
                                        : { display: "block" }
                                }
                            >
                                <Link
                                    to="/login"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 "
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 "
                                >
                                    Signup
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <li
                                aria-label="dropdown button"
                                className="mr-5 hover:text-yellow-500 cur"
                                onClick={() => {
                                    setDropDown(!dropDown);
                                }}
                                onMouseOver={() => {
                                    localStorage.setItem("first_login", false);
                                    setFirstLogin(false);
                                }}
                            >
                                <span className="pb-2 pl-24">
                                    <i
                                        className={`fas fa-caret-down fa-lg fa-2x cursor-pointer ${
                                            firstLogin && "animate-bounce"
                                        }`}
                                    ></i>
                                </span>
                                <br />
                            </li>
                            {!state.auth.is_admin ? (
                                <div
                                    onClick={() => setDropDown(!dropDown)}
                                    onMouseLeave={() => setDropDown(false)}
                                    className="absolute right-0 md:mt-48 mr-10 xl:mr-24 w-48 rounded-sm  shadow-lg py-1 bg-gray-100 text-sm"
                                    style={
                                        !dropDown
                                            ? { display: "none" }
                                            : { display: "block" }
                                    }
                                >
                                    <Link
                                        to={`/user-profile/${id}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 "
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to={`/user-bookings/${id}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-300
                                focus:outline-none focus:bg-gray-300 "
                                    >
                                        Your Bookings
                                    </Link>
                                    <Link
                                        to={`/user-reviews/${id}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-300
                                focus:outline-none focus:bg-gray-300 "
                                    >
                                        Your Reviews
                                    </Link>

                                    <button
                                        className="text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-300
                                focus:outline-none focus:bg-gray-300 "
                                        onClick={(e) => {
                                            ls.remove("token");
                                            ls.remove("user_id");
                                            ls.remove("is_admin");
                                            window.location.replace("/");
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => setDropDown(!dropDown)}
                                    onMouseLeave={() => setDropDown(false)}
                                    className="absolute right-0 md:mt-64 mr-10 xl:mr-24 w-48 rounded-sm  shadow-lg py-1 bg-gray-100 text-sm"
                                    style={
                                        !dropDown
                                            ? { display: "none" }
                                            : { display: "block" }
                                    }
                                >
                                    <Link
                                        to={`/admin-profile/${id}`}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 "
                                    >
                                        Your Admin Profile
                                    </Link>
                                    <Link
                                        to="/hotel-management"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-300
                                focus:outline-none focus:bg-gray-300 "
                                    >
                                        Hotel Management
                                    </Link>
                                    <Link
                                        to="/room-management"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-300
                                focus:outline-none focus:bg-gray-300 "
                                    >
                                        Room Management
                                    </Link>
                                    <Link
                                        to="/booking-management"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-300
                                focus:outline-none focus:bg-gray-300 "
                                    >
                                        Booking Management
                                    </Link>
                                    <Link
                                        to="/review-management"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-300
                                focus:outline-none focus:bg-gray-300 "
                                    >
                                        Review Management
                                    </Link>

                                    <button
                                        className="text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-300
                                focus:outline-none focus:bg-gray-300 "
                                        onClick={(e) => {
                                            ls.remove("token");
                                            ls.remove("user_id");
                                            ls.remove("is_admin");
                                            window.location.replace("/");
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

Header.defaultProps = {
    hotelId: 1
};

export default Header;
