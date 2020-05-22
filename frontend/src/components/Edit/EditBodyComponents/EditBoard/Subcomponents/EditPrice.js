

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Radio, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import { PRICE } from "../../../../../constants/edit_Input_Data_Keys";
import { UitdaTextArea } from "../../../../Structure/CommonComponents";


/* Styled Components */
const WholeBox = styled.div`
    margin-bottom: 2rem;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
`;

    const RadioContainer = styled.div`
        margin-bottom: 1rem;
    `;

    const PriceInputCSS = css`
        padding-right: 2rem;

        text-align: right;
        font-size: 1.25rem;
    `;


/* React Component */
const EditPrice = ({price, storeBoardData}) => {

    const defaultCondition = price === '가격 미정' || price === '무료 나눔' ? price : '가격 입력';

    const [ inputCondition, setInputCondition ] = useState(defaultCondition);

    const options = [
        { label: '가격 입력', value: '가격 입력' },
        { label: '가격 미정', value: '가격 미정' },
        { label: '무료 나눔', value: '무료 나눔' },
    ];

    const handleRadioChange = e => {
        setInputCondition(e.target.value);
    }

    return (
        <WholeBox>
            <RadioContainer>
                <Radio.Group options={options} onChange={handleRadioChange} value={inputCondition}/>
            </RadioContainer>
            <UitdaTextArea 
                disabled={ !(inputCondition === '가격 입력') }
                
                customCSS={PriceInputCSS}
                size={200}
                defaultText={price}
                placeHolder="가격을 입력하세요."
                isUnderLine={true}
                data_key={PRICE}
                storeDataFunc={storeBoardData}
            />
            {/* <InputNumber
                formatter={value => `${value} 원`}
            /> */}
        </WholeBox>
    )
}




// class EditPrice extends React.Component {
  
//     state = { disabled: false, value: '가격 입력' };

//     onChange = e => { 
//         this.setState({ value: e.target.value })
//         if (e.target.value == '가격 미정' || e.target.value == '무료 나눔'){
//             this.setState({ disabled: true  })
//         }
//         else {
//             this.setState({ disabled: false })
//         }
//     };

//     componentDidUpdate(prevProps, prevState) {
//         if(this.state.value != '가격 입력'){
//             this.props.storePriceData(this.state.value);
//         }
//     }

//     render() {

//         const { price, storeBoardData } = this.props;
//         const { disabled, value } = this.state;

//         return (
//             <div style={{display:'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'flex-end'}}>
//                 <div style={{marginTop:'-3rem', marginBottom: '1rem'}}>
//                     <Radio.Group options={options} onChange={this.onChange} value={value}/>
//                 </div>
//                 <div style={{marginBottom: '2rem'}}>
//                 {(value == '가격 입력')?
//                     <PriceTextArea
//                         style={{textAlign: "right"}}
//                         defaultValue={price}
//                         placeholder="가격을 입력하세요."
//                         autoSize={true}
//                         onChange={(e) => storeBoardData(PRICE, e.target.value)}
//                         disabled={disabled}
//                     />:
//                     <PriceTextArea
//                         style={{textAlign: "center"}}
//                         defaultValue={price}
//                         placeholder={value}
//                         autoSize={true}
//                         disabled={disabled}
//                     /> 
//                 }
//                 </div>
//             </div>
//         );
//   }
// }


EditPrice.propTypes = {
    price: PropTypes.string,
    storeBoardData: PropTypes.func.isRequired
}

EditPrice.defaultProps = {
    price: ''
}

export default EditPrice;