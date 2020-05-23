

import React, { useState } from 'react';
import styled from 'styled-components';
import { Radio, Input } from 'antd';
import PropTypes from 'prop-types';

import { PRICE } from "../../../../../constants/edit_Input_Data_Keys";


/* Styled Components */
const WholeBox = styled.div`
    position: relative;
    margin-bottom: 2rem;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
`;

    const RadioContainer = styled.div`
        margin-bottom: 1rem;
    `;

    const PriceInputTextArea = styled(Input)`
        padding-right: ${props => props.displayWon? '1.75rem' : '0.75rem' };
        width: 200px;

        /* TextArea 속성 */
        resize: none;
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
        outline: 0;
        background-color: inherit;

        :focus {
            box-shadow: none;
        }

        font-size: 1.25rem;
        text-align: right;
    `;

    const WonMark = styled.span`
        position: absolute;
        top: 2.675rem;
        
        font-size: 1.25rem;
    `;



/* React Component */
const EditPrice = ({price, storeBoardData}) => {

    const defaultCondition = price === '가격 미정' || price === '무료 나눔' ? price : '가격 입력';

    const [ inputCondition, setInputCondition ] = useState(defaultCondition);
    const [ priceValue, setPriceValue ] = useState(price);

    const options = [
        { label: '가격 입력', value: '가격 입력' },
        { label: '가격 미정', value: '가격 미정' },
        { label: '무료 나눔', value: '무료 나눔' },
    ];
    
    const handleRadioChange = e => {
        setInputCondition(e.target.value);
        if ( e.target.value === '가격 입력' ) { setPriceValue('') }   
        else { 
            setPriceValue(e.target.value) 
            storeBoardData(PRICE, e.target.value);
        } 
    }

    const isdisabled = !(inputCondition === '가격 입력');
    const displayWon = !isdisabled && priceValue;

    return (
        <WholeBox>
            <RadioContainer>
                <Radio.Group options={options} onChange={handleRadioChange} value={inputCondition}/>
            </RadioContainer>
            <PriceInputTextArea 
                displayWon={displayWon}
                disabled={isdisabled}
                defaultValue={price}
                placeholder="가격을 입력하세요."
                value={priceValue}
                onChange={(e) => {
                    setPriceValue(e.target.value);
                    storeBoardData(PRICE, e.target.value)
                }}
            />
            {
                displayWon &&
                <WonMark>원</WonMark>
            }
        </WholeBox>
    )
}


EditPrice.propTypes = {
    price: PropTypes.string,
    storeBoardData: PropTypes.func.isRequired
}

EditPrice.defaultProps = {
    price: ''
}

export default EditPrice;