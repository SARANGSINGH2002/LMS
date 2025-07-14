import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user/"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials:'include'
    }),
    endpoints: (builder)=>({
        // we use builder.query if we want to fetch anything from the API and we use builder.query if we want to post anything to the API
        registerUser: builder.mutation({
            query: (inputData) =>({
                url: "register",  // the complete URL now looks like:- "http://localhost:8080/api/v1/user/register"
                method: "POST",
                body: inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) =>({
                url: "login",  // the complete URL now looks like:- "http://localhost:8080/api/v1/user/login"
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(_,{queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;  // WAIT for API response
                    dispatch(userLoggedIn({user:result.data.user})) // If success, then log in user
                } catch (error) {
                    console.log(error)  // If API failed then show error
                }
            }
        }),
        logoutUser: builder.mutation({
            query:()=>({
                url: "logout",
                method: "GET"
            }),
            async onQueryStarted(_,{queryFulfilled, dispatch}){
                try {
                    dispatch(userLoggedOut())
                } catch (error) {
                    console.log(error)     
                }
            }
        }),
        loadUser: builder.query({
            query:()=>({
                url: "profile",
                method: "GET"
            }),
            async onQueryStarted(_,{queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;  // WAIT for API response
                    dispatch(userLoggedIn({user:result.data.user})) // If success, then log in user
                } catch (error) {
                    console.log(error)  // If API failed then show error
                }
            }
        }),
        updateUser:builder.mutation({
            query: (formData)=>({
                url: "profile/update",
                method: "PUT",
                body: formData,
                credentials:"include"
            })
        })
    })
});

export const {useRegisterUserMutation, useLoginUserMutation,useLogoutUserMutation ,useLoadUserQuery, useUpdateUserMutation} = authApi;
