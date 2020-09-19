import React from "react";
import Header from "../../Global/Header";
import Footer from "../../Global/Footer";
import UserSiderBar from "../UserSiderBar";
import UserDropDown from "../UserDropDown";
import UserBookingsList from "./UserBookingsList";

function UserBookings() {
    return (
        <div>
            <Header />
            <main className="bg-gray-100 min-h-screen flex flex-col md:flex-row md:justify-center p-5 text-gray-800">
                <UserSiderBar />
                <UserDropDown />
                <UserBookingsList />
            </main>

            <Footer />
        </div>
    );
}

export default UserBookings;
