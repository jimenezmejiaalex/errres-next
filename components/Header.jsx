import React from 'react'
import { useAppContext } from '../context/state'
import Desktop from './Navigation/Desktop';
import Mobile from './Navigation/Mobile';
import UserInfo from './User/UserInfo';

function Header() {
    const {breakpointData} = useAppContext();
    return (
        <>
            {['large', 'desktop'].includes(breakpointData.breakpoint) ? <Desktop /> : <Mobile />}
            {['large', 'desktop'].includes(breakpointData.breakpoint) && <UserInfo/>}
        </>
    )
}

export default Header
