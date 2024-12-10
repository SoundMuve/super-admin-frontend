import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SearchIcon from '@mui/icons-material/Search';

import kolors from '@/constants/kolors';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { useUsersHook } from '@/hooks/users/useUsersHook';
import { displayCreatedAtDate } from '@/util/dateTime';
import { currencyDisplay, formatedNumber } from '@/util/resources';
import { numberOfLinesTypographyStyle } from '@/util/mui';
import { useGeneralStore } from '@/state/generalStore';


export default function Users() {
    const navigate = useNavigate();
    const _setSelectedUserDetails = useGeneralStore((state) => state._setSelectedUserDetails);

    const {
        // apiResponse, // setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        // totalPages,

        isSubmitting,

        users, 
        getUsers,
        searchUsers,

        topReleases,
        topUserBalances,
        getUsersTopStats

    } = useUsersHook();

    const [searchword, setSearchword] = useState('');
    const [userType, setUserType] = useState<"All" | "artist" | "record label">('All');

    useEffect(() => {
        // getUsers(1, limitNo, userType);
        getUsersTopStats();
    }, []);

    useEffect(() => {
        if (searchword == "") {
            getUsers(1, limitNo, userType);
        }
    }, [searchword]);


    return (
        <Box my={5}>
            <Stack my={5} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Box>
                    <Select
                        defaultValue="Sort"
                        size='small'
                        sx={{
                            color: kolors.milk,
                            borderRadius: "6px",
                            bgcolor: kolors.primary,
                            border: "none",
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: kolors.primary,
                                border: "none",
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                border: "none",
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--TextField-brandBorderHoverColor)',
                                border: "none",
                            },
                            '.MuiSvgIcon-root ': {
                                fill: kolors.milk,
                            }
                        }}

                        onChange={(event) => {
                            const value: any = event.target.value;
                            setUserType(value);

                            getUsers(1, limitNo, value);
                        }}
                    >
                        <MenuItem value="Sort" disabled>
                            Sort
                        </MenuItem>

                        <MenuItem value="All">
                            All Users
                        </MenuItem>

                        <MenuItem value="artist">
                            Artist
                        </MenuItem>

                        <MenuItem value="record label">
                            Record Label
                        </MenuItem>
                    </Select>
                </Box>

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
                    topUserBalances ? 
                    <Box>
                        <Typography variant='subtitle2'
                            sx={{
                                color: "#000",
                                fontSize: "14px",
                                fontWeight: "500",
                                // lineHeight: "11.101px",
                                letterSpacing: "-0.463px"
                            }}
                        >Users with highest revenue</Typography>

                        <Stack mb={3} direction="row" gap={2} 
                            alignItems="center" justifyContent="space-between"
                            flexWrap="wrap"
                        >
                            {
                                topUserBalances.map((topUsers, index) => (
                                    <Box p={1.0} key={index}
                                        sx={{
                                            // width: "240px",
                                            maxWidth: "240px",
                                            height: "70px",
                                            borderRadius: "10px",
                                            background: "linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)",
                                            flexGrow: 1
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#FFF",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                                // lineHeight: "11.101px",
                                                letterSpacing: "-0.463px"
                                            }}
                                        >{topUsers.artistName || topUsers.recordLabelName || topUsers.firstName}</Typography>

                                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"
                                            marginTop="auto" height="100%"
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "5px",
                                                    bgcolor: "#fff",
                                                    p: 0.5,
                                                    borderRadius: "15px"
                                                }}
                                            >
                                                <Box 
                                                    sx={{
                                                        p: "0.5px",
                                                        display: "flex",
                                                        border: "1px solid #000",
                                                        borderRadius: "100%"
                                                    }}
                                                >
                                                    <MusicNoteIcon sx={{ fontSize: "10px" }} />
                                                </Box>

                                                <Typography
                                                    sx={{
                                                        color: "#000",
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px"
                                                    }}
                                                >{ formatedNumber(Number(topUsers.releaseCount)) }</Typography>
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    bgcolor: "#C9F6D0",
                                                    color: "#0AA623",
                                                    p: '5px',
                                                    borderRadius: "15px",
                                                    lineHeight: "11.101px",

                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ currencyDisplay(Number(topUsers.balance)) }</Typography>
                                        </Stack>
                                    </Box>
                                ))
                            }
                        </Stack>
                    </Box>
                    : <></>
                }

                {
                    topReleases ? 
                    <Box my={3}>
                        <Typography variant='subtitle2'
                            sx={{
                                color: "#000",
                                fontSize: "14px",
                                fontWeight: "500",
                                // lineHeight: "11.101px",
                                letterSpacing: "-0.463px"
                            }}
                        >Users with highest number of releases</Typography>

                        <Stack mb={3} direction="row" gap={2} 
                            alignItems="center" justifyContent="space-between"
                            flexWrap="wrap"
                        >
                            {
                                topReleases.map((release, index) => (
                                    <Box p={1.0} key={index}
                                        sx={{
                                            // width: "240px",
                                            maxWidth: "240px",
                                            height: "70px",
                                            borderRadius: "10px",
                                            flexGrow: 1,
                                            // background: `linear-gradient(180deg, #D68100 0%, #FFB01F 49%, #D68100 100%)`
                                            background: `linear-gradient(180deg, ${kolors.tertiary} 0%, ${kolors.bg} 49%, ${kolors.tertiary} 100%)`
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#FFF",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                                // lineHeight: "11.101px",
                                                letterSpacing: "-0.463px"
                                            }}
                                        >{ release.artistName || release.recordLabelName || release.firstName }</Typography>


                                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"
                                            marginTop="auto" height="100%"
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "5px",
                                                    bgcolor: "#fff",
                                                    p: 0.5,
                                                    borderRadius: "15px"
                                                }}
                                            >
                                                <Box 
                                                    sx={{
                                                        p: "0.5px",
                                                        display: "flex",
                                                        border: "1px solid #000",
                                                        borderRadius: "100%"
                                                    }}
                                                >
                                                    <MusicNoteIcon sx={{ fontSize: "10px" }} />
                                                </Box>

                                                <Typography
                                                    sx={{
                                                        color: "#000",
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px"
                                                    }}
                                                >{formatedNumber(Number(release.releaseCount))}</Typography>
                                            </Box>

                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    bgcolor: "#C9F6D0",
                                                    color: "#0AA623",
                                                    p: '5px',
                                                    borderRadius: "15px",
                                                    lineHeight: "11.101px",

                                                    ...numberOfLinesTypographyStyle(1)
                                                }}
                                            >{ currencyDisplay(Number(release.balance)) }</Typography>
                                        </Stack>
                                    </Box>
                                ))
                            }
                        </Stack>
                    </Box>
                    : <></>
                }



                {
                    isSubmitting ? <LoadingDataComponent />
                    : users.length ?
                        <Box>
                            <TableContainer>
                                <Table aria-label="coupon table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Name</TableCell>
                                            {/* <TableCell>Number of releases</TableCell> */}
                                            <TableCell>Account Type</TableCell>
                                            <TableCell>Artist/Record Label Name</TableCell>
                                            <TableCell>Email Address</TableCell>
                                            <TableCell>Phone Number</TableCell>
                                            <TableCell>Balance</TableCell>
                                            <TableCell>Sign up date</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        { users.map((userData, index) => (
                                            <TableRow
                                                key={userData._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                                                onClick={() => {
                                                    _setSelectedUserDetails(userData);
                                                    // setViewPromotionModal(true);
                                                    navigate(`/admin/users/${userData._id}`)
                                                }}
                                            >
                                                <TableCell component="th" scope="row"
                                                >{ (limitNo * (currentPageNo - 1)) + (index + 1) }.</TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            lineHeight: "20px"
                                                        }}
                                                    >{ userData.firstName + " " + userData.lastName }</Typography>
                                                </TableCell>

                                                {/* <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            lineHeight: "20px"
                                                        }}
                                                    >{ userData.recordLabelName || '' }</Typography>
                                                    { userData!.numberOfProject }
                                                </TableCell> */}

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                            textTransform: "capitalize"
                                                        }}
                                                    >{userData.userType}</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{userData.artistName || userData.recordLabelName}</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{userData.email}</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{userData.phoneNumber}</Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "#667085",
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            // lineHeight: "20px",
                                                        }}
                                                    >{ currencyDisplay(Number(userData.balance))}</Typography>
                                                </TableCell>

                                                <TableCell
                                                    sx={{
                                                        color: "#667085",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        lineHeight: "20px"
                                                    }}
                                                >{ displayCreatedAtDate(userData.createdAt) }</TableCell>

                                            </TableRow>
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
                                    getUsers(newPage, limitNo, userType);
                                }}
                                onRowsPerPageChange={(e) => {
                                    const value = e.target.value;
                                    console.log(value);
            
                                    setLimitNo(Number(value));
                                    getUsers(1, limitNo, userType);
                                }}
                            />
                        </Box>
                    : <Box my={3}> <EmptyListComponent notFoundText="No coupon discount application available" /> </Box>
                }
            </Box>
        </Box>
    )
}
