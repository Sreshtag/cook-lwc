import { LightningElement, track, wire } from 'lwc';

export default class FileUpload extends LightningElement {
  @track chartConfiguration;
  barchartSelected
  polarchartselected
  scatterChartselected
  lineChartSelected
  chartLabels = ["honey", "money", "sunny", "funny", "notfunny", "honey", "money", "sunny", "funny", "notfunny"]
  chartData = [100, 200, 300, 400, 500, 100, 200, 300, 400, 500]
  barchart = {
    type: 'bar',
    data: {
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Closed Won Last Week',
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: "midnightblue",
          data: this.chartData,
        },
      ],
    },
    options: {
    },
  }
  polarAreachart = {
    type: 'polarArea',
    data: {
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Closed Won Last Week',
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: "midnightblue",
          data: this.chartData,
        },
      ],
    },
    options: {
    },
  }
  scatterChart = {
    type: 'scatter',
    data: {
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Closed Won Last Week',
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: "midnightblue",
          data: this.chartData,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Scatter Chart'
        }
      }
    },
  }
  lineChart = {
    type: 'line',
    data: {
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Closed Won Last Week',
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: "midnightblue",
          data: this.chartData,
        },
      ],
    },
    options: {
    },
  }

  getchartType(event) {
    console.log("getcharttype")
    const type = event.target.value
    console.log(type)
    type === "bar" ? (
      this.polarchartselected = false,
      this.barchartSelected = true,
      this.scatterChartselected = false
    ) :
      type === "polarArea" ? (
        this.polarchartselected = true,
        this.barchartSelected = false,
        this.scatterChartselected = false
      ) :
        type === "scatter" ? (
          this.polarchartselected = false,
          this.barchartSelected = false,
          this.scatterChartselected = true
        ) :
          this.lineChartSelected = true
  }
  get options() {
    return [
      { label: 'bar', value: 'bar' },
      { label: 'polarArea', value: 'polarArea' },
      { label: 'scatter', value: 'scatter' },
      { label: 'line', value: 'line' },
    ];
  }
}

