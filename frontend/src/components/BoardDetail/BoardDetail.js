// 상위 컴포넌트: BoardDetailContainer

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { 
    PhotoBox,
    CommentBox,
    TextBox
} from "./subcomponents";

import { colors } from "../../styles/variables";


const BackgroundDiv = styled.div`
    width: 100%;
    background-color: ${colors.gray_bg};
`;

const ContainerDiv = styled.div`
    width: 70%;
    min-height: ${props => props.minHeight};
    margin: 0 auto;

    background-color: ${colors.white};
`;

class BoardDetail extends Component {

    state = {}

    componentDidMount() {
        this.setState({
            clientHeight: document.documentElement.clientHeight
        })

        window.addEventListener('resize', this._handleResize) 
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize)
    }

    _handleResize = (e) => {
        this.setState({
            ...this.state,
            clientHeight: document.documentElement.clientHeight
        })
    }

    render() {
        
        let { clientHeight } = this.state;

        const {
            filelist,

            title,
            user,
            created,
            condition,
            description,

            price
        } = this.props.post;

        return (
            <BackgroundDiv>
                <ContainerDiv minHeight={`${clientHeight}px`} >
                    <PhotoBox filelist={filelist} />
                    <TextBox
                        title={title}
                        user={user}
                        created={created}
                        condition={condition}
                        description={description}
                        price={price}
                    />
                    <CommentBox />
                </ContainerDiv>
            </BackgroundDiv>
        )
    }
}

BoardDetail.propTypes = {
    post: PropTypes.object.isRequired
}

export default BoardDetail;
