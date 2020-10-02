import React from "react";
import { Link } from "react-router-dom";
import useSecureLs from "../Global/useSecureLs";

function GuestReview({
    review: { user_id, rating, content, first_name, last_name, image }
}) {
    const [_user_id] = useSecureLs("user_id");
    let _rating = "";
    switch (rating) {
        case 10:
            _rating = "10/10 Amazing";
            break;
        case 9:
            _rating = "9/10 Great";
            break;
        case 8:
            _rating = "8/10 Very Good";
            break;
        case 7:
            _rating = "7/10 Good";
            break;
        case 6:
            _rating = "6/10 Fine";
            break;
        case 5:
            _rating = "5/10 Average";
            break;
        case 4:
            _rating = "4/10 Bad";
            break;
        case 3:
            _rating = "3/10 Very Bad";
            break;
        case 2:
            _rating = "2/10 Horrible";
            break;
        case 1:
            _rating = "1/10 Appaling";
            break;

        default:
            break;
    }
    return (
        <div
            className="bg-gray-300 rounded-sm  mt-5 p-5 flex flex-col md:flex-row lg:items-center"
            data-aos="fade-up"
        >
            <div className="flex items-center justify-between md:flex-col md:justify-start md:w-2/12 md:mr-12">
                <img
                    src={
                        image
                            ? `${process.env.REACT_APP_BASE_URL}/img/users/${image}`
                            : `${process.env.REACT_APP_BASE_URL}/img/users/avatar.png`
                    }
                    alt="avatar"
                    className="h-16 w-16 rounded-full object-cover shadow-2xl"
                />
                <span className="inline-block rounded-sm  text-gray-700  px-2 py-1 mt-2 text-xs text-center md:w-full">
                    By: {first_name} {last_name}
                </span>
                <span className="inline-block rounded-sm  text-gray-700 bg-gray-400 px-2 py-1 mt-2 text-xs text-center md:w-full">
                    {_rating}
                </span>
            </div>

            <div className=" bg-gray-200 text-gray-700 p-5 mt-10 rounded-sm  relative md:w-10/12 md:mt-0">
                <i className="fas fa-caret-left text-gray-200 fa-3x absolute top-0 left-0 -ml-4 opacity-0 md:opacity-100"></i>
                <i className="fas fa-caret-up text-gray-200 fa-3x absolute top-0 -mt-8 ml-1 md:opacity-0"></i>
                <p>{content}</p>
                {user_id === _user_id && (
                    <div className="mt-5 text-gray-200 absolute bottom-0 right-0 mb-2 mr-2">
                        <Link
                            to={`/user-reviews/${user_id}`}
                            className="text-xs font-semibold p-1 text-green-600 rounded-sm hover:text-green-900 cursor-pointer"
                        >
                            <i className="fas fa-edit fa-lg"></i>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GuestReview;
