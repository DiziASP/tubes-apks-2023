import http from "k6/http";
const faker = require("faker");
require("dotenv").config();

export const options = {
	insecureSkipTLSVerify: true,
	noConnectionReuse: false,
	stages: [
		{ duration: "2m", target: 400 }, // ramp up to 400 users
		{ duration: "1h56m", target: 400 }, // stay at 400 ~2 hours
		{ duration: "2m", target: 0 }, // scale down. (optional)
	],
};

const PORT = process.env.PORT || 5000;
const API_BASE_URL = `https://localhost:${PORT}`;

export default function () {
	const randomName = faker.name.findName();
	const randomUsername = faker.internet.userName();
	const randomEmail = faker.internet.email();
	const randomPassword = faker.internet.password();

	const registerReq = {
		method: "POST",
		url: `${API_BASE_URL}/register`,
		body: {
			name: randomName,
			username: randomUsername,
			email: randomEmail,
			password: randomPassword,
		},
		params: {
			headers: { "Content-Type": "application/json" },
		},
	};
	const loginReq = {
		method: "POST",
		url: `${API_BASE_URL}/login`,
		body: {
			username: randomUsername,
			password: randomPassword,
		},
	};
	const reservationReq = {
		method: "POST",
		url: `${API_BASE_URL}/reservations`,
		body: {
			date: "2023/09/24",
			startAt: "bandung",
			seats: ["B"],
			ticketPrice: 50000,
			total: 1,
			movieId: "650d3fa4dd4dc724ef947f6c",
			cinemaId: "650c5c2ee1101d1be65d8a48",
			username: "wisnuas",
			phone: "08123456789",
			checkin: false,
		},
		params: {
			headers: { "Content-Type": "application/json" },
		},
	};
	const invitationReq = {
		method: "POST",
		url: `${API_BASE_URL}/invitations`,
		body: {
			to: "mpg066@gmail.com",
			host: "CINEMA PLUS",
			movie: "Movie Name",
			date: "2023-09-09",
			time: "6.00PM GMT+7",
			cinema: "CINEMA NAME",
			image: "https://picsum.photos/200",
			seat: "A1",
		},
		params: {
			headers: { "Content-Type": "application/json" },
		},
	};

	const responses = http.batch([
		registerReq,
		loginReq,
		reservationReq,
		invitationReq,
	]);
}
