

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Upload, Icon } from 'antd';

import { colors } from '../../../../styles/variables'


/* Styled Components */
const Container = styled.div`
    height: 20rem;
    margin-bottom: 3rem;

    border: 2px dashed ${colors.gray_line};
    border-radius: 12px;

    display: flex;
    align-items: center;
    justify-content: center;
`


class DropZone extends Component {

    render() {

        const { 
            files, 
            addFileData, 
            deleteFileData 
        } = this.props;

        const props = {
            onRemove: file => {
                deleteFileData(file)
            },
            beforeUpload: file => {
                addFileData(file);
                return false;
            },
            files,
          };

        return (
            <Container>
                <Upload {...props}>
                    <Icon type="upload" /> Select Files
                </Upload>
            </Container>
        )
    }
}

DropZone.propTypes = {
    
    addFileData: PropTypes.func.isRequired,
    deleteFileData: PropTypes.func.isRequired,
}

export default DropZone;