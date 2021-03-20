import { createContext, useContext, useState } from 'react';
import useBreakpoint from 'use-breakpoint';

const BREAKPOINTS = { mobile: 0, tablet: 768, large: 1024, desktop: 1280 };
const AppContext = createContext();

export function AppWrapper({ children, general }) {
    function ease (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    }
    const orderAPI = {...general.order};
    const breakpointData = useBreakpoint(BREAKPOINTS, 'desktop');
    const height = (screen) => ({desktop: 700, large: 600, tablet: 500, mobile: 400})[screen];
    const [cart, setCart] = useState(general.order ? general.order.products : []);
    const [order, setOrder] = useState(orderAPI);
    const [user, setUser] = useState(null);
    let sharedState = {
        breakpointData,
        general,
        height,
        ease,
        user: null,
        cart,
        setCart,
        order, 
        setOrder
    };

    return (
        <AppContext.Provider value={sharedState}>
        {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
  return useContext(AppContext);
}