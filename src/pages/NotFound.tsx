import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import HeaderComponent from '@/components/Header';
import { contentWidth } from '@/util/mui';
import colors from '@/constants/kolors';

import notFound from "@/assets/images/notFound.png";

export default function NotFoundPage() {

    return (
        <Box bgcolor={colors.bg} minHeight="100vh">
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                mt: { xs: "35px", md: "75px"}
            }}>
                <Container>
                    <Box textAlign="center" my={{xs: 5, md: 10}}>
                        <Box display={{xs: "none", md: "block"}} textAlign="center">
                            <img src={notFound} alt='404 Page Not Found Image' 
                                style={{
                                    width: "40%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>

                        <Box display={{xs: "block", md: "none"}} textAlign="center">
                            <img src={notFound} alt='404 Page Not Found Image' 
                                style={{
                                    width: "70%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>


                        <Typography variant="h1" component="h1"
                            sx={{
                                fontFamily: "Nohemi",
                                fontWeight: "900",
                                fontSize: {xs: "35px", md: "60px"},
                                lineHeight: {xs: "35.16px", md: "60.27px"},
                                textAlign: "center",
                                // color: colors.milk
                            }}
                        >
                            The page you're looking for doesn't exist.
                        </Typography>
                    </Box>

                </Container>
            </Box>

        </Box>
    )
}
