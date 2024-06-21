import React from 'react';
import './StackedBarChart.css';

interface StackedBarChartProps {
    part1Percentage: number;
    part2Percentage: number;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ part1Percentage, part2Percentage }) => {
    return (
        <div className="stacked-bar-container">
            <div className="label-container">
                <div className="label" style={{ width: `${part1Percentage}%` }}>Real</div>
                <div className="label" style={{ width: `${part2Percentage}%` }}>Rumor</div>
            </div>
            <div className="stacked-bar">
                <div className="bar-part part1" style={{ width: `${part1Percentage}%` }}>
                    <span className="percent-label">{part1Percentage}%</span>
                </div>
                <div className="bar-part part2" style={{ width: `${part2Percentage}%` }}>
                    <span className="percent-label">{part2Percentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default StackedBarChart;
