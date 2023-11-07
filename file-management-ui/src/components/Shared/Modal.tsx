// import { useAppTheme } from "@/features/store";
import { MdDangerous, MdWarning } from 'react-icons/md'
import { BsFillInfoCircleFill } from 'react-icons/bs'

type IProps = {
	title: string,
	description?: string,
	buttonLabel: string,
	iconType: 'Warning' | 'Error' | 'Info',
	isShow: boolean,
	onCloseModal: () => void
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Modal({ title, description, buttonLabel, iconType, isShow, onCloseModal } : IProps) {
	function displayIcon(iconType: string): import("react").ReactNode | Iterable<import("react").ReactNode> {
		if(iconType === 'Info') {
			return (
				<BsFillInfoCircleFill 
					style={{ fontSize: '35px', color: '#2dd4bf' }}
				/>
			)
		}
		else if(iconType === 'Warning') {
			return (
				<MdWarning 
					style={{ fontSize: '35px', color: 'dc2626' }}
				/>
			)
		}
		else {
			return (
				<MdDangerous 
					style={{ fontSize: '35px', color: '#dc2626' }}
				/>
			)
		}
	}

	return (	
		<div 
			className={`fixed ${!isShow && 'hidden'} top-0 left-0 z-[1000] w-full h-screen bg-slate-800/70 flex justify-center items-center`}>
				<div className="w-[50%] shadow-lg bg-zinc-50 relative z-[1100] animate-modal p-5 rounded-md">
					<div className="flex items-center justify-start">
						{displayIcon(iconType)}
						<h1 className="ml-2 text-xl text-gray-800 md:text-3xl font-PromptSemiBold">
							{title}
						</h1>
					</div>
					
					<p className="mt-5 text-xs md:text-sm font-PromptRegular lg:text-xl indent-9">
						{description}
					</p>

					<hr className='my-9' />
					
					<div className="flex items-center justify-center pb-3 md:justify-end">
						<button 
							onClick={() => onCloseModal()}
							className="absolute py-2 text-xs bg-blue-600 rounded-md font-PromptSemiBold md:text-sm px-9 text-zinc-50 hover:bg-blue-700">
							{buttonLabel}
						</button>
					</div>
				</div>
		</div>
	)
}
