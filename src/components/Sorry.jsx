import React from 'react'

const Sorry = () => {
  return (
    <div className="container">
        <img src="/writingPad.svg" width="235px" height="223px" alt="" />
        <div className="inside-container">
          <h1 className="offHeading">
            Hey! Something’s off! We couldn’t display the given data.
          </h1>
          <p className="subtext">
            Try changing your your filters or selecting a different date.
          </p>
        </div>
      </div>
  )
}

export default Sorry