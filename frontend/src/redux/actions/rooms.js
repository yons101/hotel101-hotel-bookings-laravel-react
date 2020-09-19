import {
    GET_ROOM,
    ADD_ROOM,
    DELETE_ROOM,
    UPDATE_ROOM,
    GET_ALL_ROOMS
} from "../actionTypes";
import { setLoading } from "./global";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

//-----------------------------------------

export const getRoom = (dispatch, id) => {
    axios(`${url}/api/rooms/${id}`)
        .then((response) => {
            dispatch({
                type: GET_ROOM,
                payload: response.data.data
            });
        })
        .catch((error) => {});
};

//-----------------------------------------
export const getAllRooms = (dispatch, token, page = 1) => {
    setLoading(dispatch, true);
    axios(`${url}/api/rooms?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then((response) => {
            dispatch({
                type: GET_ALL_ROOMS,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};

//-----------------------------------------
export const addRoom = (dispatch, formData, token) => {
    setLoading(dispatch, true);
    axios
        .post(`${url}/api/rooms`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: ADD_ROOM,
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

export const updateRoom = (dispatch, formData, token) => {
    setLoading(dispatch, true);
    axios
        .post(`${url}/api/rooms/${formData.get("id")}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: UPDATE_ROOM,
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

export const deleteRoom = (dispatch, id, token) => {
    setLoading(dispatch, true);
    axios
        .delete(`${url}/api/rooms/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            dispatch({
                type: DELETE_ROOM,
                payload: response.data.data
            });
            getAllRooms(dispatch, token);
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
            if (error.response.status === 401) {
                window.location.replace("/401");
            }
        });
};
