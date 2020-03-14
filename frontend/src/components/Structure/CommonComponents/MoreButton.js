

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { colors } from "../../../styles/variables";
import './ant-popover.css'


/* Styled Components */
/* 더보기 아이콘의 스타일 */
const MoreIcon = styled(MoreOutlined)`
    font-size: ${props => `${props.size}px`};

    color: ${colors.font_gray};

    :hover {
        color: ${colors.font_darkgray};
    }
`;

/* Content List의 각각의 Item 스타일 */
const PopoverListItem = styled.div`
    padding: 0.375rem 1rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    cursor: pointer;

    :hover {
        background-color: ${colors.gray_bg};
    }
`;

    /* Content Item의 Icon 스타일 */
    const PopoverListItemIcon = styled.div`
        margin-right: 0.5rem;
    `;



/* React Component */
class MoreButton extends Component {

    state = { popoverVisible: false }

    /* Ant-Design Popover visible 변경 메서드 */
    _handleVisibleChange = popoverVisible => {
        this.setState({ popoverVisible });
    };

    /* 각각의 content item의 개별 메서드 실행 후, popover를 닫는 메서드 */
    _handleContentClick = (clickMethod) => {
        clickMethod();
        this.setState({
            popoverVisible: false,
        });
    }

    /* Content 정보가 담긴 list를 react component로 render하는 함수 */
    _renderPopoverList = (contentList) => {
        return contentList.map( contentData => {
            
            const { text, icon, clickMethod } = contentData

            return (
                <PopoverListItem onClick={() => this._handleContentClick(clickMethod)} >
                    {
                        icon ?
                        <PopoverListItemIcon>{icon}</PopoverListItemIcon> :
                        ''
                    }
                    {text}
                </PopoverListItem>
            )
        });
    }


    render() {

        const { popoverVisible } = this.state;

        const {
            size, customContent, contentList
        } = this.props;

        const content = customContent ? customContent : this._renderPopoverList(contentList);

        return (
            <Popover 
                content={content} 
                trigger='click' 
                title={false} 
                placement='bottomRight' 
                visible={popoverVisible}
                onVisibleChange={this._handleVisibleChange}    
            >
                <MoreIcon size={size} />
            </Popover>
        )
    }
}


MoreButton.propTypes = {
    size: PropTypes.number,                     // 더보기 아이콘 크기
    contentList: PropTypes.array,               /* 더보기 목록을 담은 Array 객체.  
                                                   배열의 elem은 text과 handleClick 메서드를 반드시 필요로 하고, 
                                                   icon은 추가할 수 있는 객체이어야 한다. */ 
    customContent: PropTypes.node,              // List가 아닌 Custom Content도 허용한다.
}

MoreButton.defaultProps = {
    size: 16,
}

export default MoreButton;