/* 유잇다 홈페이지에서 사용하는 Popover의 공통 스타일을 정의한 컴포넌트
   사용되는 곳: Header의 user 아이콘, Carpool Modal의 더보기

   PopButton: Popover의 트리거가 되는 버튼(아이콘)
   contentList: Popover의 목록의 데이터를 담은 Array 객체
   CustomContent: 커스텀된 Content를 넘겨줄 수 있다.
*/

import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover } from "antd";

import { colors } from "../../../styles/variables";
import './ant-popover.css'


/* Styled Components */
/* Content List의 각각의 Item 스타일 */
const PopoverListItemStyle = css`
    padding: 0.375rem 1rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    white-space: nowrap;

    cursor: pointer;

    :hover {
        background-color: ${colors.gray_bg};
    }

    ${props => {
        switch (props.theme) {
            case 'danger':
                return css`
                    color: ${colors.font_red};
                `
            default: return
        }
    }}
`;

/* default type의 List Item */
const PopoverListItem = styled.div`
    ${PopoverListItemStyle}
`;

/* Link type의 List Item */
const PopoverListItemLink = styled(Link)`
    ${PopoverListItemStyle}

    color: ${colors.font_default};
    :hover {
        color: ${colors.font_default};
    }
`;

const PopoverListItemAtag = styled.a`
    ${PopoverListItemStyle}

    color: ${colors.font_default};
    :hover {
        color: ${colors.font_default};
    }
`;


    /* Content Item의 Icon 스타일 */
    const PopoverListItemIcon = styled.div`
        margin-right: 0.5rem;
    `;



/* React Component */
class UitdaPopover extends Component {

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
        return contentList.map( (contentData, idx) => {
            
            const { text, icon, clickMethod, type, url, theme } = contentData

            switch (type) {
                /* link type인 경우, Link 태그를 render */
                case 'link':
                    return (
                        <PopoverListItemLink to={url} key={idx} >
                            {
                                icon ?
                                <PopoverListItemIcon>{icon}</PopoverListItemIcon> :
                                ''
                            }
                            {text}
                        </PopoverListItemLink> 
                    )

                case 'a':
                    return (
                        <PopoverListItemAtag href={url} key={idx} >
                            {
                                icon ?
                                <PopoverListItemIcon>{icon}</PopoverListItemIcon> :
                                ''
                            }
                            {text}
                        </PopoverListItemAtag> 
                    )

                /* default type인 경우, clickMethod를 실행하는 div 태그를 render */
                default:
                    return (
                        <PopoverListItem onClick={() => this._handleContentClick(clickMethod)} key={idx} theme={theme} >
                            {
                                icon ?
                                <PopoverListItemIcon>{icon}</PopoverListItemIcon> :
                                ''
                            }
                            {text}
                        </PopoverListItem>
                    )
            }            

        });
    }


    render() {

        const { popoverVisible } = this.state;

        const {
            PopButton, CustomContent, contentList,
            placement,
        } = this.props;

        const content = CustomContent ? CustomContent : this._renderPopoverList(contentList);

        return (
            <Popover 
                content={content} 
                trigger='click' 
                title={false} 
                placement={placement} 
                visible={popoverVisible}
                onVisibleChange={this._handleVisibleChange}    
            >
                <PopButton />
                {''}
            </Popover>
        )
    }
}


UitdaPopover.propTypes = {
    PopButton: PropTypes.func.isRequired,       // Popover를 띄우는 trigger가 되는 버튼

    contentList: PropTypes.array,               /* Popover의 목록을 담은 Array 객체.  
                                                   배열의 elem은 text과 clickMethod 메서드를 반드시 필요로 하고, 
                                                   icon은 추가할 수 있는 객체이어야 한다. */ 
    CustomContent: PropTypes.node,              // List가 아닌 Custom Content도 허용한다.

    /* Popover Property */
    placement: PropTypes.string,                
}

UitdaPopover.defaultProps = {
    contentList: [],
    CustomContent: undefined,
    placement: 'bottomRight',
}

export default UitdaPopover;