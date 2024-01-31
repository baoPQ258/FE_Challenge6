import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import SocketReducer from "./reducers/socketReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  socket: SocketReducer,
});

export default rootReducer;
