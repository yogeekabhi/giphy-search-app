import React, { useCallback, useEffect, useRef, useState } from "react";
import GifListItem from "./GifListItem";
import SearchBarComp from "./SearchBarComp";
import { fetchGifs } from "../utils/httpsRequest";

const Main = () => {
	const [search, setSearch] = useState(() => "");
	const [gifData, setGifData] = useState(() => "");
	const [errorMessage, setErrorMessage] = useState(() => "");
	const [shouldCallApi, setShouldCallApi] = useState(() => true);
	const debounceRef = useRef(null);

	useEffect(() => {
		if (shouldCallApi) {
			setShouldCallApi(false);
			fetchGifs(search).then((resp) => {
				console.log({ resp });
				if (resp.status === 200) {
					if (resp.data.length > 0) {
						setGifData([...resp.data]);
					} else if (!resp.data.length) {
						setGifData([]);
						setErrorMessage("No Records Found!");
					}
				} else {
					setErrorMessage(resp.message);
				}
			});
		}
	}, [search, shouldCallApi]);

	const handleInputChange = useCallback((e) => {
		console.log(e.target.value, "searching...");
		setSearch(e.target.value);
		setErrorMessage("");
		!!debounceRef.current && clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setShouldCallApi(true);
		}, 600);
	}, []);

	return (
		<div>
			<h1>Search GIFs</h1>
			<SearchBarComp search={search} handleInputChange={handleInputChange} />
			{!!errorMessage.length && !!search.length && (
				<div className='error-msg'>{errorMessage}</div>
			)}
			<div className='grid-container'>
				{(gifData || []).map((item) => {
					console.log(item, "!!!");
					return <GifListItem gif={item} key={item.id} />;
				})}
			</div>
		</div>
	);
};

export default Main;
