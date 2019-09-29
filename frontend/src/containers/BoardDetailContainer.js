// 상위 컴포넌트: pages/Board

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import {
    headerOff,
} from "../store/actions/structure"


class BoardDetailContainer extends Component {

    componentDidMount () {
        this.props.headerOff();                              // 헤더 On
    }


    render() {

        const style = {
            height: 200,
            
        }

        return (
            <div style={style}>
                {this.props.boardName} Detail id: {this.props.match.params.id}
            </div>
        )
    }
}

BoardDetailContainer.propTypes = {
    match: PropTypes.object.isRequired,         // url을 통해 넘겨 받는 값. params.id 가 id 값이다.
}


const mapStateToProps = (state) => {
    return {
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        headerOff: () => {dispatch(headerOff())},                   // 헤더를 사라지게 하는 메서드
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BoardDetailContainer);