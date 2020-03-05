
// AUTH Action Types

export const AUTH_GET_STATUS_SUCCESS = "AUTH_GET_STATUS_SUCCESS";
export const AUTH_GET_STATUS_FAILURE = "AUTH_GET_STATUS_FAILURE";

export const AUTH_REGISTER_SUCCESS = 'AUTR_RIGISTER_SUCCESS';
export const AUTH_REGISTER_FAILURE = 'AUTR_RIGISTER_FAILURE';

export const AUTH_LOGIN_FAILURE = 'AUTR_LOGIN_FAILURE';
export const AUTH_LOGIN_SUCCESS = 'AUTR_LOGIN_SUCCESS';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';


// BOARD Action Types

export const BOARD_INIT = "BOARD_INIT";

export const BOARD_FIRST_GET_SUCCESS = "BOARD_FIRST_GET_SUCCESS";
export const BOARD_FIRST_GET_FAILURE = "BOARD_FIRST_GET_FAILURE";

export const BOARD_SCROLL_GET = "BOARD_SCROLL_GET";
export const BOARD_SCROLL_GET_SUCCESS = "BOARD_SCROLL_GET_SUCCESS";
export const BOARD_SCROLL_GET_FAILURE = "BOARD_SCROLL_GET_FAILURE";

export const BOARD_HEADER_ON = "BOARD_HEADER_ON";
export const BOARD_HEADER_OFF = "BOARD_HEADER_OFF";

/* Detail 페이지 액션들 */
export const BOARD_DETAIL_INIT = "BOARD_DETAIL_INIT";

export const BOARD_DETAIL_GET_SUCCESS = "BOARD_DETAIL_GET_SUCCESS";
export const BOARD_DETAIL_GET_FAILURE = "BOARD_DETAIL_GET_FAILURE";

export const BOARD_COMMENT_CREATE = "BOARD_COMMENT_CREATE";
export const BOARD_COMMENT_UPDATE = "BOARD_COMMENT_UPDATE";
export const BOARD_COMMENT_DELETE = "BOARD_COMMENT_DELETE";


// TOPIC Action Types

export const TOPIC_HOME = 'TOPIC_HOME';
export const TOPIC_MARKET = "TOPIC_MARKET";
export const TOPIC_CARPOOL = 'TOPIC_CARPOOL';
export const TOPIC_NETWORKING = "TOPIC_NETWORKING";


// MANAGE Action Types

export const MANAGE_GET_MY_POSTS_SUCCESS = 'MANAGE_GET_MY_POSTS_SUCCESS';
export const MANAGE_GET_MY_POSTS_FAILURE = 'MANAGE_GET_MY_POSTS_FAILURE';

export const MANAGE_DELETE_POST_SUCCESS = 'MANAGE_DELETE_POST_SUCCESS';
export const MANAGE_DELETE_POST_FAILURE = 'MANAGE_DELETE_POST_FAILURE';

export const MANAGE_EDIT_INIT_PAGE = 'MANAGE_EDIT_INIT_PAGE';

export const MANAGE_EDIT_SELECT_CATEGORY = 'MANAGE_EDIT_SELECT_CATEGORY';

export const MANAGE_EDIT_CREATE_POST_SUCCESS = 'MANAGE_EDIT_CREATE_POST_SUCCESS';
export const MANAGE_EDIT_CREATE_POST_FAILURE = 'MANAGE_EDIT_CREATE_POST_FAILURE';

export const MANAGE_EDIT_GET_POST_SUCCESS = 'MANAGE_EDIT_GET_POST_SUCCESS';
export const MANAGE_EDIT_GET_POST_FAILURE = 'MANAGE_EDIT_GET_POST_FAILURE';

export const MANAGE_EDIT_UPDATE_POST_SUCCESS = 'MANAGE_EDIT_UPDATE_POST_SUCCESS';
export const MANAGE_EDIT_UPDATE_POST_FAILURE = 'MANAGE_EDIT_UPDATE_POST_FAILURE';

export const MANAGE_EDIT_STORE_TITLE_DATA = 'MANAGE_EDIT_STORE_TITLE_DATA';
export const MANAGE_EDIT_ADD_FILE_DATA = 'MANAGE_EDIT_ADD_FILE_DATA';
export const MANAGE_EDIT_DELETE_FILE_DATA = 'MANAGE_EDIT_DELETE_FILE_DATA';
export const MANAGE_EDIT_STORE_DESCRIPTION_DATA = 'MANAGE_EDIT_STORE_DESCRIPTION_DATA';

/* Edit 페이지의 style 선택 액션 */
export const MANAGE_EDIT_CLICK_BOLD = 'MANAGE_EDIT_CLICK_BOLD';
export const MANAGE_EDIT_CLICK_ITELIC = 'MANAGE_EDIT_CLICK_ITELIC';
export const MANAGE_EDIT_CLICK_UNDERLINE = 'MANAGE_EDIT_CLICK_UNDERLINE';
export const MANAGE_EDIT_CLICK_STRIKETHROUGH = 'MANAGE_EDIT_CLICK_STRIKETHROUGH';
//////////////////////// 리팩토링 하자

export const MANAGE_EDIT_SELECT_TEXT_ALIGN = 'MANAGE_EDIT_SELECT_TEXT_ALIGN';

export const MANAGE_EDIT_SELECT_CALENDAR_DATE = 'MANAGE_EDIT_SELECT_CALENDAR_DATE';
export const MANAGE_EDIT_CARPOOL_STORE_DATA = 'MANAGE_EDIT_CARPOOL_STORE_DATA';

export const MANAGE_EDIT_CARPOOL_POST_SUCCESS = 'MANAGE_EDIT_CARPOOL_POST_SUCCESS';
export const MANAGE_EDIT_CARPOOL_POST_FAILURE = 'MANAGE_EDIT_CARPOOL_POST_FAILURE';


/* Carpool Actions */

export const CARPOOL_SELECT_DATE = 'CARPOOL_SELECT_DATE';