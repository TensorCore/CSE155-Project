import { useTheme } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createContainer, VictoryZoomContainer, VictoryScatter, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryVoronoiContainer, VictoryBar, Bar, Background } from 'victory-native';
import { DataContext } from '../data/dataContext';

export default function TimeGraph(props) {

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    const { setting } = useContext(DataContext);

    const { data } = useContext(DataContext);

    const [goal, setGoal] = useState(10);

    const { colors } = useTheme();

    const getColors = () => {
        return (colors.primary === 'azure' ?
            // { good: '#AFA', mid: '#FC5', bad: "#FAA" } :
            // { good: '#5A5', mid: '#A72', bad: "#A55" });
            { good: '#5CF', bad: '#777' } :
            { good: '#27A', bad: '#999' });
    }

    const getColor = (val) => {
        let pcnt = val / goal;
        // if (pcnt <= 1 / 3) {
        //     return dataColors.bad;
        // } else if (pcnt <= 2 / 3) {
        //     return dataColors.mid;
        // } else {
        //     return dataColors.good;
        // }
        if (pcnt < 1) {
            return dataColors.bad;
        } else {
            return dataColors.good;
        }
    }

    const [dataColors, setColors] = useState(getColors());

    const getMonthDay = (date) => {
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
        if (!(typeof setting[0][props.name + 'Goal'] === 'undefined')) {
            setGoal(setting[0][props.name + 'Goal']);
        }
    }, [colors])

    return (
        <View style={{ backgroundColor: colors.card, elevation: 1 }}>
            <Text style={{
                paddingLeft: 10,
                paddingTop: 10,
                fontSize: 15,
                fontWeight: 'bold'
            }}>All Time</Text>
            <VictoryChart
                // Voronoi container makes tap jump to closest component
                containerComponent={<VictoryZoomVoronoiContainer
                    // Tooltip will show date:\n data
                    labels={({ datum }) =>
                        `${getMonthDay(data[datum._x - 1].timestamp)}:\n${datum._y}`}
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
                        // Set text style
                        style={{ fill: colors.text }}
                        // Set flyout style
                        // Currently has issues with far left one and the axis label
                        flyoutStyle={{ fill: colors.card, opacity: 0.5 }}
                    />}
                    // Set styling of graph
                    style={{
                        // Fill data points with colors based on value
                        data: {
                            fill: ({ datum }) => getColor(datum._y)
                        }
                    }}
                />
                <VictoryAxis
                    // fixLabelOverlap={true}
                    // tickLabelComponent={<VictoryLabel angle={-20}/>} 
                    tickCount={2} />
                <VictoryAxis dependentAxis />
            </VictoryChart>
        </View>
    );
}