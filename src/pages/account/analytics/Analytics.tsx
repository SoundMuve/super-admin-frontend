import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';


import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from '@mui/icons-material/Search';

import kolors from '@/constants/kolors';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { liveReleasesInterface, useAnalyticsHook } from '@/hooks/analytics/useAnalyticsHook';
import { displayCreatedAtDate } from '@/util/dateTime';
import { useGeneralStore } from '@/state/generalStore';
import { songInterface } from '@/typeInterfaces/release.interface';


export default function Analytics() {
    // const navigate = useNavigate();
    // const _setSelectedAnalyticsDetails = useGeneralStore((state) => state._setSelectedAnalyticsDetails);

    const {
        // apiResponse, // setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        // totalPages,
        _releases,
        getLiveReleases,




        // isSubmitting,

        searchUsers,


    } = useAnalyticsHook();

    const [searchword, setSearchword] = useState('');
    // const [userType, setUserType] = useState<"All" | "artist" | "record label">('All');

    useEffect(() => {
        // getUsers(1, limitNo, userType);
        // getUsersTopStats();
        getLiveReleases(1, limitNo);
    }, []);

    useEffect(() => {
        if (searchword == "") {
            // getUsers(1, limitNo, userType);
        }
    }, [searchword]);


    return (
        <Box my={5}>
            <Stack my={5} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Box></Box>

                <Box width={{xs: "50%", sm: "40%", md: "30%", lg: "220px"}}>
                    <TextField variant="outlined" fullWidth
                        type='text'
                        label=''
                        inputMode='text'
                        // defaultValue=""
                        size='small'
                        placeholder='Search for a user'
                        value={searchword}
                        onChange={(e) => {
                            const value = e.target.value;
                            // console.log(value);
                            setSearchword(value);
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: "#fff",
                                borderRadius: '8px',
                                // height: '42px',

                                '& fieldset': {
                                    border: "none",
                                },
                                '&:hover fieldset': {
                                    border: "none",
                                },
                                '&.Mui-focused fieldset': {
                                    border: "none",
                                },
                            }
                        }}
                        InputProps={{
                            sx: {
                                borderRadius: "16px",
                                maxWidth: {xs: "340px", md: "100%"}
                            },
                            endAdornment: 
                            <IconButton edge="end"
                                onClick={() => {
                                    if (searchword.length > 2) {
                                        searchUsers(searchword, 1, 100);
                                    }
                                }}
                                sx={{ 
                                    color: kolors.milk, 
                                    bgcolor: kolors.tertiary, 
                                    ":hover": {
                                        bgcolor: kolors.primary
                                    }
                                }}
                            >
                                <SearchIcon />
                            </IconButton>,
                        }}
                    />
                </Box>
            </Stack>

            <Box borderRadius="8px" bgcolor="#fff" p={2}>

                {
                    !_releases ? <LoadingDataComponent />
                    : _releases.length ?
                        <Box>
                            <Typography variant='subtitle2'
                                sx={{
                                    color: "#000",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    // lineHeight: "11.101px",
                                    letterSpacing: "-0.463px",
                                    mb: 1
                                }}
                            >Uploaded songs</Typography>


                            <TableContainer>
                                <Table aria-label="Analytics table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Title</TableCell>
                                            <TableCell>Cover art</TableCell>
                                            <TableCell>Main Artist</TableCell>
                                            <TableCell>Release Type</TableCell>
                                            <TableCell>User Artist/Record Label Name</TableCell>
                                            <TableCell>Account Type</TableCell>
                                            {/* <TableCell>Revenue</TableCell> */}
                                            <TableCell>Status</TableCell>
                                            <TableCell>Last Updated</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {_releases.map((data) => (
                                            <ReleaseTableRow liveReleaseData={data} key={data.release._id} />
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
            
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                component="div"
                                count={totalRecords} // totalRecords
                                rowsPerPage={limitNo}
                                page={currentPageNo -1}
                                onPageChange={(_e, page)=> {
                                    // console.log(page);
            
                                    const newPage = page + 1;
                                    getLiveReleases(newPage, limitNo);
                                }}
                                onRowsPerPageChange={(e) => {
                                    const value = e.target.value;
                                    console.log(value);
            
                                    setLimitNo(Number(value));
                                    getLiveReleases(1, limitNo);
                                }}
                            />
                        </Box>
                    : <Box my={3}> <EmptyListComponent notFoundText="No live release yet." /> </Box>
                }

            </Box>
        </Box>
    )
}



const ReleaseTableRow = ({liveReleaseData}: {liveReleaseData: liveReleasesInterface}) => {
    const navigate = useNavigate();
    const _setSelectedAnalyticsDetails = useGeneralStore((state) => state._setSelectedAnalyticsDetails);
    
    const [open, setOpen] = useState(false);

    const handleClick = (songData: songInterface) => {
        _setSelectedAnalyticsDetails(liveReleaseData);

        const params = {
            song_id: songData._id,
        };
        navigate({
            pathname: `/admin/analytics/${liveReleaseData.release._id}`,
            search: `?${createSearchParams(params)}`,
        });
    }



    return (
        <>
            <TableRow
                // key={releaseData.release._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                // onClick={() => {
                //     _setSelectedAnalyticsDetails(releaseData);
                //     navigate(`/admin/analytics/${releaseData.release._id}`)
                // }}
            >
                <TableCell component="th" scope="row">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>


                <TableCell onClick={() => handleClick(liveReleaseData.release.songs[0])}>
                    <Typography
                        sx={{
                            color: "#667085",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "20px"
                        }}
                    >{ liveReleaseData.release.title }</Typography>
                </TableCell>

                <TableCell onClick={() => handleClick(liveReleaseData.release.songs[0])}>
                    <Box sx={{ height: "50px" }}>
                        <img 
                            src={liveReleaseData.release.coverArt}
                            alt={`${liveReleaseData.release.title} art work cover`}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px",
                                objectFit: "contain",
                                // backgroundColor: "grey"
                            }}
                        />
                    </Box>
                    {  }
                </TableCell>

                <TableCell onClick={() => handleClick(liveReleaseData.release.songs[0])}>
                    <Typography
                        sx={{
                            color: "#667085",
                            fontSize: "14px",
                            fontWeight: "500",
                            // lineHeight: "20px",
                            // textTransform: "capitalize"
                        }}
                    >{liveReleaseData.release.mainArtist.spotifyProfile.name || ''}</Typography>
                </TableCell>

                <TableCell onClick={() => handleClick(liveReleaseData.release.songs[0])}>
                    <Typography
                        sx={{
                            color: "#667085",
                            fontSize: "14px",
                            fontWeight: "500",
                            // lineHeight: "20px",
                            textTransform: "capitalize"
                        }}
                    >{ liveReleaseData.release.releaseType }</Typography>
                </TableCell>

                <TableCell onClick={() => handleClick(liveReleaseData.release.songs[0])}>
                    <Typography
                        sx={{
                            color: "#667085",
                            fontSize: "14px",
                            fontWeight: "500",
                            // lineHeight: "20px",
                            // textTransform: "capitalize"
                        }}
                    >{ liveReleaseData.user.artistName || liveReleaseData.user.recordLabelName || ''}</Typography>
                </TableCell>

                <TableCell onClick={() => handleClick(liveReleaseData.release.songs[0])}>
                    <Typography
                        sx={{
                            color: "#667085",
                            fontSize: "14px",
                            fontWeight: "500",
                            // lineHeight: "20px",
                            textTransform: "capitalize"
                        }}
                    >{ liveReleaseData.user.userType }</Typography>
                </TableCell>

                <TableCell onClick={() => handleClick(liveReleaseData.release.songs[0])}>
                    <Typography
                        sx={{
                            color: "#667085",
                            fontSize: "14px",
                            fontWeight: "500",
                            // lineHeight: "20px",
                        }}
                    >{liveReleaseData.release.status}</Typography>
                </TableCell>

                {/* <TableCell>
                    <Typography
                        sx={{
                            color: "#667085",
                            fontSize: "14px",
                            fontWeight: "500",
                            // lineHeight: "20px",
                        }}
                    >{ currencyDisplay(Number(userData.balance))}</Typography>
                </TableCell> */}

                <TableCell onClick={() => handleClick(liveReleaseData.release.songs[0])}
                    sx={{
                        color: "#667085",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "20px"
                    }}
                >{ displayCreatedAtDate(liveReleaseData.lastUpdated || liveReleaseData.release.updatedAt || '') }</TableCell>

            </TableRow>


            <TableRow sx={{ bgcolor: kolors.milk }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Release Songs
                            </Typography>


                            <Table aria-label="Analytics song release table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>ISRC Number</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    { liveReleaseData.release.songs.map((releaseSongsData, index) => (
                                        <TableRow
                                            key={releaseSongsData._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                                            onClick={() => handleClick(releaseSongsData)}
                                        >
                                            <TableCell component="th" scope="row"
                                            >{ index + 1 }.</TableCell>

                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        color: "#667085",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        lineHeight: "20px"
                                                    }}
                                                >{ releaseSongsData.songTitle }</Typography>
                                            </TableCell>


                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        color: "#667085",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        // lineHeight: "20px",
                                                        // textTransform: "capitalize"
                                                    }}
                                                >{ releaseSongsData.isrcNumber }</Typography>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}