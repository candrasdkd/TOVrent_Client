import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import countReducer from "./reducer/count";
import rpm from "redux-promise-middleware";
import authReducer from "./reducer/auth";
import vehicleReducer from "./reducer/vehicles";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token", "authInfo", "isLogin"],
};

// const profilePersistConfig = {

// }
const reducers = combineReducers({
  count: countReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  vehicles: vehicleReducer,
});
const logger = createLogger();
const enhancers = applyMiddleware(rpm, logger);
const reduxStore = createStore(reducers, enhancers);
const persistor = persistStore(reduxStore);
// eslint-disable-next-line import/no-anonymous-default-export
export default { reduxStore, persistor };
