import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import colors from '@/constants/kolors';
// import ModalWrapper from '@/components/ModalWrapper';
import { useGetReleases } from '@/hooks/releases/useGetReleases';
import { paymentTextFieldStyle, submitBtnStyle } from '@/util/mui';
import { releaseInterface } from '@/typeInterfaces/release.interface';

import Iheartradio from "@/assets/images/dsp/Iheartradio.png";
import Itunes from "@/assets/images/dsp/Itunes.png";
import Spotify from "@/assets/images/dsp/spotify.png";
import soundCloud from "@/assets/images/dsp/soundCloud.png";
import amazonMusic from "@/assets/images/dsp/amazonMusic.png";
import appleMusic from "@/assets/images/dsp/appleMusic.png";
import audioMack from "@/assets/images/dsp/audioMack.png";
import napster from "@/assets/images/dsp/napster.png";
import tidal from "@/assets/images/dsp/tidal.png";
import youtube from "@/assets/images/dsp/youtube.png";
import kolors from '@/constants/kolors';
import { getStatusColor } from '@/util/resources';
import { copyToClipboard } from '@/util/copyNshare';
import youtubeMusic from "@/assets/images/dsp/youtubeMusic.png";


interface _Props {
    openUpdateLiveLinksModal: boolean;
    closeUpdateLiveLinksModal: (state: boolean) => void;
    releaseDetails: releaseInterface;
    newStatus?: "Incomplete" | "Unpaid" | "Processing" |  "Pre-Saved" | "Live" | "Failed"
};


const musicDsps = [
    {
        id: 1,
        name: "Spotify",
        imageLogo: Spotify,
        bgColor: "#C8F452",
    },
    {
        id: 2,
        name: "Apple music",
        imageLogo: appleMusic,
        bgColor: "linear-gradient(90deg, #FF6884 0%, #E00029 100%)",
    },
    {
        id: 3,
        name: "Amazon music",
        imageLogo: amazonMusic,
        bgColor: "#FFB01F",
    },
    {
        id: 4,
        name: "Youtube",
        imageLogo: youtube,
        bgColor: "#CD201F",
    },
    {
        id: 5,
        name: "iTunes Store",
        imageLogo: Itunes,
        bgColor: "linear-gradient(90deg, #F53FC6 -0.15%, #D135FA 100.15%)",
    },
    {
        id: 6,
        name: "TIDAL",
        imageLogo: tidal,
        bgColor: "#000000",
    },
    {
        id: 7,
        name: "Youtube Music",
        imageLogo: youtubeMusic,
        bgColor: "#CD201F",
    },
    {
        id: 8,
        name: "Audio mack",
        imageLogo: audioMack,
        bgColor: "linear-gradient(90deg, #F3A408 0%, #FD8309 100%)",
    },
    {
        id: 9,
        name: "Napster",
        imageLogo: napster,
        bgColor: "#000000",
    },
    {
        id: 10,
        name: "iHeartRADIO",
        imageLogo: Iheartradio,
        bgColor: "#F21515",
    },
    {
        id: 11,
        name: "Soundcloud",
        imageLogo: soundCloud,
        bgColor: "linear-gradient(185.75deg, #FF9C28 46.56%, #E80000 132.64%)",
    },
    // {
    //     id: 12,
    //     name: "Spotify",
    //     imageLogo: "",
    //     bgColor: "#C8F452",
    // },
];

interface linksInterface {
    name: string;
    url: string;
};


const UpdateLiveLinksModalComponent: React.FC<_Props> = ({
    openUpdateLiveLinksModal, closeUpdateLiveLinksModal,
    releaseDetails, newStatus
}) => {
    const [linksData, setLinksData] = useState<linksInterface[]>([]);
    const [activeData, setActivenData] = useState<linksInterface>();
    const [selectedStatus, setSelectedStatus] = useState(newStatus ? newStatus : releaseDetails.status);

    const [liveLink, setLiveLink] = useState('');
    const [selectedMusicDsp, setSelectedMusicDsp] = useState<typeof musicDsps[0] | null>(null);

    useEffect(() => {
        if (openUpdateLiveLinksModal) {
            if (releaseDetails.musicLinks && releaseDetails.musicLinks.dspLinks) {
                setLinksData(releaseDetails.musicLinks.dspLinks);
            }
            setActivenData(undefined);
            setLiveLink('');
            setSelectedMusicDsp(null);
            setApiResponse({
                display: false,
                status: false,
                message: ''
            })

            setSelectedStatus(newStatus ? newStatus : releaseDetails.status);
        }
    }, [openUpdateLiveLinksModal])
    
    const {
        apiResponse, setApiResponse,
        isSubmitting,
        handleSubmitMusicLinks
    } = useGetReleases();

    const handleAddMoreLinks = () => {
        if (!liveLink) {
            setApiResponse({
                display: true,
                status: false,
                message: "Music dsp live link is required!"
            });
            return;
        }

        if (!selectedMusicDsp || !selectedMusicDsp.name) {
            setApiResponse({
                display: true,
                status: false,
                message: "Music dsp is required!"
            });
            return;
        }



        const formData = { url: liveLink, name: selectedMusicDsp.name };

        const data2save = [
            ...linksData, // formData
        ];

        // Find the index of an existing item with the same country
        const index = linksData.findIndex(item => item.name == formData.name);

        if (index !== -1) {
            // Replace the existing item
            data2save[index] = formData
        } else {
            // Add the new item if it doesn't exist
            data2save.unshift(formData);
        }

        setLinksData(data2save);

        setLiveLink('');
        setSelectedMusicDsp(null);
        setActivenData(undefined);
    }

    const getSelectedDspByName = (name: string) => {
        const country = musicDsps.find((value) => value.name == name);
        return country || null;
    }

    const handleSetActiveData = (value: linksInterface) => {
        setActivenData(value);

        setLiveLink(value.url);
        setSelectedMusicDsp(
            getSelectedDspByName(value.name)
        );
    }

    const handleSubmitBtn = () => {
        setApiResponse({
            display: false,
            status: false,
            message: ""
        });

        if (linksData.length) {
            if (selectedStatus == "Pre-Saved" || selectedStatus == "Live") {
                handleSubmitMusicLinks(
                    linksData, selectedStatus, releaseDetails._id,
                    `${releaseDetails.musicLinks?.code || ''}`,
                    () => {
                        setTimeout(() => {
                            closeUpdateLiveLinksModal(false)
                        }, 3000);
                    }
                )
            } else {
                setApiResponse({
                    display: true,
                    status: false,
                    message: "Music links can only be set on Live or Pre-Saved releases, please select an active status."
                });
            }
        } else {
            setApiResponse({
                display: true,
                status: false,
                message: "Live links can't be empty!"
            });
        }
    }



    return (
        <Modal
            open={openUpdateLiveLinksModal}
            onClose={() => closeUpdateLiveLinksModal(false) }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none",
                }}
            >
                <Box p={2}
                    sx={{
                        bgcolor: kolors.milk,
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "85%", md: "80%"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        // p: "25px",
                        color: kolors.dark,
                        // overflow: "scroll",
                    }}
                >
                    <Box id='payout-modal-title'>
                        <Stack direction="row" spacing="10px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "20px"
                                    }}
                                >Music Links</Typography>

                                {
                                    releaseDetails.musicLinks &&
                                    releaseDetails.musicLinks.url ?
                                        <Typography
                                            title="Click to copy" 
                                            onClick={() => copyToClipboard(releaseDetails.musicLinks?.url || '')}
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "16px",
                                                color: kolors.tertiary
                                            }}
                                        >{releaseDetails.musicLinks.url}</Typography>
                                    : <></>
                                }
                            </Box>

                            <IconButton onClick={() => closeUpdateLiveLinksModal(false) }>
                                <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description'
                        sx={{
                            maxHeight: "85%",
                            overflow: "scroll",
                            borderRadius: 1,
                            px: 1.5,
                            mt: 2
                        }}
                    >
                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', my: 2 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }

                        <Stack direction="row" spacing="20px" alignItems="center" mb={2}>
                            <Typography variant='body1'
                                sx={{
                                    color: "#B3B3B3",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "10.645px",
                                    letterSpacing: "-0.444px",
                                }}  
                            >Status</Typography>

                            <Select
                                id="releaseStatus"
                                value={selectedStatus}
                                size='small'
                                sx={{
                                    color: getStatusColor(selectedStatus, 'text'),
                                    bgcolor: getStatusColor(selectedStatus, "bg"),
                                    borderRadius: "6px",
                                    border: "none",
                                    '.MuiOutlinedInput-notchedOutline': {
                                        // borderColor: kolors.primary,
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
                                        fill: kolors.milk,
                                    }
                                }}

                                onChange={(event) => {
                                    const value: any = event.target.value;
                                    setSelectedStatus(value);
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
                                <MenuItem value="Processing" disabled>
                                    Processing
                                </MenuItem>
                                <MenuItem 
                                    value="Pre-Saved"
                                    disabled={!releaseDetails.preSave}
                                >
                                    Pre-Saved
                                </MenuItem>
                                <MenuItem value="Live">
                                    Live
                                </MenuItem>
                                <MenuItem value="Failed" disabled>
                                    Failed
                                </MenuItem>
                            </Select>
                        </Stack>
                        

                        <Grid container spacing="15px">
                            <Grid item xs={12} sm={5} md={5} xl={4}>
                                <Box 
                                    sx={{
                                        // position: "relative",
                                        height: "75dvh",
                                        overflow: "auto",
                                        position: "sticky",
                                        bottom: 1,
                                    }}
                                >
                                    {
                                        linksData.map((value, index) => (
                                            <Box key={index} mb={2} sx={{ position: "relative" }}>
                                                <Box onClick={() => handleSetActiveData(value)}
                                                    sx={{
                                                        // activeLocationData
                                                        background: activeData?.name == value.name ? getSelectedDspByName(value.name)?.bgColor : kolors.bodyBg,
                                                        borderRadius: 2,
                                                        px: 1.5, py: 1,
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <Stack direction="row" spacing="15px" alignItems='center'>
                                                        <Avatar variant="rounded"
                                                            alt={value.name}
                                                            src={getSelectedDspByName(value.name)?.imageLogo}
                                                            // sx={{ width: "48px", height: "48px" }}
                                                        />

                                                        <Box>
                                                            <Typography variant='subtitle1'
                                                                sx={{
                                                                    color: activeData?.name == value.name ? "#fff" : kolors.dark,
                                                                    // color: kolors.dark,
                                                                    fontSize: "16px",
                                                                    fontWeight: "600",
                                                                    // lineHeight: "11.101px",
                                                                    letterSpacing: "-0.463px",
                                                                }}
                                                            >{ value.name }</Typography>

                                                            <Typography variant='subtitle1'
                                                                sx={{
                                                                    // color: kolors.tertiary,
                                                                    color: activeData?.name == value.name ? kolors.milk : kolors.tertiary,

                                                                    fontSize: "14px",
                                                                    fontWeight: "400",
                                                                    // lineHeight: "11.101px",
                                                                    // letterSpacing: "-0.463px",
                                                                }}
                                                            >{ value.url }</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Box>

                                                <IconButton size='small' 
                                                    onClick={() => {
                                                        const newData = linksData.filter(data => data.name != value.name);
                                                        setLinksData(newData);
                                                    }}
                                                    sx={{ 
                                                        position: "absolute", 
                                                        top: "7px", right: "10px",
                                                        color: kolors.tertiary,
                                                        bgcolor: "#ccc"
                                                    }}
                                                >
                                                    <DeleteOutlinedIcon sx={{ fontSize: "16px" }} />
                                                </IconButton>
                                            </Box>
                                        ))
                                    }

                                    <Box sx={{position: "sticky", zIndex: 2, bottom: 1 }}>
                                        <Button variant="contained" fullWidth type="button" 
                                            size='small'
                                            onClick={() => handleSubmitBtn()}
                                            disabled={ !linksData.length || isSubmitting } 
                                            sx={{ 
                                                ...submitBtnStyle,
                                            }}
                                        >Submit</Button>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={7} md={7} xl={8}>
                                <Box>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant='subtitle1'
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                // lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left",
                                                // my: 1
                                            }}
                                        >Music DSP's</Typography>

                                        <Autocomplete
                                            value={selectedMusicDsp}
                                            // inputValue={countryInputValue}
                                            // onInputChange={(_event, newInputValue) => {
                                            //     setCountryInputValue(newInputValue);
                                            // }}
                                        
                                            size='small'
                                            options={musicDsps}
                                            autoHighlight
                                            getOptionLabel={(option) => option.name}

                                            onChange={(_e, value) => {
                                                // console.log(value);
                                                
                                                if (value) {
                                                    setSelectedMusicDsp(value);

                                                    // setCountryValue(value);
                                                    // setValue(
                                                    //     "country", value.name.common,
                                                    //     {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                                                    // );
                                                }
                                            }} // prints the selected value

                                            renderOption={(props: any, option) => {
                                                const { key, ...optionProps } = props;
                                                // const { ...optionProps } = props;

                                                return (
                                                    <Box
                                                        key={key}
                                                        component="li"
                                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                        {...optionProps}
                                                    >
                                                        <img src={option.imageLogo} alt={option.name}
                                                            loading="lazy"
                                                            style={{
                                                                maxWidth: "20px",
                                                                // marginRight: "10px"
                                                            }}
                                                        />

                                                        {option.name}
                                                    </Box>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    // label="Choose a country"
                                                    label=""
                                                    // error={ errors.country ? true : false }
                                                />
                                            )}
                                        />
                                    </Box>

                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            // lineHeight: "38.44px",
                                            letterSpacing: "-0.12px",
                                            // textAlign: "left"
                                        }}>Live Link</Typography>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            size='small'
                                            id='liveLink'
                                            type='url'
                                            inputMode='url'
                                            // defaultValue=""
                                            value={liveLink}
                                            sx={paymentTextFieldStyle}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setLiveLink(value);
                                            }}
                                        />
                                    </Box>

                                    <Box mt={5}>
                                        <Button variant="contained" size='small'
                                            fullWidth type="button"
                                            onClick={() => {handleAddMoreLinks()}}
                                            disabled={ !liveLink.length || !selectedMusicDsp } 
                                            sx={{
                                                ...submitBtnStyle,
                                            }}
                                        > Add More Links </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Box>
        </Modal>

    )
}

export default UpdateLiveLinksModalComponent;