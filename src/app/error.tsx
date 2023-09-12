'use client';

export default async function Error({error, reset} : {error: Error, reset: () => void}) {

	return (
		<div>
			<h2>Something went wrong, Please check your internet connection ):</h2> 
			<button onClick={() => reset()}>Try again</button>
		</div>
	)
};
