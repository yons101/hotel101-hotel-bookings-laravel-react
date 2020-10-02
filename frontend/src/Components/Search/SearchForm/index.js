import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search, getSearchData } from "../../../redux/actions/search";
import Border from "../../Global/Border";
import SearchFormMain from "./SearchFormMain";
import SearchFormStars from "./SearchFormStars";
import SearchFormPrice from "./SearchFormPrice";
import SearchFormFeatures from "./SearchFormFeatures";
import SearchFormButton from "./SearchFormButton";
import Loading from "../../Global/Loading";

function SearchForm({ criteria, setCriteria, executeScroll }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const onSubmitHandler = (e) => {
        e.preventDefault();
        search(dispatch, criteria);
    };
    useEffect(() => {
        getSearchData(dispatch);
    }, []); // eslint-disable-line
    useEffect(() => {
        search(dispatch, criteria);
        executeScroll();
    }, [criteria]); // eslint-disable-line

    return (
        <aside className="lg:w-3/12 bg-gray-300 p-5 rounded-sm ">
            <form action="" onSubmit={onSubmitHandler}>
                {state.bookings.loading && <Loading />}

                <SearchFormMain
                    criteria={criteria}
                    setCriteria={setCriteria}
                    cities={state.search && state.search.cities}
                />
                <Border borderColor="border-gray-500" my="8" />
                <SearchFormStars
                    criteria={criteria}
                    setCriteria={setCriteria}
                />
                <Border borderColor="border-gray-500" my="8" />
                <SearchFormPrice
                    criteria={criteria}
                    setCriteria={setCriteria}
                />
                <Border borderColor="border-gray-500" my="8" />
                <SearchFormFeatures
                    criteria={criteria}
                    setCriteria={setCriteria}
                    features={state.search && state.search.features}
                />
                <Border borderColor="border-gray-500" my="8" />
                <SearchFormButton
                    criteria={criteria}
                    setCriteria={setCriteria}
                />
            </form>
        </aside>
    );
}

export default SearchForm;
