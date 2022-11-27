import { myRequest } from '@/service';
import type { IStatistics } from '@/service/api/home/types';

//订单信息
export function getStatistics1() {
	return myRequest.get<IStatistics.statistics1Result>({
		url: '/statistics1'
	});
}

//店铺统计
export function getStatistics2() {
	return myRequest.get<IStatistics.statistics2Result>({
		url: '/statistics2'
	});
}

//订单统计
export function getStatistics3(type: any) {
	return myRequest.get<IStatistics.statistics3Result>({
		url: '/statistics3',
		params: {
			type
		}
	});
}
