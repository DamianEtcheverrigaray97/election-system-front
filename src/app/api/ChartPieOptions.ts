export interface PieChartOptions {
    animation: {
      duration: number;
    };
    plugins: {
      legend: {
        labels: {
          color: string;
          usePointStyle: boolean;
          padding: number;
          boxHeight: number;
          pointStyleWidth: number;
        };
        position: string;
      };
    };
  }
  