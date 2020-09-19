import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

class HotelGoogleMap extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={17}
                initialCenter={{
                    lat: parseFloat(this.props.x),
                    lng: parseFloat(this.props.y)
                }}
            >
                <Marker
                    position={{
                        lat: parseFloat(this.props.x),
                        lng: parseFloat(this.props.y)
                    }}
                />
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyB2Zn8qf1kw0a0KgAA8_EW6okxAlijDbHY"
})(HotelGoogleMap);
