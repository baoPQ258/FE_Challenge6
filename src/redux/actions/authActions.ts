import { User } from "../../interface/form";

// actions/authActions.ts
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: {
    data: User;
  };
}

export interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  };
}
export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    data: User;
  };
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  };
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}
export interface ProfileRequestAction {
  type: typeof PROFILE_REQUEST;
}

export interface ProfileSuccessAction {
  type: typeof PROFILE_SUCCESS;
  payload: {
    data: User;
  };
}

export interface ProfileFailureAction {
  type: typeof PROFILE_FAILURE;
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
  };
}

export type AuthActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutSuccessAction
  | LogoutRequestAction
  | ProfileRequestAction
  | ProfileSuccessAction
  | ProfileFailureAction;

export const registerRequest = (
  email: string,
  password: string
): AuthActionTypes => ({
  type: REGISTER_REQUEST,
  payload: { email, password },
});

export const registerSuccess = (data: User): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  payload: { data },
});

export const registerFailure = (error: string): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  payload: { error },
});
export const loginRequest = (
  email: string,
  password: string
): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (data: User): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { data },
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: { error },
});
export const logout = (): AuthActionTypes => ({
  type: LOGOUT_REQUEST,
});
export const logoutSuccess = (): AuthActionTypes => ({
  type: LOGOUT_SUCCESS,
});

export const ProfileRequest = (): AuthActionTypes => ({
  type: PROFILE_REQUEST,
});

export const ProfileSuccess = (data: User): AuthActionTypes => ({
  type: PROFILE_SUCCESS,
  payload: { data },
});

export const ProfileFailure = (error: string): AuthActionTypes => ({
  type: PROFILE_FAILURE,
  payload: { error },
});
