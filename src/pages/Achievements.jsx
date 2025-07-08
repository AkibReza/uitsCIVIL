import { useState } from "react";
import { useNavigate } from "react-router-dom";

const achievements = [
	{
		id: 1,
		title: "International Engineering Competition 2023",
		image: "/images/achievement1.jpg",
		isInternational: true,
	},
	{
		id: 2,
		title: "National Civil Engineering Project Exhibition",
		image: "/images/achievement2.jpg",
		isInternational: false,
	},
	{
		id: 3,
		title: "International Bridge Design Challenge",
		image: "/images/achievement3.jpg",
		isInternational: true,
	},
	{
		id: 4,
		title: "Local Innovation Fair",
		image: "/images/achievement4.jpg",
		isInternational: false,
	},
	// ...add more as needed
];

const Achievements = () => {
	const [filter, setFilter] = useState("all");
	const navigate = useNavigate();

	const filtered =
		filter === "all"
			? achievements
			: achievements.filter((a) => a.isInternational);

	return (
		<div className="w-full min-h-screen bg-gray-900 py-8 px-0">
			<div className="max-w-5xl mx-auto px-4">
				<div className="flex justify-center mb-8 gap-4">
					<button
						className={`px-5 py-2 rounded font-semibold transition ${
							filter === "all"
								? "bg-blue-500 text-white"
								: "bg-gray-800 text-gray-300 hover:bg-blue-700 hover:text-white"
						}`}
						onClick={() => setFilter("all")}
					>
						All Events
					</button>
					<button
						className={`px-5 py-2 rounded font-semibold transition ${
							filter === "international"
								? "bg-blue-500 text-white"
								: "bg-gray-800 text-gray-300 hover:bg-blue-700 hover:text-white"
						}`}
						onClick={() => setFilter("international")}
					>
						International Events
					</button>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{filtered.map((a) => (
						<div
							key={a.id}
							className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg group transition-transform duration-200 hover:-translate-y-1 bg-gray-800"
							onClick={() => navigate(`/achievement/${a.id}`)}
						>
							<img
								src={a.image}
								alt={a.title}
								className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<span className="text-white text-lg font-bold text-center px-4">
									{a.title}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Achievements;
