import { SET_LOADING, CONFRIM_DELETE, SET_SUCCESS } from "../actionTypes";

//-----------------------------------------
export const setLoading = (dispatch, bool) => {
    dispatch({
        type: SET_LOADING,
        payload: bool
    });
};
//-----------------------------------------
export const confirmDelete = (dispatch, i, bool) => {
    dispatch({
        type: CONFRIM_DELETE,
        payload: { i, bool }
    });
};

//-----------------------------------------
export const setSuccess = (dispatch, bool) => {
    dispatch({
        type: SET_SUCCESS,
        payload: bool
    });
};
