import React from 'react'

function FilterMobile({ items, filterData }) {
  return (
    <div className=" md:flex md:flex-wrap">
      {Object.keys(items).map((item) => (
        <div key={`filter-${item}`} className="my-2 md:max-w-xs md:w-full">
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
    </div>
  )
}

export default FilterMobile
