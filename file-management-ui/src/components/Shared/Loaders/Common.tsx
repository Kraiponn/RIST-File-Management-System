import { CSSProperties } from "react";
import { HashLoader, PropagateLoader, RotateLoader, PacmanLoader } from "react-spinners";

type IProps = {
	isLoading: boolean,
	color: string,            // #fcd34d
	size: number,			// 80
	speed: number,
	loaderType: 'Pacman' | 'Hash' | 'Propagate' | 'Rotate'
}

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	position: "fixed",
	transform: "translate(-50%, -50%)",
	left: "50%",
	top: "50%",
	borderColor: "red"
};

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Loading({ isLoading, color, size, speed, loaderType } : IProps) {
	const handleLoaderType = () => {
		switch (loaderType) {
			case 'Pacman':
				return (
					<PacmanLoader
						color={color}
						loading={isLoading}
						cssOverride={override}
						size={size}
						speedMultiplier={speed}
						aria-label="Loading Spinner"
						data-testid="loader"/>
				)
			case 'Hash':
				return (
					<HashLoader
						color={color}
						loading={isLoading}
						cssOverride={override}
						size={size}
						speedMultiplier={speed}
						aria-label="Loading Spinner"
						data-testid="loader"/>
				)
			case 'Propagate':
				return (
					<PropagateLoader
						color={color}
						loading={isLoading}
						cssOverride={override}
						size={size}
						speedMultiplier={speed}
						aria-label="Loading Spinner"
						data-testid="loader"/>
				)
			default:
				return (
					<RotateLoader
						color={color}
						loading={isLoading}
						cssOverride={override}
						size={size}
						speedMultiplier={speed}
						aria-label="Loading Spinner"
						data-testid="loader"/>
				)
		}
	}

	return (
		<div className={`fixed ${!isLoading && 'hidden'} top-0 left-0 z-[1000] w-full h-screen bg-slate-900/95`}>
			{handleLoaderType()}
		</div>
	)
}
