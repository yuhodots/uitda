/*  */

import { useRef, useEffect } from 'react';

const useHover = (onHover, onLeave) => {

    const element = useRef();

    useEffect(() => {
        /* onHover, onLeave에 대한 함수가 없는 경우 return 시킴 */
        if ( typeof(onHover) !== 'function' || typeof(onLeave) !== 'function' ) { return }

        if (element.current) {
            element.current.addEventListener('mouseenter', onHover);
            element.current.addEventListener('mouseleave', onLeave);
        }
        return () => {
            element.current.removeEventListener('mouseover', onHover);
            element.current.removeEventListener('mouseleave', onLeave);
        }
    }, [onHover, onLeave])

    return element;
}

export default useHover;