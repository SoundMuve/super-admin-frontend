import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import kolors from '@/constants/kolors';    
import SRAT_DownloadReportBtn from './SRAT_DownloadBtn';
import { SxProps, Theme } from '@mui/material/styles';
import { currencyDisplay, formatedNumber } from '@/util/resources';
import SRAT_TableHead from './SRAT_TableHead';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { albumAndSinglesAnalyticsInterface } from '@/typeInterfaces/analytics.interface';


interface _Props {
    tBodyContent: albumAndSinglesAnalyticsInterface[] | undefined,
    displayDownloadReport?: boolean,
};

  
const headerTitle = [ "Title", "Singles sold", "Streams", "Revenue" ];

const tableValueStyle: SxProps<Theme> = {
    fontWeight: "400",
    fontSize: {xs: "9.07px", md: "18px"},
    lineHeight: {xs: "12.1px", md: "24px"},
}


const SRAT_SinglesComponent: React.FC<_Props> = ({
    tBodyContent, displayDownloadReport = false
}) => {

    return (
        <Box>
            <Paper 
                sx={{ 
                    width: '100%',
                    border: `1px solid ${kolors.dark}`,
                    borderRadius: "13px",
                    overflow: "hidden",
                    bgcolor: kolors.secondary,
                    color: kolors.dark
                }}
            >
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table" 
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none",
                            }
                        }}
                    >
                        <SRAT_TableHead headerTitle={headerTitle} />

                        {
                            tBodyContent && tBodyContent.length ? (
                                <TableBody>
                                    {tBodyContent
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                
                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: kolors.dark,
                                                    }}
                                                > { row.title } </TableCell>

                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: kolors.dark,
                                                    }}
                                                > { formatedNumber(Number(row.totalNoSold)) } </TableCell>

                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: kolors.dark,
                                                    }}
                                                > { formatedNumber(Number(row.totalStreamPlay)) } </TableCell>
                                                
                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: "#627C1D",
                                                    }}
                                                > { currencyDisplay(Number(row.totalRevenue)) } </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            ) : <></>
                        }
                    </Table>
                </TableContainer>

                {
                    tBodyContent ? (
                        tBodyContent.length ? <></> : 
                        <Box py={5} mx="auto">
                            <EmptyListComponent notFoundText='No data found.' />
                        </Box>
                    ) : <LoadingDataComponent containerHeight='45vh' />
                }


                {
                    displayDownloadReport && <SRAT_DownloadReportBtn />
                }

            </Paper>

        </Box>
    )
}

export default SRAT_SinglesComponent;