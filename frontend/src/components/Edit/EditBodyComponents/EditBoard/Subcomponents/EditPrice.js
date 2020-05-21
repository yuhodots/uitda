

import React from 'react';
import styled from 'styled-components';
import { Input, Radio } from 'antd';
import PropTypes from 'prop-types';

import { PRICE } from "../../../../../constants/edit_Input_Data_Keys";


/* Styled Components */
const PriceTextArea = styled(Input.TextArea)`

    font-size: 1.5em;

    /* TextArea 속성 */
    resize: none;
    border: none;
    outline: 0;

    width: 180px;

    /* Ant-Design 속성 무효화를 위해 */
    :focus {
        border: none;
        box-shadow: none;
    }
`

/* React Component */
const options = [
  { label: '가격 입력', value: '가격 입력' },
  { label: '가격 미정', value: '가격 미정' },
  { label: '무료 나눔', value: '무료 나눔' },
];

class EditPrice extends React.Component {
  
    state = { disabled: false, value: '가격 입력' };

    onChange = e => { 
        this.setState({ value: e.target.value })
        if (e.target.value == '가격 미정' || e.target.value == '무료 나눔'){
            this.setState({ disabled: true  })
        }
        else {
            this.setState({ disabled: false })
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.state.value != '가격 입력'){
            this.props.storePriceData(this.state.value);
        }
    }

    render() {

        const { price, storeBoardData } = this.props;
        const { disabled, value } = this.state;

        return (
            <div style={{display:'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'flex-end'}}>
                <div style={{marginTop:'-3rem', marginBottom: '1rem'}}>
                    <Radio.Group options={options} onChange={this.onChange} value={value}/>
                </div>
                <div style={{marginBottom: '2rem'}}>
                {(value == '가격 입력')?
                    <PriceTextArea
                        style={{textAlign: "right"}}
                        defaultValue={price}
                        placeholder="가격을 입력하세요."
                        autoSize={true}
                        onChange={(e) => storeBoardData(PRICE, e.target.value)}
                        disabled={disabled}
                    />:
                    <PriceTextArea
                        style={{textAlign: "center"}}
                        defaultValue={price}
                        placeholder={value}
                        autoSize={true}
                        disabled={disabled}
                    /> 
                }
                </div>
            </div>
        );
  }
}


EditPrice.propTypes = {
    price: PropTypes.string,
    storeBoardData: PropTypes.func.isRequired
}

EditPrice.defaultProps = {
    price: ''
}

export default EditPrice;