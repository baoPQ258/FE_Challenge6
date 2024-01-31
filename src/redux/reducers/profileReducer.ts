import { User } from "../../interface/form";
import {
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UpdateProfileActionTypes,
} from "../actions/profileActions";

interface ProfileState {
  data: User | "";
  error: string | null;
}

const initialState: ProfileState = {
  data: "",
  error: null,
};

const profileReducer = (
  state = initialState,
  action: UpdateProfileActionTypes
) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
