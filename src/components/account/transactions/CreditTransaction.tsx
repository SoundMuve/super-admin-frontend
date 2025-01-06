// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { currencyDisplay, formatedNumber } from '@/util/resources';
import { copyToClipboard } from '@/util/copyNshare';
import kolors from '@/constants/kolors';
import { releaseInterface } from '@/typeInterfaces/release.interface';
import { analyticsInterface } from '@/typeInterfaces/analytics.interface';
import { restCountries } from '@/util/countries';
import sampleArtWork from "@/assets/images/sampleArtWork.png"


interface _Props {
    release: releaseInterface,
    analytics: analyticsInterface,
}

export const CreditTransactionComponent: React.FC<_Props> = ({
    release, analytics
}) => {


    const getSongDetails = () => {
        const songDetails = release.songs.find(item => {
            if (item._id == analytics.song_id) return item;
        });

        return songDetails;
    }

    const getSelectedCountryByName = (countryName: string) => {
        const country = restCountries.find((value) => value.name.common == countryName);
        return country || null;
    }



    return (
        <Box>
            <Typography variant='h2' noWrap
                title="Click to copy" onClick={() => copyToClipboard(release.title)}
                sx={{
                    color: kolors.dark,
                    fontSize: {xs: "20px", md: "40px"},
                    fontWeight: "500",
                    // lineHeight: "40px",
                    letterSpacing: "-0.444px",
                    // cursor: "context-menu"
                }}
            >{ release.title }</Typography>


            <Stack direction="row" flexWrap="wrap" gap={3} >
                <Box>
                    <img src={ release.coverArt || sampleArtWork}
                        alt={`cover art work for ${ release.title }`}
                        style={{
                            width: "100%",
                            minWidth: "100px",
                            maxWidth: "170px",
                            borderRadius: '12px',
                            // height: "100%",
                            backgroundColor: kolors.bg,
                            objectFit: "contain"
                        }}
                    />
                </Box>

                <Box>
                    <Box mb={1}>
                        <Typography sx={{ color: "#7B7979" }}
                            title="Click to copy" onClick={() => copyToClipboard(getSongDetails()?.songTitle || '')}
                        >
                            <b style={{color: kolors.dark }}>Song Title: </b>
                            { getSongDetails()?.songTitle || '' }
                        </Typography>
                    </Box>

                    <Box mb={1}>
                        <Typography sx={{ color: "#7B7979" }}
                            title="Click to copy" onClick={() => copyToClipboard(release.mainArtist.spotifyProfile.name)}
                        >
                            <b style={{color: kolors.dark }}>Main Artist: </b>
                            { release.mainArtist.spotifyProfile.name }
                        </Typography>
                    </Box>

                    <Box mb={1}>
                        <Typography sx={{ color: "#7B7979" }}
                            title="Click to copy" onClick={() => copyToClipboard(release.releaseType)}
                        >
                            <b style={{color: kolors.dark }}>Release Type: </b>
                            { release.releaseType }
                        </Typography>
                    </Box>

                    <Box mb={1}>
                        <Typography sx={{ color: "#7B7979" }}
                            title="Click to copy" onClick={() => copyToClipboard(release._id)}
                        >
                            <b style={{color: kolors.dark }}>Release Id: </b>
                            { release._id }
                        </Typography>
                    </Box>

                    <Box mb={1}>
                        <Typography sx={{ color: "#7B7979" }}
                            title="Click to copy" onClick={() => copyToClipboard(analytics.song_id)}
                        >
                            <b style={{color: kolors.dark }}>Song Id: </b>
                            { analytics.song_id }
                        </Typography>
                    </Box>
                </Box>
            </Stack>


            <Box
                sx={{
                    borderRadius: "8.65px",
                    border: "1px solid #C8C8C8",
                    p: 2,
                    bgcolor: kolors.bodyBg,
                    mt: 3
                }}      
            >
                <Box>
                    <AnalyticsDataComponent title='Analytics Id' value={analytics._id || ''} />
                    
                    <AnalyticsDataComponent title='Analytics Date' value={analytics.date} />
                    
                    <AnalyticsDataComponent title="No. of Album's sold" value={ formatedNumber(Number(analytics.albumSold)) } />

                    <AnalyticsDataComponent title="No. of songs sold" value={ formatedNumber(Number(analytics.noSold)) } />

                    <AnalyticsDataComponent title="Revenue Generated" value={ currencyDisplay(Number(analytics.revenue)) } />

                    <AnalyticsDataComponent title="Revenue From Streams" value={ currencyDisplay(Number(analytics.streamRevenue)) } />

                    <AnalyticsDataComponent title="Stream Plays" value={formatedNumber(Number(analytics.streamPlay))} />

                    {/* <AnalyticsDataComponent title="Revenue Generated" value={analytics.date} /> */}

                    <Box>
                        <Typography variant='subtitle1'
                            sx={{
                                color: kolors.dark,
                                fontSize: "16px",
                                fontWeight: "600",
                                // lineHeight: "11.101px",
                                letterSpacing: "-0.463px",
                                my: 2
                            }}
                        >Locations</Typography>

                        <Stack direction="row" spacing="20px" alignItems="center" my={2}>
                            {
                                analytics.location.map((value, index) => (
                                    <Box key={index} mb={2}>
                                        <Box
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
                                    </Box>
                                ))
                            }
                        </Stack>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}



interface s_Props {
    title: string,
    value: string,
}

const AnalyticsDataComponent: React.FC<s_Props> = ({ title, value }) => {
    return (
        <Grid container spacing={"5px"} mb={3}>
            <Grid item xs={12} sm={6} md={4} lg={3} alignSelf='center'>
                <Box px={{ md: "10px" }}>
                    <Typography variant='body1'
                        sx={{
                            color: kolors.dark,
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
                        color: kolors.dark,
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
                            color: kolors.dark,
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
