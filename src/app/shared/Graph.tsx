import * as React from 'react';
import Chart from 'chart.js';

interface IGraphData {
    id: string;
    type: string;
    labels: string[];
    values:  number[];
}

export class Graph extends React.PureComponent<IGraphData> {
    private _ctx!: Chart;

    componentDidMount() {
        this._ctx = new Chart(this.props.id, {
            type: this.props.type,
            data: {
                labels: this.props.labels,
                datasets: [{
                    data: this.props.values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: true
                }
            }
        });
    }
    
    componentDidUpdate() {
        this._ctx.data.labels = this.props.labels;
        if (this._ctx.data.datasets && this._ctx.data.datasets.length > 0) this._ctx.data.datasets[0].data = this.props.values;
        this._ctx.update();
    }

    render() {
        return <canvas id={this.props.id}></canvas>;
    }
}