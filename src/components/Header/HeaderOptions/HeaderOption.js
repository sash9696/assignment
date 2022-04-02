import React from "react";
import "./HeaderOption.css";

function HeaderOption({ id, title, onClick, selectedFilter }) {
	return (
		<div
			onClick={onClick}
			id={id}
			className={
				selectedFilter === document.getElementById(id)
					? "header_option_title_selected"
					: "header_option_title"
			}>
			{title}
		</div>
	);
}

export default HeaderOption;
