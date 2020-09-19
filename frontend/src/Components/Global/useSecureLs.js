import SecureLS from "secure-ls";
import { useEffect, useState } from "react";

let ls = new SecureLS({ encodingType: "aes", isCompression: false });

function useSecureLs(key, initValue) {
    const [value, setValue] = useState(() => {
        try {
            const jsonValue = ls.get(key);
            if (jsonValue !== null) return jsonValue;
            return initValue;
        } catch (error) {}
    });

    useEffect(() => {
        ls.set(key, value);
    }, [key, value]); // eslint-disable-line

    return [value, setValue];
}

export default useSecureLs;
