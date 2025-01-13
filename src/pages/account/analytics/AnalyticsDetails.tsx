import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseIcon from '@mui/icons-material/Close';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

// import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { currencyDisplay, formatedNumber, getQueryParams } from '@/util/resources';
import { copyToClipboard } from '@/util/copyNshare';
import { useAnalyticsHook } from '@/hooks/analytics/useAnalyticsHook';
import kolors from '@/constants/kolors';
import { useGeneralStore } from '@/state/generalStore';
import sampleArtWork from '@/assets/images/sampleArtWork.png';
import { useReleaseStore } from '@/state/releaseStore';
import { minReleaseDate } from '@/util/dateTime';
import SongViewComponent from '@/components/account/analytics/SongViewComponent';
import { LocationDataModal } from '@/components/account/analytics/LocationData';
import { restCountries } from '@/util/countries';
import { getCountries } from '@/util/location';
import { locationAnalyticsInterface } from '@/typeInterfaces/analytics.interface';


/*
TODO::::
For a more better UX let the summation on of all the "Analytics from top locations"
not be more than the initial analytics filled in before.
*/



export default function AnalyticsDetails() {
    const navigate = useNavigate();
    const {release_id} = useParams();
    const song_id = getQueryParams("song_id");

    const [openLocationDataModal, setOpenLocationDataModal] = useState(false);
    const [countries, setCountries] = useState(restCountries);
    const [analyticsDate, setAnalyticsDate] = useState('');

    const selectedAnalyticsDetails = useGeneralStore((state) => state.selectedAnalyticsDetails);
    const selectedSong = useReleaseStore((state) => state.songDetails);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    
    const {
        apiResponse, // setApiResponse,

        isSubmitting,

        locationData, setLocationData,
        selectedLocationData, setSelectedLocationData,

        datedAnalyticsData,
        getLiveReleaseById,
        getLiveReleaseByDate,

        errors,
        isValid,
        isSubmittingForm,
        analyticsForm,
        onSubmit,
        register,

    } = useAnalyticsHook();


    useEffect(() => {
        handleGetcountries();

        if (release_id) {
            getLiveReleaseById(release_id, song_id);
        } else {
            const release_id = selectedAnalyticsDetails.release._id;

            if (release_id) {
                getLiveReleaseById(release_id, song_id || selectedSong._id );
            } else {
                navigate("/admin");
            }
        }

    }, []);
    
    useEffect(() => {
        selectedAnalyticsDetails.release.songs.map(item => {
            if (item._id == song_id) _setSongDetails(item);
        });
    }, [selectedAnalyticsDetails.release._id]);

    useEffect(() => {
        if (datedAnalyticsData) {
            analyticsForm.setValue(
                "albumSold", `${datedAnalyticsData.albumSold}`,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            analyticsForm.setValue(
                "noSold", `${datedAnalyticsData.noSold}`,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            analyticsForm.setValue(
                "revenue", `${datedAnalyticsData.revenue}`,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            analyticsForm.setValue(
                "streamPlay", `${datedAnalyticsData.streamPlay}`,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            analyticsForm.setValue(
                "streamRevenue", `${datedAnalyticsData.streamRevenue}`,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            analyticsForm.setValue(
                "location", datedAnalyticsData.location,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );

            // const dfs: any = datedAnalyticsData.location;
            setLocationData(datedAnalyticsData.location);
        } else {
            analyticsForm.reset();
            setLocationData([]);
            setSelectedLocationData(undefined);

            if (analyticsDate) {
                analyticsForm.setValue(
                    "date", analyticsDate,
                    { shouldDirty: true, shouldTouch: true, shouldValidate: true }
                );
            }
        }
    }, [datedAnalyticsData]);

    


    const handleGetcountries = () => {
        const sortedCountries = countries.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        setCountries(sortedCountries);

        getCountries().then((countryRes) => {
            setCountries(countryRes);
        });
    }

    const maxAnalyticsDate = () => {
        const today = new Date(); // Get today's date
        const pastDate = new Date(today); // Create a new date object based on today
        pastDate.setMonth(today.getMonth() - 2); // Subtract 2 months from the current month
    
        // Format the date as YYYY-MM-DD
        const year = pastDate.getFullYear();
        const month = String(pastDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(pastDate.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }


    const getSelectedCountryByName = (countryName: string) => {
        const country = countries.find((value) => value.name.common == countryName);
        return country || null;
    }

    const handleSetLocationData = (locationAnalytics: locationAnalyticsInterface[]) => {
        analyticsForm.clearErrors("location");

        setLocationData(locationAnalytics);
        analyticsForm.setValue(
            "location", locationAnalytics,
            { shouldDirty: true, shouldTouch: true, shouldValidate: true }
        );
    }
    

    return (
        <Box>
            {
                isSubmitting ? <LoadingDataComponent />
                : 
                <Box my={2} borderRadius="8px" bgcolor="#fff">
                    <Box
                        sx={{
                            // width: "786px",
                            height: "89px",
                            borderRadius: "8px",
                            background: "linear-gradient(90deg, #FFFFE6 0%, #D68100 100%)",
                            position: "relative",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#FFF",
                                fontSize: "30px",
                                fontWeight: "900",
                                lineHeight: "89px",
                                letterSpacing: "-0.463px",
                                textAlign: "center",
                                // verticalAlign: "middle",
                            }}
                        >{ selectedAnalyticsDetails.release.title }</Typography>

                        <Avatar variant="rounded"
                            src={ selectedAnalyticsDetails.release.coverArt || sampleArtWork }
                            alt={ selectedAnalyticsDetails.release.title }
                            sx={{ 
                                width: {xs: 56, sm: "68px", md: "82px", lg: "100px"}, 
                                height: {xs: 56, sm: "68px", md: "82px", lg: "100px"},
                                border: "2px solid #F0F0F0",
                                position: "absolute",
                                left: "15px",
                                bottom: "-30px"
                            }}
                        />
                    </Box>


                    <Box p={2} mt="30px">
                        <Stack direction="row" alignItems="center" spacing={2}
                            justifyContent="space-between"    
                        >
                            <Box>
                                <Typography variant='body2'
                                    sx={{
                                        color: kolors.dark,
                                        fontSize: "20px",
                                        fontWeight: "900",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px"
                                    }}
                                >{selectedSong?.songTitle }</Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Main Artist: </b>
                                    <span onClick={() => copyToClipboard(selectedAnalyticsDetails.release.mainArtist.spotifyProfile.name)}> 
                                        { selectedAnalyticsDetails.release.mainArtist.spotifyProfile.name }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                        textTransform: "capitalize"
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Release Type: </b>
                                    <span onClick={() => copyToClipboard(selectedAnalyticsDetails.release.releaseType)}> 
                                        { selectedAnalyticsDetails.release.releaseType }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Id: </b>
                                    <span onClick={() => copyToClipboard(selectedAnalyticsDetails.release._id)}> 
                                        { selectedAnalyticsDetails.release._id }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                >
                                    <b style={{color: kolors.dark}}>Song Id: </b>
                                    <span onClick={() => copyToClipboard(selectedSong?._id || '')}> 
                                        { selectedSong?._id || '' }
                                    </span>
                                </Typography>

                                {
                                    selectedAnalyticsDetails.totalAnalytics ? 
                                        <Box my={2}>
                                            <Typography variant='body2'
                                                sx={{
                                                    color: "#7B7979",
                                                    fontSize: "13px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            > 
                                                <b style={{color: kolors.dark}}>Total Revenue: </b> 
                                                <span style={{ color: kolors.primary }} > 
                                                    { currencyDisplay(Number(selectedAnalyticsDetails.totalAnalytics.revenue || 0)) }
                                                </span>
                                            </Typography>

                                            <Typography variant='body2'
                                                sx={{
                                                    color: "#7B7979",
                                                    fontSize: "13px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            > 
                                                <b style={{color: kolors.dark}}>Total Stream Revenue: </b> 
                                                <span style={{ color: kolors.primary }} >
                                                    { currencyDisplay(Number(selectedAnalyticsDetails.totalAnalytics.streamRevenue || 0)) }
                                                </span>
                                            </Typography>

                                            <Typography variant='body2'
                                                sx={{
                                                    color: "#7B7979",
                                                    fontSize: "13px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            > 
                                                <b style={{color: kolors.dark}}>Total Stream Plays: </b> 
                                                <span style={{ color: kolors.primary }} >
                                                    { formatedNumber(Number(selectedAnalyticsDetails.totalAnalytics.streamPlay || 0)) }
                                                </span>
                                            </Typography>

                                            <Typography variant='body2'
                                                sx={{
                                                    color: "#7B7979",
                                                    fontSize: "13px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            > 
                                                <b style={{color: kolors.dark}}>Total Album Sold: </b> 
                                                <span style={{ color: kolors.primary }} >
                                                    { formatedNumber(Number(selectedAnalyticsDetails.totalAnalytics.albumSold || 0)) }
                                                </span>
                                            </Typography>

                                            <Typography variant='body2'
                                                sx={{
                                                    color: "#7B7979",
                                                    fontSize: "13px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            > 
                                                <b style={{color: kolors.dark}}>Total Song Sold: </b> 
                                                <span style={{ color: kolors.primary }} >
                                                    { formatedNumber(Number(selectedAnalyticsDetails.totalAnalytics.noSold || 0)) }
                                                </span>
                                            </Typography>
                                        </Box>
                                    : <></>
                                }
                            </Box>

                            <Box>
                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>FullName: </b>
                                    <span onClick={() => copyToClipboard(selectedAnalyticsDetails.user.firstName + ' ' + selectedAnalyticsDetails.user.lastName)}> 
                                        { selectedAnalyticsDetails.user.firstName + ' ' + selectedAnalyticsDetails.user.lastName }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Account Type: </b> 
                                    <span 
                                        onClick={() => copyToClipboard(selectedAnalyticsDetails.user.userType)}
                                        style={{ textTransform: "capitalize" }}
                                    > { selectedAnalyticsDetails.user.userType } </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Artist/Record Label Name: </b>
                                    <span onClick={() => copyToClipboard(selectedAnalyticsDetails.user.artistName || selectedAnalyticsDetails.user.recordLabelName || '')}> 
                                        { selectedAnalyticsDetails.user.artistName || selectedAnalyticsDetails.user.recordLabelName || '' }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Email: </b>
                                    <span onClick={() => copyToClipboard(selectedAnalyticsDetails.user.email)}> 
                                        { selectedAnalyticsDetails.user.email }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Phone number: </b> 
                                    <span onClick={() => copyToClipboard(selectedAnalyticsDetails.user.phoneNumber)}>
                                        { selectedAnalyticsDetails.user.phoneNumber }
                                    </span>
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        color: "#7B7979",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                    }}
                                > 
                                    <b style={{color: kolors.dark}}>Balance: </b> 
                                    <span onClick={() => copyToClipboard( currencyDisplay(Number(selectedAnalyticsDetails.user.balance)) )}
                                        style={{ color: "#0AA623" }}
                                    >
                                        { currencyDisplay(Number(selectedAnalyticsDetails.user.balance)) }
                                    </span>
                                </Typography>

                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={2}
                                        my={2} // justifyContent="space-between" 
                                    >
                                        {
                                            selectedAnalyticsDetails.release.releaseType  == "single" ? <></> : 
                                            <Box
                                                sx={{
                                                    p: "10px",
                                                    borderRadius: "6px",
                                                    // background: kolors.primary,
                                                    border: "1px solid #000",

                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "5px",
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
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                    }}
                                                >{ formatedNumber(Number(selectedAnalyticsDetails.release.songs.length)) }</Typography>

                                            </Box>
                                        }

                                        {/* <Box
                                            sx={{
                                                p: "10px",
                                                borderRadius: "6px",
                                                background: kolors.primary
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#FFF",
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            >Set/Edit Analytics</Typography>
                                        </Box> */}

                                    </Stack>
                                </Box>

                            </Box>
                        </Stack>

                        <Box my={3}>

                            <Grid container spacing="20px">
                                <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
                                    <Box>
                                        {
                                            selectedAnalyticsDetails.release.songs.map((item, index) => (
                                                <Box key={index} mb={2}
                                                    onClick={() => {
                                                        // console.log(item);
                                                        _setSongDetails(item);

                                                        // const release_id = selectedAnalyticsDetails.release._id;
                                                        getLiveReleaseById(release_id || selectedAnalyticsDetails.release._id, item._id);
                                                    }}
                                                >
                                                    <SongViewComponent 
                                                        artWork={selectedAnalyticsDetails.release.coverArt}
                                                        artist={ selectedAnalyticsDetails.release.mainArtist.spotifyProfile.name }
                                                        title={ item.songTitle }
                                                        active_id={ selectedSong._id }
                                                        song_id={ item._id }
                                                    />
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={8} md={8} lg={9} xl={10}>
                                    <Box 
                                        sx={{ 
                                            bgcolor: kolors.bodyBg, 
                                            borderRadius: "15px",
                                            p: "15px"
                                        }}
                                    >
                                        <form noValidate onSubmit={ onSubmit } >
                                            <Box>
                                                <Typography variant='subtitle1'
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                        my: 1
                                                    }}
                                                >Analytics for</Typography>

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={[
                                                        'DatePicker',
                                                        'MobileDatePicker',
                                                        'DesktopDatePicker',
                                                        'StaticDatePicker',
                                                    ]}>
                                                        <MobileDatePicker 
                                                            label={'"Month" and "Year"'} 
                                                            views={['month', 'year']}

                                                            // value={ selectReleaseDateValue ? dayjs(selectReleaseDateValue) : null }
                                                            minDate={dayjs(minReleaseDate(selectedAnalyticsDetails.release.createdAt))}
                                                            maxDate={dayjs(maxAnalyticsDate())}

                                                            // onChange={(newValue) => {
                                                                // const value = dayjs(newValue).format('MM/YYYY');
                                                                // console.log(value);

                                                                // const value = dayjs(newValue).format('DD/MM/YYYY');
                                                                // setValue("releaseDate", value, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                                // setSelectReleaseDateValue(value);
                                                            // }}

                                                            onAccept={(newValue) => {
                                                                // const value = dayjs(newValue).format('MM/YYYY');
                                                                // const value = dayjs(newValue).format('YYYY/MM/DD');
                                                                const value = dayjs(newValue).format('YYYY-MM') + "-01";
                                                                console.log(value);

                                                                // console.log(value);
                                                                setAnalyticsDate(value);

                                                                analyticsForm.setValue(
                                                                    "date", value,
                                                                    { shouldDirty: true, shouldTouch: true, shouldValidate: true }
                                                                );
                                                                getLiveReleaseByDate(release_id || '', selectedSong._id || song_id, value);
                                                            }}

                                                            sx={{
                                                                width: "100%",
                                                                borderColor: kolors.primary,

                                                                // ".MuiSvgIcon-root": {
                                                                //     color: `${kolors.milk} !important`,
                                                                // },   

                                                                // "& .MuiInputBase-input": {
                                                                //     color: kolors.milk,
                                                                //     borderColor: kolors.primary
                                                                // },

                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': {
                                                                        borderColor: kolors.primary,
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: kolors.primary,
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: kolors.primary,
                                                                    },
                                                                },

                                                            }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </Box>


                                            <Box 
                                                sx={{ 
                                                    mb: 2,
                                                    display: selectedAnalyticsDetails.release.releaseType == "single" ? "none" : "initial"
                                                }}
                                            >
                                                <Typography variant='subtitle1'
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                        my: 1
                                                    }}
                                                >No. of Album's sold</Typography>

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    placeholder=''
                                                    // autoFocus
                                                    defaultValue="0"
                                                    size='small'
                                                    sx={{
                                                        // ...newsletterMuiTextFieldStyle
                                                    }}
                                                    error={ errors.albumSold ? true : false }
                                                    { ...register('albumSold') }
                                                />
                                                { errors.albumSold && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.albumSold?.message }</Box> }
                                            </Box>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant='subtitle1'
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                        my: 1
                                                    }}
                                                >No. of songs sold</Typography>

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    placeholder=''
                                                    // autoFocus
                                                    defaultValue=""
                                                    size='small'
                                                    sx={{
                                                        // ...newsletterMuiTextFieldStyle
                                                    }}
                                                    error={ errors.noSold ? true : false }
                                                    { ...register('noSold') }
                                                />
                                                { errors.noSold && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.noSold?.message }</Box> }
                                            </Box>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant='subtitle1'
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                        my: 1
                                                    }}
                                                >Revenue Generated</Typography>

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    placeholder=''
                                                    // autoFocus
                                                    defaultValue=""
                                                    size='small'

                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}
                                                    
                                                    sx={{
                                                        // ...newsletterMuiTextFieldStyle
                                                    }}
                                                    error={ errors.revenue ? true : false }
                                                    { ...register('revenue') }
                                                />
                                                { errors.revenue && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.revenue?.message }</Box> }
                                            </Box>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant='subtitle1'
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                        my: 1
                                                    }}
                                                >Revenue From Streams</Typography>

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    placeholder=''
                                                    // autoFocus
                                                    defaultValue=""
                                                    size='small'

                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}

                                                    sx={{
                                                        // ...newsletterMuiTextFieldStyle
                                                    }}
                                                    error={ errors.streamRevenue ? true : false }
                                                    { ...register('streamRevenue') }
                                                />
                                                { errors.streamRevenue && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.streamRevenue?.message }</Box> }
                                            </Box>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant='subtitle1'
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                        my: 1
                                                    }}
                                                >Stream Plays</Typography>

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    placeholder=''
                                                    // autoFocus
                                                    defaultValue=""
                                                    size='small'
                                                    sx={{
                                                        // ...newsletterMuiTextFieldStyle
                                                    }}
                                                    error={ errors.streamPlay ? true : false }
                                                    { ...register('streamPlay') }
                                                />
                                                { errors.streamPlay && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.streamPlay?.message }</Box> }
                                            </Box>


                                            <Typography variant='subtitle1'
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "20px",
                                                    fontWeight: "900",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                    my: 2
                                                }}
                                            >Analytics from top locations</Typography>

                                            <Stack direction="row" spacing="20px" alignItems="center" my={2}>
                                                {
                                                    locationData.map((value, index) => (
                                                        <Box key={index} mb={2} sx={{ position: "relative" }}>
                                                            <Box
                                                                onClick={() => {
                                                                    setSelectedLocationData(value);
                                                                    setOpenLocationDataModal(true);
                                                                }}
                                                                sx={{
                                                                    // activeLocationData
                                                                    bgcolor: "#fff",
                                                                    borderRadius: 1,
                                                                    px: 1.5, py: 1,
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                <Stack direction="row" spacing="5px" alignItems='center'>
                                                                    <Typography variant='subtitle1'
                                                                        sx={{
                                                                            color: kolors.dark,
                                                                            fontSize: "14px",
                                                                            fontWeight: "600",
                                                                            // lineHeight: "11.101px",
                                                                            letterSpacing: "-0.463px",
                                                                        }}
                                                                    >Country: </Typography>

                                                                    <Box
                                                                        sx={{ 
                                                                            display: 'flex',
                                                                            flexDirection: "row",
                                                                            alignItems: "center",
                                                                            // p: 0,
                                                                            // bgcolor: 'green'
                                                                            // '& > img': { mr: 2, flexShrink: 0 }
                                                                        }}
                                                                    >
                                                                        <img src={getSelectedCountryByName(value.country)?.flags.png} 
                                                                            alt={getSelectedCountryByName(value.country)?.flags.alt}
                                                                            loading="lazy"
                                                                            style={{
                                                                                maxWidth: "20px",
                                                                                marginRight: "5px",
                                                                            }}
                                                                        />

                                                                        <Typography variant='subtitle1'
                                                                            sx={{
                                                                                color: kolors.dark,
                                                                                fontSize: "16px",
                                                                                fontWeight: "500",
                                                                                // lineHeight: "11.101px",
                                                                                letterSpacing: "-0.463px",
                                                                            }}
                                                                        > {value.country}</Typography>
                                                                    </Box>
                                                                </Stack>

                                                                <Stack direction="row" spacing="5px" alignItems='center'>
                                                                    <Typography variant='subtitle1'
                                                                        sx={{
                                                                            color: kolors.dark,
                                                                            fontSize: "14px",
                                                                            fontWeight: "600",
                                                                            // lineHeight: "11.101px",
                                                                            letterSpacing: "-0.463px",
                                                                            my: 1
                                                                        }}
                                                                    >Revenue: </Typography>

                                                                    <Typography variant='subtitle1'
                                                                        sx={{
                                                                            color: kolors.dark,
                                                                            fontSize: "16px",
                                                                            fontWeight: "500",
                                                                            // lineHeight: "11.101px",
                                                                            letterSpacing: "-0.463px",
                                                                            my: 1
                                                                        }}
                                                                    > { currencyDisplay(Number(value.revenue)) }</Typography>
                                                                </Stack>
                                                            </Box>

                                                            <IconButton size='small' 
                                                                onClick={() => {
                                                                    const newLocationData = locationData.filter(data => data.country != value.country);
                                                                    handleSetLocationData(newLocationData);
                                                                }}
                                                                sx={{ 
                                                                    position: "absolute", 
                                                                    top: "-7px", right: "-7px",
                                                                    color: kolors.tertiary,
                                                                    bgcolor: "#ccc",
                                                                    p: "2px"
                                                                }}
                                                            >
                                                                <CloseIcon sx={{ fontSize: "14px", color: "red" }} />
                                                            </IconButton>
                                                        </Box>
                                                    ))
                                                }
                                            </Stack>


                                            <Box onClick={() => {setSelectedLocationData(undefined); setOpenLocationDataModal(true)}}
                                                sx={{
                                                    borderRadius: "5px",
                                                    border: "1px solid #c4c4c4",
                                                    p: 1.5,

                                                    "&:hover": {
                                                        borderColor: "#000",
                                                    },
                                                    "&:active": {
                                                        borderColor: "#000",
                                                    },
                                                    "&:focus": {
                                                        borderColor: "#000",
                                                    },
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                        // my: 1,
                                                        textAlign: "center"
                                                    }}
                                                >Add a country analytics</Typography>
                                            </Box>

                                            { errors.location && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.location?.message }</Box> }

                                            {
                                                apiResponse.display && (
                                                    <Stack sx={{ width: '100%', my: 4 }}>
                                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                                    </Stack>
                                                )
                                            }

                                            <Button variant="contained" 
                                                fullWidth type="submit" 
                                                disabled={ !isValid || isSubmittingForm } 
                                                // size='small'
                                                sx={{ 
                                                    bgcolor: kolors.milk,
                                                    color: kolors.primary,
                                                    // width: "fit-content",

                                                    // "&.Mui-disabled": {
                                                    //     background: "#c4c4c4",
                                                    //     color: "#797979"
                                                    // },
                                                    "&:hover": {
                                                        bgcolor: kolors.primary,
                                                        color: kolors.milk,
                                                    },
                                                    "&:active": {
                                                        bgcolor: kolors.primary,
                                                        color: kolors.milk,
                                                    },
                                                    "&:focus": {
                                                        bgcolor: kolors.primary,
                                                        color: kolors.milk,
                                                    },
                                                    borderRadius: "12px",
                                                    my: 2, 
                                                    // py: 1.5
                                                    textTransform: "none"
                                                }}
                                            >
                                                <span style={{ display: isSubmittingForm ? "none" : "initial" }}>Submit</span>

                                                <CircularProgress size={25} sx={{ display: isSubmittingForm ? "initial" : "none", color: kolors.primary, fontWeight: "bold" }} />
                                            </Button>
                                        </form>
                                    </Box>
                                </Grid>
                            </Grid>

                        </Box>

                    </Box>

                </Box>
            }
            

            <LocationDataModal 
                closeModal={() => setOpenLocationDataModal(false)}
                openModal={openLocationDataModal}
                countries={countries}
                locationAnalytics={locationData}
                selectedLocationAnalytics={selectedLocationData}
                handleSetLocationAnalytics={(locationAnalytics) => {
                    handleSetLocationData(locationAnalytics);
                }}
            />
        </Box>
    )
}
