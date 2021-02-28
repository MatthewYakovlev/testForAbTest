import React, { Component }  from 'react'
import Plot from 'react-plotly.js';

export class VerticalBar extends Component {
    
    render() {
      return (
        <Plot
          data={[
            {
              x: this.props.dataset,
              type: 'histogram',
              marker: {color: '#4A9DFF'},
            },
          ]}
          layout={{width: 800, height: 600, title: 'Users Lifetimes'}}
        />
      );
    }
  }
