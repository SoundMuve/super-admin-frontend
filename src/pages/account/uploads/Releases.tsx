import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import SearchIcon from '@mui/icons-material/Search';

import colors from '@/constants/kolors';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import ReleaseViewCard from '@/components/account/ReleaseViewCard';
import { useGetReleases } from '@/hooks/releases/useGetReleases';


export default function Releases() {
    const {
        // apiResponse, // setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        releases, getReleases,
        searchReleases
    } = useGetReleases();

    const [searchword, setSearchword] = useState('');

    useEffect(() => {
        getReleases(1, limitNo)
    }, []);
    

    return (
        <Box>
            <Stack mt={5} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Box>
                    <Select
                        id="sortReleases"
                        defaultValue="Sort"
                        size='small'
                        sx={{
                            color: colors.milk,
                            borderRadius: "6px",
                            bgcolor: colors.primary,
                            border: "none",
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primary,
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
                                fill: colors.milk,
                            }
                        }}

                        onChange={(event) => {
                            const value: any = event.target.value;
                            console.log(value);

                            getReleases(1, limitNo, value);
                        }}
                    >
                        <MenuItem value="Sort" disabled>
                            Sort
                        </MenuItem>
                        <MenuItem value="single">
                            Singles
                        </MenuItem>
                        <MenuItem value="album">
                            Album
                        </MenuItem>
                    </Select>
                </Box>

                <Box width={{xs: "50%", sm: "40%", md: "30%", lg: "220px"}}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='searchRelease'
                        type='text'
                        label=''
                        inputMode='text'
                        // defaultValue=""
                        size='small'
                        placeholder='Search for a release'
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
                                    searchReleases(searchword, 1, 100);
                                }}
                                sx={{ 
                                    color: colors.milk, 
                                    bgcolor: colors.tertiary, 
                                    ":hover": {
                                        bgcolor: colors.primary
                                    }
                                }}
                            >
                                <SearchIcon />
                            </IconButton>,
                        }}
                    />
                </Box>
            </Stack>

            <Box p={2} my={2} borderRadius="8px" bgcolor="#fff">
                <Grid container spacing="20px">
                    {
                        isSubmitting ? <LoadingDataComponent />
                        : releases.length ?
                            releases.map((release, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3}  key={index}>
                                    <ReleaseViewCard 
                                        release={release}  
                                    />
                                </Grid>
                            ))
                        : <EmptyListComponent notFoundText="No release available" />
                    }
                </Grid>

                <Stack mt={5} spacing={3}
                    direction="row" alignItems="center" 
                    justifyContent="space-between"
                >
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>Showing</Typography>
                            <select name="paginationItemPerPage" id="paginationItemPerPage" 
                                // defaultValue={limitNo}
                                value={limitNo}
                                style={{
                                    paddingRight: "5px",
                                    paddingLeft: "5px",
                                    borderRadius: "4px",
                                    backgroundColor: colors.bodyBg
                                }}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    console.log(value);

                                    setLimitNo(value)
                                    getReleases(1, value);
                                }}
                            >
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={500}>500</option>
                            </select>
                            <Typography>out of { totalRecords }</Typography>
                        </Stack>
                    </Box>

                    <Box>
                        <Pagination count={totalPages} shape="rounded" 
                            page={currentPageNo}
                            onChange={(_e, value) => {
                                getReleases(value, limitNo)
                            }}
                        />
                    </Box>
                </Stack>
            </Box>

        </Box>
    )
}
