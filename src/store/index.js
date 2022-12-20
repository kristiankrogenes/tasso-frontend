import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            id: "",
            email: "",
            name: "",
            home_club: "",
            hcp: ""
        }
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = {
                id: "",
                email: "",
                name: "",
                home_club: "",
                hcp: ""
            }
        }
    }
});

export const { login, logout } = userSlice.actions;

const golfCourseSlice = createSlice({
    name: "golfCourses",
    initialState: {
        value: []
    },
    reducers: {
        setCourses: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCourses } = golfCourseSlice.actions;


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        golfCourses: golfCourseSlice.reducer,
    },
});