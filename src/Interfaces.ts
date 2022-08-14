
export interface IFeedbackItem {
    id: number;
    rating: number;
    text: string;
}
export interface INewFeedback{
    rating: number;
    text: string;
}
export interface IEditFeedbackItem{
    item: IFeedbackItem | null,
    edit: boolean
}

