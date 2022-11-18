import Request from '@/service/request';
import { BASE_URL, TiME_OUT } from '@/service/config';
export const myRequest = new Request({
	baseURL: BASE_URL,
	timeout: TiME_OUT
});
