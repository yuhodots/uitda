

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, Modal, message } from 'antd';

import { colors } from '../../../../../styles/variables'

import './DropZone.css'

/* Upload 중 DropZone인 Dragger 사용 */
const { Dragger } = Upload;

/* FileReader를 이용해 사진 파일의 preview 데이터를 생성하는 함수 */
const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/* Styled Components */
/* 전체 영역 */
const Container = styled.div`
    margin-bottom: 3rem;
    padding: 2rem;
    width: 100%;

    border: 2px dashed ${colors.gray_line};
    border-radius: 12px;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
`

/* 드레그 영역 */
const DropArea = styled(Dragger)`
    margin: 1rem auto;

    height: 15rem !important;
    /* width: 100% !important; */
`


/* React Component */
class DropZone extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
    };

    /* 미리보기를 처리하는 함수 */
    handlePreview = async file => {
        /* 파일 미리보기 생성 (url이랑, preview가 없던 경우에만) */
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,     // url이 있으면 url 사용, 없으면 File Reader로 만든 preview 사용
            previewVisible: true,
        });
    }
    
    handleCancel = () => this.setState({ previewVisible: false });

    render() {

        const {
            previewVisible,
            previewImage
        } = this.state;

        const { 
            files, 
            addFileData, 
            deleteFileData 
        } = this.props;

        

        /* Dropzone의 기능을 정의하는 props 데이터 */
        const props = {
            /* 사진 여러 개 동시에 가능 */
            multiple: true,

            /* 업로드할 사진을 리스트에서 지우는 기능 */
            onRemove: file => {
                const isNew = !file.url
                deleteFileData(file, isNew)
            },

            /* 바로 업로드 되지 않도록 하고, app state에 저장하는 기능 */
            beforeUpload: file => {
                /* Object 객체인 fileobj를 만들지 않으면, 
                   File 객체를 return하여 미리보기 이미지를 제대로 생성하지 못하는 오류가 생김 */
                const fileobj = {
                    ...file,
                    originFileObj: file,
                }
                addFileData(fileobj);
                return false;
            },

            /* 미리보기 기능 */
            onPreview: this.handlePreview,

            /* 사진 리스트 형태로 나타내기  */
            listType: 'picture-card',

            /* 파일 리스트 
               (antd upload 컴포넌트는 fileList 라는 이름으로 식별한다.) */
            fileList: files
        };

        return (
            <Container className='photo-list-box' >
                <DropArea {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">클릭 또는 드래그를 통해 사진을 업로드하세요</p>
                <p className="ant-upload-hint">
                    업로드한 사진들은 아래에 나타납니다.
                </p>
                </DropArea>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    {/* alt 값 파일 이름으로 설정하기 */}
                </Modal>
            </Container>
        );
    }
}

DropZone.propTypes = {
    files: PropTypes.array.isRequired,              // 사진 파일 데이터 리스트

    addFileData: PropTypes.func.isRequired,
    deleteFileData: PropTypes.func.isRequired,
}

export default DropZone;