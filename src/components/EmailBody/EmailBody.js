import React from "react";
import Avatar from "../Avatar/Avatar";
import "./EmailBody.css";
import { EMAIL_BODY } from "../../constants/text";
import { convertDateAndTime } from "../../utils";
import { useSelector } from "react-redux";
import { selectEmailsFavorite } from "../../redux/features/emailSlice";

function EmailBody({
	emailSpecificData,
	body,
	setOpenEmailSelected,
	markEmailAsFavorite,
}) {
	const favoriteEmails = useSelector(selectEmailsFavorite);

	const closeEmailBody = () => {
		setOpenEmailSelected(false);
	};

	return (
		<div className="email_body_container">
			<div className="email_upper_body">
				<Avatar nameInitials={emailSpecificData.name[0]} />
				<div className="email_body">
					<div className="email_body_header">
						<h2>{emailSpecificData.subject}</h2>
						{!favoriteEmails?.includes(emailSpecificData.id) && (
							<p
								onClick={() =>
									markEmailAsFavorite(emailSpecificData.id)
								}>
								{EMAIL_BODY.MARK_FAVORITE}
							</p>
						)}
					</div>
					<p>{convertDateAndTime(emailSpecificData.date)}</p>
					<div
						className="email_body_message"
						dangerouslySetInnerHTML={{ __html: body }}></div>
				</div>
			</div>
			<p onClick={closeEmailBody} className="email_body_close">
				{EMAIL_BODY.CLOSE}
			</p>
		</div>
	);
}

export default EmailBody;
