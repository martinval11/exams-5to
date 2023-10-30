export const syncDate = (date: string) => {
	const dateTime = new Date(date).getTime() + 86400000;
	return new Date(dateTime).toLocaleDateString('es-ar') || date;
};
