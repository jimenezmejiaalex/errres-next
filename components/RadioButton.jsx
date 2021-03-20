function RadioButton({ title, value, active, handleOnclick }) {
    const handleClick = () => handleOnclick(value);
    return (
        <div onClick={handleClick} className="w-48 bg-white hover:bg-gray-100 cursor-pointer rounded-lg shadow-md p-6 hover:cursor-pointer mb-8 hover:bg-green-lightest focus:outline-none focus:shadow-outline-green" tabIndex={0}>
            <div className="flex justify-center items-center mb-3">
                <h1 className="uppercase font-bold text-base tracking-wide text-blue-darker my-2 mr-2">{title}</h1>
                {
                    active &&
                    <div>
                        <svg className="w-6 h-6" width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <g id="checkmark-outline" fillRule="nonzero">
                                    <path d="M31.1442786,171.840796 C5.2779518,146.858262 -5.09578082,109.862896 4.01023318,75.0738981 C13.1162472,40.2848999 40.2848999,13.1162472 75.0738981,4.01023318 C109.862896,-5.09578082 146.858262,5.2779518 171.840796,31.1442786 C209.549474,70.1869539 209.010186,132.247241 170.628714,170.628714 C132.247241,209.010186 70.1869539,209.549474 31.1442786,171.840796 Z" id="Shape" fill="#97EBDC" />
                                    <polygon id="Path" fill="#00836D" points="66.6666667 89.4527363 89.5522388 112.437811 132.338308 69.6517413 146.268657 83.7810945 89.5522388 140.298507 52.7363184 103.482587 66.6666667 89.3532338" />
                                </g>
                            </g>
                        </svg>
                    </div>
                }
            </div>
        </div>
    )
}

export default RadioButton
