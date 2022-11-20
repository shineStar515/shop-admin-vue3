import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { toast } from '@/utils/toast'
import useGlobalStore from '@/stores/global'
import { removeToken } from '@/utils/authToken'

const globalStore = useGlobalStore()

export function useRePassword(formDrawerRef: any) {
	const resetFormRef = ref<FormInstance>()
	//修改密码表单
	const resetPWDForm = reactive({
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	})
	//rules
	const resetPWDFormRules = reactive<FormRules>({
		oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
		newPassword: [
			{
				required: true,
				message: '新密码不能为空',
				trigger: 'blur'
			}
		],
		confirmPassword: [
			{
				required: true,
				message: '确认密码不能为空',
				trigger: 'blur'
			}
		]
	})
	const openRePassword = () => formDrawerRef.value.open()

	//修改密码操作
	function handleResetPWDClick(formEl: FormInstance) {
		if (!formEl) return
		formEl.validate(valid => {
			if (valid) {
				formDrawerRef.value.openLoading()
				const oldpassword = resetPWDForm.oldPassword
				const password = resetPWDForm.newPassword
				const repassword = resetPWDForm.confirmPassword
				globalStore
					.updatePasswordRequestAction({ oldpassword, password, repassword })
					.then(() => {
						removeToken()
						window.localStorage.clear()
						window.location.reload()
						toast('message', '修改密码成功,请重新登陆')
					})
					.catch(() => {
						toast('error', '修改失败,请重试')
					})
					.finally(() => {
						formDrawerRef.value.closeLoading()
					})
			} else {
				toast('warning', '请输入旧密码和新密码')
			}
		})
	}

	return { resetFormRef, resetPWDForm, resetPWDFormRules, openRePassword, handleResetPWDClick }
}
