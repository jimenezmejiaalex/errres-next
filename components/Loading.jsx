function Loading() {
  return (
    <>
      <div
        className="fixed z-50"
        style={{
          left: '50%',
          top: '55%',
          zIndex: 70
        }}
      >
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
      <div className=" fixed w-full h-full z-50 top-0 left-0 opacity-50 bg-white"></div>
    </>
  )
}

export default Loading
