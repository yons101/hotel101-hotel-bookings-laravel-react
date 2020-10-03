import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout/";
import Hotel from "./Components/Hotel";
import Room from "./Components/Room";
import Book from "./Components/Book";
import Search from "./Components/Search";

import UserProfile from "./Components/UserDashboard/UserProfile";
import UserBookings from "./Components/UserDashboard/UserBookings";
import UserReviews from "./Components/UserDashboard/UserReviews";

import AdminProfile from "./Components/AdminDashboard/AdminProfile";
import HotelManagement from "./Components/AdminDashboard/HotelManagement";
import AddHotel from "./Components/AdminDashboard/HotelManagement/AddHotel";
import EditHotel from "./Components/AdminDashboard/HotelManagement/EditHotel";
import RoomManagement from "./Components/AdminDashboard/RoomManagement";
import ReviewManagement from "./Components/AdminDashboard/ReviewManagement";
import AddRoom from "./Components/AdminDashboard/RoomManagement/AddRoom";
import EditRoom from "./Components/AdminDashboard/RoomManagement/EditRoom";
import BookingManagement from "./Components/AdminDashboard/BookingManagement";

import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/auth";
import { ProtectedRoute } from "./ProtectedRoute";
import RedirectPage from "./Components/Global/RedirectPage";
import Unauthorized from "./Components/Global/Unauthorized";
import useSecureLs from "./Components/Global/useSecureLs";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
    const dispatch = useDispatch();

    const [_token] = useSecureLs("token");
    const [userId] = useSecureLs("user_id");
    const [isAdmin] = useSecureLs("is_admin");

    useEffect(() => {
        checkAuth(dispatch, _token, userId, isAdmin);
    }, [_token, userId, isAdmin]); // eslint-disable-line

    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 500,
            easing: "ease-in-sine",
        });
    }, []); // eslint-disable-line
    return (
        <>
            <Router>
                <Switch>
                    {/* PUBLIC */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/hotel/:id" component={Hotel} />
                    <Route exact path="/room/:id" component={Room} />
                    <Route
                        path={[
                            `/search/check_in=:check_in?&check_out=:check_out?&city=:city?&guest=:guest?`,
                            "/search"
                        ]}
                        component={Search}
                    />

                    <ProtectedRoute exact path="/book" component={Book} />
                    {/* USER */}
                    <ProtectedRoute
                        exact
                        path="/user-profile/:id"
                        component={UserProfile}
                    />
                    <ProtectedRoute
                        exact
                        path="/user-bookings/:id"
                        component={UserBookings}
                    />
                    <ProtectedRoute
                        exact
                        path="/user-reviews/:id"
                        component={UserReviews}
                    />

                    <ProtectedRoute
                        exact
                        path="/user-reviews/:id"
                        component={UserProfile}
                    />

                    {/* ADMIN */}
                    <ProtectedRoute
                        exact
                        path="/admin-profile/:id"
                        component={AdminProfile}
                    />
                    <ProtectedRoute
                        exact
                        path="/hotel-management"
                        component={HotelManagement}
                    />
                    <ProtectedRoute
                        exact
                        path="/add-hotel"
                        component={AddHotel}
                    />
                    <ProtectedRoute
                        exact
                        path="/edit-hotel/:id"
                        component={EditHotel}
                    />
                    <ProtectedRoute
                        exact
                        path="/room-management"
                        component={RoomManagement}
                    />
                    <ProtectedRoute
                        exact
                        path="/review-management"
                        component={ReviewManagement}
                    />
                    <ProtectedRoute
                        exact
                        path="/edit-room/:id"
                        component={EditRoom}
                    />
                    <ProtectedRoute
                        exact
                        path="/add-room"
                        component={AddRoom}
                    />
                    <ProtectedRoute
                        exact
                        path="/booking-management"
                        component={BookingManagement}
                    />
                    <Route exact path="/401" component={Unauthorized} />
                    <Route exact path="/404" component={RedirectPage} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
