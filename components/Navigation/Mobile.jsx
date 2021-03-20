import { useState } from "react";
import MobileModal  from "./MobileModal";


function Mobile() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className=" cursor-pointer text-eden hover:text-leather" onClick={()=>setShowModal(true)}>
                <svg width="40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
            {showModal && <MobileModal setshow={setShowModal}/>}
        </>
    )
}

export default Mobile
