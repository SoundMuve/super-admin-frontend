import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import colors from '@/constants/kolors';

import { numberOfLinesTypographyStyle } from '@/util/mui';
import sampleArtWork from '@/assets/images/sampleArtWork.png';
// import faqVideoThumbnail from "@/assets/images/faqVideoThumbnail.png";
import { releaseInterface } from '@/typeInterfaces/release.interface';
import ReleaseStatusComponent from './ReleaseStatus';
import { useReleaseStore } from '@/state/releaseStore';
import { createSearchParams, useNavigate } from 'react-router-dom';


interface _Props {
    release: releaseInterface,
};

const ReleaseViewCard: React.FC<_Props> = ({
    release
}) => {
    const navigate = useNavigate();

    const _setReleaseDetails = useReleaseStore((state) => state._setReleaseDetails);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    const handleClick = () => {
        _setReleaseDetails(release);

        if (release.songs.length) _setSongDetails(release.songs[0]);

        const params = {
            release_id: release._id || '',
        };
        navigate({
            pathname: "/admin/uploads/details",
            search: `?${createSearchParams(params)}`,
        });
        
    }


    return (
        <Box onClick={() => handleClick()}
            sx={{
                width: "100%",
                maxWidth: "250px",
                // height: "100%",
                // maxHeight: "280px",
                borderRadius: "8px",
                bgcolor: colors.bodyBg,
                overflow: "hidden",
                cursor: "pointer"
            }}
        >
            <Box bgcolor={colors.primary} maxHeight="250px">
                <img 
                    src={release.coverArt || sampleArtWork}
                    alt={`${release.title} cover art work`}
                    style={{
                        width: "100%",
                        // height: "100%",
                        objectFit: "contain",
                        backgroundColor: "grey"
                    }}
                />
            </Box>

            <Box p={1} bgcolor={colors.primary}>
                <Typography variant='body1'
                    sx={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: colors.milk,
                        ...numberOfLinesTypographyStyle(1)
                    }}
                >{ release.title }</Typography>
            </Box>

            <Box px={1} py={1}>
                <Typography variant='body2'
                    sx={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: colors.dark,
                        ...numberOfLinesTypographyStyle(1)
                    }}                        
                >{ release.mainArtist.spotifyProfile.name }</Typography>
            </Box>

            <Box p={1}>
                <ReleaseStatusComponent status={release.status} />
            </Box>

        </Box>
    );
}

export default ReleaseViewCard;