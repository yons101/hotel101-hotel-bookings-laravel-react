import React from "react";

function SearchFormButton() {
    return (
        <div className="text-gray-900">
            <div className="mt-5">
                <button
                    className="w-full text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase text-sm px-12 py-4 shadow
                    hover:shadow-lg"
                    type="submit"
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchFormButton;
