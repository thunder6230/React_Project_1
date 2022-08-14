import {IEditFeedbackItem, IFeedbackItem, INewFeedback} from "../../Interfaces";
import {createContext, FC, useState} from "react";

interface AppContextState {
    feedback: IFeedbackItem[];
    feedbackEdit: IEditFeedbackItem | null
    openedFeedbackId: number;
    addFeedback: (data: INewFeedback) => void,
    deleteFeedback: (id: number) => void
    editFeedback: (item: IFeedbackItem) => void
    updateFeedback: (id:number, item: INewFeedback) => void


}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const FeedbackContext = createContext<Partial<AppContextState>>({});

export const FeedbackContextProvider: FC<Props> = ({children}) => {
    const [feedbackEdit, setFeedbackEdit] = useState<IEditFeedbackItem | null>({
        item: null,
        edit: false
    })
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This is feedback item 1",
            rating: 5,
        }, {
            id: 2,
            text: "This is feedback item 2",
            rating: 7,
        }, {
            id: 3,
            text: "This is feedback item 3",
            rating: 9,
        },
    ]);
    const editFeedback = (item: IFeedbackItem) => {
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }
    const deleteFeedback = (id: number): void => {
        if (window.confirm("Are you sure you want to delete?")) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };
    const addFeedback = (newFeedback: INewFeedback) => {
        const newFeedbackWithId = {...newFeedback, id: feedback.length + 1}
        setFeedback(oldState => [newFeedbackWithId, ...oldState])
    }
    const updateFeedback = (id:number, editedItem: INewFeedback) => {
        setFeedback(feedback.map(item => item.id === id ?  {...item, ...editedItem} : item))
    }

    return (
        <FeedbackContext.Provider value={{feedback, addFeedback, deleteFeedback, editFeedback, feedbackEdit, updateFeedback  }}>
            {children}
        </FeedbackContext.Provider>
    );
};
