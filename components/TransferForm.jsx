import { useRef, useState } from 'react'

function TransferForm({ setFile, setReference }) {
  const inputFileRef = useRef()
  const [files, setFiles] = useState(null)
  const [_, setIdReference] = useState(null)
  function handleFileChange(e) {
    setFiles(e.target.files[0])
    setFile(e.target.files[0])
  }
  function removeFile(f) {
    inputFileRef.current.value = ''
    setFiles(null)
    setFile(null)
  }

  function handleReferenceId({ target }) {
    setIdReference(target.value)
    setReference(target.value)
  }

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white p-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Id Referencia <span className=" text-red-600">*</span>
            </label>
            <input
              onChange={handleReferenceId}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="referencia"
              type="text"
              placeholder="ID Referencia"
            />
          </div>
        </div>
        <div className="overflow-hidden relative w-64 mt-4 mb-4">
          <button className="bg-eden hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center cursor-pointer">
            <svg
              fill="#FFF"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
            </svg>
            <span className="ml-2">Subir comprobante</span>
          </button>
          <input
            ref={inputFileRef}
            onChange={handleFileChange}
            className="cursor-pointer absolute block py-2 px-4 w-full top-0 opacity-0 pin-r pin-t"
            type="file"
          />
          {files && (
            <div className="flex items-center p-4 pl-0">
              <div
                onClick={() => removeFile(files)}
                className="text-red-600 pr-4 cursor-pointer"
              >
                <svg
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>{files.name}</div>
            </div>
          )}
        </div>
        {/* <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <div style={styles}>
                            <label className="custom-file-upload">
                                <input type="file" multiple onChange={onChange} />
                                <i className="fa fa-cloud-upload" /> Subir
                            </label>
                            {files.map(x =>
                                <div className="file-preview" onClick={removeFile}>{x.name}</div>
                            )}
                        </div>
                    </div>
                </div> */}
      </div>
    </div>
  )
}

export default TransferForm
