import React, { useState, useEffect } from "react";
import Loading from "../Global/Loading";
import { signUp } from "../../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorMessage from "../Global/ErrorMessage";
import useSecureLs from "../../Components/Global/useSecureLs";

function SignupForm() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [token, setToken] = useSecureLs("token"); // eslint-disable-line
    const [userId, setUserId] = useSecureLs("user_id"); // eslint-disable-line
    const [isAdmin, setIsAdmin] = useSecureLs("is_admin"); // eslint-disable-line

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        signUp(dispatch, user, setToken, setUserId, setIsAdmin);
    };

    let history = useHistory();
    useEffect(() => {
        if (state.auth.isAuthenticated) {
            history.push("/");
        } else {
            history.push("/signup");
        }
    }, [state.auth.token]); // eslint-disable-line
    return (
        <div className="bg-gray-100  flex flex-col justify-center items-center py-32">
            {state.auth.loading && <Loading />}

            {state.auth.success === false && (
                <ErrorMessage errors={state.auth.errors} />
            )}
            <h2 className="text-3xl font-semibold text-center">
                Create a free account in order to access our services
            </h2>

            <form
                action=""
                className="w-11/12 sm:w-10/12 lg:w-6/12 xl:w-4/12 bg-gray-200 p-10 rounded-sm  mt-10 border shadow-lg"
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="first_name" className="block">
                    First Name:{" "}
                </label>
                <input
                    type="text"
                    name="first_name"
                    className="p-2 w-full border border-gray-400 focus:outline-none focus:border-black"
                    onChange={(e) =>
                        setUser({ ...user, first_name: e.target.value })
                    }
                />

                <label htmlFor="last_name" className="block mt-5">
                    Last Name:{" "}
                </label>
                <input
                    type="text"
                    name="last_name"
                    className="p-2 w-full border border-gray-400 focus:outline-none focus:border-black"
                    onChange={(e) =>
                        setUser({ ...user, last_name: e.target.value })
                    }
                />

                <label htmlFor="email" className="block mt-5">
                    Email:{" "}
                </label>
                <input
                    type="email"
                    name="email"
                    className="p-2 w-full border border-gray-400 focus:outline-none focus:border-black"
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                <label htmlFor="password" className="block mt-5">
                    Password:{" "}
                </label>
                <input
                    type="password"
                    name="password"
                    className="p-2 w-full border border-gray-400 focus:outline-none focus:border-black"
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />

                <div className="mt-5 flex flex-col md:flex-row justify-between items-center">
                    <button
                        className="text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase text-sm px-12 py-4 shadow
                    hover:shadow-lg"
                        type="submit"
                    >
                        Sign Up
                    </button>

                    <Link
                        to="/login"
                        className="text-orange-800 mt-5 md:mt-0 hover:text-orange-600"
                    >
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
