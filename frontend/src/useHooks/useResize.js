/* window client height, width를 업데이트 시켜주는 hook */

import { useEffect } from 'react';

const useResize = ( {setClientHeight, setClientWidth} ) => {

    const updateWindowSize = () => {
        if ( setClientHeight && typeof(setClientHeight) === 'function' ) { setClientHeight(window.innerHeight) }
        if ( setClientWidth && typeof(setClientWidth) === 'function' ) { setClientWidth(window.innerWidth) }
    }

    useEffect(() => {
        window.addEventListener('resize', updateWindowSize);
        
        return () => {
            window.removeEventListener('risize', updateWindowSize);
        }
    }, [])
}

export default useResize