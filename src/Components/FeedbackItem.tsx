import type { IFeedbackItem }from '../Interfaces'
import {FaTimes, FaEdit} from 'react-icons/fa'
import Card from './shared/Card'
import {FC, useContext} from "react";
import {FeedbackContext} from "./context/FeedbackContext";

interface Props {
  item: IFeedbackItem,
}
export const FeedbackItem:FC<Props> = ({ item }) => {
const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
    const handleDelete = ():void => {
        if (deleteFeedback) {
            deleteFeedback(item.id)
        }
    }
    const handleOpenFeedback = (item: IFeedbackItem):void => {
        if (editFeedback) {
            editFeedback(item)
        }
    }
  return (
    <Card reverse={true}>
      <div className="num-display">{ item.rating }</div>
        <button className="edit" onClick={() => handleOpenFeedback(item)}>
            <FaEdit color='purple'/>
        </button>
        <button className="close" onClick={handleDelete}>
          <FaTimes color='purple' />
        </button>
      <div className="text-display">{item.text}</div>   
    </Card>
  )  
  
}
