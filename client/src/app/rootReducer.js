import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import { authApi } from "@/features/api/authApi"
import { courseApi } from "@/features/api/courseApi"
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer, // Adds RTK Query state for auth APIs
    [courseApi.reducerPath]: courseApi.reducer, // Adds RTK Query state for course APIs
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,

    auth: authReducer  // Adds your own custom auth slice (login status, user info, etc.)

})

export default rootReducer