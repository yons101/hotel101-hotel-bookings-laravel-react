import React from "react";
import HotelItem from "./HotelItem";
import { search } from "../../redux/actions/search";

import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Global/Pagination";

function HotelsList({ criteria, _ref }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    return (
        <section
            className="mt-5 lg:mt-0 lg:w-9/12 lg:ml-5 bg-gray-300 rounded-sm "
            ref={_ref}
        >
            {state.search.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.search}
                    method={search}
                    params={[dispatch, criteria]}
                />
            )}
            {state &&
                state.search.hotels.map((hotel, i) => {
                    return <HotelItem key={i} hotel={hotel} />;
                })}

            {state.search.pagination.last_page !== 1 && (
                <Pagination
                    paginate={state.search}
                    method={search}
                    params={[dispatch, criteria]}
                />
            )}
        </section>
    );
}

export default HotelsList;
