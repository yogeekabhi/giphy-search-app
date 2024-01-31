import React from "react";

const GifListItem = ({ gif }) => {
	return (
		<div className='grid-item'>
			<figure>
				<img src={`${gif.images.preview_gif.url}.gif`} alt='gif' />
				<figcaption>{gif.title}</figcaption>
			</figure>
		</div>
	);
};

export default React.memo(GifListItem);
