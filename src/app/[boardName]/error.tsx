'use client';

export default function Error({error, reset} : {error: Error, reset: () => void}) {

	return (
		<div>
			<h2>Something went wrong, board single</h2> 
			<button onClick={() => reset()}>Try again</button>
		</div>
	)
};
