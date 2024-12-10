import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { stringAvatar } from '@/util/resources'
import { recordLabelArtistInterface } from '@/typeInterfaces/recordLabelArtist.interface'
import EmptyListComponent from '@/components/EmptyList'
import LoadingDataComponent from '@/components/LoadingData'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'
import { ArtistSongViewModal } from './ArtistSongViewModal'


interface _Props {
    recordLabelArtist: recordLabelArtistInterface[] | undefined,

    setLimitNo: (num: number) => void,
    currentPageNo: number,
    totalPages: number,
    totalRecords: number,
    limitNo: number,
    getArtists: (pageNo: number, limitNo: number) => void,
}

let selectedArtistData: recordLabelArtistInterface | undefined = undefined;

const ArtistListItemView: React.FC<_Props> = ({
    recordLabelArtist,
    currentPageNo, setLimitNo, getArtists,
    totalRecords, limitNo, // totalPages,

}) => {
    const [artistSongViewModal, setArtistSongViewModal] = useState(false);


    return (
        <Box>
            <Grid container spacing={3}>
                {
                    recordLabelArtist ? 
                        recordLabelArtist.length ?
                            recordLabelArtist.map((item, i) => (
                                <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                                    <Stack alignItems="center" 
                                        onClick={() => {
                                            // handleNavigation(item)
                                            selectedArtistData = item;
                                            setArtistSongViewModal(true);
                                        }} 
                                        sx={{ cursor: "pointer", width: "120px", }}
                                    >
                                        <Avatar
                                            alt={`${item.artistName}`}
                                            src={item.artistAvatar}
                                            // variant="rounded"
                                            aria-label={item.artistName}
                                            sx={{ 
                                                boxShadow: "0px 4px 8px -1px rgba(0, 0, 0, 0.1)",
                                                // bgcolor: stringToColor(project.title),
                                                width: "110px",
                                                height: "110px",
                                                // mb: "0.5rem",
                                                // p: 1
                                            }}
                                            children={<Typography sx={{
                                                fontSize: "15px",
                                                fontWeight: "bold"
                                            }}>{stringAvatar(item.artistName)}</Typography>}
                                        />
                
                                        <Typography variant='h4' component="h4"
                                            sx={{
                                                fontWeight: '700',
                                                fontSize: '20px',
                                                textAlign: "center",
                                                // lineHeight: '24.24px',
                                                letterSpacing: '-0.59px',
                                                mt: '5px'
                                            }}
                                        >{item.artistName}</Typography>
                                    </Stack>
                                </Grid>
                            ))
                        : <EmptyListComponent notFoundText="No artist has been registered to this record label yet!" />
                    : <LoadingDataComponent />
                }
            </Grid>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={totalRecords} // totalRecords
                rowsPerPage={limitNo}
                page={currentPageNo -1}
                labelRowsPerPage="Items per page"
                onPageChange={(_e, page)=> {
                    // console.log(page);

                    const newPage = page + 1;
                    // getUsers(newPage, limitNo, userType);

                    getArtists(newPage, limitNo);
                }}
                onRowsPerPageChange={(e) => {
                    const value = e.target.value;
                    console.log(value);

                    setLimitNo(Number(value));
                    // getUsers(1, limitNo, userType);
                    
                    getArtists(1, Number(value));
                }}
            />

            {
                selectedArtistData ? 
                    <ArtistSongViewModal 
                        artistData={selectedArtistData}
                        closeArtistSongViewModal={() => setArtistSongViewModal(false)}
                        openArtistSongViewModal={artistSongViewModal}
                    />
                : <></>
            }

        </Box>
    )
}

export default ArtistListItemView