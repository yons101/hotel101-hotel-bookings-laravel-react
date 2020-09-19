import React from "react";
import Header from "../../Global/Header";
import Footer from "../../Global/Footer";
import AdminSiderBar from "../AdminSiderBar";
import AdminDropDown from "../AdminDropDown";
import RoomsList from "./RoomsList";
import ErrorMessage from "../../Global/ErrorMessage";
import SuccessMessage from "../../Global/SuccessMessage";
import { useSelector } from "react-redux";

function RoomManagement() {
    const state = useSelector((state) => state);

    return (
        <>
            <Header />
            {state.rooms.success === false && (
                <ErrorMessage errors={state.rooms.errors} />
            )}
            {state.rooms.success && <SuccessMessage message="Success" />}
            <main className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:justify-center p-5 text-gray-800">
                <AdminSiderBar  />
                <AdminDropDown  />
                <RoomsList />
            </main>

            <Footer />
        </>
    );
}

export default RoomManagement;
