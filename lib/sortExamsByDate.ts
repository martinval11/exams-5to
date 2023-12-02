type exam = {
	id: number;
	title: string;
	assignatures: string;
	date: string;
};

export const sortedExamsByDate = (exams: exam[]) => {
	const examsSorted = exams.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	return examsSorted;
}

