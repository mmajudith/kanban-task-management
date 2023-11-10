"use client";

import Utility from "@/shared-components/utility/Utility";

export default async function GlobalError({error, reset} : {error: Error, reset: () => void}) {

  return (
    <html>
      	<body>
		  	<Utility 
				text={'Please check your internet connection root:( .'} 
				buttonText={'Try again'}
				onClick={reset}
			/>
      	</body>
    </html>
  )
}

