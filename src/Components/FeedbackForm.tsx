import React, { FC, useContext, useEffect, useState} from "react";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";

import type { INewFeedback } from "../Interfaces";
import { FeedbackContext } from "./context/FeedbackContext";

const FeedbackForm: FC = () => {
const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);
  const errorMessage = "Text must be at least 10 characters!";
  const handleTextChange = (value: string) => {
    setText(value);
  };
  const handleChangeRating = (value: number) => {
    setRating(value);
  };
  const handleValidation = () => {
    if (text === "") return setIsInputEmpty(true);
    if (text.length < 10) {
      setIsInputEmpty(false);
      return setIsValid(false);
    }
    setIsValid(true);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length < 10) return;
    const data: INewFeedback = {
      text: text,
      rating: rating,
    };
    if(feedbackEdit && feedbackEdit.edit && updateFeedback && feedbackEdit.item){
      updateFeedback(feedbackEdit.item.id, data)
    } else if (addFeedback ) {
      addFeedback(data);
    }
      setText("");
      setRating(10)
  };

  const loadFeedbackInForm = () => {
    if(feedbackEdit && feedbackEdit.item) {
    console.log(feedbackEdit)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)

    }
  }
  useEffect(() => handleValidation(), [text]);
  useEffect(() => loadFeedbackInForm(), [feedbackEdit]);

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect handleChangeRating={handleChangeRating} rating={rating} />
        <div className='input-group'>
          <input
            type='text'
            placeholder='Write a review'
            value={text}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleTextChange(e.target.value)}
          />
          <Button type='submit' _isDisabled={!isValid}>
            Button
          </Button>
        </div>
        {!isValid && !isInputEmpty ? (
          <div className='message'>{errorMessage}</div>
        ) : null}
      </form>
    </Card>
  );
};

export default FeedbackForm;
