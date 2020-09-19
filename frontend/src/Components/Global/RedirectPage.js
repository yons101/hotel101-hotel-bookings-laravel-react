import React from "react";

import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function RedirectPage(props) {
    let history = useHistory();
    setTimeout(() => {
        history.push("/");
    }, 3000);

    return (
        <>
            <Header />
            <div className="min-h-screen flex justify-center items-center capitalize">
                {props.location.state ? props.location.state.message : "Error"}
            </div>
            <Footer />
        </>
    );
}

export default RedirectPage;
