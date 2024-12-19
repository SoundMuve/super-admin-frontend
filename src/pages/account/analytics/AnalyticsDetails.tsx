import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TablePagination from '@mui/material/TablePagination';

import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
// import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import colors from '@/constants/kolors';
import { 
    releaseInterface, 
} from '@/typeInterfaces/release.interface';
import { currencyDisplay, formatedNumber } from '@/util/resources';
import { copyToClipboard } from '@/util/copyNshare';
import { useUsersHook } from '@/hooks/users/useUsersHook';
import kolors from '@/constants/kolors';
import EmptyListComponent from '@/components/EmptyList';
import ViewSongItemComponent from '@/components/account/users/ViewSongItem';
import { useGeneralStore } from '@/state/generalStore';
import ArtistListItemView from '@/components/account/users/ArtistListItemView';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { KycDataModal } from '@/components/account/users/KycDataModal';



export default function AnalyticsDetails() {
    const navigate = useNavigate();
    const {_id} = useParams();

    const [displayCategory, setDisplayCategory] = useState<"Artist" | "Releases">("Releases");
    const [userStatusDialog, setUserStatusDialog] = useState(false);
    const [userKycModal, setUserKycModal] = useState(false);

    const selectedUserDetails = useGeneralStore((state) => state.selectedUserDetails);


    const {
        // apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        getUserById,

        rlArtistsCount,
        releaseCount,

        releases,
        getUserReleases,

        rlArtists,
        getRecordLabelUserArtists,

        handleUserStatus,

    } = useUsersHook();


    useEffect(() => {
        const user_id = selectedUserDetails._id || _id || '';
        
        if (user_id) {
            getUserById(user_id);
            // getUserReleases(user_id, 1, limitNo);
            // getRecordLabelUserArtists(user_id, 1, limitNo);


            if (selectedUserDetails.userType == "record label") {
                setDisplayCategory("Artist");
            }
        } else {
            navigate("/admin");
        }
    }, []);


    useEffect(() => {
        const user_id = selectedUserDetails._id || _id || '';
        
        if (user_id) {
            if (displayCategory == "Artist") {
                getRecordLabelUserArtists(user_id, 1, limitNo);
            } else {
                getUserReleases(user_id, 1, limitNo);
            }
        }
    }, [displayCategory]);

    
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
                        >{ selectedUserDetails.userType == "artist" ? selectedUserDetails.artistName : selectedUserDetails.recordLabelName }</Typography>

                        <Avatar
                            alt={selectedUserDetails.userType == "artist" ? selectedUserDetails.artistName : selectedUserDetails.recordLabelName}
                            src={selectedUserDetails.recordLabelLogo}
                            sx={{ 
                                width: {xs: 56, md: "82px"}, 
                                height: {xs: 56, md: "82px"},
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
                                >{selectedUserDetails.firstName + " " + selectedUserDetails.lastName }</Typography>

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
                                    <span onClick={() => copyToClipboard(selectedUserDetails._id)}> 
                                        { selectedUserDetails._id }
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
                                        onClick={() => copyToClipboard(selectedUserDetails.userType)}
                                        style={{ textTransform: "capitalize" }}
                                    > { selectedUserDetails.userType } </span>
                                </Typography>

                                <Typography variant='body2'
                                    onClick={() => setUserKycModal(true)}
                                    sx={{
                                        color: kolors.primary,
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        // lineHeight: "11.101px",
                                        letterSpacing: "-0.463px",
                                        mt: 0.5,
                                        cursor: 'pointer',
                                        width: "fit-content"
                                    }}
                                >View security details</Typography>

                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={2}
                                        my={2} // justifyContent="space-between"
                                    >
                                        <Box
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
                                            >View Analytics</Typography>
                                        </Box>

                                        <Box onClick={() => setUserStatusDialog(true)}
                                            sx={{
                                                p: "10px",
                                                borderRadius: "6px",
                                                // background: kolors.primary,
                                                border: "1px solid #000",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            > { selectedUserDetails.status ? "Block user" : "Unblock user" } </Typography>
                                        </Box>
                                    </Stack>
                                </Box>

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
                                    <b style={{color: kolors.dark}}>Email: </b>
                                    <span onClick={() => copyToClipboard(selectedUserDetails.email)}> 
                                        { selectedUserDetails.email }
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
                                    <span onClick={() => copyToClipboard(selectedUserDetails.phoneNumber)}>
                                        { selectedUserDetails.phoneNumber }
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
                                    <b style={{color: kolors.dark}}>Country: </b> 
                                    <span onClick={() => copyToClipboard(selectedUserDetails.country)}>
                                        { selectedUserDetails.country }
                                    </span>
                                </Typography>

                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={2}
                                        my={2} // justifyContent="space-between" 
                                    >
                                        {
                                            selectedUserDetails.userType  == "artist" ? <></> : 
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
                                                <PersonIcon sx={{ fontSize: "10px" }} />

                                                <Typography
                                                    sx={{
                                                        color: kolors.dark,
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        lineHeight: "11.101px",
                                                        letterSpacing: "-0.463px",
                                                    }}
                                                >{ formatedNumber(Number(rlArtistsCount)) }</Typography>

                                            </Box>
                                        }

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
                                            >{ formatedNumber(Number(releaseCount)) }</Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                p: "10px",
                                                borderRadius: "6px",
                                                background: "#C9F6D0",
                                                // border: "1px solid #000",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#0AA623",
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            >{currencyDisplay(Number(selectedUserDetails.balance))}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                            </Box>
                        </Stack>

                        <Box my={3}>

                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                my: 5
                            }}>
                                <Box 
                                    sx={{
                                        maxWidth: 460,
                                        width: "100%",
                                        borderRadius: 2,
                                        border: `1px solid ${colors.primary}`,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        alignItems: "center",
                                        textAlign: "center",
                                        p: 0.5,
                                        flexWrap: "nowrap"
                                    }}
                                >
                                    <Typography variant="h2"
                                        onClick={() => setDisplayCategory("Artist")}
                                        sx={{
                                            bgcolor: displayCategory == "Artist" ? colors.primary : "none",
                                            color: displayCategory == "Artist" ? colors.milk : colors.primary,
                                            display: selectedUserDetails.userType == "artist" ? "none" : "initial",
                                            px: 3,
                                            py: 1,
                                            borderRadius: 2,
                                            flexGrow: 1,
                                            fontWeight: "900",
                                            fontSize: {xs: "14px", md: "20px"},
                                            // lineHeight: {xs: "38.78px", md: "50px"},
                                            letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                            cursor: "pointer"
                                        }}
                                    > Artists </Typography>

                                    <Typography variant="h2"
                                        onClick={() => setDisplayCategory("Releases")}
                                        sx={{
                                            bgcolor: displayCategory == "Releases" ? colors.primary : "none",
                                            color: displayCategory == "Releases" ? colors.milk : colors.primary,
                                            px: 3,
                                            py: 1,
                                            borderRadius: 2,
                                            flexGrow: 1,
                                            fontWeight: "900",
                                            fontSize: {xs: "14px", md: "20px"},
                                            // lineHeight: {xs: "38.78px", md: "50px"},
                                            letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                            // cursor: "pointer"
                                        }}
                                    > Releases </Typography>
                                </Box>
                            </Box>

                            {
                                displayCategory == "Artist" ?
                                    <ArtistListItemView 
                                        recordLabelArtist={rlArtists}
        
                                        setLimitNo={setLimitNo} 
                                        currentPageNo={currentPageNo} 
                                        totalPages={totalPages} 
                                        limitNo={limitNo}
                                        totalRecords={totalRecords}
                                        getArtists={(pageNo, limitNo) => {
                                            // getUserReleases(selectedUserDetails._id || _id || "", currentPageNo + 1, limitNo);
                                            getUserReleases(selectedUserDetails._id || _id || "", pageNo, limitNo);
                                        }}
                                    />
                                : 
                                <ReleaseSongs 
                                    setLimitNo={setLimitNo} 
                                    releases={releases} 
                                    currentPageNo={currentPageNo} 
                                    totalPages={totalPages} 
                                    limitNo={limitNo}
                                    totalRecords={totalRecords}
                                    getReleases={(pageNo, limitNo) => {
                                        // getUserReleases(selectedUserDetails._id || _id || "", currentPageNo + 1, limitNo);
                                        getUserReleases(selectedUserDetails._id || _id || "", pageNo, limitNo);
                                    }}
                                />
                            }



                        </Box>

                    </Box>

                </Box>
            }


            <Dialog
                // fullScreen={fullScreen}
                open={userStatusDialog}
                onClose={() => setUserStatusDialog(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Confirm
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to 
                        { selectedUserDetails.status ? <span style={{color: "red"}}> block </span> : <span style={{color: "green"}}> unblock </span> }
                        this user?
                    </DialogContentText>
                </DialogContent>

                <DialogActions> 
                    <Button autoFocus onClick={() => setUserStatusDialog(false)}
                    >No</Button>

                    <Button autoFocus onClick={() => {
                        setUserStatusDialog(false);
                        handleUserStatus(selectedUserDetails._id, selectedUserDetails.status);
                        // closePromotionsModal(true);
                    }}>Yes</Button>
                </DialogActions>
            </Dialog>

            <KycDataModal 
                closeKycDataModal={() => setUserKycModal(false)}
                openKycDataModal={userKycModal}
                userData={selectedUserDetails}
            />
            
        </Box>
    )
}



interface _Props {
    setLimitNo: (num: number) => void,
    releases: releaseInterface[] | undefined,
    currentPageNo: number,
    totalPages: number,
    totalRecords: number,
    limitNo: number,
    getReleases: (pageNo: number, limitNo: number) => void,
}

const ReleaseSongs: React.FC<_Props> = ({ 
    releases, currentPageNo, setLimitNo, getReleases,
    totalRecords, limitNo, // totalPages,
}) => {


    return (
        <Box>
            <Grid container spacing="20px">
                {
                    releases ? 
                        releases.length ?
                            releases.map((song, index) => (
                                <Grid item xs={6} md={4} lg={3} key={song._id}>
                                    <ViewSongItemComponent 
                                        // releaseType={albumType}
                                        index={index}
                                        releaseDetails={song}
                                    />
                                </Grid>
                            ))
                        : <EmptyListComponent notFoundText="This user has no release yet!" />
                    : <LoadingDataComponent />
                }
            </Grid>


            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={totalRecords} // totalRecords
                rowsPerPage={limitNo}
                page={currentPageNo -1}
                labelRowsPerPage="Release per page"
                onPageChange={(_e, page)=> {
                    // console.log(page);

                    const newPage = page + 1;
                    // getUsers(newPage, limitNo, userType);

                    getReleases(newPage, limitNo);
                }}
                onRowsPerPageChange={(e) => {
                    const value = e.target.value;
                    console.log(value);

                    setLimitNo(Number(value));
                    // getUsers(1, limitNo, userType);
                    
                    getReleases(1, Number(value));
                }}
            />
            
        </Box>
    );
}
