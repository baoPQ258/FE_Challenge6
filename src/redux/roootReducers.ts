import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import SocketReducer from "./reducers/socketReducer";

export interface RootState {
  auth: any;
  profile: any;
  socket: any;
}

const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  profile: profileReducer,
  socket: SocketReducer,
});

export default rootReducer;
