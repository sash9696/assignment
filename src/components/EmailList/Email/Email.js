import React from "react";
import "./Email.css";
import Avatar from "../../Avatar/Avatar";
import { useSelector } from "react-redux";
import {
	selectEmailsFavorite,
	selectEmailsRead,
} from "../../../redux/features/emailSlice";
import { EMAIL } from "../../../constants/text";
import { truncate, convertDateAndTime } from "../../../utils";

function Email({
	id,
	userDetails,
	subject,
	description,
	date,
	openEmailBody,
	openEmailSelected,
	setEmailSpecificData,
	selectedEmail,
}) {
	const readEmails = useSelector(selectEmailsRead);
	const favoriteEmails = useSelector(selectEmailsFavorite);

	const openEmail = () => {
		setEmailSpecificData({
			id: id,
			name: userDetails.name,
			subject: subject,
			date: date,
		});
		openEmailBody(id);
	};

	return (
		<div
			id={id}
			onClick={openEmail}
			className={
				selectedEmail == document.getElementById(id) ||
				readEmails?.includes(id)
					? "email_container_selected"
					: "email_container"
			}>
			<Avatar nameInitials={userDetails?.name[0]} />

			<div className="email_details">
				<div className="email_details_header">
					<p>
						{EMAIL.FROM}{" "}
						<span>
							{`${userDetails?.name} <${userDetails?.email}>`}{" "}
						</span>
					</p>
					<p>
						{EMAIL.SUBJECT} <span>{subject} </span>
					</p>
				</div>
				<p className="email_details_message">
					{" "}
					{openEmailSelected
						? truncate(description, 50)
						: description}
				</p>
				<div className="email_details_footer">
					<p className="footer_date_time">
						{convertDateAndTime(date)}
					</p>
					{favoriteEmails?.includes(id) && (
						<p className="footer_favorite">{EMAIL.FAVORITE}</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Email;
