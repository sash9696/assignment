import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Header from "../../components/Header/Header";
import EmailList from "../../components/EmailList/EmailList";
import EmailBody from "../../components/EmailBody/EmailBody";
import { useDispatch } from "react-redux";
import { emailsRead, emailsFavorite } from "../../redux/features/emailSlice";
import { LOCAL_STORAGE_KEYS } from "../../constants/text";
import {
	getItemFromLocalStorage,
	setItemFromLocalStorage,
} from "../../utils/index";
import {API_ROUTES} from "../../constants/apiRoutes";

function HomePage() {
	const dispatch = useDispatch();

	const [emailData, setEmailData] = useState([]);
	const [paginationVal, setPaginationVal] = useState(0);
	const [openEmailSelected, setOpenEmailSelected] = useState(false);
	const [emailBodyData, setEmailBodyData] = useState({});
	const [emailSpecificData, setEmailSpecificData] = useState({});
	const [selectedEmail, setSelectedEmail] = useState(null);
	const [readEmails, setReadEmails] = useState(
		getItemFromLocalStorage(LOCAL_STORAGE_KEYS.READ_EMAILS) || []
	);
	const [favoriteEmails, setFavoriteEmails] = useState(
		getItemFromLocalStorage(LOCAL_STORAGE_KEYS.FAVORITE_EMAILS) || []
	);
	const [selectedFilter, setSelectedFilter] = useState(null);
	const [selectedFilterValue, setSelectedFilterValue] = useState("");

	useEffect(() => {
		getEmailData();
	}, []);

	useEffect(() => {
		if (localStorage.readEmails != null) {
			dispatch(emailsRead(readEmails));
		}
		if (localStorage.favoriteEmails != null) {
			dispatch(emailsFavorite(favoriteEmails));
		}
	}, [readEmails, favoriteEmails]);

	const getEmailData = async (pageNum) => {
		await fetch(`${API_ROUTES.EMAIL_DATA}${pageNum || 1}`)
			.then((res) => res.json())
			.then((data) => {
				setEmailData(data.list);
				setPaginationVal(Math.ceil(data.total / 10));
			})
			.catch((error) => console.log(error));
	};

	const pagination = () => {
		let arr = [];
		for (let i = 1; i <= paginationVal; i++) {
			arr.push(i);
		}
		return arr.map((val, index) => (
			<p
				key={index}
				onClick={() => getEmailData(val)}
				className="pagination_val">
				{val}
			</p>
		));
	};

	const openEmailBody = async (id) => {
		await fetch(`${API_ROUTES.EMAIL_BODY}${id}`)
			.then((res) => res.json())
			.then((data) => {
				setEmailBodyData(data);
				setOpenEmailSelected(true);
				selectEmail(id);
				if (readEmails?.includes(id)) {
					return;
				}
				setReadEmails([...readEmails, id]);
				setItemFromLocalStorage(LOCAL_STORAGE_KEYS.READ_EMAILS, [
					...readEmails,
					id,
				]);
			})
			.catch((error) => console.log(error));
	};

	const selectEmail = (id) => {
		setSelectedEmail(document.getElementById(id));
	};

	const markEmailAsFavorite = (id) => {
		if (favoriteEmails?.includes(id)) {
			return;
		}
		setFavoriteEmails([...favoriteEmails, id]);
		setItemFromLocalStorage(LOCAL_STORAGE_KEYS.FAVORITE_EMAILS, [
			...favoriteEmails,
			id,
		]);
	};

	return (
		<>
			<Header
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				emailData={emailData}
				setSelectedFilterValue={setSelectedFilterValue}
			/>
			<section className="home_page_body">
				<EmailList
					emailData={emailData}
					setEmailData={setEmailData}
					paginationVal={paginationVal}
					setPaginationVal={setPaginationVal}
					openEmailSelected={openEmailSelected}
					setOpenEmailSelected={setOpenEmailSelected}
					pagination={pagination}
					openEmailBody={openEmailBody}
					setEmailSpecificData={setEmailSpecificData}
					selectedEmail={selectedEmail}
					selectedFilterValue={selectedFilterValue}
				/>
				{openEmailSelected && (
					<EmailBody
						emailSpecificData={emailSpecificData}
						body={emailBodyData.body}
						setOpenEmailSelected={setOpenEmailSelected}
						markEmailAsFavorite={markEmailAsFavorite}
					/>
				)}
			</section>
		</>
	);
}

export default HomePage;
