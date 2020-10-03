import React, { useState, useEffect } from "react";
import { logIn } from "../../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../Global/Loading";
import ErrorMessage from "../Global/ErrorMessage";
import useSecureLs from "../../Components/Global/useSecureLs";

function LoginForm() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [token, setToken] = useSecureLs("token"); // eslint-disable-line
    const [userId, setUserId] = useSecureLs("user_id"); // eslint-disable-line
    const [isAdmin, setIsAdmin] = useSecureLs("is_admin"); // eslint-disable-line

    const onSubmitHandler = (e) => {
        e.preventDefault();
        logIn(dispatch, user, setToken, setUserId, setIsAdmin);
    };
    let history = useHistory();
    useEffect(() => {
        state.auth.isAuthenticated && history.push("/");
    }, [state.auth.isAuthenticated]); // eslint-disable-line

    useEffect(() => {
        document.title = `Login`;
    }, []); // eslint-disable-line
    return (
        <div className="bg-gray-100 flex flex-col justify-center items-center py-32">
            {state.auth.loading && <Loading />}
            {state.auth.success === false && (
                <ErrorMessage errors={state.auth.errors} />
            )}
            <h1 className="text-3xl font-semibold text-center">
                Sign In To Your Account
            </h1>

            <form
                className="w-11/12 sm:w-10/12 lg:w-6/12 xl:w-4/12 bg-gray-200 p-10 rounded-sm  mt-10 border shadow-lg"
                onSubmit={onSubmitHandler}
            >
                <label htmlFor="email" className="block">
                    E-mail:{" "}
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="p-2 w-full border border-gray-400 focus:outline-none focus:border-black"
                    aria-required="true"
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                <label htmlFor="password" className="block mt-5">
                    Password:{" "}
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="p-2 w-full border border-gray-400 focus:outline-none focus:border-black"
                    aria-required="true"
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
                        Log In
                    </button>

                    <Link
                        to="/signup"
                        className="text-orange-800 mt-5 md:mt-0 hover:text-orange-600"
                    >
                        Create an account?
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
