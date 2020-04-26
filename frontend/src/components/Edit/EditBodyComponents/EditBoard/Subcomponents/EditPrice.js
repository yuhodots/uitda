import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import PropTypes from 'prop-types';

/* Styled Components */
const PriceTextArea = styled(Input.TextArea)`
    margin-top: -1rem;
    margin-bottom: 3rem;

    font-size: 1.5em;

    /* TextArea 속성 */
    resize: none;
    border: none;
    outline: 0;

    /* Ant-Design 속성 무효화를 위해 */
    :focus {
        border: none;
        box-shadow: none;
    }
`

/* React Component */
const EditPrice = ({price, storePriceData}) => {
    return (
        <PriceTextArea
            defaultValue={price}
            placeholder="가격을 입력하세요."
            autoSize={true}
            onChange={(e) => storePriceData(e.target.value)}
        />
    )
}


EditPrice.propTypes = {
    price: PropTypes.string,
    storePriceData: PropTypes.func.isRequired
}

EditPrice.defaultProps = {
    price: ''
}

export default EditPrice;