import { useCookies } from '@vueuse/integrations/useCookies';

export const ADMIN_TOKEN = 'shopAdminToken';
const cookie = useCookies();

export function getToken() {
	return cookie.get(ADMIN_TOKEN);
}

export function setToken(token: string) {
	cookie.set(ADMIN_TOKEN, token);
}

export function removeToken() {
	cookie.remove(ADMIN_TOKEN);
}
