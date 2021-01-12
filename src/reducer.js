export const initialState = {
    loading: true,
    movies: [],
    currentPage: 1,
    totalResults: null,
    errorMessage: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case "SEARCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload.Search,
                totalResults: action.payload.totalResults
            };
        case "SEARCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        case "CHANGE_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    }
};
