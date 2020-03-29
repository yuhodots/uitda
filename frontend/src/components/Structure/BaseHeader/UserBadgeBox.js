

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { UserPhoto, UitdaPopover } from "../CommonComponents";
import IconBadge from "./subComponents/IconBadge";
import { BellFilled, BellOutlined, MessengerFilled, MessengerOutlined } from '../../../styles/icon';


/* Styled Components */
const WholeBox = styled.div`
    margin-right: 3rem;
    flex: 0 0 7.5rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

    const GiveMargin = styled.div`
        margin-left: 1.5rem;
    `;


/* React Component */
class UserBadgeBox extends Component {

    state = {}

    _getUserPopoverContent = () => {
        const { logoutRequest } = this.props;
        
        return [
            {
                text: '계정관리',
                clickMethod: () => {
                    this.setState({
                        gotoManage: true
                    })
                }
            },
            {
                text: '로그아웃',
                clickMethod: () => {
                    logoutRequest();
                    window.location.reload();
                },
            }
        ]
    }

    render() {

        const { gotoManage } = this.state;

        const { curUser } = this.props;

        const userPopoverContent = this._getUserPopoverContent();

        return gotoManage ?
            <Redirect to='/manage' /> :
            <WholeBox>
                <IconBadge iconPath={MessengerFilled} size={24} />
                <GiveMargin><IconBadge iconPath={BellOutlined} size={24} badgeCount={2} /></GiveMargin>
                <GiveMargin>
                    <UitdaPopover 
                        PopButton={() => <UserPhoto imgURL={curUser.pic_location} size={28} /> }
                        contentList={userPopoverContent}
                    />
                </GiveMargin>
            </WholeBox>
        
    }
}

UserBadgeBox.propTypes = {
    curUser: PropTypes.object,                          // 로그인된 유저 데이터

    logoutRequest: PropTypes.func.isRequired,           // 로그아웃 액션
}


export default UserBadgeBox;