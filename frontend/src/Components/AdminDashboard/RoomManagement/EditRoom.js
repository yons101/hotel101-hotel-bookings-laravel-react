import React from "react";
import Header from "../../Global/Header";
import Footer from "../../Global/Footer";
import AdminSiderBar from "../AdminSiderBar";
import AdminDropDown from "../AdminDropDown";
import EditRoomForm from "./EditRoomForm";
import ErrorMessage from "../../Global/ErrorMessage";
import SuccessMessage from "../../Global/SuccessMessage";
import { useSelector } from "react-redux";
import Loading from "../../Global/Loading";

function EditRoom(props) {
    const state = useSelector((state) => state);

    return (
        <>
            <Header />
            {state.rooms.loading && <Loading />}
            {state.rooms.success === false && (
                <ErrorMessage errors={state.rooms.errors} />
            )}
            {state.rooms.success && <SuccessMessage message="Success" />}
            <main className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:justify-center p-5 text-gray-800">
                <AdminSiderBar />
                <AdminDropDown />
                <EditRoomForm />
            </main>

            <Footer />
        </>
    );
}

export default EditRoom;
