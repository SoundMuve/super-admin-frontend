import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import kolors from '@/constants/kolors';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

interface _Props {
    headerTitle: string[],
};

const SRAT_TableHead: React.FC<_Props> = ({
    headerTitle, 
}) => {

    return (
        <TableHead>
            <TableRow 
                sx={{ 
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: `1px solid ${kolors.dark}`,
                    }
                }}
            >
                {headerTitle.map((title, index) => (
                    <TableCell
                        key={index}
                        align={"center"} 
                        // style={{ top: 57, minWidth: column.minWidth }}
                        sx={{ bgcolor: kolors.secondary }}
                    >
                        <Box 
                            sx={{
                                p: "10px",
                                borderRadius: "8px",
                                border: "1px solid #797979",
                                color: "#666666",
                                // cursor: "pointer",
                                display: "inline-block"
                            }}
                        >
                            <Typography noWrap variant='body1'
                                sx={{
                                    fontWeight: '400',
                                    fontSize: {xs: "9.07px", md: "18px"},
                                    lineHeight: {xs: "12.1px", md: "24px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                    textAlign: 'center',
                                }}
                            > { title } </Typography>
                        </Box>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default SRAT_TableHead