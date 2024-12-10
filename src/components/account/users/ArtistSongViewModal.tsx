import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TablePagination from '@mui/material/TablePagination';

import kolors from '@/constants/kolors';
import ViewSongItemComponent from './ViewSongItem';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import { useUsersHook } from '@/hooks/users/useUsersHook';
import { recordLabelArtistInterface } from '@/typeInterfaces/recordLabelArtist.interface';


interface _Props {
    openArtistSongViewModal: boolean,
    closeArtistSongViewModal: (state: boolean) => void,

    artistData: recordLabelArtistInterface,
}

export const ArtistSongViewModal: React.FC<_Props> = ({
    openArtistSongViewModal, closeArtistSongViewModal, artistData
}) => {

    const {
        // apiResponse, // setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        // totalPages,

        // isSubmitting,

        artistReleases, 
        getRlArtistReleases,

    } = useUsersHook();


    useEffect(() => {
        getReleases(1, limitNo);
    }, []);

    const getReleases = (pageNo: number, limitNo: number) => {
        getRlArtistReleases(artistData.user_id, artistData._id, pageNo, limitNo);
    };


    return (
        <Modal
            open={openArtistSongViewModal}
            onClose={() => closeArtistSongViewModal(false) }
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
                        bgcolor: "#fff", // kolors.milk,
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "90%", md: "85%", lg: "80%"},
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
                                >Releases</Typography>
                            </Box>

                            <Box sx={{textAlign: "right"}}>
                                <IconButton onClick={() => closeArtistSongViewModal(false)}>
                                    <CloseIcon sx={{color: kolors.primary, fontSize: "20px"}} />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description'>
                                        
                        <Box mt={2}>
                            <Grid container spacing="20px">
                                {
                                    artistReleases ? 
                                        artistReleases.length ?
                                            artistReleases.map((song, index) => (
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

                            <Box mt={2}>
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
                        </Box>
                                        
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
