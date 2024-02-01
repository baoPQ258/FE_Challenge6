// authReducer.ts
import { User } from "../../interface/form";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
} from "../actions/authActions";

// Define the AuthState type
export interface AuthState {
  data: User | "";
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  data: "",
  error: null,
};

// Create the authReducer
const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        data: "",
        error: action.payload.error,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        data: "",
        error: action.payload.error,
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        data: "",
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
