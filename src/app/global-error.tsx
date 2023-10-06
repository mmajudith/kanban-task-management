"use client";

import Utility from "@/shared-components/utility/Utility";

export default async function GlobalError({error, reset} : {error: Error, reset: () => void}) {

  return (
    <html>
      	<body>
		  	<Utility 
				text={'Please check your internet connection :( .'} 
				buttonText={'Try again'}
			/>
      	</body>
    </html>
  )
}

