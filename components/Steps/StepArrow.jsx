import React from 'react'
import { useAppContext } from '../../context/state'

function StepArrow() {
    const { breakpointData } = useAppContext()
    const { breakpoint } = breakpointData;
    return (
        <div className="flex-1 flex items-center justify-center">
            {
                breakpoint !== 'mobile' ?
                    (
                        <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    ) :
                    (
                        <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )
            }
            {/* <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z" /></svg> */}
        </div>
    )
}

export default StepArrow
