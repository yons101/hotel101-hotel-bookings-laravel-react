import React from "react";
import Checkbox from "../../Global/Checkbox";

function SearchFormFeatures({ criteria, setCriteria, features }) {
    return (
        <div className="text-gray-900">
            <h2 className="text-2xl font-semibold">Features:</h2>

            {features &&
                features.map((feature, i) => {
                    return (
                        <label htmlFor="features" className="mt-5 block" key={i}>
                            <Checkbox
                                id="features"
                                name="features"
                                value={feature}
                                setCriteria={setCriteria}
                                criteria={criteria}
                            />
                        </label>
                    );
                })}
        </div>
    );
}

export default SearchFormFeatures;
