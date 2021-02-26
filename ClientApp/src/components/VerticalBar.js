import React, { Component }  from 'react'
import { Bar } from 'react-chartjs-2'

const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
}

export class VerticalBar extends Component {
    
    renderGraphic() {
        return {
            labels: this.props.dataset.map((data,index) => `user-${index+1}`),
            datasets: [
              {
                label: 'Users lifetime',
                data: this.props.dataset,
                backgroundColor: this.props.dataset.map( (data,index) => {
                    const r = Math.floor(Math.random() * 255) + 0;
                    const g = Math.floor(Math.random() * data) + index;
                    const b = Math.floor(Math.random() * 255) + 0;
                    return `rgba(${r}, ${g}, ${b}, 0.2)`
                }),
                borderWidth: 1,
              },
            ],
        }
    }
    
    render() {
      return (
        <>
            <Bar data={this.renderGraphic()} options={options} />
        </>
      );
    }
  }
