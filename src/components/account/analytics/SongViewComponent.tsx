import kolors from "@/constants/kolors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { numberOfLinesTypographyStyle } from "@/util/mui";
import sampleArtWork from '@/assets/images/sampleArtWork.png';


export default function SongViewComponent(
    { artWork, title, artist, active_id, song_id } : 
    { artWork: string, title: string, artist: string, active_id: string, song_id: string }
) {
    
    return (
        
        <Box 
            sx={{
                borderRadius: "8.65px",
                bgcolor: song_id == active_id ? kolors.primary : kolors.bodyBg, // kolors.secondary,
                color: song_id == active_id ? kolors.milk : kolors.dark,
                py: {xs: "6.02px",md: "6.5px"},
                px: "7px",
                width: "95%",
                // minWidth: "200px",
                // maxWidth: "300px",
    
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "7px",
                // mb: 2
            }}
        >
            <Box>
                <img 
                    src={ artWork || sampleArtWork } alt="cover art work"
                    style={{ 
                        width: "100%", 
                        minWidth: "50px",
                        maxWidth: "50px",
                        // height: "70px",
                        borderRadius: "5px",
                        backgroundColor: kolors.bg,
                        objectFit: "contain" 
                    }}
                />
            </Box>
    
            <Box>
                <Typography variant='body2'
                    sx={{
                        ...numberOfLinesTypographyStyle(1),
                        fontWeight: "700",
                        fontSize: "16.36px",
                        // lineHeight: "13.09px",
                        letterSpacing: "-0.09px",
                        // mb: "5px"
                    }}
                >{ title }</Typography>
    
                <Typography
                    sx={{
                        ...numberOfLinesTypographyStyle(1),
                        fontWeight: "400",
                        fontSize: "9.82px",
                        // lineHeight: "13.09px",
                        letterSpacing: "-0.09px"
                    }}
                >{ artist }</Typography>
            </Box>
    
        </Box>
    );
}
