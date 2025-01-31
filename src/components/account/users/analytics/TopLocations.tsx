import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import kolors from '@/constants/kolors';


interface locationIntercae {
    name: string,
    percentage: number,
}

interface _Props {
    // children: React.ReactNode,
    darkTheme?: boolean,
    title: string,
    locations: locationIntercae[]
}

const TopLocationsComponent: React.FC<_Props> = ({
    title, locations
}) => {

    return (
        <Box
            sx={{
                border: `1.08px solid ${kolors.dark}`,
                borderRadius: "10.8px",
                p: "15px"
            }}
        >
            <Typography
                sx={{
                    fontWeight: "700",
                    fontSize: {xs: '', md: '11.38px'},
                    lineHeight: {xs: '', md: "12.97px"},
                    letterSpacing: {xs: '', md: '0.36px'},
                    // mb: 1
                }}
            >{ title }</Typography>


            {
                locations.map((item, index) => (
                    <Box my={2} key={index}>
                        <Typography
                            sx={{
                                fontWeight: '300',
                                fontSize: '10px',
                                lineHeight: "6.48px",
                                letterSpacing: '0.36px',
                                mb: 0.7
                            }}
                        >{ item.name }</Typography>

                        <Stack direction="row" alignItems="center" spacing={1} >
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress variant="determinate" value={item.percentage}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                            backgroundColor: kolors.secondary,
                                        },
                                        [`& .${linearProgressClasses.bar}`]: {
                                            borderRadius: 5,
                                            backgroundColor: kolors.primary
                                        },
                                    }}
                                />
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "10px",
                                    lineHeight: "6.48px",
                                    letterSpacing: "0.36px",
                                }}
                            >{ `${item.percentage}%` }</Typography>
                        </Stack>
                    </Box>
                ))
            }

        </Box>

    )
}

export default TopLocationsComponent