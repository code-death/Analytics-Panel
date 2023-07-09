import React from 'react'

const Container = (props) => {
  return (
    <div style={{
        'width': props.width,
        'height': props.height,
        'display': props.display,
        'backgroundColor': props.backgroundColor,
        'border': props.border,
        'borderRadius': props.borderRadius,
        'justifyContent': props.justify
    }}>
        {props.children}
    </div>
  )
}

export default Container