import React, { useCallback, useEffect, useRef, useState } from "react";
import GifListItem from "./GifListItem";
import SearchBarComp from "./SearchBarComp";
import { fetchGifs } from "../utils/httpsRequest";

const Main = () => {
	const [search, setSearch] = useState(() => ""); // search state
	const [gifData, setGifData] = useState(() => ""); // gifs data state
	const [errorMessage, setErrorMessage] = useState(() => ""); // error state
	const [shouldCallApi, setShouldCallApi] = useState(() => true); // flag to handle debounce effect
	const debounceRef = useRef(null);

	useEffect(() => {
		if (shouldCallApi) {
			setShouldCallApi(false);
			/****** Fetch gif api call ******/
			fetchGifs(search).then((resp) => {
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

	const handleInputChange = useCallback(
		(e) => {
			setSearch(e.target.value);
			setErrorMessage("");
			!!debounceRef.current && clearTimeout(debounceRef.current);
			debounceRef.current = setTimeout(() => {
				setShouldCallApi(true);
			}, 600);
		},
		[search]
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
		},
		[search]
	);

	return (
		<div>
			<h1>Search GIFs</h1>
			<SearchBarComp
				search={search}
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
			/>
			{!!errorMessage.length && !!search.length && (
				<div className='error-msg'>{errorMessage}</div>
			)}
			<div className='grid-container'>
				{(gifData || []).map((item) => {
					return <GifListItem gif={item} key={item.id} />;
				})}
			</div>
		</div>
	);
};

export default Main;
