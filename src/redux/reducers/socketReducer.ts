import { Group } from "../../interface/form";
import {
  CREATE_GROUP_FAILURE,
  CREATE_GROUP_SUCCESS,
  GET_GROUP_FAILURE,
  GET_GROUP_SUCCESS,
  SocketActionTypes,
  UPDATE_GROUP_FAILURE,
  UPDATE_GROUP_SUCCESS,
} from "../actions/socketActions";

interface SocketState {
  data: Group | "";
  error: string | null;
}

const initialState: SocketState = {
  data: "",
  error: null,
};

const SocketReducer = (
  state = initialState,
  action: SocketActionTypes
): SocketState => {
  switch (action.type) {
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case CREATE_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case GET_GROUP_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case GET_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case UPDATE_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default SocketReducer;
