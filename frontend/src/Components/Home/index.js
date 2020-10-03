import React, { useEffect } from "react";
import Header from "../Global/Header";
import Footer from "../Global/Footer";
import Border from "../Global/Border";
import ClientReviews from "./ClientReviews";
import Hero from "./Hero";
import Welcome from "./Welcome";
import FeaturedHotels from "./FeaturedHotels";

function Home() {
    useEffect(() => {
        document.title = `Hotel101 | Homepage`;
    }, []); // eslint-disable-line
    return (
        <>
            <Header />

            <Hero />

            <Welcome />

            <Border />

            <FeaturedHotels />

            <Border />

            <ClientReviews />

            <Border />

            <Footer />
        </>
    );
}

export default Home;
