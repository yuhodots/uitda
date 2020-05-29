

import React, { useState } from 'react';
import styled from 'styled-components';

import { OutlookLoginBox, CategoryInfoBox } from "./EnterPageSubComponents";
import { Screen_Size } from "../../styles/variables";
import { useResize } from "../../useHooks";


/* Styled Components */
const WholeArea = styled.div`
    min-width: 100%;
    min-height: 100%;

    display: flex;
    flex-flow: row nowrap;

    overflow-y: auto;

    @media (max-width: ${Screen_Size.pad_portrait}) {
        flex-flow: column nowrap;
    }
`;

/* React Component */
const EnterPage = () => {

    const [ clientHeight, setClientHeight ] = useState(window.innerHeight)

    useResize( {setClientHeight} )
    
    return (
        <WholeArea>
            <OutlookLoginBox />
            <CategoryInfoBox clientHeight={clientHeight} />
        </WholeArea>
    );
}

export default EnterPage;