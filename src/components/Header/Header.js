import React from "react";
import "./Header.css";
import HeaderOption from "./HeaderOptions/HeaderOption";
import { HEADER } from "../../constants/text";

function Header({ selectedFilter, setSelectedFilter, setSelectedFilterValue }) {
	let titles = ["Unread", "Read", "Favorites"];
	const selectFilter = (id) => {
		setSelectedFilter(document.getElementById(id));
		setSelectedFilterValue(titles[id]);
	};
	return (
		<section className="header_container">
			<p className="header_filter">{HEADER.FILTER_BY}</p>
			{titles.map((title, index) => (
				<HeaderOption
					key={index}
					id={index}
					title={title}
					onClick={() => selectFilter(index)}
					selectedFilter={selectedFilter}
				/>
			))}
		</section>
	);
}

export default Header;
