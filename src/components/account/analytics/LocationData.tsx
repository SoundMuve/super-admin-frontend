import { useEffect, useState } from 'react';

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import kolors from '@/constants/kolors';
import { restCountries } from '@/util/countries';
// import { getCountries } from '@/util/location';
import { currencyDisplay } from '@/util/resources';
import { disableNumbericIconStyle } from '@/util/mui';
import { locationAnalyticsInterface } from '@/typeInterfaces/analytics.interface';
import { useGeneralStore } from '@/state/generalStore';


const formSchema = yup.object({
    country: yup.string().trim().required().label("Country"),
    albumSold: yup.string().trim().label("No. of Album sold"),
    noSold: yup.string().trim().required().label("No. of sold"),
    revenue: yup.string().trim().required().label("Revenue"),
    streamRevenue: yup.string().trim().required().label("Stream Revenue"),
    streamPlay: yup.string().trim().required().label("Stream Play"),
});

// export type locationAnalyticsInterface = typeof formSchema.__outputType;

interface _Props {
    openModal: boolean,
    closeModal: (state: boolean) => void,
    countries: typeof restCountries;
    locationAnalytics: locationAnalyticsInterface[],
    selectedLocationAnalytics: locationAnalyticsInterface | undefined,
    handleSetLocationAnalytics: (locationData: locationAnalyticsInterface[]) => void,
}


export const LocationDataModal: React.FC<_Props> = ({
    openModal, closeModal, countries = restCountries, locationAnalytics, selectedLocationAnalytics, handleSetLocationAnalytics
}) => {
    // const [countries, setCountries] = useState(restCountries);
    const selectedAnalyticsDetails = useGeneralStore((state) => state.selectedAnalyticsDetails);

    const [locationData, setLocationData] = useState(locationAnalytics);
    const [activeLocationData, setActiveLocationData] = useState(selectedLocationAnalytics);

    const [countryValue, setCountryValue] = useState<typeof countries[0] | null>(null);
    // const [countryInputValue, setCountryInputValue] = useState('');

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    useEffect(() => {
        if (openModal) {
            if (!locationAnalytics.length) {
                setLocationData([]);
            } else {
                setLocationData(locationAnalytics);
            };

            if (selectedLocationAnalytics) {
                setActiveLocationData(selectedLocationAnalytics);
                const country = getSelectedCountryByName(selectedLocationAnalytics.country);
                setCountryValue(country);
                handleSetActiveData(selectedLocationAnalytics);
            } else {
                reset();
                setActiveLocationData(undefined);
            }
        }
    }, [openModal]);


    const { 
        handleSubmit, register, setValue, reset, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });
        
    // const onSubmit = async (formData: typeof formSchema.__outputType) => {
    const onSubmit = async (formData: any) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        
        const data2save: locationAnalyticsInterface[] = [
            ...locationData, // formData
        ];

        // Find the index of an existing item with the same country
        const index = data2save.findIndex(item => item.country == formData.country);

        if (index !== -1) {
            // Replace the existing item
            data2save[index] = formData;
        } else {
            // Add the new item if it doesn't exist
            data2save.unshift(formData);
        }

        setLocationData(data2save);

        reset();
        setCountryValue(null);
        // setCountryInputValue('');
    }

    const getSelectedCountryByName = (countryName: string) => {
        const country = countries.find((value) => value.name.common == countryName);
        return country || null;
    }

    const handleSetActiveData = (value: locationAnalyticsInterface) => {
        setActiveLocationData(value);

        setCountryValue(getSelectedCountryByName(value.country));
        setValue(
            "country", value.country,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "albumSold", `${value.albumSold}`,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "noSold", `${value.noSold}`,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "revenue", `${value.revenue}`,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "streamPlay", `${value.streamPlay}`,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
        setValue(
            "streamRevenue", `${value.streamRevenue}`,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true}
        );
    }


    return (
        <Modal
            open={openModal}
            onClose={() => closeModal(false) }
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

                    // position: 'absolute',
                    // top: '50%',
                    // left: '50%',
                    // transform: 'translate(-50%, -50%)',

                    // maxWidth: {xs: "92%", sm: "496px"},
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
                        overflow: "scroll"
                    }}
                >
                    <Box id='payout-modal-title'>
                        <Stack direction="row" alignItems="center" justifyContent="space-between"
                            spacing="20px"
                            // sx={{
                            //     borderRadius: "8px",
                            //     background: `linear-gradient(90deg, ${ kolors.milk } 0%, #D68100 100%)`,
                            //     p: 2
                            // }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "20px",
                                        // lineHeight: "16px",
                                        letterSpacing: "-0.34px",
                                        textAlign: "center",
                                        mb: 1,
                                    }}
                                >Analytics from top countries</Typography>
                            </Box>

                            <Box sx={{textAlign: "right"}}>
                                <IconButton onClick={() => closeModal(false)}>
                                    <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description' borderRadius={1} px={1.5} mt={2}>
                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', my: 4 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }

                        <Grid container spacing="15px">
                            <Grid item xs={12} md={5} xl={5}>
                                <Box>
                                    {
                                        locationData.map((value, index) => (
                                            <Box key={index} mb={2} sx={{ position: "relative" }}>
                                                <Box onClick={() => handleSetActiveData(value)}
                                                    sx={{
                                                        // activeLocationData
                                                        bgcolor: activeLocationData?.country == value.country ? "#fff" : kolors.bodyBg,
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
                                                        setLocationData(newLocationData);
                                                    }}
                                                    sx={{ 
                                                        position: "absolute", 
                                                        top: "2px", right: "2px",
                                                        color: kolors.tertiary,
                                                        bgcolor: "#ccc"
                                                    }}
                                                >
                                                    <DeleteOutlinedIcon sx={{ fontSize: "16px" }} />
                                                </IconButton>
                                            </Box>
                                        ))
                                    }

                                    <Stack alignItems="center" >
                                        <Button variant="contained" fullWidth type="button" 
                                            // size='small'
                                            onClick={() => {
                                                if (locationData.length) {
                                                    handleSetLocationAnalytics(locationData);
                                                    closeModal(false);
                                                }
                                            }}
                                            disabled={ !locationData.length } 
                                            sx={{ 
                                                bgcolor: kolors.primary,
                                                color: kolors.milk,
                                                // width: "fit-content",
                                                maxWidth: "40%",
                                                mx: "auto",

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
                                                mt: 2, 
                                                // py: 1.5
                                                textTransform: "none"
                                            }}
                                        >Continue</Button>
                                    </Stack>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={7} xl={7}>
                                <form noValidate onSubmit={ handleSubmit(onSubmit) } >
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
                                        >Country</Typography>

                                        <Autocomplete
                                            id="country"
                                            // sx={{ width: 300 }}
                                            value={countryValue}
                                            // inputValue={countryInputValue}
                                            // onInputChange={(_event, newInputValue) => {
                                            //     setCountryInputValue(newInputValue);
                                            // }}
                                      
                                            size='small'
                                            options={countries}
                                            autoHighlight
                                            getOptionLabel={(option) => option.name.common}

                                            onChange={(_e, value) => {
                                                // console.log(value);
                                                
                                                if (value) {
                                                    setCountryValue(value);

                                                    setValue(
                                                        "country", value.name.common,
                                                        {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                                                    );
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
                                                        <img src={option.flags.png} alt={option.flags.alt}
                                                            loading="lazy"
                                                            style={{
                                                                maxWidth: "20px",
                                                                // marginRight: "10px"
                                                            }}
                                                        />

                                                        {option.name.common}
                                                    </Box>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    // label="Choose a country"
                                                    label=""
                                                    error={ errors.country ? true : false }
                                                />
                                            )}
                                        />

                                        { errors.country && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.country?.message }</Box> }
                                    </Box>

                                    {
                                        selectedAnalyticsDetails.release.releaseType == "album" ?
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
                                                >No. of Album's sold</Typography>

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    placeholder=''
                                                    // autoFocus
                                                    defaultValue=""
                                                    size='small'
                                                    type='number'
                                                    inputMode='numeric'
                                                    sx={{
                                                        ...disableNumbericIconStyle
                                                    }}
                                                    error={ errors.albumSold ? true : false }
                                                    { ...register('albumSold') }
                                                />
                                                { errors.albumSold && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.albumSold?.message }</Box> }
                                            </Box>
                                        : <></>
                                    }


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
                                            type='number'
                                            inputMode='numeric'
                                            sx={{
                                                ...disableNumbericIconStyle
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
                                            type='number'
                                            inputMode='numeric'

                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}

                                            sx={{
                                                ...disableNumbericIconStyle
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
                                            type='number'
                                            inputMode='numeric'

                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                    
                                            sx={{
                                                ...disableNumbericIconStyle
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
                                            type='number'
                                            inputMode='numeric'
                                            sx={{
                                                ...disableNumbericIconStyle
                                            }}
                                            error={ errors.streamPlay ? true : false }
                                            { ...register('streamPlay') }
                                        />
                                        { errors.streamPlay && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.streamPlay?.message }</Box> }
                                    </Box>
                                    
                                    <Stack alignItems="center" >
                                        <Button variant="contained" fullWidth type="submit" 
                                            disabled={ !isValid || isSubmitting } 
                                            // size='small'
                                            sx={{ 
                                                bgcolor: kolors.milk,
                                                color: kolors.primary,
                                                // width: "fit-content",
                                                maxWidth: "40%",
                                                mx: "auto",

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
                                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Add Location</span>

                                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: kolors.primary, fontWeight: "bold" }} />
                                        </Button>
                                    </Stack>
                                </form>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
