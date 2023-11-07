import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { PacmanLoader } from "react-spinners";

type IProps = {
	isLoading: boolean,
	color: string,            // #fcd34d
	size: number,			// 80
	speed: number
}

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	// zIndex: "1001",
	position: "fixed",
	transform: "translate(-50%, -50%)",
	left: "50%",
	top: "50%",
	borderColor: "red"
};

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Pacman({ isLoading, color, size, speed } : IProps) {
	const { t } = useTranslation();

	return (
		<div className={`fixed ${!isLoading && 'hidden'} top-0 left-0 z-[1000] w-full h-screen bg-slate-800/95`}>
			<h1 className="text-xl md:text-3xl text-zinc-50 fixed left-[56%] top-[50%] translate-x[-56%] translate-y-[-50%]">
				{t("Loader.title")}
			</h1>
			<PacmanLoader
				color={color}
				loading={isLoading}
				cssOverride={override}
				size={size}
				speedMultiplier={speed}
				aria-label="Loading Spinner"
				data-testid="loader"/>
		</div>
	)
}
