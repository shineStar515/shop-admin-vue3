<template>
	<div class='image'>
		<el-container class='list-content'>
			<el-header class='image-header'>
				<!--					header					-->
				<slot name='header'>
					<el-button type='primary' :icon='FolderAdd' @click='handleImageAdd'>新增图片分类</el-button>
					<el-button type='warning' :icon='Upload'>上传图片</el-button>
				</slot>
			</el-header>
			<el-container>
				<el-aside class='image-aside' width='220px'>
					<div class='aside-content'>
						<el-scrollbar>
							<!--					aside					-->
							<template v-if='asideData.list.length > 0' v-for='asideItem in asideData.list' :key='asideItem.id'>
								<ImageAside
									:data='asideItem'
									:active='asideData.id === asideItem.id'
									@update='handleImageUpdate'
									@delete='openDialog'
									@click='asideData.id = asideItem.id'
								>{{ asideItem.name }}
								</ImageAside
								>
							</template>
						</el-scrollbar>
					</div>
					<div class='aside-bottom'>
						<slot name='bottom'>
							<!--						bottom					-->
							<el-pagination
								v-if='asideData.total'
								background
								layout='prev, next'
								:total='asideData.total'
								:page-size='pageData.limit'
								@current-change='getAsideData'
								@prev-click='getAsideData'
							/>
						</slot>
					</div>
				</el-aside>
				<el-container>
					<el-main class='image-main' style='padding: 0'>
						<div class='main-content'>
							<el-scrollbar>
								<ImageMain></ImageMain>
							</el-scrollbar>
						</div>
					</el-main>
					<el-footer class='image-footer'>
						<slot name='footer'>默认footer</slot>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
		<!--					FormDrawer					-->
		<FormDrawer ref='formDrawerRef' title='新增图片分类' @submit='handleImageFormSubmit'>
			<template #content>
				<!--				表单					-->
				<el-form ref='FormRef' label-width='100px' :model='imageAddForm' :rules='imageAddFormRules'
								 style='max-width: 460px'>
					<el-form-item label='名称 :' prop='name'>
						<el-input v-model='imageAddForm.name' />
					</el-form-item>
					<el-form-item label='排序 :' prop='order'>
						<el-input-number v-model.number='imageAddForm.order' :min='1' :max='10000' />
					</el-form-item>
				</el-form>
			</template>
		</FormDrawer>
		<!--					dialog					-->
		<el-dialog v-model='isDialog' title='删除图片分类' width='40%' align-center isDialog='true'>
			<span>您确定要删除该图片分类!!!</span>
			<template #footer>
				<span class='dialog-footer'>
					<el-button @click='isDialog = false'>取消</el-button>
					<el-button type='primary' @click='handleImageDelete'>删除 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts' setup>
import { FolderAdd, Upload } from '@element-plus/icons-vue';
import useGlobalStore from '@/stores/global';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import FormDrawer from '@/components/FormDrawer/index.vue';
import ImageAside from '@/components/ImageManage/cpns/ImageAside.vue';
import ImageMain from '@/components/ImageManage/cpns/ImageMain.vue';
import { toast } from '@/utils/toast';
import { addImageClass, deleteImageClass, updateImageClass } from '@/service/api/image';
import type { FormInstance, FormRules } from 'element-plus';

const globalStore = useGlobalStore();

// props
interface ImageManageProps {
	asideRequest: any;
}

const props = withDefaults(defineProps<ImageManageProps>(), {});
const isDialog = ref(false); //是否打开对话框
const isAddImage = ref(true); //是否为新增图片分类
const imageId = ref(0); //图片分类id
const { visibleHeight } = storeToRefs(globalStore); //可视区高度
const asideHeight = computed(() => visibleHeight.value - 120 + 'px');
/*form*/
const imageAddForm = reactive({
	name: '',
	order: 50
});

const imageAddFormRules = reactive<FormRules>({
	name: [{ required: true, message: '图库名称不能为空', trigger: 'blur' }],
	order: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
});
const FormRef = ref<FormInstance>();

/*header*/

const formDrawerRef = ref<InstanceType<FormDrawer>>();

//图片分类新增
function handleImageAdd() {
	formDrawerRef?.value?.open();
	imageAddForm.name = '';
	imageAddForm.order = 50;
	isAddImage.value = true;
}

function handleImageFormSubmit() {
	if (!FormRef.value) return;
	FormRef.value.validate(async (valid: any) => {
		if (!valid) return;
		try {
			//1.openLoading
			formDrawerRef?.value?.openLoading();
			//2.新增分类
			const name = imageAddForm.name;
			const order = imageAddForm.order;
			if (isAddImage.value) {
				await addImageClass({ name, order });
				toast('success', '新增图片分类成功');
			} else {
				await updateImageClass(imageId.value, { name, order });
				toast('success', '编辑图片分类成功');
			}
		} catch {
			toast('error', '请求失败,请重试');
		} finally {
			//3.closeLoading
			formDrawerRef?.value?.closeLoading();
			//4.close
			formDrawerRef?.value?.close();
			//5.重新请求数据
			getAsideData();
		}
	});
}

/*aside*/
//分页
const pageData = reactive({
	page: 1,
	limit: 10
});
//data
const asideData = reactive({
	id: 0,
	list: [],
	total: 0
});

//网络请求
function getAsideData(page?: number) {
	if (typeof page == 'number') {
		pageData.page = page;
	}
	props.asideRequest(pageData.page, pageData.limit).then(({ data }: any) => {
		asideData.list = data.list;
		asideData.total = data.totalCount;
		asideData.id = data.list[0].id;
	});
}

getAsideData();

//图片分类编辑
function handleImageUpdate(row: any) {
	console.log('编辑', row);
	formDrawerRef?.value?.open();
	imageAddForm.name = row.name;
	imageAddForm.order = row.order;
	imageId.value = row.id;
	isAddImage.value = false;
}

//图片分类删除
function openDialog(row: any) {
	isDialog.value = true;
	imageId.value = row.id;
}

function handleImageDelete() {
	deleteImageClass(imageId.value)
		.then(() => {
			toast('success', '删除图片分类成功');
			getAsideData();
		})
		.catch(() => toast('error', '请求失败,请重试'))
		.finally(() => (isDialog.value = false));
}
</script>
<style scoped lang='scss'>
:deep(.el-scrollbar__view) {
	height: v-bind(asideHeight) !important;
}

.image {
	box-sizing: border-box;
	padding: 0 20px;
	height: 100%;

	.list-content {
		background-color: #ffffff;
		border-radius: 10px;
		height: 100%;

		.aside-bottom,
		.image-footer {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.image-main {
			position: relative;
		}

		.aside-content {
			height: v-bind(asideHeight);
			overflow: hidden;
		}

		.main-content {
			height: v-bind(asideHeight);
			overflow: hidden;
		}

		.image-header {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f0f2f5;
		}

		.image-aside {
			position: relative;
			border-right: 1px solid #f0f2f5;

			.aside-bottom {
				position: absolute;
				left: 0;
				bottom: 0;

				width: 100%;
				height: 60px;
			}
		}
	}
}
</style>
