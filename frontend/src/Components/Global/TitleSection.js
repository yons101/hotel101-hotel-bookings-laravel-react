import React from "react";

function TitleSection({ title }) {
    return (
        <div className="my-8 md:px-16 xl:px-24 font-serif">
            <h2 className="text-4xl text-center font-semibold text-gray-800 ">
                {title}
            </h2>
            <div className="text-center">
                <i className="fas fa-star fa-xs"></i>
                <i className="fas fa-star fa-xs"></i>
                <i className="fas fa-star fa-xs"></i>
            </div>
        </div>
    );
}

export default TitleSection;
