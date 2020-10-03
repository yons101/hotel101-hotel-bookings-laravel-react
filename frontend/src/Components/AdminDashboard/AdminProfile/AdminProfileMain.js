import React, { useEffect } from "react";
import AdminPersonalInfo from "./AdminPersonalInfo";
import AdminPassword from "./AdminPassword";
import AdminEmail from "./AdminEmail";
import ErrorMessage from "../../Global/ErrorMessage";
import SuccessMessage from "../../Global/SuccessMessage";
import Loading from "../../Global/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../redux/actions/users";
import { setSuccess } from "../../../redux/actions/global";
import { useParams } from "react-router-dom";

function AdminProfileMain() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    let { id } = useParams();

    useEffect(() => {
        getUser(dispatch, state.auth.token, id);
        document.title = `Profile`;
    }, []); // eslint-disable-line

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [state.users.success]); // eslint-disable-line

    return (
        <div className="w-full md:w-6/12 xl:w-8/12 md:ml-5 bg-gray-200 p-5 rounded-sm  rounded-t-none md:rounded-t-md">
            {state.users.loading && <Loading />}

            {state.users.success === false && (
                <ErrorMessage errors={state.users.errors} />
            )}
            {state.users.success && <SuccessMessage message="Success" />}
            {state.users && (
                <>
                    <AdminPersonalInfo user={state.users.user} id={id} />
                    <AdminEmail id={id} />
                    <AdminPassword id={id} />
                </>
            )}
        </div>
    );
}

export default AdminProfileMain;
