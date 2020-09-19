import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SecureLS from "secure-ls";

function Unauthorized(props) {
    let history = useHistory();
    let ls = new SecureLS({ encodingType: "aes", isCompression: false });

    useEffect(() => {
        ls.remove("token");
        ls.remove("user_id");
        ls.remove("is_admin");
    }, []); // eslint-disable-line
    setTimeout(() => {
        history.push("/logout");
    }, 3000); // eslint-disable-line

    return (
        <>
            <Header />
            <div className="min-h-screen flex justify-center items-center capitalize">
                {props.location.state
                    ? props.location.state.message
                    : "You are not authorized, please log in again"}
            </div>
            <Footer />
        </>
    );
}

export default Unauthorized;
