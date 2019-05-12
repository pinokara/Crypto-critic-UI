import React from "react";
import Chart from "react-apexcharts";
import {LoadingPanel} from "../../common/loading/loading-panel/loading-panel";
import moment from 'moment';
export class LineChart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            // options: {
            //     chart: {
            //         id: "basic-bar2"
            //     },
            //     xaxis: {
            //         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            //     }
            // },
            // series: [
            //     {
            //         name: "series-1",
            //         data: [30, 40, 45, 50, 49, 60, 70, 91]
            //     }
            // ]
        };
    };
    parseData= (arr, index)=>{
        let a=[];
        for(let i=0 ; i< arr.length ;i++){
            if(index ==0) a.push( moment(new Date(arr[i][index])).format('DD-MMM') )
            else a.push(arr[i][index]);
        }

        return a ;
    }
    render(){
        const {sparkline , name }= this.props;
        let series =sparkline && this.parseData(sparkline.prices,1) ;
        let options =  sparkline && {
            chart:{
                id: 'basic-bar2'
            },
            xaxis:{
                categories: this.parseData(sparkline.prices,0),
                labels: {
                    show: false,
                },
                axisTicks: {
                    show: true,
                    borderType: 'solid',
                    color: 'red',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
                axisBorder: {
                    show: true,
                    color: 'green',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0
                },
            },
            yaxis:{
                show: true,
                showAlways: true,
                seriesName: undefined,
                opposite: false,
                reversed: false,
                logarithmic: false,
                tickAmount: 6,
                min: Math.min(...series) ,
                max: Math.max(...series) ,
                forceNiceScale: false,
                floating: false,
                decimalsInFloat: 2,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                colors: undefined,
                width: 1.5,
                dashArray: 0,
            }
        }
        if(!sparkline) return <LoadingPanel/>
        return(
            <Chart
                options={options }
                series={[{name : name  , data : series}]}
                type="line"
                width="800"
                height='500'
            />
        );
    }
}