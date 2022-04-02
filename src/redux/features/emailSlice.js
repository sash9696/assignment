import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
	name: "email",
	initialState: {
		readEmails: null,
		favoriteEmails: null,
	},

	reducers: {
		emailsRead: (state, action) => {
			state.readEmails = action.payload;
		},
		emailsFavorite: (state, action) => {
			state.favoriteEmails = action.payload;
		},
	},
});

export const { emailsRead, emailsFavorite } = emailSlice.actions;

export const selectEmailsRead = (state) => state.email.readEmails;
export const selectEmailsFavorite = (state) => state.email.favoriteEmails;

export default emailSlice.reducer;
