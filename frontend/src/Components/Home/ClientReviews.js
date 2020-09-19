import React from "react";
import ClientReviewCard from "./ClientReviewCard";
import TitleSection from "../Global/TitleSection";

function ClientReviews() {
    return (
        <section className="reviews px-5 xl:px-48">
            <TitleSection title="What People Say About Us" />

            <div className="relative flex flex-col md:flex-row">
                <ClientReviewCard
                    avatar="/assets/img/avatars/avatar-1.jpg"
                    name="Ahmed Hamada"
                    location="London - UK"
                    rating={5}
                    review="Lorem ipsum, dolor sit amet consectetur adipisicing
                            consectetur adipisicing elit. Dolor, explicabo
                            cupiditate. Alias, sequi"
                />

                <ClientReviewCard
                    avatar="/assets/img/avatars/avatar-2.jpg"
                    name="Alise Jonas"
                    location="Paris - France"
                    rating={5}
                    review="Lorem ipsum, dolor sit amet consectetur adipisicing
                            consectetur adipisicing elit. Dolor, explicabo
                            cupiditate. Alias, sequiLorem ipsum, dolor sit amet consectetur adipisicing
                            consectetur adipisicing elit. Dolor, explicabo
                            cupiditate. Alias, sequi"
                />

                <ClientReviewCard
                    avatar="/assets/img/avatars/avatar-3.jpg"
                    name="Jan Bjronsson"
                    location="Stockholm - Sweden"
                    rating={5}
                    review="Lorem ipsum, dolor sit amet consectetur adipisicing
                            consectetur adipisicing elit. Dolor, explicabo
                            cupiditate. Alias, sequi"
                />
            </div>
        </section>
    );
}

export default ClientReviews;
