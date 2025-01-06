import { useEffect, useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useUserStore } from '@/state/userStore';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { numberOfLinesTypographyStyle, submitBtnStyle } from '@/util/mui';
import kolors from '@/constants/kolors';
import { currencyDisplay, formatedNumber, stringAvatar, stringToColor } from '@/util/resources';
// import artWorkSample from "@/assets/images/artWorkSample.png";
import { ViewAdminUserDataModal } from '@/components/account/ViewAdminUserDataModal';
// import { useUserStore } from '@/state/userStore';
import { AddNewAdminModal } from '@/components/account/AddNewAdminModal';
import { useAddNewAdmin } from '@/hooks/admins/useAddNewAdmin';
import { userInterface } from '@/typeInterfaces/users.interface';
import { useDashboardHook } from '@/hooks/admins/useDashboardHook';

  
// const bestPerformingProjects = [
//     {
//         no: 1,
//         projectName: "Good God",
//         releaseDate: "01/01/2024",
//         releaseType: "Single",
//         artistName: "Joseph Solomon",
//         revenue: "1000",
//     },
//     {
//         no: 2,
//         projectName: "Good God",
//         releaseDate: "01/01/2024",
//         releaseType: "Album",
//         artistName: "Joseph Solomon",
//         revenue: "1000",
//     },
//     {
//         no: 3,
//         projectName: "Good God",
//         releaseDate: "01/01/2024",
//         releaseType: "Single",
//         artistName: "Joseph Solomon",
//         revenue: "1000",
//     },
//     {
//         no: 4,
//         projectName: "Good God",
//         releaseDate: "01/01/2024",
//         releaseType: "Album",
//         artistName: "Joseph Solomon",
//         revenue: "1000",
//     },
//     {
//         no: 5,
//         projectName: "Good God",
//         releaseDate: "01/01/2024",
//         releaseType: "Single",
//         artistName: "Joseph Solomon",
//         revenue: "1000",
//     },
//     {
//         no: 6,
//         projectName: "Good God",
//         releaseDate: "01/01/2024",
//         releaseType: "Album",
//         artistName: "Joseph Solomon",
//         revenue: "1000",
//     },
//     {
//         no: 7,
//         projectName: "Good God",
//         releaseDate: "01/01/2024",
//         releaseType: "Single",
//         artistName: "Joseph Solomon",
//         revenue: "1000",
//     },
// ];
  
let count = 1;

const Dashboard = () => {
    const [openAdminUserModal, setOpenAdminUserModal] = useState(false);
    const [openAddNewAdminModal, setOpenAddNewAdminModal] = useState(false);
    // const userData = useUserStore((state) => state.userData);

    const [selectedUser, setSelectedUser] = useState<userInterface>();

    const {
        // apiResponse, setApiResponse,
        getAllAdmins,
        allAdmins
    } = useAddNewAdmin();

    const {
        // apiResponse, setApiResponse,
        dashboardTotalAnalysis,
        bestPerformingProjects,
        getDashboardTotalAnalysis,
        getBestPerformingProjects,
    } = useDashboardHook();

    useEffect(() => {
        getAllAdmins();
        getDashboardTotalAnalysis();
        getBestPerformingProjects();
    }, [count]);
    

    return (
        <Box mb={5}>
            <Stack mt={5} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                        sx={{
                            color: "#7B7979",
                            fontSize: "13px",
                            fontWeight: "900",
                            // lineHeight: "8.291px",
                            letterSpacing: "-0.345px",
                        }}
                    >Dashboard</Typography>

                    <Button variant="contained" type="button"
                        fullWidth size='small'
                        onClick={() => {
                            setOpenAddNewAdminModal(true)
                        }} 
                        // disabled={ !linktreeUrl.length } 
                        sx={{
                            ...submitBtnStyle,
                            p: "5px 10px",
                            borderRadius: "5px"
                        }}
                    >Add Admin
                        <AddIcon sx={{ fontSize: "16px" }} />
                    </Button>
                </Stack>  
            </Stack>

            <Box mt={5}>
                <Grid container spacing={"20px"} >
                    {
                        dashboardTotalAnalysis && 
                        <>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box>
                                    <TopCard1Component 
                                        title='Total Users'
                                        bottomLeftJSX={
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "19px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            >{formatedNumber(Number(dashboardTotalAnalysis.users.totalUsers))}</Typography>
                                        }

                                        bottomRightJSX={
                                            <Stack direction="row" alignItems="center" spacing="15px">
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            color: kolors.dark, // "#7B7979",
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                            lineHeight: "12px",
                                                            letterSpacing: "-0.463px",
                                                            m: 0, p: 0,
                                                            // bgcolor: "red"
                                                        }}
                                                    >{formatedNumber(Number(dashboardTotalAnalysis.users.totalArtist))}</Typography>
                                
                                                    <Typography variant='subtitle2'
                                                        sx={{
                                                            color: "#7B7979",
                                                            fontSize: "11px",
                                                            fontWeight: "400",
                                                            lineHeight: "11px",
                                                            letterSpacing: "-0.463px",
                                                            m: 0, p: 0,
                                                            // bgcolor: "green"
                                                        }}
                                                    >Artists</Typography>
                                                </Box>

                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            color: kolors.dark, // "#7B7979",
                                                            fontSize: "18px",
                                                            fontWeight: "500",
                                                            lineHeight: "12px",
                                                            letterSpacing: "-0.463px",
                                                            m: 0, p: 0,
                                                        }}
                                                    >{formatedNumber(Number(dashboardTotalAnalysis.users.totalRl))}</Typography>
                                
                                                    <Typography variant='subtitle2'
                                                        sx={{
                                                            color: "#7B7979",
                                                            fontSize: "11px",
                                                            fontWeight: "400",
                                                            lineHeight: "11px",
                                                            letterSpacing: "-0.463px",
                                                            m: 0, p: 0,
                                                        }}
                                                    >Record Label</Typography>
                                                </Box>
                                            </Stack>
                                        }
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Box>
                                    <TopCard1Component 
                                        title='Total Revenue Analytics'
                                        bottomLeftJSX={
                                            <Box>
                                                <Chip 
                                                    label={currencyDisplay(Number(dashboardTotalAnalysis.revenue.totalUsersBalance))} 
                                                    size='small' color="success"
                                                />

                                                <Typography variant='subtitle2'
                                                    sx={{
                                                        fontSize: "11px",
                                                        color: "#7B7979",
                                                        fontWeight: '400',
                                                        m: 0, p: 0,
                                                    }}
                                                >Available Users Balance</Typography>
                                            </Box>
                                        }

                                        bottomRightJSX={
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "19px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            >{ currencyDisplay(Number(dashboardTotalAnalysis.revenue.totalTransactionAmount)) }</Typography>
                                        }
                                    />
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <Box>
                                    <TopCard1Component 
                                        title='Total Songs Uploaded'
                                        bottomLeftJSX={
                                            <Box>
                                                <Chip 
                                                    label={formatedNumber(Number(dashboardTotalAnalysis.projects.totalLiveReleases))}
                                                    size='small' color="success" 
                                                />

                                                <Typography variant='subtitle2'
                                                    sx={{
                                                        fontSize: "11px",
                                                        color: "#7B7979",
                                                        fontWeight: '400',
                                                        m: 0, p: 0,
                                                    }}
                                                >Live Releases</Typography>
                                            </Box>
                                        }

                                        bottomRightJSX={
                                            <Typography
                                                sx={{
                                                    color: kolors.dark,
                                                    fontSize: "19px",
                                                    fontWeight: "500",
                                                    // lineHeight: "11.101px",
                                                    letterSpacing: "-0.463px",
                                                }}
                                            >{ formatedNumber(Number(dashboardTotalAnalysis.projects.totalReleases)) }</Typography>
                                        }
                                    />
                                </Box>
                            </Grid>
                        </>
                    }


                    {/* <Grid item xs={12} sm={6} md={4}>
                        <Box>
                            <TopCard2Component 
                                fullName='Fola kemi'
                                email='Aboyidaniel9@gmail.com'
                                profileImage={artWorkSample}
                                userRole='Super Admin'
                                showMoreOptionsIcon={true}
                                openAdminUserModalFn={setOpenAdminUserModal}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box>
                            <TopCard2Component 
                                fullName='Fola kemi'
                                email='Aboyidaniel9@gmail.com'
                                profileImage={artWorkSample}
                                userRole='Super Admin'
                                showMoreOptionsIcon={true}
                                openAdminUserModalFn={setOpenAdminUserModal}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box>
                            <TopCard2Component 
                                fullName='Fola kemi'
                                email='Aboyidaniel9@gmail.com'
                                profileImage={artWorkSample}
                                userRole='Super Admin'
                                showMoreOptionsIcon={true}
                                openAdminUserModalFn={setOpenAdminUserModal}
                            />
                        </Box>
                    </Grid> */}


                    <Grid item xs={12} sm={6} md={4}>
                        <Box>
                            <Box
                                sx={{
                                    // height: "91px",
                                    borderRadius: "10px",
                                    background: "#FFF",
                                    p: 2
                                }}  
                            >
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography
                                        sx={{
                                            color: kolors.dark,
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            lineHeight: "11.101px",
                                            letterSpacing: "-0.463px"
                                        }}
                                    >Admins</Typography>


                                    <Button variant="contained" type="button"
                                        size='small'
                                        onClick={() => {
                                            setOpenAddNewAdminModal(true)
                                        }} 
                                        // disabled={ !linktreeUrl.length } 
                                        sx={{
                                            ...submitBtnStyle,
                                            p: "5px 10px",
                                            borderRadius: "5px",
                                            fontWeight: "500",
                                        }}
                                    >Add an Admin
                                        <AddIcon sx={{ fontSize: "16px" }} />
                                    </Button>

                                </Stack>

                                <Box my={3}>
                                    {
                                        allAdmins?.map((admins, index) => (
                                            <Stack spacing={1} my={1} key={index}
                                                onClick={() => setSelectedUser(admins)}
                                            >
                                                <AdminUsersComponent 
                                                    fullName={ admins.firstName + " " + admins.lastName }
                                                    email={ admins.email }
                                                    // profileImage={artWorkSample}
                                                    userRole={ admins.role }
                                                    // showMoreOptionsIcon={true}
                                                    openAdminUserModalFn={setOpenAdminUserModal}
                                                />
                                                <Divider sx={{mt: 1}} />
                                            </Stack>
                                        ))
                                    }

                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs>
                        <Box>
                            <Box
                                sx={{
                                    // height: "91px",
                                    borderRadius: "10px",
                                    background: "#FFF",
                                    p: 2
                                }}  
                            >
                                <Stack spacing={3}>
                                    <Typography
                                        sx={{
                                            color: kolors.dark,
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            lineHeight: "11.101px",
                                            letterSpacing: "-0.463px"
                                        }}
                                    >Best performing projects</Typography>

                                    <Box>
                                        <TableContainer>
                                            <Table aria-label="Best performing projects table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>#</TableCell>
                                                        <TableCell>Project Name</TableCell>
                                                        <TableCell>Release Date</TableCell>
                                                        <TableCell>Release Type</TableCell>
                                                        <TableCell>Artist Name</TableCell>
                                                        <TableCell>Revenue</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {
                                                        bestPerformingProjects ?
                                                            bestPerformingProjects.map((row, index) => (
                                                                <TableRow key={row._id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell component="th" scope="row"
                                                                    >{ index + 1 }.</TableCell>
                                                                    {/* >{ (limitNo * (currentPageNo - 1)) + (index + 1) }.</TableCell> */}
                                                                    
                                                                    <TableCell>{row.title}</TableCell>
                                                                    <TableCell>{row.releaseDate}</TableCell>
                                                                    <TableCell>{row.releaseType}</TableCell>
                                                                    <TableCell>{row.mainArtist.spotifyProfile.name}</TableCell>
                                                                    <TableCell sx={{ color: "#0AA623" }}>
                                                                        { currencyDisplay(Number(row.totalRevenue)) }
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        : <></>
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>

            </Box>

            {
                selectedUser && 
                    <ViewAdminUserDataModal 
                        adminUser={selectedUser}
                        closeAdminUserModal={setOpenAdminUserModal}
                        openAdminUserModal={openAdminUserModal}
                    />
            }


            <AddNewAdminModal 
                closeAddNewAdminModal={setOpenAddNewAdminModal}
                openAddNewAdminModal={openAddNewAdminModal}
            />
        </Box>
    );
};

export default Dashboard;



interface TopCard1_Props {
    title: string,
    showMoreOptionsIcon?: boolean,
    bottomLeftJSX: React.ReactNode,
    bottomRightJSX: React.ReactNode,
}

const TopCard1Component: React.FC<TopCard1_Props> = (
    { title, showMoreOptionsIcon = false, bottomLeftJSX, bottomRightJSX }
) => {

    return (
        <Box
            sx={{
                // width: "312.465px",
                height: "135px",
                // flexShrink: 0,
                borderRadius: "10px",
                background: "#FFF",
                p: 2,
                display: "flex",
                flexDirection: "column"
            }}  
        >
            <Stack direction="row" spacing={2} 
                alignItems="center" justifyContent="space-between"
            >
                <Typography
                    sx={{
                        color: "#7B7979",
                        fontSize: "12px",
                        fontWeight: "500",
                        lineHeight: "11.101px",
                        letterSpacing: "-0.463px"
                    }}
                >{ title }</Typography>

                {
                    showMoreOptionsIcon && 
                    <MoreVertIcon 
                        sx={{
                            fontSize: "14px",
                            color: "#7B7979",
                        }}
                    />
                }
            </Stack>

            <Stack marginTop="auto"
                direction="row" spacing={2}
                alignItems="flex-end" justifyContent="space-between"
            >
                <Box>
                    { bottomLeftJSX }
                </Box>

                <Box>
                    { bottomRightJSX }
                </Box>
            </Stack>
        </Box>
    );
}


// interface TopCard2_Props {
//     profileImage: string,
//     fullName: string,
//     email: string,
//     userRole: string,
//     showMoreOptionsIcon?: boolean,
//     openAdminUserModalFn: (state: boolean) => void,
// }

// const TopCard2Component: React.FC<TopCard2_Props> = ({ 
//     profileImage, fullName, email, userRole, showMoreOptionsIcon = false,
//     openAdminUserModalFn
// }) => {

//     return (
//         <Box
//             sx={{
//                 // height: "91px",
//                 borderRadius: "10px",
//                 background: "#FFF",
//                 p: 2
//             }}  
//         >

//             <Stack direction="row" spacing={1.5} 
//                 alignItems="flex-start" justifyContent="space-between"
//             >
//                 <Avatar
//                     alt={`${fullName} profile image`}
//                     src={profileImage}
//                     sx={{ width: "65px", height: "65px" }}
//                     onClick={() => openAdminUserModalFn(true)}
//                 />

//                 <Box flexGrow={1}>
//                     <Stack direction="column" spacing={2.5} justifyContent="space-between"
//                         onClick={() => openAdminUserModalFn(true)}
//                     >
//                         <Box>
//                             <Typography
//                                 sx={{
//                                     color: kolors.dark,
//                                     fontSize: "12px",
//                                     fontWeight: "500",
//                                     lineHeight: "11.101px",
//                                     letterSpacing: "-0.463px",
//                                     ...numberOfLinesTypographyStyle(1)
//                                 }}
//                             >{ fullName }</Typography>

//                             <Typography
//                                 sx={{
//                                     color: "#7B7979",
//                                     fontSize: "10px",
//                                     fontWeight: "400",
//                                     lineHeight: "11.101px",
//                                     letterSpacing: "-0.2px",
//                                     ...numberOfLinesTypographyStyle(1)
//                                 }}
//                             >{ email }</Typography>
//                         </Box>
//                         <Box 
//                             sx={{
//                                 p: "5px 10px",
//                                 borderRadius: "5px",
//                                 bgcolor: "#FDCA7E",
//                                 marginTop: "auto",
//                                 width: "fit-content"
//                             }}
//                         >
//                             <Typography
//                                 sx={{
//                                     color: "#D68100",
//                                     fontSize: "8px",
//                                     fontWeight: "500",
//                                     // lineHeight: "7.401px",
//                                     letterSpacing: "-0.308px"
//                                 }}
//                             >{ userRole }</Typography>
//                         </Box>
//                     </Stack>
//                 </Box>

//                 {
//                     showMoreOptionsIcon && 
//                     <MoreVertIcon 
//                         sx={{
//                             fontSize: "14px",
//                             color: "#7B7979",
//                         }}
//                     />
//                 }
//             </Stack>
//         </Box>
//     );
// }


interface adminUsers_Props {
    profileImage?: string,
    fullName: string,
    email: string,
    userRole: string,
    showMoreOptionsIcon?: boolean,
    openAdminUserModalFn: (state: boolean) => void,
}

const AdminUsersComponent: React.FC<adminUsers_Props> = ({ 
    profileImage, fullName, email, userRole, showMoreOptionsIcon = false,
    openAdminUserModalFn
}) => {

    return (
        <Box>
            <Stack direction="row" spacing={1.5}
                alignItems="flex-start" justifyContent="space-between"
            >
                <Avatar
                    alt={`${fullName} profile image`}
                    src={profileImage}
                    children={stringAvatar(fullName)}
                    sx={{ 
                        width: "27px", height: "27px",
                        bgcolor: stringToColor(fullName),
                        fontSize: 14
                    }}
                    onClick={() => openAdminUserModalFn(true)}
                />

                <Box flexGrow={1}>
                    <Box onClick={() => openAdminUserModalFn(true)}>
                        <Typography
                            sx={{
                                color: kolors.dark,
                                fontSize: "12px",
                                fontWeight: "500",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.463px",
                                ...numberOfLinesTypographyStyle(1)
                            }}
                        >{ fullName }</Typography>

                        <Typography
                            sx={{
                                color: "#7B7979",
                                fontSize: "10px",
                                fontWeight: "400",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.2px",
                                ...numberOfLinesTypographyStyle(1)
                            }}
                        >{ email }</Typography>
                    </Box>
                </Box>

                <Box 
                    sx={{
                        p: "5px 10px",
                        borderRadius: "5px",
                        bgcolor: "#FDCA7E",
                        marginTop: "auto",
                        width: "fit-content"
                    }}
                >
                    <Typography
                        sx={{
                            color: "#D68100",
                            fontSize: "8px",
                            fontWeight: "500",
                            // lineHeight: "7.401px",
                            letterSpacing: "-0.308px"
                        }}
                    >{ userRole }</Typography>
                </Box>

                {
                    showMoreOptionsIcon && 
                    <MoreVertIcon 
                        sx={{
                            fontSize: "14px",
                            color: "#7B7979",
                        }}
                    />
                }
            </Stack>
        </Box>
    );
}