import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import colors from '@/constants/kolors';


interface _Props {
    status: "Incomplete" | "Unpaid" | "Processing" |  "Pre-Saved" | "Live" | "Failed" | string
};

const ReleaseStatusComponent: React.FC<_Props> = ({status = "Pending"}) => {

    const complete = (
        <Box
            sx={{
                bgcolor: "#B4D28A",
                p: {xs: "0px 11.99px", md: "0px 21px"},
                borderRadius: {xs: "15.98px", md: "28px"},
                display: "inline-block"
            }}
        >
            <Typography
                sx={{
                    color: "#33500B",
                    fontSize: {xs: "6.28px", md: "11px"},
                    lineHeight: {xs: "13.7px", md: "24px"},
                    letterSpacing: {xs: "0.06px", md: "0.1px"}
                }}
            > { status } </Typography>
            {/* > { status.toUpperCase() } </Typography> */}
        </Box>
    );

    const incomplete = (
        <Box
            sx={{
                bgcolor: "#D2A95A",
                p: {xs: "0px 11.99px", md: "0px 21px"},
                borderRadius: {xs: "15.98px", md: "28px"},
                display: "inline-block"
            }}
        >
            <Typography
                sx={{
                    color: "#825600",
                    fontSize: {xs: "6.28px", md: "11px"},
                    lineHeight: {xs: "13.7px", md: "24px"},
                    letterSpacing: {xs: "0.06px", md: "0.1px"}
                }}
            > { status } </Typography>
        </Box>
    );

    const failed = (
        <Box
            sx={{
                bgcolor: "#701920",
                p: {xs: "0px 11.99px", md: "0px 21px"},
                borderRadius: {xs: "15.98px", md: "28px"},
                display: "inline-block"
            }}
        >
            <Typography
                sx={{
                    color: "#D2A5A9",
                    fontSize: {xs: "6.28px", md: "11px"},
                    lineHeight: {xs: "13.7px", md: "24px"},
                    letterSpacing: {xs: "0.06px", md: "0.1px"}
                }}
            > { status } </Typography>
        </Box>
    );

    const pending = (
        <Box
            sx={{
                bgcolor: "#825600",
                p: {xs: "0px 11.99px", md: "0px 21px"},
                borderRadius: {xs: "15.98px", md: "28px"},
                display: "inline-block"
            }}
        >
            <Typography
                sx={{
                    color: "#D3AA5A",
                    fontSize: {xs: "6.28px", md: "11px"},
                    lineHeight: {xs: "13.7px", md: "24px"},
                    letterSpacing: {xs: "0.06px", md: "0.1px"}
                }}
            > { status } </Typography>
        </Box>
    );

    const live = (
        <Box
            sx={{
                bgcolor: "#435925",
                p: {xs: "0px 11.99px", md: "0px 21px"},
                borderRadius: {xs: "15.98px", md: "28px"},
                display: "inline-block"
            }}
        >
            <Typography
                sx={{
                    color: "#B6D787",
                    fontSize: {xs: "6.28px", md: "11px"},
                    lineHeight: {xs: "13.7px", md: "24px"},
                    letterSpacing: {xs: "0.06px", md: "0.1px"}
                }}
            > { status } </Typography>
        </Box>
    );

    const processing = (
        <Box
            sx={{
                bgcolor: colors.primary,
                p: {xs: "0px 11.99px", md: "0px 21px"},
                borderRadius: {xs: "15.98px", md: "28px"},
                display: "inline-block"
            }}
        >
            <Typography
                sx={{
                    color: colors.milk,
                    fontSize: {xs: "6.28px", md: "11px"},
                    lineHeight: {xs: "13.7px", md: "24px"},
                    letterSpacing: {xs: "0.06px", md: "0.1px"}
                }}
            > { status } </Typography>
        </Box>
    );

    if (status.toLowerCase() == 'pre-saved') {
        return complete;
    } else if (status.toLowerCase() == 'failed') {
        return failed;
    } else if (status.toLowerCase() == 'incomplete') {
        return incomplete;
    } else if (status.toLowerCase() == 'live') {
        return live;
    } else if (status.toLowerCase() == 'unpaid') {
        return pending;
    } else if (status.toLowerCase() == 'processing') {
        return processing;
    } else {
        return pending;
    }

    // return (
    //     <div>ReleaseStatus</div>
    // )
}

export default ReleaseStatusComponent;