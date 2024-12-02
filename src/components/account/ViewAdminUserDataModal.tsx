import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import kolors from '@/constants/kolors';
import { userInterface } from '@/typeInterfaces/users.interface';
import { stringAvatar, stringToColor } from '@/util/resources';
import { useAddNewAdmin } from '@/hooks/admins/useAddNewAdmin';
import { displayCreatedAtDate } from '@/util/dateTime';


interface _Props {
    openAdminUserModal: boolean,
    closeAdminUserModal: (state: boolean) => void,

    adminUser: userInterface,
    // activities: activityInterface,
}

export const ViewAdminUserDataModal: React.FC<_Props> = ({
    openAdminUserModal, closeAdminUserModal, adminUser
}) => {
    
    const {
        // apiResponse, setApiResponse,
        blockOrRemoveAdmin,

        limitNo, 
        // setLimitNo,
        // currentPageNo, totalRecords,
        // totalPages, 
        activityLogs, getActivityLog,

    } = useAddNewAdmin();

    useEffect(() => {
        if (openAdminUserModal) {
            getActivityLog(adminUser._id, 1, limitNo);
        }
    }, [openAdminUserModal]);
    
    

    return (
        <Modal
            open={openAdminUserModal}
            onClose={() => closeAdminUserModal(false) }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",
                    // height: "100%",
                    outline: "none",

                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                    maxWidth: {xs: "92%", sm: "496px"},
                }}
            >
                <Box 
                    sx={{
                        bgcolor: "#fff",
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
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
                            spacing="20px" mb={2}
                            sx={{
                                borderRadius: "8px",
                                background: `linear-gradient(90deg, ${ kolors.milk } 0%, #D68100 100%)`,
                                p: 2
                            }}
                        >
                            <Box>
                                <Avatar
                                    alt={`${adminUser.firstName + " " + adminUser.lastName} profile image`}
                                    // src={adminUser.}
                                    children={stringAvatar(adminUser.firstName + " " + adminUser.lastName)}
                                    sx={{ 
                                        width: "65px", height: "65px", 
                                        border: "2px solid #FFF", 
                                        bgcolor: stringToColor(adminUser.firstName + " " + adminUser.lastName),
                                        position: "relative",
                                        bottom: -40
                                    }}
                                />
                            </Box>

                            <Box 
                                sx={{
                                    borderRadius: "5.333px",
                                    background: kolors.bg,
                                    p: 1.4,
                                }}
                            >
                                <Typography variant='body1' sx={{
                                    color: kolors.primary,
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    lineHeight: "7.401px",
                                    letterSpacing: "-0.308px"
                                }}> Admin </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Box id='payout-modal-description' p={2}>
                        <Box>
                            <Typography 
                                sx={{
                                    color: kolors.dark,
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    lineHeight: "11.101px",
                                    letterSpacing: "-0.463px"
                                }}
                            >{ adminUser.firstName + " " + adminUser.lastName }</Typography>

                            <Typography 
                                sx={{
                                    color: "#7B7979",
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    lineHeight: "11.101px",
                                    letterSpacing: "-0.463px"
                                }}
                            >{ adminUser.email }</Typography>
                        </Box>

                        <Stack direction="row" alignItems="center" spacing="10px" my={2}>
                            <Box 
                                onClick={() => {
                                    closeAdminUserModal(false);
                                    blockOrRemoveAdmin("block", adminUser._id) 
                                }}
                                sx={{
                                    borderRadius: "5.333px",
                                    background: "#D68100",
                                    p: 1.4,
                                    cursor: "pointer"
                                }}
                            >
                                <Typography variant='body1' sx={{
                                    color: "#fff",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    lineHeight: "7.401px",
                                    letterSpacing: "-0.308px"
                                }}> Block </Typography>
                            </Box>

                            <Box 
                                onClick={() => {
                                    closeAdminUserModal(false);
                                    blockOrRemoveAdmin("remove", adminUser._id);
                                }}
                                sx={{
                                    borderRadius: "5.333px",
                                    border: "1px solid #000",
                                    // background: "#D68100",
                                    p: 1.4,
                                    cursor: "pointer"
                                }}
                            >
                                <Typography variant='body1' sx={{
                                    color: kolors.dark,
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    lineHeight: "7.401px",
                                    letterSpacing: "-0.308px"
                                }}> Remove </Typography>
                            </Box>
                        </Stack>

                        <Box my={3}>
                            <Typography variant='body2'
                                sx={{
                                    color: "#7B7979",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    lineHeight: "11.101px",
                                    letterSpacing: "-0.2px"
                                }}
                            >Activity</Typography>

                            <Box maxHeight="250px" overflow="scroll" mt={1}>
                                <TableContainer>
                                    <Table aria-label="activities table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: "#7B7979", fontSize: "13px", fontWeight: "500" }}
                                                >Date and time</TableCell>

                                                <TableCell sx={{ color: "#7B7979", fontSize: "13px", fontWeight: "500" }}
                                                >Browser</TableCell>

                                                <TableCell sx={{ color: "#7B7979", fontSize: "13px", fontWeight: "500" }}
                                                >Location</TableCell>

                                                <TableCell sx={{ color: "#7B7979", fontSize: "13px", fontWeight: "500" }}
                                                >Activity</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {activityLogs.map((row, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    {/* <TableCell component="th" scope="row">
                                                        {row.no}
                                                    </TableCell> */}
                                                    <TableCell sx={{ color: "#7B7979", fontSize: "12px" }}
                                                    >{ displayCreatedAtDate(row.createdAt) }</TableCell>

                                                    <TableCell sx={{ color: "#7B7979", fontSize: "12px" }}
                                                    >{row.browserDetails.browserName}</TableCell>

                                                    <TableCell sx={{ color: "#7B7979", fontSize: "12px" }
                                                    }>{row.location.city + ", " + row.location.region}</TableCell>

                                                    <TableCell sx={{ color: "#7B7979", fontSize: "12px" }}
                                                    >{row.action}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
