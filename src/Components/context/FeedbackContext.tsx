import {IEditFeedbackItem, IFeedbackItem, INewFeedback} from "../../Interfaces";
import {createContext, FC, useEffect, useState} from "react";
import axios from "axios";

interface AppContextState {
    feedback: IFeedbackItem[];
    feedbackEdit: IEditFeedbackItem
    openedFeedbackId: number;
    addFeedback: (data: INewFeedback) => void,
    deleteFeedback: (id: number) => void
    editFeedback: (item: IFeedbackItem) => void
    updateFeedback: (id:number, item: INewFeedback) => void
    isLoading: boolean

}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const FeedbackContext = createContext<Partial<AppContextState>>({});

export const FeedbackContextProvider: FC<Props> = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [feedback, setFeedback] = useState<IFeedbackItem[]>([]);
    const [feedbackEdit, setFeedbackEdit] = useState<IEditFeedbackItem>({
        item: null,
        edit: false
    })

    const editFeedback = (item: IFeedbackItem) => {
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }

    useEffect(() => {getAllFeedback()},[])
    const getAllFeedback:() => Promise<void> = async () => {
        setIsLoading(true)
        const params = {
            _order: "desc",
            _sort: "id"
        }
        const response = await axios.get<IFeedbackItem[]>("/feedback", {params: params})
        setFeedback(response.data)
        setIsLoading(false)
    }
    const deleteFeedback = async (id: number) => {
        if (window.confirm("Are you sure you want to delete?")) {
            const response = await axios.delete<IFeedbackItem>(`/feedback/${id}`)
            if(response.status === 200) setFeedback(feedback.filter((item: IFeedbackItem) => item.id !== id));
        }
    };
    const addFeedback = async (newFeedback: INewFeedback) => {
        const params = {
            rating: newFeedback.rating,
            text: newFeedback.text
        }
        // const newFeedbackWithId = {...newFeedback, id: feedback.length + 1}
        const response = await axios.post<IFeedbackItem>("/feedback",params)
        setFeedback( (oldState: IFeedbackItem[]) => [response.data, ...oldState] )
        // setFeedback(oldState => [newFeedbackWithId, ...oldState])
    }
    const updateFeedback = async (id:number, editedItem: INewFeedback) => {
        const response = await axios.put(`/feedback/${id}`, editedItem)
        const {data} = response
        if(response.status === 200)  setFeedback(feedback.map(item => item.id === id ?  {...item, ...data} : item))
    }

    return (
        <FeedbackContext.Provider value={{feedback, addFeedback, deleteFeedback, editFeedback, feedbackEdit, updateFeedback, isLoading  }}>
            {children}
        </FeedbackContext.Provider>
    );
};
