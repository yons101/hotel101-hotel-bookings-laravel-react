import React, { useEffect } from "react";

import ReviewItem from "./ReviewItem";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../../redux/actions/reviews";
import { setSuccess } from "../../../redux/actions/global";
import Pagination from "../../Global/Pagination";
import ErrorMessage from "../../Global/ErrorMessage";
import SuccessMessage from "../../Global/SuccessMessage";
import Loading from "../../Global/Loading";
function ReviewsList() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    useEffect(() => {
        getAllReviews(dispatch, state.auth.token);
        document.title = `Reviews Management`;
    }, []); // eslint-disable-line

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [state.reviews.success]); // eslint-disable-line
    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  ">
            <h2 className="text-xl font-semibold">All Reviews</h2>
            {state.reviews.loading && <Loading />}
            {state.reviews.success === false && (
                <ErrorMessage errors={state.reviews.errors} />
            )}
            {state.reviews.success && <SuccessMessage message="Success" />}
            {state.reviews.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.reviews}
                    method={getAllReviews}
                    params={[dispatch, state.auth.token]}
                />
            )}
            {state &&
                state.reviews.reviews.map((review) => {
                    return <ReviewItem key={review.id} review={review} />;
                })}

            {state.reviews.reviews.length === 0 && (
                <div className="mt-10">There are no reviews!</div>
            )}
            {state.reviews.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.reviews}
                    method={getAllReviews}
                    params={[dispatch, state.auth.token]}
                />
            )}
        </div>
    );
}

export default ReviewsList;
