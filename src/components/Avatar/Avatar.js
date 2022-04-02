import React from "react";
import "./Avatar.css";

function Avatar({ nameInitials }) {
	return (
		<div className="email_avatar">
			<p className="email_avatar_name">
				{nameInitials?.toUpperCase() || "F"}
			</p>
		</div>
	);
}

export default Avatar;
