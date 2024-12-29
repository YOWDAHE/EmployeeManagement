import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "@mantine/core";
import NavBar from "./Components/NavBar";

const Feedback = () => {
	const [loading, setLoading] = useState(true);
	const [feedback, setFeedback] = useState([]);

	useEffect(() => {
		setLoading(true);
		console.log("refresh called");
		(async () => {
			const response = await axios.get(
				"http://127.0.0.1:5001/employee-managment-a84ff/us-central1/app/getFeedback"
			);
			setFeedback(response.data.data);
			setLoading(false);
		})();
	}, []);

	console.log(feedback);
	if (loading) {
		return (
			<div className="flex w-full h-[100vh] items-center justify-center">
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<NavBar />
			<div className="p-5">
				<h1 className="text-2xl font-bold mb-5">Employee Feedback</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{feedback.map((item, index) => (
						<div key={index} className="bg-white p-5 rounded shadow-lg">
							<h2 className="text-xl font-semibold mb-2">{item.name}</h2>
							<p className="text-gray-700">{item.text}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Feedback;
