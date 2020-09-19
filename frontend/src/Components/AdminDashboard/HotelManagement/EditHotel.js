import React from "react";
import Header from "../../Global/Header";
import Footer from "../../Global/Footer";
import AdminSiderBar from "../AdminSiderBar";
import AdminDropDown from "../AdminDropDown";
import EditHotelForm from "./EditHotelForm";

function EditHotel(props) {
    return (
        <>
            <Header />

            <main className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:justify-center p-5 text-gray-800">
                <AdminSiderBar />
                <AdminDropDown />
                <EditHotelForm />
            </main>

            <Footer />
        </>
    );
}

export default EditHotel;
