import { ChangeEvent } from 'react'

type Props = {
	type: 'text' | 'email',
	placeholder: string,
	value: string,
	onValueChange: (event: ChangeEvent<HTMLInputElement>) => void
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function TextField({ type, placeholder, value, onValueChange }: Props) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onValueChange(event);
	}

	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={handleChange}
			className='px-7 ring-2 ring-blue-700 ring-offset-1'
		/>
	)
}
