

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { colors } from "../../../styles/variables";
import './ant-popover.css'


/* Styled Components */
const MoreIcon = styled(MoreOutlined)`
    font-size: ${props => `${props.size}px`};

    color: ${colors.font_gray};

    :hover {
        color: ${colors.font_darkgray};
    }
`;


/* React Component */
const MoreButton = ({content, size}) => {

    return (
        <Popover content={content} trigger='click' title={false} placement='bottomRight' >
            <MoreIcon size={size} />
        </Popover>
    )
}


MoreButton.propTypes = {
    content: PropTypes.node.isRequired,
    size: PropTypes.number,
}

MoreButton.defaultProps = {
    size: 16
}

export default MoreButton;