import React from "react";
import GuestReview from "./GuestReview";
import { getHotelReviews } from "../../redux/actions/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../Global/Pagination";
function GuestReviewsList({ reviews }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    let { id } = useParams();
    return (
        <section className="mt-8 md:px-16 xl:px-24">
            {reviews.map((review) => {
                return <GuestReview key={review.id} review={review} />;
            })}

            {state.reviews.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.reviews}
                    method={getHotelReviews}
                    params={
                        state.auth.isAuthenticated
                            ? [dispatch, id, state.auth.user_id]
                            : [dispatch, id, 1]
                    }
                />
            )}
        </section>
    );
}

export default GuestReviewsList;
