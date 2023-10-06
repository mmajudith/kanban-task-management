'use client';

import Utility from "@/shared-components/utility/Utility";

export default async function Error({error, reset} : {error: Error, reset: () => void}) {

	return (
		<Utility 
			text={'Please check your internet connection :( .'} 
			buttonText={'Try again'}
		/>
	)
};
