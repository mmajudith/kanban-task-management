'use client';

const Error = ({error, reset} : {error: Error, reset: () => void}) => {

	return (
		<div>
			<h2>Something went wrong in fetching single board</h2> 
			<button onClick={() => reset()}>Try again</button>
		</div>
	)
};

export default Error;
