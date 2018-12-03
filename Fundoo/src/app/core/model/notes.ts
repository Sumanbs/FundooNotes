export interface NotesArray {
    id: string;
    email: string;
    Title: string;
    Note: string;
    remainderDateTime: string;
    color: string;
    archived: string;
    deleted: string;
    DragAndDropID: string;
}

export interface LabelArray {
    id: string;
    email: string;
    label: string;
    editenable: string;
}

export interface CollaboratorArray {
    noteid: string;
    owner: string;
    shared: string;
    ColaboratorID: string;
}
export interface Accounts {
    id: string;
    username: string;
    email: string;
    password: string;
    phonenumber: string;
    token: string;
    Status: string;
    profilepic: string;
}
