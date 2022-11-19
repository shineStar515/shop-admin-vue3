import { ElMessage } from 'element-plus'

export type toastType = 'success' | 'warning' | 'message' | 'error';

export function toast(type: toastType, message: string, duration = 3000) {
	ElMessage({
		message,
		type: type as any,
		duration
	})
}
