import {
    GET_ROOM,
    GET_ALL_ROOMS,
    ADD_ROOM,
    UPDATE_ROOM,
    DELETE_ROOM,
    SET_SUCCESS,
    SET_LOADING
} from "../actionTypes";

const initialState = {
    room: {
        id: null,
        name: "",
        description: "",
        price: 0,
        guest: 0,
        hotel_id: 0,
        image: "",
        features: [],
        created_at: "",
        updated_at: ""
    },
    allRooms: [],
    suggestedRooms: [],
    success: null,
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
        case GET_ROOM: {
            return {
                ...state,
                room: action.payload.room,
                suggestedRooms: action.payload.suggested_rooms
            };
        }
        case ADD_ROOM: {
            return {
                ...state,
                room: action.payload.room,
                success: action.payload.success ? true : false,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case UPDATE_ROOM: {
            return {
                ...state,
                room: action.payload.success ? action.payload.room : null,
                success: action.payload.success ? true : false,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case DELETE_ROOM: {
            return {
                ...state,
                room: action.payload.success ? action.payload.room : null,
                success: action.payload.success ? true : false,
                errors: action.payload.success ? null : action.payload.errors
            };
        }
        case GET_ALL_ROOMS: {
            return {
                ...state,
                allRooms: action.payload.rooms.data,
                pagination: {
                    current_page: action.payload.rooms.current_page,
                    first_page_url: action.payload.rooms.first_page_url,
                    from: action.payload.rooms.from,
                    last_page: action.payload.rooms.last_page,
                    last_page_url: action.payload.rooms.last_page_url,
                    next_page_url: action.payload.rooms.next_page_url,
                    path: action.payload.rooms.path,
                    per_page: action.payload.rooms.per_page,
                    prev_page_url: action.payload.rooms.prev_page_url
                }
            };
        }
        case SET_SUCCESS: {
            return {
                ...state,
                success: action.payload
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        default:
            return state;
    }
}
