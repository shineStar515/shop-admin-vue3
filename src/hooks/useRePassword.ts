import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { toast } from '@/utils/toast'
import { removeToken } from '@/utils/authToken'
import router from '@/router'
import { updatePassword } from '@/service/api/login'

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
	});
	const openRePassword = () => formDrawerRef.value.open()

	//修改密码操作
	function handleResetPWDClick(formEl: FormInstance) {
		if (!formEl) return
		formEl.validate(async valid => {
			if (!valid) return
			try {
				formDrawerRef.value.openLoading()
				//1.修改密码
				const oldpassword = resetPWDForm.oldPassword
				const password = resetPWDForm.newPassword
				const repassword = resetPWDForm.confirmPassword
				await updatePassword({ oldpassword, password, repassword })
				//2.清除用户信息
				removeToken()
				window.localStorage.clear()
				//3.跳转到登录页
				await router.push('/login').catch(() => {
				})
				toast('message', '修改密码成功,请重新登陆')
			} catch {
				toast('error', '修改失败,请重试')
			} finally {
				formDrawerRef.value.closeLoading()
			}
		})
	}

	return { resetFormRef, resetPWDForm, resetPWDFormRules, openRePassword, handleResetPWDClick }
}
