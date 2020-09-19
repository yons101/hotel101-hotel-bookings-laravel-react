import axios from "axios";
import {
    GET_ALL_HOTELS,
    GET_FEATURED_HOTELS,
    GET_HOTEL_IMAGES,
    ADD_HOTEL,
    UPDATE_HOTEL,
    GET_HOTEL,
    DELETE_HOTEL
} from "../actionTypes";
import { setLoading } from "./global";

const url = process.env.REACT_APP_BASE_URL;
//-----------------------------------------
export const getFeaturedHotels = (dispatch) => {
    axios(`${url}/api/hotels`)
        .then((response) => {
            dispatch({
                type: GET_FEATURED_HOTELS,
                payload: response.data.data
            });
        })
        .catch((error) => {});
};
//-----------------------------------------
export const getAllHotels = (dispatch, token, page = 1) => {
    setLoading(dispatch, true);
    axios(`${url}/api/hotels/all?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then((response) => {
            dispatch({
                type: GET_ALL_HOTELS,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};
//-----------------------------------------
export const getHotelImages = (dispatch) => {
    axios(`${url}/api/hotels/images`)
        .then((response) => {
            dispatch({
                type: GET_HOTEL_IMAGES,
                payload: response.data.data
            });
        })
        .catch((error) => {});
};

//-----------------------------------------
export const addHotel = (dispatch, formData, token) => {
    setLoading(dispatch, true);
    axios
        .post(`${url}/api/hotels`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: ADD_HOTEL,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
            if (error.response.status === 401) {
                window.location.replace("/401");
            }
        });
};
//-----------------------------------------

export const updateHotel = (dispatch, formData, token) => {
    setLoading(dispatch, true);
    axios
        .post(`${url}/api/hotels/${formData.get("id")}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: UPDATE_HOTEL,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);

            if (error.response.status === 401) {
                window.location.replace("/401");
            }
        });
};
//-----------------------------------------

export const deleteHotel = (dispatch, id, token) => {
    setLoading(dispatch, true);
    axios
        .delete(`${url}/api/hotels/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: DELETE_HOTEL,
                payload: response.data.data
            });
            setLoading(dispatch, false);
            getAllHotels(dispatch, token);
        })
        .catch((error) => {
            setLoading(dispatch, false);

            if (error.response.status === 401) {
                window.location.replace("/401");
            }
        });
};

//-----------------------------------------

export const getHotel = (dispatch, id) => {
    axios(`${url}/api/hotels/${id}`)
        .then((response) => {
            dispatch({
                type: GET_HOTEL,
                payload: response.data.data
            });
        })
        .catch((error) => {
            dispatch({
                type: GET_HOTEL,
                payload: error.response.data
            });
        });
};
