export type ChartType = 'line' | 'bar' | 'pie';

export type ChartInfo = {
  creationDate: string;
};

export type ChartDataModel = {
  id: string;
  type: ChartType;
  details: ChartInfo;
  data: any;
  options: any;
};
