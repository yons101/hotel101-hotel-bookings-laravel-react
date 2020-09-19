import React, { Component } from "react";
import ReactToPrint from "react-to-print";

export default class UserBookingItem extends Component {
    render() {
        const {
            id,
            name,
            image,
            city,
            price,
            check_in,
            check_out,
            created_at
        } = this.props.booking;
        return (
            <div
                className="mt-5 p-5 bg-gray-100 rounded-sm  shadow flex flex-col"
                ref={(el) => (this.componentRef = el)}
            >
                <img
                    src={
                        image
                            ? `${process.env.REACT_APP_BASE_URL}/img/hotels/${image}`
                            : "http://placehold.it/300x300?text=no image available"
                    }
                    alt="hotel"
                    className="w-full h-56 object-cover rounded-sm  shadow-xl "
                />
                <ul className="mt-5">
                    <li className="font-semibold">
                        Booking ID : <span>#{id}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Hotel : <span>{name}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        City : <span>{city}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Price : <span>{price}</span>$
                    </li>
                    <li className="mt-2 font-semibold">
                        Check-in Date : <span>{check_in}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Check-out Date : <span>{check_out}</span>
                    </li>
                    <li className="mt-2 font-semibold">
                        Placed on :{" "}
                        <span>
                            {new Date(created_at).toISOString().split("T")[0]}
                        </span>
                    </li>
                </ul>

                <ReactToPrint
                    documentTitle="test"
                    trigger={() => {
                        return (
                            <button
                                href="#"
                                className="mt-5 text-blue-600 font-semibold text-center hover:underline focus:outline-none"
                            >
                                <i className="fas fa-print"></i> Print
                            </button>
                        );
                    }}
                    content={() => this.componentRef}
                />
            </div>
        );
    }
}
