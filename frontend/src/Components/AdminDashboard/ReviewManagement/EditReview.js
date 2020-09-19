import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateReview } from "../../../redux/actions/reviews";
import { setSuccess } from "../../../redux/actions/global";

function EditReview({
    review: { id, content, rating, hotel_id, user_id },
    edit,
    setEdit
}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [review, setReview] = useState({
        id: "",
        content: "",
        rating: "",
        user_id: "",
        hotel_id: ""
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        updateReview(dispatch, state.auth.token, review);
        setEdit({
            ...edit,
            open: false
        });
    };
    useEffect(() => {
        setReview({
            id,
            content,
            rating,
            user_id,
            hotel_id
        });
    }, []); // eslint-disable-line
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [state.reviews.success]); // eslint-disable-line

    return (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center px-12">
            <div
                className="overlay w-full h-screen bg-gray-900 absolute opacity-50 z-10"
                onClick={() =>
                    setEdit({
                        ...edit,
                        open: false
                    })
                }
            ></div>

            <form className="w-full md:w-3/4 z-20" onSubmit={onSubmitHandler}>
                <h2 className="text-2xl font-semibold text-gray-100">
                    Update Your Review
                </h2>
                <textarea
                    rows="3"
                    className="w-full rounded-sm  border p-2 my-2 focus:outline-none focus:border-gray-700"
                    value={review.content}
                    onChange={(e) =>
                        setReview({ ...review, content: e.target.value })
                    }
                ></textarea>
                <div className="flex items-center">
                    <button className="bg-orange-500 hover:bg-orange-700 text-gray-100 font-bold py-2 px-4 rounded-sm mr-5">
                        Update
                    </button>
                    <select
                        className="py-2 px-4"
                        value={review.rating}
                        onChange={(e) => {
                            setReview({
                                ...review,
                                rating: e.target.value
                            });
                        }}
                    >
                        <option value="10">10 Amazing</option>
                        <option value="9">9 Great</option>
                        <option value="8">8 Very Good</option>
                        <option value="7">7 Good</option>
                        <option value="6">6 Fine</option>
                        <option value="5">5 Average</option>
                        <option value="4">4 Bad</option>
                        <option value="3">3 Very Bad</option>
                        <option value="2">2 Horrible</option>
                        <option value="1">1 Appaling</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default EditReview;
