import React from "react";
import Chart from "react-apexcharts";

export class ChartChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options: {
                chart: {
                    id: "basic-bar",
                    parentHeightOffset: 0,
                    height:100
                },
                xaxis: {
                    categories: this.initArray(),
                    labels: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                        borderType: 'solid',
                        color: 'red',
                        height: 6,
                        offsetX: 0,
                        offsetY: 0
                    },
                    axisBorder: {
                        show: false,
                        color: 'green',
                        height: 1,
                        width: '100%',
                        offsetX: 0,
                        offsetY: 0
                    },
                },
                yaxis:{
                    labels:{show : false}
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: undefined,
                    width: 1.5,
                    dashArray: 0,
                }

            },
            series: [
                {
                    name: "series-1",
                    data: [5000, 4023, 4445, 5200, 4000,4590, 5965, 4444]
                }
            ],
        };
    };

    initArray=()=>{
        let a=[];
        for( let i =0 ; i< 168 ;i++) a.push(i+1);
        return a;
    }
    render(){
        const {series}= this.props;
        console.log(series)
        if(!series) return null ;
        return(
                <Chart
                    options={this.state.options }
                    series={series}
                    stroke={this.state.stroke}
                    type="line"
                    width="200"
                    height="100"

                />
        );
    }
}