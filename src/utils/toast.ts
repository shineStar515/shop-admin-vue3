import { ElMessage } from 'element-plus';
export enum toastEnum {
	success,
	warning,
	message,
	error
}
export function toast(type: toastEnum, message: string, duration = 3000) {
	ElMessage({
		message,
		type: 'warning',
		duration
	});
}
