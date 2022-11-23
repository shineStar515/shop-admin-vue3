import { myRequest } from '@/service';
import type { IStatistics } from '@/service/api/home/types';

export function getStatistics1() {
	return myRequest.get<IStatistics.statistics1Result>({
		url: '/statistics1'
	});
}
