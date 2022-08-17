import {FeedbackItem} from "./FeedbackItem";

import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { FeedbackContext } from "./context/FeedbackContext";
import {Spinner} from "./shared/Spinner";

const FeedbackList:React.FC = () => {
  const { feedback, isLoading } = useContext(FeedbackContext);
  if (!isLoading && (!feedback || feedback.length === 0)) return <p>No feedbacks yet</p>;
return isLoading ? (<Spinner />) :  (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback && feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <FeedbackItem
              item={item}
              key={item.id}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackList;
