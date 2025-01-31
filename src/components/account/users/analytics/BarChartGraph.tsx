import React from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { DatasetType } from '@mui/x-charts/internals';
import kolors from '@/constants/kolors';



// interface datasetInterface {
//     percentageValue: number;
//     month: string;
// }

interface _Props {
    // children: React.ReactNode,
    darkTheme?: boolean,
    dataset: DatasetType,
}


const BarChartGraphComponent: React.FC<_Props> = ({
    dataset
}) => {
    const mdDevice = useMediaQuery('(min-width:900px)');
    const smDevice = useMediaQuery('(min-width:600px)');

    return (
        <Box>
            <BarChart
                dataset={dataset}
                series={[{ dataKey: 'percentageValue', color: kolors.primary }]}

                yAxis={[{disableLine: true, disableTicks: true,  }]}
                xAxis={[
                    { 
                        scaleType: 'band', 
                        dataKey: 'month', 
                        disableLine: true,
                        disableTicks: true,
                    },
                ]}
                sx={{
                    [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
                        // transform: 'translateX(-10px)',
                        display: "none",
                    },

                    [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                        // transform: 'rotateZ(-45deg)',
                        fontWeight: "400",
                        fontSize: {xs: "7.66px !important", sm: "12px !important", md: "20.88px !important"},
                        lineHeight: {xs: "9.27px", md: "25.27px"},
                        fill: kolors.dark,
                    },
                }}

                // loading={true}
                slotProps={{
                    // Custom loading message
                    loadingOverlay: { message: 'Loading data...' },
                    // Custom message for empty chart
                    noDataOverlay: { message: 'No data to display.' },
                }}
                height={ mdDevice ? 400 : smDevice ? 300 : 200 }
                margin={{right: 0, left: 0, top: 0}}
                borderRadius={5}
            />
        </Box>
        
    )
}

export default BarChartGraphComponent