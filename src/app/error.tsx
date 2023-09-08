'use client';

export default async function Error({error, reset} : {error: Error, reset: () => void}) {

	return (
		<div>
			<h2>{error.message}Something went wrong, Fetching boards</h2> 
			<button onClick={() => reset()}>Try again</button>
		</div>
	)
};
