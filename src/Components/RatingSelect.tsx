import React, {useContext, useEffect, useState} from 'react'

import { FeedbackContext } from "./context/FeedbackContext";
import {IEditFeedbackItem} from "../Interfaces";
interface Props {
    rating: number,
    handleChangeRating: Function
}
function RatingSelect({rating, handleChangeRating}: Props) {
    const [selected, setSelected] = useState(rating)
    const {feedbackEdit} = useContext(FeedbackContext)
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const handleChange = (value:number) => {
        setSelected(value)
        handleChangeRating(value)
    }
    const handleLoadRating = () => {
        if(feedbackEdit && feedbackEdit.item){
            setSelected( feedbackEdit.item.rating )
        }
    }
    useEffect(() => handleLoadRating(), [feedbackEdit])
  return (
    <ul className='rating'>
        {
        arr.map(i =>  (
        <li  key={i} >
            <input 
            type="radio" 
            name="rating" 
            id={`num${i}`} 
            value={i} 
            checked={selected === i}
            onChange={() => handleChange(i)}/>
            <label htmlFor={`num${i}`}>{i}</label>
        </li>))    
        }
    </ul>
  )
}
RatingSelect.defaultProps = {
    rating: 0
}

export default RatingSelect