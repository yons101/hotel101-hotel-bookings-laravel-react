import React, { useState } from "react";
import EditReview from "./EditReview";
import Confirm from "../../Global/Confirm";

function ReviewItem({
    review: { created_at, content, rating, name, city },
    review
}) {
    let _rating = "";
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [edit, setEdit] = useState(false);
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
        <div className="mt-5 bg-gray-100 p-3 rounded-sm  shadow">
            {confirmDelete.open && (
                <Confirm
                    confirmDelete={confirmDelete}
                    setConfirmDelete={setConfirmDelete}
                    review={review}
                />
            )}
            {edit.open && (
                <EditReview edit={edit} setEdit={setEdit} review={review} />
            )}
            <div className="flex flex-col items-start">
                <span className="">
                    On {new Date(created_at).toLocaleDateString()}
                </span>
                <br className="md:hidden" />
                <span className="">
                    Hotel
                    <span id="hotel" className="font-semibold">
                        {" "}
                        {name}
                    </span>
                    ,<span id="city"> {city}</span>
                </span>
                <br />
                <span className="inline-block rounded-sm  text-gray-700 bg-gray-400 px-2 py-1 text-xs text-center ">
                    {_rating}
                </span>
            </div>
            <p className="mt-5">{content}</p>
            <div className="mt-5 text-gray-200">
                <button
                    onClick={() =>
                        setConfirmDelete({
                            ...confirmDelete,
                            open: true
                        })
                    }
                    className="text-xs font-semibold px-2 py-1 bg-red-600 rounded-sm hover:bg-red-900 cursor-pointer"
                >
                    Delete
                </button>
                <button
                    onClick={() =>
                        setEdit({
                            ...edit,
                            open: true
                        })
                    }
                    className="ml-2 text-xs font-semibold px-2 py-1 bg-blue-600 rounded-sm hover:bg-blue-900 cursor-pointer"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default ReviewItem;
