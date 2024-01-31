import { User } from "../../interface/form";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export interface UpdateProfileRequestAction {
  type: typeof UPDATE_PROFILE_REQUEST;
  payload: {
    name: string;
    bio: string;
    phone: number;
    photo: string;
    email: string;
    password: string;
  };
}

export interface UpdateProfileSuccessAction {
  type: typeof UPDATE_PROFILE_SUCCESS;
  payload: {
    data: User;
  };
}

export interface UpdateProfileFailureAction {
  type: typeof UPDATE_PROFILE_FAILURE;
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  };
}

export type UpdateProfileActionTypes =
  | UpdateProfileRequestAction
  | UpdateProfileSuccessAction
  | UpdateProfileFailureAction;

export const UpdateProfileRequest = (
  name: string,
  bio: string,
  phone: number,
  photo: string,
  email: string,
  password: string
): UpdateProfileActionTypes => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: { name, bio, phone, photo, email, password },
});

export const UpdateProfileSuccess = (data: User): UpdateProfileActionTypes => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: { data },
});

export const UpdateProfileFailure = (
  error: string
): UpdateProfileActionTypes => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: { error },
});
