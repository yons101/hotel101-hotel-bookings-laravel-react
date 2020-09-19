import React from "react";

function Border({ borderColor = "", my = "16" }) {
    return (
        <div
            className={`border-t-2 w-2/3 my-8 my-${my} mx-auto ${borderColor}`}
        ></div>
    );
}

export default Border;
