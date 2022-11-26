export namespace IStatistics {
	//订单信息
	export interface statistics1Result {
		panels: Panel[];
	}

	export interface Panel {
		title: string;
		value: number;
		unit: string;
		unitColor: string;
		subTitle: string;
		subValue: any;
		subUnit: string;
	}

	//订单统计
	export interface statistics3Result {
		x: string[];
		y: number[];
	}
}
