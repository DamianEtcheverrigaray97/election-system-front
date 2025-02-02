export interface ChartPieData {
    labels: string[]; 
    datasets: {
      data: number[]; 
      backgroundColor: string[]; 
      borderColor: string; 
    }[];
  }
  