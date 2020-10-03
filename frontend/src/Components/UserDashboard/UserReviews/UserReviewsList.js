import React, { useEffect } from "react";
import UserReviewItem from "./UserReviewItem";
import { useSelector, useDispatch } from "react-redux";
import { getUserReviews } from "../../../redux/actions/reviews";
import { useParams } from "react-router-dom";
import Pagination from "../../Global/Pagination";
import Loading from "../../Global/Loading";

function UserReviewsList() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    let { id } = useParams();

    useEffect(() => {
        getUserReviews(dispatch, state.auth.token, id);
        document.title = `Reviews`;
    }, []); // eslint-disable-line

    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  ">
            <h1 className="text-xl font-semibold">Your Reviews</h1>

            {state.bookings.loading && <Loading />}

            {state.reviews.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.reviews}
                    dispatch={dispatch}
                    method={getUserReviews}
                    id={id}
                />
            )}
            {state &&
                state.reviews.reviews.map((review, i) => {
                    return (
                        <UserReviewItem key={review.id} review={review} i={i} />
                    );
                })}

            {state.reviews.reviews.length === 0 && (
                <div className="mt-10">You have no reviews!</div>
            )}
            {state.reviews.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.reviews}
                    dispatch={dispatch}
                    method={getUserReviews}
                    id={id}
                />
            )}
        </div>
    );
}

export default UserReviewsList;
