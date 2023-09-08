"use client";

export default async function GlobalError({error, reset} : {error: Error, reset: () => void}) {

  return (
    <html>
      	<body>
			<div>
				<h2>Something went wrong, boards</h2> 
				<button onClick={() => reset()}>Try again</button>
			</div>
      	</body>
    </html>
  )
}

