import React from "react";

function Checkbox({ name, value, title, criteria, setCriteria }) {
    return (
        <label className="inline-flex items-center mt-3 ">
            <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600 cursor-pointer"
                value={value}
                onChange={(e) => {
                    criteria[name].includes(value)
                        ? setCriteria({
                              ...criteria,
                              [name]: criteria[name].filter(
                                  (val) => val !== e.target.value
                              )
                          })
                        : setCriteria({
                              ...criteria,
                              [name]: [...criteria[name], value]
                          });
                }}
            />
            <span className="ml-2 text-gray-700 cursor-pointer">
                {value} {title}
            </span>
        </label>
    );
}

export default Checkbox;
