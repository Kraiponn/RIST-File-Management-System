import { useAppTheme } from "@/features/store";
import { CSSProperties } from "react";
import { BarLoader } from "react-spinners";

interface IProps {
	isLoading: boolean
}

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "red"
};

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function QueryLoader({ isLoading }: IProps) {
	const { isDarkMode } = useAppTheme()

	return (
		<div className="mb-5">
			<BarLoader
				color={`${isDarkMode ? "#facc15" : "#dc2626"}`}
				loading={isLoading}
				cssOverride={override}
				width={"100%"}
				height={"9px"}
				speedMultiplier={0.89}
				aria-label="Loading bar"
				data-testid="loader"
			/>
		</div>
	)
}
