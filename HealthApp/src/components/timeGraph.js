import { useTheme } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { VictoryScatter, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryVoronoiContainer, VictoryBar } from 'victory-native';
import { DataContext } from '../data/dataContext';

export default function TimeGraph(props) {
    const { data } = useContext(DataContext);

    const { colors } = useTheme();

    const getColors = () => {
        return (colors.primary === 'azure' ?
            { good: '#AFA', mid: '#FC5', bad: "#FAA" } :
            { good: '#5A5', mid: '#A72', bad: "#A55" });
    }

    const getColor = (val) => {
        let pcnt = val / props.goal;
        if (pcnt <= 1 / 3) {
            return dataColors.bad;
        } else if (pcnt <= 2 / 3) {
            return dataColors.mid;
        } else {
            return dataColors.good;
        }
    }

    const [dataColors, setColors] = useState(getColors());

    const getMonthDay = (date) => {
        //console.log(date);
        let month = date.split('-', 3)[1];
        let day = date.split('-', 3)[2];
        switch (month) {
            case '01':
                return 'Jan' + day;
            case '02':
                return 'Feb' + day;
            case '03':
                return 'Mar' + day;
            case '04':
                return 'Apr' + day;
            case '05':
                return 'May' + day;
            case '06':
                return 'Jun' + day;
            case '07':
                return 'Jul' + day;
            case '08':
                return 'Aug' + day;
            case '09':
                return 'Sep' + day;
            case '10':
                return 'Oct' + day;
            case '11':
                return 'Nov' + day;
            case '12':
                return 'Dec' + day;
            default:
                return 'Udf' + day;
        }
    }

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
                    // Can't hurt though, right?
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
                    `${getMonthDay(data[datum._x - 1].timestamp)}:\n${datum._y}`}
                // Set styling of graph
                style={{
                    // Fill data points with colors based on value
                    data: {
                        fill: ({ datum }) => getColor(datum._y)
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