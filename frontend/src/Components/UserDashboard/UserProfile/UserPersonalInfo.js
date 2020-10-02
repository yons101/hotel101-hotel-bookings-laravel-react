import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../../redux/actions/users";

function UserPersonalInfo({ user, id }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [userInfo, setUserInfo] = useState({
        id: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        city: ""
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        setUserInfo({
            id,
            first_name: user && user.first_name ? user.first_name : "",
            last_name: user && user.last_name ? user.last_name : "",
            phone: user && user.phone ? user.phone : "",
            address: user && user.address ? user.address : "",
            city: user && user.city ? user.city : ""
        });
    }, [user]); // eslint-disable-line

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append("id", id);
        formData.append("first_name", userInfo.first_name);
        formData.append("last_name", userInfo.last_name);
        formData.append("phone", userInfo.phone);
        formData.append("address", userInfo.address);
        formData.append("city", userInfo.city);

        image && formData.append("image", image);

        updateUserInfo(dispatch, state.auth.token, formData);
    };
    return (
        <div>
            <h2 className="font-semibold">
                <i className="fas fa-user mr-2"></i>Change your personal info
            </h2>

            <form
                action=""
                className="mt-5 bg-gray-300 p-5 rounded-sm "
                onSubmit={onSubmitHandler}
            >
                <div className="flex items-center mt-5">
                    <img
                        src={
                            user && user.image
                                ? `${process.env.REACT_APP_BASE_URL}/img/users/${user.image}`
                                : "http://placehold.it/300x300?text=avatar"
                        }
                        alt="avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />

                    <label aria-label="upload image" className="ml-5 px-5 py-2 text-gray-200 bg-orange-500 hover:bg-orange-900 rounded-sm cursor-pointer">
                        <input
                            type="file"
                            name=""
                            id=""
                            className="hidden"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                        />
                        <i className="fas fa-camera mr-2"></i>
                        <span>{image ? image.name : "Upload"}</span>
                    </label>
                </div>
                <label htmlFor="first_name" className="block mt-5">
                    First Name:{" "}
                </label>
                <input
                    type="text"
                    name="first_name"
                    id="first_name"                   
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={userInfo.first_name}
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, first_name: e.target.value })
                    }
                />

                <label htmlFor="last_name" className="block mt-5">
                    Last Name:{" "}
                </label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={userInfo.last_name}
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, last_name: e.target.value })
                    }
                />

                <label htmlFor="phone" className="block mt-5">
                    Phone:{" "}
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={userInfo.phone}
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                />

                <label htmlFor="address" className="block mt-5">
                    Address:{" "}
                </label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    className="p-2 w-full xl:w-1/2 border border-gray-400 focus:outline-none focus:border-black"
                    value={userInfo.address}
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, address: e.target.value })
                    }
                />

                <button
                    className="text-center bg-yellow-600 text-white hover:bg-yellow-700 uppercase text-sm px-6 py-2 shadow
                    hover:shadow-lg block mt-5"
                    type="submit"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default UserPersonalInfo;
