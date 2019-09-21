import { 
    STRUCTURE_SEARCH_BAR_ON,
    STRUCTURE_SEARCH_BAR_OFF,
    STRUCTURE_HEADER_ON,
    STRUCTURE_HEADER_OFF,
    STRUCTURE_CATEGORY_ON,
    STRUCTURE_CATEGORY_OFF
 } from "./ActionTypes";


// Search Bar 온 오프 액션 생성자

export function searchBarOn() {
    return {
        type: STRUCTURE_SEARCH_BAR_ON
    }
}

export function searchBarOff() {
    return {
        type: STRUCTURE_SEARCH_BAR_OFF
    }
}


// Header 온 오프 액션 생성자

export function headerOn() {
    return {
        type: STRUCTURE_HEADER_ON
    }
}

export function headerOff() {
    return {
        type: STRUCTURE_HEADER_OFF
    }
}


// Category 온 오프 액션 생성자

export function categoryOn() {
    return {
        type: STRUCTURE_CATEGORY_ON
    }
}

export function categoryOff() {
    return {
        type: STRUCTURE_CATEGORY_OFF
    }
}