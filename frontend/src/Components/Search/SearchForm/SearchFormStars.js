import React from "react";
import Checkbox from "../../Global/Checkbox";

function SearchFormStars({ criteria, setCriteria }) {
    const stars = ["1", "2", "3", "4", "5"];
    return (
        <div className="text-gray-900">
            <h2 className="text-2xl font-semibold">Hotel Stars:</h2>

            {stars.map((s, i) => {
                return (
                    <label htmlFor="star-rating" className="mt-2 block" key={i}>
                        <Checkbox
                            id="star-rating"
                            name="star"
                            value={s}
                            setCriteria={setCriteria}
                            criteria={criteria}
                            title="Stars"
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default SearchFormStars;
