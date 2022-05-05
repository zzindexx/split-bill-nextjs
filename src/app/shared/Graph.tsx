import * as React from 'react';
import { Chart, DoughnutController, ArcElement, Legend } from 'chart.js';

interface IGraphData {
    id: string;
    data: any[];
}

Chart.register(DoughnutController, ArcElement, Legend);

export class Graph extends React.PureComponent<IGraphData> {
    private _ctx!: Chart;

    componentDidMount() {
        this._ctx = new Chart(this.props.id, {
            type: 'doughnut',
            data: {
                labels: this.props.data.map(el => el.participant.name),
                datasets: [{
                    data: this.props.data,
                    backgroundColor: [
                        '#4e73df',
                        '#36b9cc',
                        '#1cc88a',
                        '#f6c23e',
                        '#e74a3b',
                        '#5a5c69'
                    ]
                }]
            },
            options: {
                cutout: '80%',
                parsing: {
                  key: 'totalSpent'  
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }
    
    componentDidUpdate() {
        //this._ctx.data.labels = this.props.labels;
        //if (this._ctx.data.datasets && this._ctx.data.datasets.length > 0) this._ctx.data.datasets[0].data = this.props.values;
        this._ctx.update();
    }

    render() {
        return <canvas id={this.props.id}></canvas>;
    }
}