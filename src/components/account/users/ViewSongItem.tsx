import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import albumImage from '@/assets/images/sampleArtWork.png';

import ReleaseStatusComponent from '../ReleaseStatus';
import { releaseInterface } from '@/typeInterfaces/release.interface';
import { useReleaseStore } from '@/state/releaseStore';


interface _Props {
    // children: React.ReactNode,
    releaseDetails: releaseInterface, 
    index: number,
    // releaseType: string
}

const ViewSongItemComponent: React.FC<_Props> = ({ releaseDetails }) => {
    const navigate = useNavigate();

    const _setReleaseDetails = useReleaseStore((state) => state._setReleaseDetails);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    const handleClick = () => {
        _setReleaseDetails(releaseDetails);

        if (releaseDetails.songs.length) _setSongDetails(releaseDetails.songs[0]);

        // TODO::::
        // if the status of the song is live, navigate to the analytics page
        // else navigate to the upload details page

        const params = {
            release_id: releaseDetails._id || '',
        };
        navigate({
            pathname: "/admin/uploads/details",
            search: `?${createSearchParams(params)}`,
        });
    }


    return (
        <Box 
            sx={{ 
                width: "100%",
                maxWidth: {xs: "196.38px", md: "345px"},
                mx: "auto",
                bgcolor: "#F0F0F0",
                borderRadius: {xs: "6.85px", md: "12px"},
                // p: 1.5,
                cursor: "pointer"
            }}
            onClick={() => {
                // navigate(`/admin/`);

                handleClick();
            }}
        >
            <Box
                sx={{
                    // width: "100%",
                    // maxWidth: {xs: "196.38px", md: "345px"},
                    height: {xs: "152.99px", md: "268px"},
                    borderRadius: {xs: "6.85px", md: "12px"},
                    bgcolor: "#343434",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box 
                    sx={{
                        // width: {xs: "124.48px", md: "218.06px"},
                        height: {xs: "124.48px", md: "218.06px"}
                    }}
                >
                    <img
                        src={ releaseDetails.coverArt || albumImage } 
                        alt={`${releaseDetails.title} song cover art work`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}
                    />
                </Box>
            </Box>

            <Box px={1.5} pb={0.5}>
                <Typography
                    sx={{
                        fontWeight: "900",
                        fontSize: {xs: "10.85px", md: "19px"},
                        lineHeight: {xs: "13.7px", md: "24px"},
                        letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                        // color: "#fff",
                        // m: {xs: "8px 0 0 0", md: "8px 0 8px 0"}
                        mt: "5px"
                    }}
                > { releaseDetails.title } </Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography
                        sx={{
                            // display: releaseType == "Album" ? "block" : "none",
                            fontWeight: "400",
                            fontSize: {xs: "8.02px", md: "15px"},
                            lineHeight: {xs: "12.83px", md: "24px"},
                            // letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                            color: "#979797",
                            mb: {md: 1},
                            textTransform: "capitalize"
                        }}
                    > { releaseDetails.releaseType } </Typography>

                    <ReleaseStatusComponent status={releaseDetails.status} />
                </Stack>
            </Box>
        </Box>
    )
}

export default ViewSongItemComponent;
