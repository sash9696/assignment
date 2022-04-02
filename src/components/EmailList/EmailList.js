import React from "react";
import "./EmailList.css";
import Email from "./Email/Email";
import { useSelector } from "react-redux";
import {
	selectEmailsFavorite,
	selectEmailsRead,
} from "../../redux/features/emailSlice";
import { EMAIL_LIST } from "../../constants/text";

function EmailList({
	emailData,
	openEmailSelected,
	setOpenEmailSelected,
	pagination,
	openEmailBody,
	setEmailSpecificData,
	selectedEmail,
	selectedFilterValue,
}) {
	const readEmails = useSelector(selectEmailsRead);
	const favoriteEmails = useSelector(selectEmailsFavorite);

	const data = (value) => {
		switch (value.toUpperCase()) {
			case EMAIL_LIST.FILTERS.READ:
				return emailData.filter((value) =>
					readEmails?.includes(value.id)
				);
			case EMAIL_LIST.FILTERS.UNREAD:
				return emailData.filter(
					(value) => !readEmails?.includes(value.id)
				);
			case EMAIL_LIST.FILTERS.FAVORITE:
				return emailData.filter((value) =>
					favoriteEmails?.includes(value.id)
				);
			default:
				return emailData;
		}
	};

	return (
		<section
			style={{ flex: openEmailSelected ? "0.4" : "1" }}
			className="email_list_container">
			{data(selectedFilterValue)?.map((val) => (
				<section key={val.id}>
					<Email
						id={val.id}
						userDetails={val.from}
						subject={val.subject}
						description={val.short_description}
						date={val.date}
						openEmailSelected={openEmailSelected}
						setOpenEmailSelected={setOpenEmailSelected}
						openEmailBody={openEmailBody}
						setEmailSpecificData={setEmailSpecificData}
						selectedEmail={selectedEmail}
					/>
				</section>
			))}

			<section className="email_list_pagination">
				{emailData && pagination()}
			</section>
		</section>
	);
}

export default EmailList;
