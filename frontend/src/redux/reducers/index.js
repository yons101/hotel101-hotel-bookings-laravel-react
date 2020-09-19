import { combineReducers } from "redux";
import hotels from "./hotels";
import rooms from "./rooms";
import auth from "./auth";
import users from "./users";
import bookings from "./bookings";
import reviews from "./reviews";
import search from "./search";

export default combineReducers({
    hotels,
    auth,
    rooms,
    users,
    bookings,
    reviews,
    search
});
