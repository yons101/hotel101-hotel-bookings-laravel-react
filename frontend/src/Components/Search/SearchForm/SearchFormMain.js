import React from "react";

function SearchFormMain({ criteria, setCriteria, cities }) {
    return (
        <div className="text-gray-900">
            <h2 className="text-2xl font-semibold">Dates:</h2>
            <div className="mt-5">
                <label htmlFor="check-in" className="block">Check In</label>
                <input
                    id="check-in"
                    className="px-6 py-3 mt-2 w-full border border-gray-500"
                    type="date"
                    value={criteria.check_in}
                    onChange={(e) =>
                        setCriteria({ ...criteria, check_in: e.target.value })
                    }
                />
            </div>
            <div className="mt-5">
                <label htmlFor="check-out" className="block">Check Out</label>
                <input
                    id="check-out"
                    className="px-6 py-3 mt-2 w-full border border-gray-500"
                    type="date"
                    value={criteria.check_out}
                    onChange={(e) =>
                        setCriteria({ ...criteria, check_out: e.target.value })
                    }
                />
            </div>
            <div className="mt-5">
                <label htmlFor="city" className="block">City</label>
                <select
                    id="city"                
                    placeholder="Select one"
                    className="px-6 py-3 mt-2 w-full border border-gray-500"
                    value={criteria.city}
                    onChange={(e) =>
                        e.target.value === "all"
                            ? setCriteria({ ...criteria, city: "" })
                            : setCriteria({ ...criteria, city: e.target.value })
                    }
                >
                    <option value="all">All Cities</option>
                    {cities &&
                        cities.map((city, i) => {
                            return (
                                <option value={city} key={i}>
                                    {city}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className="mt-5">
                <label htmlFor="guest-count" className="block">Guests</label>
                <select
                    id="guest-count"
                    placeholder="Select one"
                    className="px-6 py-3 mt-2 w-full border border-gray-500"
                    value={criteria.guest}
                    onChange={(e) =>
                        setCriteria({ ...criteria, guest: e.target.value })
                    }
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </div>
    );
}

export default SearchFormMain;
