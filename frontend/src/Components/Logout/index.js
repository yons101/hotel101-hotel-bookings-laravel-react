import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SecureLS from "secure-ls";

function Logout() {
    let ls = new SecureLS({ encodingType: "aes", isCompression: false });

    useEffect(() => {
        ls.remove("token");
        ls.remove("user_id");
        ls.remove("is_admin");
        return () => {
            ls.remove("token");
            ls.remove("user_id");
            ls.remove("is_admin");
        };
    }, []); // eslint-disable-line

    let history = useHistory();
    setTimeout(() => {
        history.push("/");
    }, 3000);
    return <div></div>;
}

export default Logout;
