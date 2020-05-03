import { useRef, useEffect } from 'react';

const useFocus = ( isFocus ) => {

    const element = useRef();

    useEffect(() => {
        if (isFocus) {
            element.current.focus();
        }
    }, [])

    return(element)
}

export default useFocus;