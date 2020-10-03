import React from "react";

function OrderButton() {
    return (
        <>
            <h2 className="pl-5 text-2xl">Step 3: Place Order</h2>

            <button
                type="submit"
                className="bg-orange-700 mt-5 py-2 px-6 text-3xl text-gray-200 block w-10/12 mx-auto hover:bg-orange-900"
            >
                BOOK
            </button>
        </>
    );
}

export default OrderButton;
