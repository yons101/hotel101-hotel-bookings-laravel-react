import React, { useEffect } from "react";
import Header from "../../Global/Header";
import Footer from "../../Global/Footer";
import UserSiderBar from "../UserSiderBar";
import UserDropDown from "../UserDropDown";
import UserReviewsList from "./UserReviewsList";
import ErrorMessage from "../../Global/ErrorMessage";
import SuccessMessage from "../../Global/SuccessMessage";
import Loading from "../../Global/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess } from "../../../redux/actions/global";

function UserReviews() {
    const dispatch = useDispatch();

    const state = useSelector((state) => state);
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [state.reviews.success]); // eslint-disable-line
    return (
        <div>
            <Header />

            {state.reviews.loading && <Loading />}
            {state.reviews.success === false && (
                <ErrorMessage errors={state.reviews.errors} />
            )}
            {state.reviews.success && <SuccessMessage message="Success" />}

            <main className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:justify-center p-5 text-gray-800">
                <UserSiderBar />
                <UserDropDown />
                <UserReviewsList />
            </main>

            <Footer />
        </div>
    );
}

export default UserReviews;
