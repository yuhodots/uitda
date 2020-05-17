

import React, { Component } from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TimePicker } from "antd";
import moment from 'moment';



class UitdaTimePicker extends Component {

    state={}

    componentDidMount () {
        const { data_key, storeDataFunc } = this.props;
        const midnightTime = new Date()
        midnightTime.setHours(0);
        midnightTime.setMinutes(0);
        midnightTime.setSeconds(0);
        midnightTime.setMilliseconds(0);

        storeDataFunc(data_key, midnightTime)
    }

    render () {

        const { storedTime } = this.state;

        const {
            defaultValue,
            data_key,

            storeDataFunc
        } = this.props;

        return (
            <TimePicker
                
                /* 클릭 시에 데이터를 저장하도록 함 */
                onSelect={(time) => { 
                    this.setState({
                        storedTime: time
                    })
                    storeDataFunc(data_key, time._d)
                }}
                value={storedTime}
                
                /* 시간 형식 */
                format='h:mm a'
                minuteStep={5}

                /* 기본 값 */
                defaultValue={defaultValue}
            />
        )
    }
}

UitdaTimePicker.propTypes = {
    defaultValue: PropTypes.object,                 // default Value
    data_key: PropTypes.string.isRequired,          // 인풋 데이터 키

    storeDataFunc: PropTypes.func.isRequired,       // 인풋 데이터 저장 함수
}

UitdaTimePicker.defaultProps = {
    defaultValue: moment('00:00', 'h:mm a'),
}

export default UitdaTimePicker