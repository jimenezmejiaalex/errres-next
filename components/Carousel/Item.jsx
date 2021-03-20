import { useAppContext } from '../../context/state'

function Item({index, image, title, description, buttonText,buttonUrl, children, classAnimation, zIndex}) {
    const {breakpointData, height} = useAppContext();
    const {breakpoint} = breakpointData;
    
    const boxStyle = {
        height: `${ breakpointData.breakpoint === 'large' ? 344: breakpointData.breakpoint === 'desktop' ? 444 : ''}px`,
    }
    if(!['large', 'desktop'].includes(breakpointData.breakpoint)) {
        boxStyle.height = undefined;
    }

    return (
        <div 
            className={`absolute bg-center bg-cover w-screen lg:h-full flex flex-col lg:flex-row transition-background-image ${classAnimation} slide-${index}`} 
            style={{
                maxHeight: '700px', 
                minHeight: '400px', 
                height:`${height(breakpoint)}px`,
                backgroundImage: `url(${image})`,
                zIndex
            }}>
            <div 
                className="text-white text-center h-64 w-4/5 p-5 lg:p-8 border-0 rounded-md border-current dark-bg-color mt-16 ml-10 lg:mt-24 lg:ml-20 xl:ml-64 xl:mt-32 box-with-item lg:w-1/2 xl:w-1/3"
                style={boxStyle}
            >
                <h1 className="text-3xl lg:text-6xl pb-4 lg:pb-8">{title}</h1>
                <p className=" text-base lg:text-xl pb-4 md:pb-12">
                    {`${description.slice(0, 113)}${description.length > 113 ? '...' : ''}`}
                </p>
                <button
                    type="button"
                    className="border border-eden bg-eden text-base lg:text-xl text-white rounded-md px-4 py-2 lg:px-6 lg:py-4 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                    <a href={buttonUrl}>{buttonText}</a>
                </button>
            </div>
            <div className=" w-full lg:w-1/2 h-full flex items-end justify-end">{children}</div>
        </div>
    )
}

export default Item
