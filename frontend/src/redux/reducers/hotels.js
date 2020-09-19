import {
    GET_ALL_HOTELS,
    GET_FEATURED_HOTELS,
    GET_HOTEL_IMAGES,
    GET_HOTEL,
    ADD_HOTEL,
    DELETE_HOTEL,
    UPDATE_HOTEL,
    SET_SUCCESS,
    SET_LOADING
} from "../actionTypes";

const initialState = {
    success: null,
    allHotels: [],
    featuredHotels: [],
    images: [],
    hotel: { rooms: [] },
    errors: null,
    loading: false,
    pagination: {
        current_page: null,
        first_page_url: null,
        from: null,
        last_page: null,
        last_page_url: null,
        next_page_url: null,
        path: null,
        per_page: null,
        prev_page_url: null
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_HOTEL: {
            return {
                ...state,
                hotel: action.payload.success ? action.payload.hotel : null
            };
        }
        case GET_ALL_HOTELS: {
            return {
                ...state,
                allHotels: action.payload.hotels.data,
                pagination: {
                    current_page: action.payload.hotels.current_page,
                    first_page_url: action.payload.hotels.first_page_url,
                    from: action.payload.hotels.from,
                    last_page: action.payload.hotels.last_page,
                    last_page_url: action.payload.hotels.last_page_url,
                    next_page_url: action.payload.hotels.next_page_url,
                    path: action.payload.hotels.path,
                    per_page: action.payload.hotels.per_page,
                    prev_page_url: action.payload.hotels.prev_page_url
                }
            };
        }
        case GET_FEATURED_HOTELS: {
            return {
                ...state,
                featuredHotels: action.payload.hotels
            };
        }
        case GET_HOTEL_IMAGES: {
            return {
                ...state,
                images: action.payload.images
            };
        }
        case ADD_HOTEL: {
            return {
                ...state,
                success: action.payload.success ? true : false,
                hotel: action.payload.hotel,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case UPDATE_HOTEL: {
            return {
                ...state,
                hotel: action.payload.hotel,
                success: action.payload.success ? true : false,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case DELETE_HOTEL: {
            return {
                ...state,
                hotel: action.payload.hotel,
                success: action.payload.success ? true : false,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        case SET_SUCCESS: {
            return {
                ...state,
                success: action.payload
            };
        }
        default:
            return state;
    }
}
