// 상위 컴포넌트: pages/manage.js


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

/* Components */
import {
    Header, Body,
} from '../../components/Manage/ManageStructure'

/* Actions */
import {
    /* Error Types */
    // NO_USER,            // User가 없는 error (not login)

    /* action 생성자 */
    getMyPostRequest,   // Posts GET request 함수  
} from '../../store/actions/manage'

/* Content Constant */
import {
    POSTS,
    COMMENTS,
    LIKEPOSTS,
    MYCARPOOL,
    NOTIFICATIONS
} from '../../pages/Manage'


class ManageContainer extends Component {

    state = {}

    componentDidMount() {
        const {
            kind, board
        } = this.props.match.params

        switch(kind) {
            case COMMENTS:
                break;
            case LIKEPOSTS:
                break;
            case MYCARPOOL:
                break;    
            case NOTIFICATIONS:
                break;
            
            /* kind가 post인 경우 */
            default:
                this.setState({
                    ...this.state,
                    kind: POSTS,
                    board
                })
                this.props.getMyPostRequest(board);
        }

    }


    render() {
        
        const {
            kind,
            board
        } = this.state

        const {
            // isGetSuccess,
            err,
            user,

            postList
        } = this.props;
    
        // console.log(err)

        return(
            <div>
                <Header 
                    isEdit={false} 
                    user={user}
                />
                <Body 
                    err={err} 

                    user={user}
                    kind={kind}
                    board={board}

                    postList={postList}
                />
            </div>
        )
    }

}

ManageContainer.propTypes = {
    match: PropTypes.object.isRequired,     // url을 통해 주는 정보.
}

const mapStateToProps = (state) => {
    return {
        isGetSuccess: state.manage.isGetSuccess,    // GET 요청의 성공 여부
        err: state.manage.err,                      // GET 실패 시 err 식별자

        user: state.manage.user,                     // 유저 정보

        postList: state.manage.postList,            // Posts GET 요청을 통해 얻은 post list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyPostRequest: (board) => {dispatch(getMyPostRequest(board))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageContainer);