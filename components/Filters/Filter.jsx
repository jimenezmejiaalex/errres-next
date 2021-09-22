import React, { useState } from 'react'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

function Filter({ items, filterData, priceData }) {
  const [priceValues, setpriceValues] = useState(priceData)
  const handlePriceChange = (value) => {
    setpriceValues(value)
    filterData(true, value, 'price')
  }
  return (
    <div className="flex flex-wrap">
      {Object.keys(items).map((item) => (
        <div key={`filter-${item}`} className="my-2 max-w-xs w-full">
          <h2 className="text-lg font-semibold text-eden">{item}</h2>
          <div className="flex flex-col">
            {items[item].map((filterItem, index) => (
              <label
                key={`filter-item-${filterItem}-${index}`}
                className="inline-flex items-center mt-3"
              >
                <input
                  value={filterItem}
                  onChange={({ target }) =>
                    filterData(target.checked, target.value, item)
                  }
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">{filterItem}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="my-2 max-w-xs w-full">
        <h2 className="text-lg font-semibold text-eden">Precio</h2>
        <div className=" flex place-content-between">
          <span className="ml-2 text-gray-700">{priceValues[0]}</span>
          <span className="ml-2 text-gray-700">{priceValues[1]}</span>
        </div>
        <div className="flex flex-col">
          <Range
            onChange={handlePriceChange}
            defaultValue={[priceData[0], priceData[1]]}
            min={priceData[0]}
            max={priceData[1]}
            step={1}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
