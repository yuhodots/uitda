

import axios from "axios";
import qs from "qs";


/* x-www-form-urlencoded 형태의 POST Request 액션의 공통부분을 뽑아낸 함수 */
export const x_www_PostRequestFuction = ( POSTurl, reqBody, successAction = undefined, failureAction = undefined ) => {
    return (dispatch) => {
        /* POST Request config Data */
        const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        /* POST Request */
        return axios.post(POSTurl, qs.stringify(reqBody), config)
        .then(res => { if (successAction) { dispatch( successAction(res) ) } })
        .catch(err => { if (failureAction) { dispatch( failureAction(err)) } })
    }
}

export const formData_PostRequestFuction = (POSTurl, formData, successAction = undefined, failureAction = undefined) => {
    return (dispatch) => {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data'}
        }

        return axios.post(POSTurl, formData, config)
        .then(res => { if (successAction) { dispatch( successAction(res) ) } })
        .catch(err => { if (failureAction) { dispatch( failureAction(err)) } })
    }
}