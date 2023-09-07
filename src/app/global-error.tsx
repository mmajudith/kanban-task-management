'use client';

const GlobalError = ({error, reset} : {error: Error, reset: () => void}) => {

	return (
		<div>
			<h2>Something went wrong, Global error</h2> 
			<button onClick={() => reset()}>Try again</button>
		</div>
	)
};

export default GlobalError;
