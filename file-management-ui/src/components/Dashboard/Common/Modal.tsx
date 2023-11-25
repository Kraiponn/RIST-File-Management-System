import { MdDangerous, MdWarning } from 'react-icons/md'
import { BsFillInfoCircleFill } from 'react-icons/bs'

type IProps = {
	title: string,
	description?: string,
	cancelButtonLabel?: string,
	okButtonLabel: string,
	iconType: 'Warning' | 'Error' | 'Info',
	isShow: boolean,
	onCloseModal: (type: 'ok' | 'cancel') => void
}

/************************************************************************************************************
 * 														 	  MAIN FUNCTION																									  *
 ************************************************************************************************************/
export default function Modal({ 
	title, 
	description, 
	okButtonLabel, 
	cancelButtonLabel, 
	iconType, 
	isShow, 
	onCloseModal } : IProps
) {
	function displayIcon(iconType: string) {
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
			className={`fixed ${!isShow && 'hidden'} top-0 left-0 z-[1000] w-full h-screen min-w-[350px] bg-slate-800/70 flex justify-center items-center text-gray-900`}>
				<div className="w-[50%] shadow-lg bg-zinc-50 relative z-[1100] animate-modal p-5 rounded-md">
					<div className="flex items-center justify-start">
						{displayIcon(iconType)}
						<h1 className="ml-2 text-xs text-gray-800 sm:text-sm md:text-base lg:text-3xl font-PromptSemiBold">
							{title}
						</h1>
					</div>
					
					<p className="mt-5 text-xs sm:text-sm font-PromptRegular lg:text-xl indent-9">
						{description}
					</p>

					<hr className='my-9' />
					
					<div className="flex items-center justify-end gap-2 pb-3">
						{cancelButtonLabel !== undefined && (
							<button 
								onClick={() => onCloseModal('cancel')}
								className={`py-2 text-xs bg-red-600 rounded-md font-PromptSemiBold sm:text-sm px-2 sm:px-5 md:px-9 text-zinc-50 hover:bg-red-700`}>
								{cancelButtonLabel}
							</button>
						)}

						<button 
							onClick={() => onCloseModal('ok')}
							className={`py-2 text-xs bg-blue-600 rounded-md font-PromptSemiBold sm:text-sm px-3 sm:px-5 md:px-9 text-zinc-50 hover:bg-blue-700`}>
							{okButtonLabel}
						</button>
					</div>
				</div>
		</div>
	)
}
