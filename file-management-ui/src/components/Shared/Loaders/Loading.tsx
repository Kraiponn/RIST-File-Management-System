import Pacman from '@/components/Shared/Loaders/Pacman'
import Common from '@/components/Shared/Loaders/Common'

type IProps = {
	isLoading: boolean,
	color: string,            // #fcd34d
	size: number,			// 80
	speed: number,
	loaderType: 'Pacman' | 'Hash' | 'Propagate' | 'Rotate'
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Loading({ isLoading, color, size, speed, loaderType } : IProps) {
	if(loaderType === 'Pacman') {
		return (
			<Pacman 
				isLoading={isLoading}
				color={color}
				size={size}
				speed={speed}
			/>
		) 
	} else {
		return (
			<Common 
				isLoading={isLoading}
				color={color}
				size={size}
				speed={speed}
				loaderType={loaderType}
			/>
		) 
	}
}
