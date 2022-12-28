import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='검색하실 영화이름을 쳐주세요(영어로)'
			></input>
		</div>
	);
};

export default SearchBox;