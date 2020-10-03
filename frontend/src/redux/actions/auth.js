import { SIGN_UP, LOG_IN, CHECK_AUTH } from "../actionTypes";
import { setLoading } from "./global";
import axios from "axios";

//-----------------------------------------
const url = process.env.REACT_APP_BASE_URL;

export const signUp = (dispatch, user, setToken, setUserId, setIsAdmin) => {
    setLoading(dispatch, true);
    axios({
        method: "post",
        url: `${url}/api/register`,
        headers: {
            "Content-Type": " application/json"
        },
        data: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_admin: 0
        }
    })
        .then((response) => {
            setToken(
                response.data.data.success ? response.data.data.token : null
            );
            setUserId(
                response.data.data.success ? response.data.data.user_id : null
            );
            setIsAdmin(
                response.data.data.success ? response.data.data.is_admin : null
            );
            dispatch({
                type: SIGN_UP,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            window.location.replace("/");
        });
};
//-----------------------------------------

export const logIn = (dispatch, user, setToken, setUserId, setIsAdmin) => {
    setLoading(dispatch, true);
    axios({
        method: "post",
        url: `${url}/api/login`,
        headers: {
            "Content-Type": " application/json"
        },
        data: {
            email: user.email,
            password: user.password
        }
    })
        .then((response) => {
            setToken(
                response.data.data.success ? response.data.data.token : null
            );
            setUserId(
                response.data.data.success ? response.data.data.user_id : null
            );
            setIsAdmin(
                response.data.data.success ? response.data.data.is_admin : null
            );

            localStorage.setItem("first_login", true);

            dispatch({
                type: LOG_IN,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            window.location.replace("/");
        });
};
//-----------------------------------------

export const checkAuth = (dispatch, _token, userId, isAdmin) => {
    let token = _token;
    let user_id = userId;
    let is_admin = isAdmin == "1" || isAdmin == 1 ? true : false; // eslint-disable-line
    token != null && token != "null" && token != "" // eslint-disable-line
        ? dispatch({
              type: CHECK_AUTH,
              payload: {
                  isAuthenticated: true,
                  user_id,
                  token,
                  is_admin
              }
          })
        : dispatch({
              type: CHECK_AUTH,
              payload: {
                  isAuthenticated: false,
                  user_id: null,
                  token: null,
                  is_admin: null
              }
          });
};
