import React from "react";

function SearchFormPrice({ criteria, setCriteria }) {
    return (
        <div className="text-gray-900">
            <h2 className="text-2xl font-semibold">Price Range:</h2>
            <div className="mt-5">
                <span>Min: </span>
                <input
                    type="number"
                    className="px-6 py-3 mt-2 w-full border border-gray-500"
                    value={criteria.min_price}
                    onChange={(e) => {
                        setCriteria({ ...criteria, min_price: e.target.value });
                    }}
                />
                <span className="inline-block mt-5">Max: </span>
                <input
                    type="number"
                    className="px-6 py-3 mt-2 w-full border border-gray-500"
                    value={criteria.max_price}
                    onChange={(e) => {
                        setCriteria({ ...criteria, max_price: e.target.value });
                    }}
                />
            </div>
        </div>
    );
}

export default SearchFormPrice;
