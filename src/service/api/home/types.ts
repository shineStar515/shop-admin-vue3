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

	//店铺信息
	export interface statistics2Result {
		goods: Good[];
		order: Order[];
	}

	export interface Good {
		label: string;
		value: number;
	}

	export interface Order {
		label: string;
		value: number;
	}

	//订单统计
	export interface statistics3Result {
		x: string[];
		y: number[];
	}
}
