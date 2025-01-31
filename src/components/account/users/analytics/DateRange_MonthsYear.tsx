import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { displayDateRange } from '@/util/dateTime';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import kolors from '@/constants/kolors';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import { useUserStore } from '@/state/userStore';


interface dateRangeProps {
    dateRangeValue: {
        startDate: string,
        endDate: string,
    };
    setDateRangeValue: (value: any) => void;
};

const DateRangeMonthsYearBasicMenu: React.FC<dateRangeProps> = ({
    dateRangeValue, setDateRangeValue
}) => {
    const [customDateRangeModal, setCustomDateRangeModal] = React.useState(false);


    return (
        <div>
            <Button
                id="basic-button"
                onClick={() => {
                    setCustomDateRangeModal(true);
                    // handleCloseDateRange();
                }}
                variant="contained"
                endIcon={<KeyboardArrowDownIcon />}

                sx={{
                    color: "#fff",
                    borderRadius: "8px",
                    bgcolor: "#272727",
                    // textAlign: "center",
                    border: "none",
                                    
                    "&:hover": {
                        bgcolor: "#272727",
                    },
                    "&:active": {
                        bgcolor: "#272727",
                    },
                    "&:focus": {
                        bgcolor: "#272727",
                    },
                    '.MuiSvgIcon-root ': {
                        fill: "#797979",
                    }
                }}
            >{ displayDateRange(dateRangeValue.startDate) } - { displayDateRange(dateRangeValue.endDate) }</Button>

            <CustomDateRange 
                closeModal={() => setCustomDateRangeModal(false)}
                openModal={customDateRangeModal}
                setDateRangeValue={setDateRangeValue}
            />
        </div>
    );
}
export default DateRangeMonthsYearBasicMenu;



interface myProps {
    openModal: boolean,
    closeModal: () => void;
    setDateRangeValue: (value: any) => void;
};

const CustomDateRange: React.FC<myProps> = ({
    openModal, closeModal, setDateRangeValue
}) => {
    const userData = useUserStore((state) => state.userData);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const [apiResponse, setApiResponse] = React.useState({
        display: false,
        status: true,
        message: ""
    });

    const handleContinueBtn = () => {
        if (!startDate || !endDate) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please select the start date and end date to continue."
            })
            return;
        }

        // console.log({ startDate, endDate });
        
        setDateRangeValue({ startDate, endDate });
        closeModal();
    }


    return (
        <Modal
            open={openModal}
            onClose={() => closeModal() }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none"
                }}
            >
                <Box sx={{
                    bgcolor: kolors.bg,
                    maxWidth: {xs: "92%", sm: "80%", md: "70%" },
                    maxHeight: "605px",
                    borderRadius: "12px",
                    p: "25px",
                    color: kolors.dark
                }}>
                    <Box id="payout-modal-title" sx={{ position: "relative" }}>
                        <Box sx={{textAlign: "right", position: "absolute", right: "0px"}}>
                            <IconButton size='small' onClick={() => closeModal() }>
                                <CloseIcon 
                                    sx={{color: kolors.primary, fontSize: "24px"}} 
                                />
                            </IconButton>
                        </Box>

                        <Typography variant="h6" component="h2"
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "16px", md: "18px"},
                                // lineHeight: {xs: "15px", md: "18.16px"},
                                letterSpacing: "-0.1px",
                                textAlign: "center",
                                // mt: 2
                            }}
                        > Select Date Range </Typography>
                    </Box>


                    <Box id="payout-modal-description" 
                        sx={{
                            mt: 3, // mx: "auto",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Box>
                            <Stack direction="row" gap="10px" 
                                alignItems="center" justifyContent={{xs: "center", md: "space-between"}}
                                flexWrap="wrap"
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Start Date" 
                                            minDate={dayjs(userData.createdAt)}
                                            maxDate={dayjs()}

                                            onChange={(newValue) => {
                                                const value = dayjs(newValue).format('YYYY-MM-DD');
                                                // console.log(value);
                                                setStartDate(value);

                                                setApiResponse({
                                                    display: false,
                                                    status: true,
                                                    message: ""
                                                });
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>

                                <RemoveIcon sx={{ color: kolors.tertiary, display: {xs: "none", sm: "initial"} }} />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="End Date" 
                                            minDate={dayjs(userData.createdAt)}
                                            maxDate={dayjs()}

                                            onChange={(newValue) => {
                                                const value = dayjs(newValue).format('YYYY-MM-DD');
                                                // console.log(value);
                                                setEndDate(value);

                                                setApiResponse({
                                                    display: false,
                                                    status: true,
                                                    message: ""
                                                });
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Stack>
                        </Box>


                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', my: 4 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }

                        <Box mt={3}>
                            <Button variant="contained"
                                // endIcon={<KeyboardArrowDownIcon />}
                                sx={{
                                    color: "#fff",
                                    borderRadius: "8px",
                                    bgcolor: "#272727",
                                    // textAlign: "center",
                                    border: "none",
                                                    
                                    "&:hover": {
                                        bgcolor: "#272727",
                                    },
                                    "&:active": {
                                        bgcolor: "#272727",
                                    },
                                    "&:focus": {
                                        bgcolor: "#272727",
                                    },
                                    '.MuiSvgIcon-root ': {
                                        fill: "#797979",
                                    }
                                }}

                                onClick={handleContinueBtn}
                            >Continue</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
