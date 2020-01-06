

import React, { useCallback, Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useDropzone from 'react-dropzone';
// import { Upload, Icon, message } from 'antd';

import { colors } from '../../../../styles/variables'


// const { Dragger } = Upload;

// const props = {
//     name: 'file',
//     multiple: true,
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
// };

/* Styled Components */
const TempDiv = styled.div`
    height: 20rem;
    line-height: 20rem;
    margin-bottom: 3rem;

    border: 2px dashed ${colors.gray_line};
    border-radius: 12px;

    text-align: center;
`


class DropZone extends Component {

    render() {

        return (
            <TempDiv>
                Drop Zone
            </TempDiv>

            // <Dragger {...props} >
            //     <p className="ant-upload-drag-icon">
            //     <Icon type="inbox" />
            //     </p>
            //     <p className="ant-upload-text">Click or drag file to this area to upload</p>
            //     <p className="ant-upload-hint">
            //     Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            //     band files
            //     </p>
            // </Dragger>
        )
    }
}


// class DropZone extends Component {
//     onDrop = useCallback((acceptedFiles) => {
//         acceptedFiles.forEach((file) => {
//             const reader = new FileReader()
//             reader.onabort = () => console.log('file reading was aborted')
//             reader.onerror = () => console.log('file reading has failed')
//             reader.onload = () => {
//                 const binaryStr = reader.result
//                 console.log(binaryStr)
//             }
//             reader.readAsArrayBuffer(file)
//         })
//     }, [])

//     render () {
//         /* 모듈 내 사용할 기능 불러오기 */
//         const {acceptedFiles, getRootProps, getInputProps} = useDropzone(this.onDrop); 

//         /* 유저가 끌어온 파일들에 대한 내용 */
//         const filelist = acceptedFiles.map(file => (
//             <li key={file.path}>
//                 {file.path} - {file.size} bytes
//             </li>
//         ));

//         const { storeFilesData } = this.props;

//         return (
//             <section className="container">
//                 <div 
//                     {...getRootProps({className: 'dropzone'})}
//                     onChange={acceptedFiles => storeFilesData(acceptedFiles)}
//                 >
//                     <input {...getInputProps()} />
//                     <p>Drag 'n' drop some files here, or click to select files</p>
//                     <h4>Files</h4>
//                     <ul>{filelist}</ul>
//                 </div>
//             </section>
//         )
//     }
// }

// function DropZone ({storeFilesData}) {

//     const onDrop = useCallback((acceptedFiles) => {
//         acceptedFiles.forEach((file) => {
//             const reader = new FileReader()
//             reader.onabort = () => console.log('file reading was aborted')
//             reader.onerror = () => console.log('file reading has failed')
//             reader.onload = () => {
//                 const binaryStr = reader.result
//                 console.log(binaryStr)
//             }
//             reader.readAsArrayBuffer(file)
//         })
//     }, [])
    
//       /* 모듈 내 사용할 기능 불러오기 */
//     const {acceptedFiles, getRootProps, getInputProps} = useDropzone(onDrop); 

//     /* 유저가 끌어온 파일들에 대한 내용 */
//     const filelist = acceptedFiles.map(file => (
//         <li key={file.path}>
//             {file.path} - {file.size} bytes
//         </li>
//     ));

//     return (
//         <section className="container">
//             <div 
//                 {...getRootProps({className: 'dropzone'})}
//                 onChange={acceptedFiles => storeFilesData(acceptedFiles)}
//             >
//                 <input {...getInputProps()} />
//                 <p>Drag 'n' drop some files here, or click to select files</p>
//                 <h4>Files</h4>
//                 <ul>{filelist}</ul>
//             </div>
//         </section>
//     )
// }



DropZone.propTypes = {
    storeFilesData: PropTypes.func.isRequired
}

export default DropZone;