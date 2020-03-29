

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { UserPhoto } from "../CommonComponents";
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


    render() {

        const { userimgURL } = this.props;

        return (
            <WholeBox>
                <IconBadge iconPath={MessengerFilled} size={24} />
                <GiveMargin><IconBadge iconPath={BellOutlined} size={24} badgeCount={2} /></GiveMargin>
                <GiveMargin>
                    
                    <UserPhoto imgURL={userimgURL} size={28} />
                </GiveMargin>
            </WholeBox>
        )
    }
}

UserBadgeBox.propTypes = {
    userimgURL: PropTypes.string.isRequired,
}


export default UserBadgeBox;