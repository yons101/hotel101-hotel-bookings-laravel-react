import React from "react";
import Footer from "../../Global/Footer";
import Header from "../../Global/Header";
import UserSiderBar from "../UserSiderBar";
import UserDropDown from "../UserDropDown";
import UserProfileMain from "./UserProfileMain";
import ErrorMessage from "../../Global/ErrorMessage";
import SuccessMessage from "../../Global/SuccessMessage";
import { useSelector } from "react-redux";
import Loading from "../../Global/Loading";

function UserProfile(props) {
    const state = useSelector((state) => state);

    return (
        <>
            <Header />
            {state.users.loading && <Loading />}
            {state.users.success === false && (
                <ErrorMessage errors={state.users.errors} />
            )}
            {state.users.success && <SuccessMessage message="Success" />}
            <main className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:justify-center p-5 text-gray-800">
                <UserSiderBar />
                <UserDropDown />
                <UserProfileMain />
            </main>

            <Footer />
        </>
    );
}

export default UserProfile;
