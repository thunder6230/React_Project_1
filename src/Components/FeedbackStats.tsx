import { IFeedbackItem } from "../Interfaces"
import {FC, useContext} from "react";
import {FeedbackContext} from "./context/FeedbackContext";


export const FeedbackStats: FC = () => {
const {feedback} = useContext(FeedbackContext)
    if(feedback){
      const average = feedback.reduce((acc, cur) => acc + cur.rating ,0) / feedback.length
        const averageOpt = average.toLocaleString("en", { minimumFractionDigits:0, maximumFractionDigits:1})
      return (
        <div className="feedback-stats">
          <h4>{feedback.length} Reviews</h4>
          <h4>Average Rating: {isNaN(average) ? 0 : averageOpt}</h4>
        </div>
      )

    }
    return <>Error</>
}
