export const fetchGifs = async (searchTerm) => {
	const response = await fetch(
		`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&offset=25`
	);
	const result = await response.json();
	return {
		status: result.meta.status,
		data: result.data,
		message: result.meta.msg
	};
};
