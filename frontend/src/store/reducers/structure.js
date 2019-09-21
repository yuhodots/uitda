import { 
    STRUCTURE_SEARCH_BAR_ON,
    STRUCTURE_SEARCH_BAR_OFF,
    STRUCTURE_HEADER_ON,
    STRUCTURE_HEADER_OFF,
    STRUCTURE_CATEGORY_ON,
    STRUCTURE_CATEGORY_OFF
 } from "../actions/ActionTypes";


const InitialState = {
    isSearchBarOn: false,
    isHeaderOn: true,
    isCategoryOn: false,
}

export default function structure (state = InitialState, action) {

    switch (action.type) {
        // 헤더의 검색 창
        case STRUCTURE_SEARCH_BAR_ON:
            return {
                ...state,
                isSearchBarOn: true
            }

        case STRUCTURE_SEARCH_BAR_OFF:
            return {
                ...state,
                isSearchBarOn: false
            }

        // 헤더
        case STRUCTURE_HEADER_ON:
            return {
                ...state,
                isHeaderOn: true
            }
    
        case STRUCTURE_HEADER_OFF:
            return {
                ...state,
                isHeaderOn: false
            }
            
        // 헤더의 카테고리 옵션
        case STRUCTURE_CATEGORY_ON:
            return {
                ...state,
                isCategoryOn: true
            }
    
        case STRUCTURE_CATEGORY_OFF:
            return {
                ...state,
                isCategoryOn: false
            }
            
    
        default:
            return state;
    }
}