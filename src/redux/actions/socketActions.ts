import { Group } from "../../interface/form";

export const CREATE_GROUP_REQUEST = "CREATE_GROUP_REQUEST";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";
export const CREATE_GROUP_FAILURE = "CREATE_GROUP_FAILURE";

export const GET_GROUP_REQUEST = "GET_GROUP_REQUEST";
export const GET_GROUP_SUCCESS = "GET_GROUP_SUCCESS";
export const GET_GROUP_FAILURE = "GET_GROUP_FAILURE";

export const UPDATE_GROUP_REQUEST = "UPDATE_GROUP_REQUEST";
export const UPDATE_GROUP_SUCCESS = "UPDATE_GROUP_SUCCESS";
export const UPDATE_GROUP_FAILURE = "UPDATE_GROUP_FAILURE";

export interface CreatGroupRequestAction {
  type: typeof CREATE_GROUP_REQUEST;
  payload: {
    name: string;
    title: string;
    userName: string;
    image: string;
  };
}

export interface CreatGroupSuccessAction {
  type: typeof CREATE_GROUP_SUCCESS;
  payload: {
    data: Group;
  };
}

export interface CreatGroupFailureAction {
  type: typeof CREATE_GROUP_FAILURE;
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  };
}
export interface GetGroupRequestAction {
  type: typeof GET_GROUP_REQUEST;
}

export interface GetGroupSuccessAction {
  type: typeof GET_GROUP_SUCCESS;
  payload: {
    data: Group;
  };
}

export interface GetGroupFailureAction {
  type: typeof GET_GROUP_FAILURE;
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  };
}
export interface UpdateGroupRequestAction {
  type: typeof UPDATE_GROUP_REQUEST;
  payload: {
    groupId: string;
    name: string;
    message: string;
    image: string;
  };
}

export interface UpdateGroupSuccessAction {
  type: typeof UPDATE_GROUP_SUCCESS;
  payload: {
    data: Group;
  };
}

export interface UpdateGroupFailureAction {
  type: typeof UPDATE_GROUP_FAILURE;
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  };
}

export type SocketActionTypes =
  | CreatGroupRequestAction
  | CreatGroupSuccessAction
  | CreatGroupFailureAction
  | GetGroupRequestAction
  | GetGroupSuccessAction
  | GetGroupFailureAction
  | UpdateGroupRequestAction
  | UpdateGroupSuccessAction
  | UpdateGroupFailureAction;

export const CreatGroupRequest = (
  name: string,
  title: string,
  userName: string,
  image: string
): SocketActionTypes => ({
  type: CREATE_GROUP_REQUEST,
  payload: { name, title, userName, image },
});

export const CreatGroupSuccess = (data: Group): SocketActionTypes => ({
  type: CREATE_GROUP_SUCCESS,
  payload: { data },
});

export const CreatGroupFailure = (error: string): SocketActionTypes => ({
  type: CREATE_GROUP_FAILURE,
  payload: { error },
});
export const GetGroupRequest = (): SocketActionTypes => ({
  type: GET_GROUP_REQUEST,
});

export const GetGroupSuccess = (data: Group): SocketActionTypes => ({
  type: GET_GROUP_SUCCESS,
  payload: { data },
});

export const GetGroupFailure = (error: string): SocketActionTypes => ({
  type: GET_GROUP_FAILURE,
  payload: { error },
});

export const UpdateGroupRequest = (
  groupId: string,
  name: string,
  message: string,
  image: string
): SocketActionTypes => ({
  type: UPDATE_GROUP_REQUEST,
  payload: { groupId, name, message, image },
});

export const UpdateGroupSuccess = (data: Group): SocketActionTypes => ({
  type: UPDATE_GROUP_SUCCESS,
  payload: { data },
});

export const UpdateGroupFailure = (error: string): SocketActionTypes => ({
  type: UPDATE_GROUP_FAILURE,
  payload: { error },
});
