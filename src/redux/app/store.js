import { configureStore } from "@reduxjs/toolkit";

import emailReducer from "../features/emailSlice";

import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore(
	{
		reducer: {
			email: emailReducer,
		},
	},
	composeWithDevTools
);
