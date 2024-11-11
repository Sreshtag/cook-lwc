import { LightningElement, track, wire ,api} from 'lwc';

export default class FileUpload extends LightningElement {
  request=true
  response = false
  chartConfiguration
  chartTypeSelected
  chartLabels 
  chartData 
  barchart = {
    type: 'bar',
    data: {
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
  lineChart = {
    type: 'line',
    data: {
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

  get options() {
    return [
      { label: 'bar', value: 'bar' },
      { label: 'polarArea', value: 'polarArea' },
      { label: 'line', value: 'line' },
    ];
  }

  submithandler(event){
    event.preventDefault()
    this.createChartHandler()
}
  inputTextHandler(event) {
    const {name,value}=event.target
    if(name=="chartLabels")
    {this.chartLabels = value.split(",")}
    else if(name=="chartData")
    {this.chartData =value.split(",")}
    else if(name=="Chart")
    {console.log(value)
      this.chartTypeSelected =value}
  }
  createChartHandler(){
    this.response=true
    this.request=false
    this.chartTypeSelected === "bar" ? (
      this.chartConfiguration =this.barchart
    ) :
    this.chartTypeSelected === "polarArea" ? (
        this.chartConfiguration =this.polarAreachart
      ) :
      this.chartTypeSelected === "line" ? (
          this.chartConfiguration =this.lineChart
        ) :
        this.chartConfiguration =this.barchart
    
    this.chartConfiguration.data.labels=this.chartLabels
    this.chartConfiguration.data.datasets[0].data= this.chartData
    console.log(JSON.stringify(this.chartConfiguration))
  }
  resestApp(){
    this.request=true
    this.response = false
    this.chartData=""
    this.chartLabels=""
    this.chartConfiguration=""
    this.chartTypeSelected=""
  }
}

