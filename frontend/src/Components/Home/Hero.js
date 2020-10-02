import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchData } from "../../redux/actions/search";
import { Link } from "react-router-dom";
import Typical from "react-typical";

function Hero() {
    const [initSearchData, setinitSearchData] = useState({
        check_in: "",
        check_out: "",
        city: "",
        guest: 1
    });
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    useEffect(() => {
        getSearchData(dispatch);
    }, []); // eslint-disable-line

    return (
        <section className="relative">
            <div className="overlay w-full h-screen bg-gray-900 absolute z-10 opacity-75"></div>

            <img
                src="/assets/img/hero.jpg"
                className="w-full h-screen object-cover"
                alt="hotel cover"
            />

            <div className="mt-8 book flex flex-col justify-center items-center text-gray-100 z-20 w-10/12">
                <h1 className="mt-16 hidden sm:block text-xl md:text-4xl xl:text-6xl capitalize text-center font-serif">
                    Enjoy a luxury experience in <br />
                    <Typical
                        steps={[
                            " Marrakech",
                            3000,
                            " Rabat",
                            3000,
                            " Tanger",
                            3000,
                            " Fes",
                            3000,
                            " Casablanca",
                            3000,
                            " Agadir",
                            3000
                        ]}
                        loop={Infinity}
                        wrapper="p"
                        className="inline"
                    />
                </h1>

                <div className="bg-orange-500 bg-opacity-75 mt-5 p-5 rounded-sm mx-auto text-gray-700 w-11/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-9/12 font-sans">
                    <div
                        className="flex flex-col xl:flex-row 
                 items-center"
                    >
                        <div className="flex flex-col md:mr-3 w-full md:w-3/4 ">
                            <label htmlFor='check-in' className="text-gray-100 text-xl">
                                Check In
                            </label>
                            <input
                                id= 'check-in'
                                className="px-6 py-3 mt-2 w-full"
                                type="date"
                                value={initSearchData.check_in}
                                onChange={(e) =>
                                    setinitSearchData({
                                        ...initSearchData,
                                        check_in: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col md:mr-3 w-full md:w-3/4 ">
                            <label htmlFor='check-out' className="text-gray-100 text-xl">
                                Check Out
                            </label>
                            <input
                                id='check-out'
                                className="px-6 py-3 mt-2 w-full"
                                type="date"
                                value={initSearchData.check_out}
                                onChange={(e) =>
                                    setinitSearchData({
                                        ...initSearchData,
                                        check_out: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col md:mr-3 w-full md:w-3/4 ">
                            <span className="text-gray-100 text-xl">City</span>
                            <select
                                aria-label='City'
                                className="px-6 py-3 mt-2"
                                value={initSearchData.city}
                                onChange={(e) =>
                                    setinitSearchData({
                                        ...initSearchData,
                                        city: e.target.value
                                    })
                                }
                            >
                                <option value="all">All Cities</option>
                                {state &&
                                    state.search.cities.map((city, i) => {
                                        return (
                                            <option value={city} key={i}>
                                                {city}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="flex flex-col md:mr-3 w-full md:w-3/4 ">
                            <span className="text-gray-100 text-xl">
                                Guests
                            </span>
                            <select
                                aria-label='Guest Count'
                                placeholder="Select one"
                                className="px-6 py-3 mt-2"
                                value={initSearchData.guest}
                                onChange={(e) =>
                                    setinitSearchData({
                                        ...initSearchData,
                                        guest: e.target.value
                                    })
                                }
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                </div>

                <hr className="hidden xl:block my-5 w-4/12 mx-auto border-orange-800" />

                <Link
                    className="font-sans text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase rounded-sm  px-12 py-4 shadow
                    hover:shadow-lg block mx-auto mt-2 xl:mt-0"
                    to={`/search/check_in=${initSearchData.check_in}&check_out=${initSearchData.check_out}&city=${initSearchData.city}&guest=${initSearchData.guest}`}
                >
                    Search
                </Link>
            </div>
        </section>
    );
}

export default Hero;
