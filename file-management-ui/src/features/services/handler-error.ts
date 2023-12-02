import { AxiosError } from 'axios';
import { ILocale } from '@/interfaces';

function getResponseMessage(error: AxiosError, locale: ILocale) {
	const response = error.response;
	let message = '';

	// console.log(response?.data)
	if(response?.status === 400)
		message = locale === 'en' ? 'Something went wrong. Please try again. - (400)' : `มีบางสิ่งผิดพลาด, รูปแบบการร้องขอไม่ถูกต้อง หรือโปรดลองอีกครั้ง - (400)`
	else if(response?.status === 403)
		message = locale === 'en' ? 'Unauthorized. try a different query. - (403)' : `ไม่ได้รับอนุญาติการเข้าถึง อาจเนื่องมาจากการจำกัดสิทธิสำหรับบางบัญชี - (403)`
	else if(response?.status === 404)
		message = locale === 'en' ? 'Notthing found. try a different query. - (404)' : `ไม่พบข้อมูลตามที่คุณร้องขอ โปรดลองใช้คำค้นหาอื่น - (404)`
	else if(response?.status === 500)
		message = locale === 'en' ? 'Something went wrong from server. - (500)' : `มีบางสิ่งผิดพลาด หรืออาจเนื่องมาจากฝั่งผู้ให้บริการมีปัญหา - (500)`
	else
		message = locale === 'en' ? 'Something went wrong. Please try again.' : `มีบางสิ่งผิดพลาด โปรดลองใหม่อีกครั้ง`

	return message;
}

export const getErrorResponse = (error: AxiosError, locale: ILocale) => {
	let errMessage = '';

	if (error.response) {
		errMessage = getResponseMessage(error, locale);
    } else if (error.request) {
		errMessage = locale === 'en' ? `Error at request api` : 'ผิดพลาดจากการร้องขอข้อมูลจากผู้ให้บริการ'
    } else {
		errMessage = locale === 'en' ? `Error at ${error.message}` : `ผิดพลาด : ${error.message}`
    }

	return errMessage || '';
}

