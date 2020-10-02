import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import Header from "../Global/Header";
import Footer from "../Global/Footer";
import SearchForm from "./SearchForm";
import HotelsList from "./HotelsList";
import { search } from "../../redux/actions/search";

const scrollToRef = (ref) => {
    ref.current && window.scrollTo(0, ref.current.offsetTop);
};

function Search(props) {
    const myRef = useRef(null);
    const executeScroll = () => scrollToRef(myRef);

    const dispatch = useDispatch();
    const [criteria, setCriteria] = useState({
        check_in: "",
        check_out: "",
        city: "",
        guest: "",
        star: [],
        min_price: 0,
        max_price: 1000,
        features: []
    });

    useEffect(() => {
        setCriteria({
            ...criteria,
            check_in: props.match.params.check_in || "",
            check_out: props.match.params.check_out || "",
            city: props.match.params.city || "",
            guest: props.match.params.guest || ""
        });
        search(dispatch, criteria);
    }, [props.match.params]); // eslint-disable-line
    return (
        <>
            <Header />
            <div className="p-8 flex flex-col lg:flex-row xl:px-32">
                <h1 className="sr-only">Search for Hotels</h1>
                <SearchForm
                    {...props}
                    criteria={criteria}
                    setCriteria={setCriteria}
                    executeScroll={executeScroll}
                />
                <HotelsList
                    _ref={myRef}
                    criteria={criteria}
                    setCriteria={setCriteria}
                />
            </div>
            <Footer />
        </>
    );
}

export default Search;
