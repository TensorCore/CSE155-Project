import { useTheme } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { VictoryScatter, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryVoronoiContainer, VictoryBar } from 'victory-native';
import { DataContext } from '../data/dataContext';

export default function TimeGraph(props) {
    const { data } = useContext(DataContext);

    const { colors } = useTheme();

    const getColors = () => {
        return (colors.primary === 'azure' ?
            { above: '#AFA', below: "#FAA" } :
            { above: '#5A5', below: "#A55" });
    }

    const [dataColors, setColors] = useState(getColors());

    useEffect(() => {
        setColors(getColors());
    }, [colors])

    return (
        <VictoryChart
            // Voronoi container makes tap jump to closest component
            containerComponent={<VictoryVoronoiContainer
                // Look for closest in x direction
                voronoiDimension="x" />}
            // Pad left and right of x axis so bars don't overlap with y-axis
            domainPadding={{ x: 20 }}>
            <VictoryBar
                data={data}
                x="timestamp"
                y={props.name}
                // Tooltip appears when user hovers
                labelComponent={<VictoryTooltip
                    // Not quite sure if this actually does something here
                    // Can't hurt thoough, right?
                    constrainToVisibleArea
                    // To remove warnings
                    renderInPortal={false}
                    // Doesn't seem to do anything?
                    angle={-45}
                    // Set text style
                    style={{ fill: colors.text }}
                    // Set flyout style
                    // Currently has issues with far left one and the axis label
                    flyoutStyle={{ fill: colors.card, opacity: 0.5 }} />}
                // Tooltip will show date:\n data
                labels={({ datum }) =>
                    `${data[datum._x - 1].timestamp}:\n${datum._y}`}
                // Set styling of graph
                style={{
                    // Fill data points with colors based on value
                    data: {
                        fill: ({ datum }) => datum._y >= props.goal ?
                            dataColors.above : dataColors.below
                    }
                }} />
            <VictoryAxis
                // fixLabelOverlap={true}
                // tickLabelComponent={<VictoryLabel angle={-20}/>} 
                tickCount={2} />
            <VictoryAxis dependentAxis />
        </VictoryChart>
    );
}