import { myRequest } from '@/service';
import type { IImage } from '@/service/api/image/types';

//图片列表
export function getImageList(page: number, limit: number = 10) {
	return myRequest.get({
		url: `/image_class/${page}?limit=${limit}`
	});
}

//新增图片分类
export function addImageClass(addData: IImage.ImageRequest) {
	return myRequest.post({
		url: '/image_class',
		data: addData
	});
}

//修改图片分类
export function updateImageClass(id: number, updateData: IImage.ImageRequest) {
	return myRequest.post({
		url: `/image_class/${id}`,
		data: updateData
	});
}

//删除图片分类
export function deleteImageClass(id: number) {
	return myRequest.post({
		url: `/image_class/${id}/delete`
	});
}
