import React from 'react'

interface Props {
    children: JSX.Element | JSX.Element[],
    reverse?: boolean
}
function Card({children, reverse}: Props) {
  return (
    <div className={`card ${reverse && 'reverse'}`}>{children}</div>
  )
}

Card.defaultProps = {
    reverse: false
}
export default Card