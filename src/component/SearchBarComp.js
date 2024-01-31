import React from "react";

const SearchBarComp = ({ search, handleInputChange }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className='form-container'>
			<form id='search-form' onSubmit={handleSubmit}>
				<input
					type='text'
					name='search-gifs'
					autoComplete='off'
					value={search}
					onChange={handleInputChange}
					placeholder='Search for your favourite gifs!'
				/>
			</form>
		</div>
	);
};

export default SearchBarComp;
