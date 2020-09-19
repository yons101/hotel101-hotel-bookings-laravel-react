import axios from "axios";
import {
    GET_USER_REVIEWS,
    ADD_REVIEW,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    HAS_BOOKED,
    GET_HOTEL_REVIEWS,
    GET_ALL_REVIEWS
} from "../actionTypes";
import { setLoading } from "./global";

const url = process.env.REACT_APP_BASE_URL;

//-----------------------------------------
export const getHotelReviews = (dispatch, hotel_id, user_id, page) => {
    setLoading(dispatch, true);
    axios(
        `${url}/api/reviews/hotel/${hotel_id}/${
            user_id ? user_id : 1
        }?page=${page}`
    )
        .then((response) => {
            dispatch({
                type: GET_HOTEL_REVIEWS,
                payload: response.data.data
            });
            dispatch({
                type: HAS_BOOKED,
                payload: response.data.data.count
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};

//-----------------------------------------

export const getAllReviews = (dispatch, token, page = 1) => {
    setLoading(dispatch, true);
    axios
        .get(`${url}/api/reviews?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        .then((response) => {
            dispatch({
                type: GET_ALL_REVIEWS,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};
//-----------------------------------------

export const getUserReviews = (dispatch, token, id, page = 1) => {
    setLoading(dispatch, true);
    axios
        .get(`${url}/api/reviews/user/${id}?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: GET_USER_REVIEWS,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};

//-----------------------------------------
export const addReview = (dispatch, token, review) => {
    setLoading(dispatch, true);
    axios
        .post(
            `${url}/api/reviews`,
            {
                content: review.content,
                rating: review.rating,
                user_id: review.user_id,
                hotel_id: review.hotel_id
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        .then((response) => {
            dispatch({
                type: ADD_REVIEW,
                payload: response.data.data
            });
            getHotelReviews(dispatch, review.hotel_id, review.user_id);
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};
//-----------------------------------------
export const updateReview = (dispatch, token, review) => {
    setLoading(dispatch, true);
    axios
        .put(
            `${url}/api/reviews/${review.id}`,
            {
                content: review.content,
                rating: review.rating,
                user_id: review.user_id,
                hotel_id: review.hotel_id
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        .then((response) => {
            dispatch({
                type: UPDATE_REVIEW,
                payload: response.data.data
            });
            getAllReviews(dispatch, token);

            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};
//-----------------------------------------
export const deleteReview = (dispatch, token, review) => {
    setLoading(dispatch, true);
    axios
        .delete(`${url}/api/reviews/${review.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: DELETE_REVIEW,
                payload: response.data.data
            });
            getAllReviews(dispatch, token);

            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};

//-----------------------------------------
export const updateUserReview = (dispatch, token, review) => {
    setLoading(dispatch, true);
    axios
        .put(
            `${url}/api/reviews/${review.id}`,
            {
                content: review.content,
                rating: review.rating,
                user_id: review.user_id,
                hotel_id: review.hotel_id
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        .then((response) => {
            dispatch({
                type: UPDATE_REVIEW,
                payload: response.data.data
            });
            getUserReviews(dispatch, token, review.user_id);

            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};
//-----------------------------------------
export const deleteUserReview = (dispatch, token, review) => {
    setLoading(dispatch, true);
    axios
        .delete(`${url}/api/reviews/${review.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: DELETE_REVIEW,
                payload: response.data.data
            });
            getUserReviews(dispatch, token, review.user_id);
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};
