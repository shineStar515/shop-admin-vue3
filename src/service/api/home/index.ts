import { myRequest } from '@/service';
import type { IStatistics } from '@/service/api/home/types';

//订单信息
export function getStatistics1() {
	return myRequest.get<IStatistics.statistics1Result>({
		url: '/statistics1'
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
