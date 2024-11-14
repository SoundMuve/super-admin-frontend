import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
// import EmptyListComponent from '@/components/EmptyList';
import ModalWrapper from '@/components/ModalWrapper';
import LoadingDataComponent from '@/components/LoadingData';
import SongPreviewComponent from '@/components/SongPreview';
// import artWorkSample from "@/assets/images/artWorkSample.png";
import sampleArtWork from "@/assets/images/sampleArtWork.png"
import colors from '@/constants/kolors';
import { useGetReleases } from '@/hooks/releases/useGetReleases';
import { 
    artistInterface, songArtists_CreativesInterface 
} from '@/typeInterfaces/release.interface';
import { useReleaseStore } from '@/state/releaseStore';
import { 
    numberOfLinesTypographyStyle, paymentTextFieldStyle, submitBtnStyle 
} from '@/util/mui';
import { getQueryParams, getStatusColor } from '@/util/resources';
import { copyToClipboard, downloadFile } from '@/util/copyNshare';


let selectedStatus: any = '';

export default function ReleasesDetails() {
    const navigate = useNavigate();

    const {
        apiResponse, // setApiResponse,

        isSubmitting,
        getReleaseById,

        handleSubmitLiveStatus
    } = useGetReleases();

    const releaseDetails = useReleaseStore((state) => state.releaseDetails);
    const songDetails = useReleaseStore((state) => state.songDetails);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    const [openLiveModal, setOpenLiveModal] = useState(false);
    const [linktreeUrl, setLinktreeUrl] = useState('');

    useEffect(() => {
        if (!releaseDetails._id) {
            const release_id = getQueryParams('release_id');
            if (release_id) {
                // get the release from the server
                getReleaseById(release_id);
            } else{
                navigate("/admin");
            }
        }
    }, [isSubmitting]);
    

    return (
        <Box>
            {
                isSubmitting ? <LoadingDataComponent />
                : 
                <Box p={2} my={2} borderRadius="8px" bgcolor="#fff">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Typography variant='h2'
                                title="Click to copy" onClick={() => copyToClipboard(releaseDetails.title)}
                                sx={{
                                    color: colors.dark,
                                    fontSize: {xs: "20px", md: "40px"},
                                    fontWeight: "500",
                                    lineHeight: "40px",
                                    letterSpacing: "-0.444px",
                                    // cursor: "context-menu"
                                }}      
                            >{ releaseDetails.title }</Typography>
                            {/* >{ releaseDetails.title } - { releaseDetails.mainArtist.spotifyProfile.name }</Typography> */}
                        </Box>

                        <Box>
                            <Typography variant='body1'
                                sx={{
                                    color: "#B3B3B3",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "10.645px",
                                    letterSpacing: "-0.444px",
                                    mb: 1
                                }}  
                            >Status</Typography>

                            <Select
                                id="releaseStatus"
                                // defaultValue={releaseDetails.status}
                                value={releaseDetails.status}
                                size='small'
                                sx={{
                                    color: getStatusColor(releaseDetails.status, 'text'),
                                    borderRadius: "6px",
                                    bgcolor: getStatusColor(releaseDetails.status, "bg"),
                                    border: "none",
                                    '.MuiOutlinedInput-notchedOutline': {
                                        // borderColor: colors.primary,
                                        border: "none",
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        // borderColor: 'rgba(228, 219, 233, 0.25)',
                                        border: "none",
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        // borderColor: 'var(--TextField-brandBorderHoverColor)',
                                        border: "none",
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: colors.milk,
                                    }
                                }}

                                onChange={(event) => {
                                    const value: any = event.target.value;
                                    selectedStatus = value;
                                    // console.log(value);

                                    if (value == "Live") {
                                        // open a modal asking for the link tree link
                                        setOpenLiveModal(true);
                                    } else {
                                        handleSubmitLiveStatus(value, releaseDetails._id)
                                    }
                                }}
                            >
                                <MenuItem value="Status" disabled>
                                    Status
                                </MenuItem>
                                <MenuItem value="Incomplete" disabled>
                                    Incomplete
                                </MenuItem>
                                <MenuItem value="Unpaid" disabled>
                                    Unpaid
                                </MenuItem>
                                <MenuItem value="Processing">
                                    Processing
                                </MenuItem>
                                <MenuItem value="Complete" disabled>
                                    Complete
                                </MenuItem>
                                <MenuItem value="Live">
                                    Live
                                </MenuItem>
                                <MenuItem value="Failed">
                                    Failed
                                </MenuItem>
                            </Select>
                        </Box>
                    </Stack>

                    <Stack direction="row" flexWrap="wrap" gap={3} mt={3}>
                        <Box>
                            <Box
                                sx={{
                                    position: "relative",
                                    // borderRadius: '12px',
                                    // overflow: "hidden"
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "28px",
                                        height: "28px",
                                        bgcolor: colors.bg, // "#D9D9D980",
                                        position: "absolute",
                                        right: 7,
                                        top: 7,
                                        borderRadius: "5px",
                                        border: `1.5px solid ${colors.secondary}`
                                    }}
                                >
                                    <IconButton size='small' title='Click to download'
                                        onClick={() => downloadFile(releaseDetails.coverArt || sampleArtWork, `${releaseDetails.title} - ${releaseDetails.mainArtist.spotifyProfile.name}`)}
                                    >
                                        <DownloadIcon sx={{ color: colors.dark, fontSize: "18px" }} />
                                    </IconButton>
                                </Box>

                                <img src={ releaseDetails.coverArt || sampleArtWork}
                                    alt={`cover art work for ${ releaseDetails.title }`}
                                    style={{
                                        width: "100%",
                                        minWidth: "100px",
                                        maxWidth: "170px",
                                        borderRadius: '12px',
                                        // height: "100%",
                                        backgroundColor: colors.bg,
                                        objectFit: "contain"
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Box mb={2}>
                                <Typography sx={{ color: "#7B7979" }}
                                    title="Click to copy" onClick={() => copyToClipboard(releaseDetails._id)}
                                >
                                    <b style={{color: colors.dark }}>Id: </b>
                                    { releaseDetails._id }
                                </Typography>
                            </Box>

                            <Stack direction="row" gap={3} flexWrap="wrap">
                                <Box>
                                    <Typography variant='body1'
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "16.36px",
                                            lineHeight: "13.09px",
                                            letterSpacing: "-0.09px",
                                            // mb: "5px"
                                        }}
                                    >Main Artist <Typography variant='subtitle2' component="small"
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "9.82px",
                                            lineHeight: "13.09px",
                                            letterSpacing: "-0.09px",
                                        }}
                                    >(Spotify profile)</Typography> </Typography>

                                    <Box my={2}>
                                        <MainArtistComponent value={releaseDetails.mainArtist.spotifyProfile} />
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant='body1'
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "16.36px",
                                            lineHeight: "13.09px",
                                            letterSpacing: "-0.09px",
                                            // mb: "5px"
                                        }}
                                    >Main Artist <Typography variant='subtitle2' component="small"
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "9.82px",
                                            lineHeight: "13.09px",
                                            letterSpacing: "-0.09px",
                                        }}
                                    >(Apple Music profile)</Typography> </Typography>

                                    <Stack direction="row" alignItems="center"
                                        sx={{
                                            bgcolor: "#F3F2F2",
                                            borderRadius: "5px",
                                            p: "10px",
                                            my: 2,
                                            maxWidth: "200px"
                                        }}
                                    >
                                        <Typography variant='body2'
                                            title="Click to copy" 
                                            onClick={() => copyToClipboard(releaseDetails.mainArtist.appleMusicProfile)}
                                            sx={{
                                                ...numberOfLinesTypographyStyle(1),
                                                color: "#000",
                                                fontSize: "16px",
                                                fontWeight: "400",
                                                // lineHeight: "15.711px",
                                                letterSpacing: "-0.463px",
                                            }}  
                                        >{ releaseDetails.mainArtist.appleMusicProfile }</Typography>

                                        <IconButton size='small' 
                                            onClick={() => copyToClipboard(releaseDetails.mainArtist.appleMusicProfile)}
                                        >
                                            <ContentCopyIcon sx={{ fontSize: "14px" }} />
                                        </IconButton>
                                    </Stack>
                                </Box>

                                { releaseDetails.liveUrl ? (
                                    <Box>
                                        <Typography variant='body1'
                                            sx={{
                                                fontWeight: "700",
                                                fontSize: "16.36px",
                                                lineHeight: "13.09px",
                                                letterSpacing: "-0.09px",
                                                // mb: "5px"
                                            }}
                                        >Live Links </Typography>

                                        <Stack direction="row" alignItems="center"
                                            sx={{
                                                bgcolor: "#F3F2F2",
                                                borderRadius: "5px",
                                                p: "10px",
                                                my: 2,
                                                maxWidth: "200px"
                                            }}
                                        >
                                            <Typography variant='body2'
                                                title="Click to copy" 
                                                onClick={() => copyToClipboard(releaseDetails.liveUrl || '')}
                                                sx={{
                                                    ...numberOfLinesTypographyStyle(1),
                                                    color: "#000",
                                                    fontSize: "16px",
                                                    fontWeight: "400",
                                                    // lineHeight: "15.711px",
                                                    letterSpacing: "-0.463px",
                                                }}  
                                            >{ releaseDetails.liveUrl }</Typography>

                                            <IconButton size='small' 
                                                onClick={() => copyToClipboard(releaseDetails.liveUrl || '')}
                                            >
                                                <ContentCopyIcon sx={{ fontSize: "14px" }} />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                ) : <></>}

                            </Stack>
                        </Box>
                    </Stack>

                    <Box mt={3}>
                        <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="space-around">
                            <ReleaseData1Component title='Language' value={releaseDetails.language} />
                            <ReleaseData1Component title='Primary Genre' value={ releaseDetails.primaryGenre } />
                            <ReleaseData1Component title='Secondary Genre' value={ releaseDetails.secondaryGenre } />
                            <ReleaseData1Component title='Release Date' value={ releaseDetails.releaseDate } />
                            <ReleaseData1Component 
                                title='Release time(spotify)' 
                                value={ 
                                    releaseDetails.spotifyReleaseTime.hours 
                                    + ":" + 
                                    releaseDetails.spotifyReleaseTime.minutes 
                                    + " " +
                                    releaseDetails.spotifyReleaseTime.am_pm
                                } 
                            />

                            <ReleaseData1Component 
                                title='Release timezone(spotify)' 
                                value={ releaseDetails.spotifyReleaseTimezone } 
                            />
                        </Stack>
                    </Box>


                    <Box my={3}>
                        <Typography variant='h2'
                            sx={{
                                color: colors.secondary,
                                fontSize: "16px",
                                fontWeight: "500",
                                lineHeight: "10.645px",
                                letterSpacing: "-0.444px",
                                my: 2
                            }}      
                        >Advanced Distribution</Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gridColumnGap: "10px",
                                gridRowGap: "10px",
                            }}      
                        >

                        </Box>

                        <Stack direction="row" flexWrap="wrap" gap={3}>
                            <ReleaseData2Component title='Label Name' value={releaseDetails.labelName} />
                            <ReleaseData2Component title='Recording Location' value={ releaseDetails.recordingLocation } />
                            <ReleaseData2Component title='UPC/EAN Code' value={ releaseDetails.upc_ean } />
                            <ReleaseData2Component title='Sold Worldwide' value={ releaseDetails.soldCountries.worldwide } />
                            {/* <ReleaseData2Component title='Sold Countries' value={ releaseDetails.soldCountries.countries.toString() } /> */}
                            <ReleaseData3Component title='Sold Countries' value={ releaseDetails.soldCountries.countries } />
                            {/* <ReleaseData2Component title='Stores' value={ releaseDetails.stores.includes("All") ? "All" : releaseDetails.stores.toString() } /> */}
                            <ReleaseData3Component title='Stores' value={ releaseDetails.stores } />
                            {/* <ReleaseData2Component title='Social Platforms' value={ releaseDetails.socialPlatforms.includes("All") ? "All" : releaseDetails.socialPlatforms.toString() } /> */}
                            <ReleaseData3Component title='Social Platforms' value={ releaseDetails.socialPlatforms } />
                        </Stack>
                    </Box>

                    <Box p={2} borderRadius="8px" bgcolor={colors.bodyBg}>
                        <Stack direction="row" gap={3} flexWrap="wrap">
                            <Box>
                                { releaseDetails.releaseType == "single" ? (
                                    <SongViewComponent 
                                        artWork={releaseDetails.coverArt}
                                        artist={ releaseDetails.mainArtist.spotifyProfile.name }
                                        songAudio={ releaseDetails.singleSong?.songAudio }
                                        title={ releaseDetails.title }
                                        active_id={ songDetails._id || '' }
                                        song_id={ releaseDetails.singleSong?._id || '' }
                                    />
                                ) : (
                                    releaseDetails.albumSongs?.map((item, index) => (
                                        <Box key={index} mb={2}
                                            onClick={() => _setSongDetails(item) }
                                        >
                                            <SongViewComponent 
                                                artWork={releaseDetails.coverArt}
                                                artist={ releaseDetails.mainArtist.spotifyProfile.name }
                                                songAudio={ item.songAudio }
                                                title={ item.songTitle }
                                                active_id={ songDetails._id }
                                                song_id={ item._id }
                                            />
                                        </Box>
                                    ))
                                ) }
                            </Box>

                            <Box
                                sx={{
                                    borderRadius: "8.65px",
                                    border: "1px solid #C8C8C8",
                                    flexGrow: 1,
                                    p: 2
                                }}      
                            >
                                <Box>
                                    <ReleaseSongDataComponent title='Id' value={ songDetails._id || '' } />

                                    <ReleaseSongAudioComponent title='Song Audio' 
                                        value={ songDetails.songAudio}
                                        songTitle={ songDetails.songTitle }
                                        artistName={ releaseDetails.mainArtist.spotifyProfile.name }
                                    />

                                    <ReleaseSongDataComponent title='Song Title' value={ songDetails.songTitle } />

                                    <ReleaseSongWritersComponent title='Song Writers' value={ songDetails.songWriters } />

                                    {/* <ReleaseSongDataComponent title='Song Artists & Creatives' value='234567fghj' /> */}
                                    <ReleaseSongCreativesComponent title='Song Artists & Creatives' value={ songDetails.songArtists_Creatives } />

                                    <Box bgcolor="#fff" borderRadius="8.65px" p={1} mb={3}>
                                        <Typography variant='body1'
                                            sx={{
                                                color: colors.primary,
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                // lineHeight: "12.645px",
                                                // letterSpacing: "-0.444px"
                                                px: { md: "10px"}
                                            }}
                                        >Copyright Ownership</Typography>

                                        <ReleaseSongDataComponent title='Cover version of another song' value={ songDetails.copyrightOwnership.coverVersion } />
                                        { songDetails.copyrightOwnership.permissions && 
                                            <ReleaseSongDataComponent title='Permissions' value={ songDetails.copyrightOwnership.permissions } />
                                        }
                                    </Box>

                                    <ReleaseSongDataComponent title='Explicit Lyrics' value={ songDetails.explicitLyrics } />
                                    <ReleaseSongDataComponent title='ISRC Number' value={ songDetails.isrcNumber } />
                                    <ReleaseSongDataComponent title='TikTok Clip Start Time' 
                                        value={ songDetails.tikTokClipStartTime?.minutes + ":" + songDetails.tikTokClipStartTime?.seconds } 
                                    />

                                    <ReleaseSongDataComponent title='Lyrics Language' value={ songDetails.lyricsLanguage } />

                                    <LyricsComponent 
                                        title='Lyrics' 
                                        value={ songDetails.lyrics || '' }
                                    />
                                    
                                </Box>

                            </Box>
                        </Stack>
                    </Box>
                </Box>
            }

            <ModalWrapper 
                closeModal={() => setOpenLiveModal(false) } 
                openModal={openLiveModal} 
            >
                <Box>
                    <Stack direction="row" spacing="20px" alignItems="center" mb={2}>
                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: "15.38px",
                            lineHeight: "38.44px",
                            letterSpacing: "-0.12px",
                            textAlign: "left"
                        }}> Status: </Typography>

                        <Box 
                            sx={{
                                p: 1,
                                borderRadius: 1,
                                // borderRadius: "6px",
                                color: getStatusColor(selectedStatus || releaseDetails.status, 'text'),
                                bgcolor: getStatusColor(selectedStatus || releaseDetails.status, "bg"),
                            }}
                        >
                            <Typography variant='body1'
                            >{ selectedStatus }</Typography>
                        </Box>
                    </Stack>

                    <Box>
                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: "15.38px",
                            lineHeight: "38.44px",
                            letterSpacing: "-0.12px",
                            textAlign: "left"
                        }}> Linktree Url </Typography>

                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            id='linktreeUrl'
                            type='text'
                            inputMode='text'
                            // defaultValue=""
                            value={linktreeUrl}
                            sx={paymentTextFieldStyle}
                            onChange={(e) => {
                                const value = e.target.value;
                                setLinktreeUrl(value);
                            }}
                        />
                    </Box>


                    {
                        apiResponse.display && (
                            <Stack sx={{ width: '100%', my: 2 }}>
                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                            </Stack>
                        )
                    }
                    
                    <Box 
                        sx={{ 
                            my: 5,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button variant="contained" 
                            fullWidth type="button"
                            onClick={() => handleSubmitLiveStatus(
                                selectedStatus, releaseDetails._id, linktreeUrl,
                                setOpenLiveModal(false) 
                            )} 
                            disabled={ !linktreeUrl.length } 
                            sx={{
                                ...submitBtnStyle,
                            }}
                        > Submit </Button>
                    </Box>

                </Box>
            </ModalWrapper>
        </Box>
    )
}



interface _Props {
    title: string,
    value: string,
}

const ReleaseData1Component: React.FC<_Props> = ({ title, value }) => {
    return (
        <Box>
            <Typography variant='subtitle2'
                sx={{
                    color: "#7B7979",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "10.645px",
                }}
            >{ title }</Typography>

            <Box 
                sx={{
                    bgcolor: colors.primary,
                    color: colors.dark,
                    textAlign: "center",
                    mt: "12px",
                    borderRadius: "5px",
                    padding: "10px"
                }}
            >
                <Typography 
                    title="Click to copy" onClick={() => copyToClipboard(value)}

                    sx={{
                        color: colors.milk,
                        fontSize: "13px",
                        fontWeight: "500",
                        lineHeight: "10.645px"
                    }}
                >{ value }</Typography>
            </Box>
        </Box>
    );
}

const ReleaseData2Component: React.FC<_Props> = ({ title, value }) => {
    
    return (
        <Box sx={{ flex: "1 0 21%" }}>
            <Stack direction="column" width="fit-content">
                <Typography variant='body1'
                    sx={{
                        color: colors.dark,
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "13.645px",
                        letterSpacing: "-0.444px"
                    }}
                >{ title }</Typography>

                <Box 
                    sx={{
                        bgcolor: colors.bodyBg,
                        color: colors.dark,
                        textAlign: "center",
                        mt: "12px",
                        borderRadius: "5px",
                        padding: "10px"
                    }}
                >
                    <Typography title="Click to copy" onClick={() => copyToClipboard(value)}
                        sx={{
                            color: colors.dark,
                            fontSize: "13px",
                            fontWeight: "400",
                            lineHeight: "10.645px",
                            // cursor: "context-menu"
                        }}
                    >{ value }</Typography>
                </Box>
            </Stack>
        </Box>
    );
}

const ReleaseData3Component = (
    { title, value }: { title: string, value: string[] }
) => {
    
    return (
        <Box sx={{ flex: "1 0 30%" }}>
            <Stack direction="column" width="fit-content">
                <Typography variant='body1'
                    sx={{
                        color: colors.dark,
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "13.645px",
                        letterSpacing: "-0.444px"
                    }}
                >{ title }</Typography>

                <Box 
                    sx={{
                        bgcolor: colors.bodyBg,
                        color: colors.dark,
                        textAlign: "center",
                        mt: "12px",
                        borderRadius: "5px",
                        width: "100%",
                        // maxWidth: "30%",
                        // padding: "10px",
                    }}
                >
                    {
                        value.includes("All") ? 
                            <Box p="10px">
                                <Typography 
                                    title="Click to copy" 
                                    onClick={() => copyToClipboard(value.toString())}
                                    sx={{
                                        color: colors.dark,
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        lineHeight: "10.645px"
                                    }}
                                >All</Typography>
                            </Box>
                        : <Stack direction="row" alignItems="center" flexWrap="wrap" p="5px" >
                            {
                                value.map((item, index) => (
                                    <Box key={index} p="5px">
                                        <Chip label={ item } size='small' clickable
                                            title="Click to copy" onClick={() => copyToClipboard(item)}
                                        />
                                    </Box>
                                ))
                            }
                        </Stack>
                    }

                </Box>
            </Stack>
        </Box>
    );
}

const ReleaseSongDataComponent: React.FC<_Props> = ({ title, value }) => {
    return (
        <Grid container spacing={"5px"} mb={3}>
            <Grid item xs={12} sm={6} md={4} lg={3} alignSelf='center'>
                <Box px={{ md: "10px" }}>
                    <Typography variant='body1'
                        sx={{
                            color: colors.dark,
                            fontSize: "16px",
                            fontWeight: "600",
                            // lineHeight: "12.645px",
                            // letterSpacing: "-0.444px"
                        }}
                    >{ title }</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={8} lg={9} alignSelf="center" >
                <Box 
                    sx={{
                        bgcolor: "#fff",
                        color: colors.dark,
                        // textAlign: "center",
                        // mt: "12px",
                        borderRadius: "5px",
                        padding: "10px",
                        // height: "100%"
                    }}
                >
                    <Typography 
                        title="Click to copy" onClick={() => copyToClipboard(value)}
                        sx={{
                            color: colors.dark,
                            fontSize: "13px",
                            fontWeight: "400",
                            lineHeight: "10.645px"
                        }}
                    >{ value }</Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

const ReleaseSongAudioComponent = (
    { title, value, songTitle, artistName }: {title: string, value: string, songTitle: string, artistName: string}
) => {

    return (
        <Grid container spacing={"5px"} mb={3}>
            <Grid item xs={12} sm={6} md={4} lg={3} alignSelf='flex-start'>
                <Box px={"10px"}>
                    <Typography variant='body1'
                        sx={{
                            color: colors.dark,
                            fontSize: "16px",
                            fontWeight: "600",
                            // lineHeight: "12.645px",
                            // letterSpacing: "-0.444px"
                        }}
                    >{ title }</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={8} lg={9} alignSelf="flex-start" >
                <Box>
                    <SongPreviewComponent
                        songTitle='Audio'
                        songAudio={value}
                        artistName={artistName}
                        title={songTitle}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

const ReleaseSongWritersComponent = (
    { title, value }: {title: string, value: string[]}
) => {
    const valueView = (valueItem: string) => (
        <Box 
            sx={{
                bgcolor: "#fff",
                color: colors.dark,
                // textAlign: "center",
                // mt: "12px",
                borderRadius: "5px",
                padding: "10px",
                // height: "100%"
            }}
        >
            <Typography 
                title="Click to copy" onClick={() => copyToClipboard(valueItem)}
                sx={{
                    color: colors.dark,
                    fontSize: "13px",
                    fontWeight: "400",
                    lineHeight: "10.645px"
                }}
            >{ valueItem }</Typography>
        </Box>
    );

    return (
        <Grid container spacing={"5px"} mb={1}>
            <Grid item xs={12} sm={6} md={4} lg={3} alignSelf='flex-start'>
                <Box px={"10px"}>
                    <Typography variant='body1'
                        sx={{
                            color: colors.dark,
                            fontSize: "16px",
                            fontWeight: "600",
                            // lineHeight: "12.645px",
                            // letterSpacing: "-0.444px"
                        }}
                    >{ title }</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={8} lg={9} alignSelf="flex-start" >
                <Box>
                    {
                        value.map((item, index) => (
                            <Box key={index} mb={1}>{ valueView(item) }</Box>
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    );
}

const ReleaseSongCreativesComponent = (
    { title, value }: {title: string, value: songArtists_CreativesInterface[]}
) => {
    const valueView = (role: string, roleValue: string) => (
        <Box 
            sx={{
                bgcolor: "#fff",
                color: colors.dark,
                // textAlign: "center",
                // mt: "12px",
                borderRadius: "5px",
                padding: "10px",
                // height: "100%"
            }}
        >
            <Typography 
                sx={{
                    color: colors.dark,
                    fontSize: "13px",
                    fontWeight: "400",
                    lineHeight: "10.645px"
                }}
            ><span style={{ color: colors.primary }}
                title="Click to copy" onClick={() => copyToClipboard(role)}
            >{ role }</span> - <span
                title="Click to copy" onClick={() => copyToClipboard(roleValue)}
            >{ roleValue }</span></Typography>
        </Box>
    );

    return (
        <Grid container spacing={"5px"} mb={1}>
            <Grid item xs={12} sm={6} md={4} lg={3} alignSelf='flex-start'>
                <Box px={"10px"}>
                    <Typography variant='body1'
                        sx={{
                            color: colors.dark,
                            fontSize: "16px",
                            fontWeight: "600",
                            // lineHeight: "12.645px",
                            // letterSpacing: "-0.444px"
                        }}
                    >{ title }</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={8} lg={9} alignSelf="flex-start" >
                <Box>
                    {
                        value.map((item, index) => (
                            item.artist && (item.role == "Main artist" || item.role == "Featured") ? (
                                <Box key={index} bgcolor={"#fff"} p={1} borderRadius={2} mb={1}>
                                    <Typography variant='body2'
                                        title="Click to copy" onClick={() => copyToClipboard(item.role)}
                                        sx={{ mb: 1, color: colors.primary }}
                                    >{ item.role }</Typography>

                                    <MainArtistComponent value={item.artist} />
                                </Box>
                            ) : (
                                <Box key={index}>
                                    { valueView(item.role, item.name) }
                                </Box>
                            )
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    );
}

const MainArtistComponent = (
    { value }: {value: artistInterface}
) => {

    return (
        <Box 
            sx={{
                // height: {xs: "82px", md: "82.92px"}, 
                borderRadius: "8.65px",
                // border: "0.07px solid #FFFFFF",

                // bgcolor: "#6449868F",
                bgcolor: colors.secondary,
                color: colors.dark,
                py: {xs: "6.02px",md: "6.5px"},
                px: "7.2px",
                maxWidth: "350px",
                // maxWidth: {xs: "337px", md: "100%"},

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8.65px",
                // my: 2
            }}
        >
            <Box
                sx={{
                    width: "70.67px",
                    height: "69.94px",
                    borderRadius: "5.77px",
                    overflow: "hidden"
                }}
            >
                <img 
                    src={ value.profilePicture || sampleArtWork } alt="cover art work"
                    style={{ width: "100%", backgroundColor: colors.bg, objectFit: "contain" }}
                />
            </Box>

            <Box>
                <Typography
                    title="Click to copy" onClick={() => copyToClipboard(value.name)}
                    sx={{
                        ...numberOfLinesTypographyStyle(1),
                        fontWeight: "700",
                        fontSize: "16.36px",
                        // lineHeight: "13.09px",
                        letterSpacing: "-0.09px",
                        mb: "5px"
                    }}
                >{ value.name }</Typography>

                <Typography
                    title="Click to copy" onClick={() => copyToClipboard(value.id)}
                    sx={{
                        ...numberOfLinesTypographyStyle(1),
                        fontWeight: "400",
                        fontSize: "9.82px",
                        // lineHeight: "13.09px",
                        letterSpacing: "-0.09px",
                        mb: "10px"
                    }}
                >Id: { value.id } </Typography>

                <Typography
                    sx={{
                        ...numberOfLinesTypographyStyle(1),
                        fontWeight: "400",
                        fontSize: "9.82px",
                        // lineHeight: "13.09px",
                        letterSpacing: "-0.09px"
                    }}
                >Latest Album: { value.latestAlbum?.name || '' } </Typography>
            </Box>
        </Box>
    );
}

const SongViewComponent = (
    { artWork, title, artist, songAudio, active_id, song_id } : 
    { artWork: string, title: string, artist: string, songAudio: string, active_id: string, song_id: string }
) => {

    return (
        
        <Box 
            sx={{
                borderRadius: "8.65px",
                bgcolor: song_id == active_id ? colors.primary : "#fff", // colors.secondary,
                color: song_id == active_id ? colors.milk : colors.dark,
                py: {xs: "6.02px",md: "6.5px"},
                px: "7px",
                width: "100%",
                minWidth: "200px",
                maxWidth: "300px",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "7px",
                // mb: 2
            }}
        >
            <Box>
                <img 
                    src={ artWork || sampleArtWork } alt="cover art work"
                    style={{ 
                        width: "100%", 
                        minWidth: "100px",
                        maxWidth: "100px",
                        // height: "70px",
                        borderRadius: "5px",
                        backgroundColor: colors.bg,
                        objectFit: "contain" 
                    }}
                />
            </Box>

            <Box>
                <Typography variant='body2'
                    sx={{
                        ...numberOfLinesTypographyStyle(1),
                        fontWeight: "700",
                        fontSize: "16.36px",
                        // lineHeight: "13.09px",
                        letterSpacing: "-0.09px",
                        // mb: "5px"
                    }}
                >{ title }</Typography>

                <Typography
                    sx={{
                        ...numberOfLinesTypographyStyle(1),
                        fontWeight: "400",
                        fontSize: "9.82px",
                        // lineHeight: "13.09px",
                        letterSpacing: "-0.09px"
                    }}
                >{ artist }</Typography>
            </Box>

            <Box>
                <IconButton size='small' title='Click to download'
                    onClick={() => downloadFile(songAudio, `${title} - ${artist}`)}
                >
                    <DownloadIcon sx={{ 
                        fontSize: "18px",  
                        color: song_id == active_id ? colors.tertiary : colors.dark,
                    }} />
                </IconButton>
            </Box>
        </Box>
    );
}


const LyricsComponent: React.FC<_Props> = ({ title, value }) => {

    return (
        <Grid container spacing={"5px"} mb={1}>
            <Grid item xs={12} alignSelf='flex-start'>
                <Box px={"10px"}>
                    <Typography variant='body1'
                        sx={{
                            color: colors.dark,
                            fontSize: "16px",
                            fontWeight: "600",
                            // lineHeight: "12.645px",
                            // letterSpacing: "-0.444px"
                        }}
                    >{ title }</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} alignSelf="flex-start" >
                <Box>
                    <Box bgcolor="#fff" p={1} borderRadius={2} minHeight="100px">
                        <Box sx={{ float: "right", display: value ? "initial" : "none" }}>
                            <IconButton size='small' 
                                title="Click to copy" onClick={() => copyToClipboard(value)}
                                sx={{ bgcolor: colors.bg }}
                            >
                                <ContentCopyIcon sx={{ fontSize: "16px" }} />
                            </IconButton>
                        </Box>
                        
                        <Typography variant='body2'
                            sx={{
                                textAlign: "justify",
                            }}
                        >{ value }</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}