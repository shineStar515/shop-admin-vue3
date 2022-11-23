export namespace IStatistics {
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
}
