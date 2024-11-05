import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
// import { useSettingStore } from '@/state/settingStore';
import colors from '@/constants/kolors';
import { downloadFile } from '@/util/copyNshare';


interface _Props {
    songAudio: string,
    songTitle: string,
    subTitle?: string,
    title?: string,
    artistName?: string,
}

const SongPreviewComponent: React.FC<_Props> = ({
    songAudio, songTitle, subTitle, title, artistName
}) => {
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const waveDisplayRef = useRef();
    const waveSurferRef: any = useRef();
    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

    useEffect(() => {
        if(waveDisplayRef.current && songAudio) {
            waveSurferRef.current = WaveSurfer.create({
                container: waveDisplayRef.current,
                waveColor: colors.tertiary,
                progressColor: colors.milk,
                normalize: true,
                cursorColor: colors.primary,
                url: `${songAudio}`,
                height: 80,
                barWidth: 10,
                // barGap: 5
            });
        }

        return () => {
            if(waveSurferRef.current) {
                waveSurferRef.current.destroy();
            }
        }
    }, [songAudio]);


    return (
        <Box
            sx={{
                // height: "185px",
                borderRadius: "11px",
                bgcolor: colors.secondary,
                border: `1px solid ${colors.dark}`,
                width: "100%",
                // my: 1.5
            }}
        >
            <Stack 
                direction="row" alignItems="center" justifyContent="space-between"
                p="10px" bgcolor={colors.tertiary} borderRadius="11px" color={colors.milk}
            >
                <Box>
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "16px",
                            // lineHeight: "32px",
                            letterSpacing: "-0.13px"
                        }}
                    > { songTitle } </Typography>

                    { subTitle ? 
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "15.67px",
                                // lineHeight: "32px",
                                letterSpacing: "-0.1px",
                                color: "#CACACA"
                            }}
                        > { subTitle } </Typography>
                        : <></>
                    }
                </Box>

                <Box>
                    <IconButton size='small' title='Click to download'
                        onClick={() => downloadFile(songAudio, `${title} - ${artistName}`)}
                    >
                        <DownloadIcon sx={{ fontSize: "18px", color: colors.milk }} />
                    </IconButton>
                </Box>
            </Stack>

            <Stack 
                direction="row" alignItems="center" justifyContent="space-between" 
                spacing="10px" p="10px" 
            >
                <Box height="40px" flexGrow={1} overflow="hidden">
                    <Box ref={ waveDisplayRef }></Box>
                </Box>

                <Box>
                    {
                        isAudioPlaying ? (
                            <StopCircleOutlinedIcon sx={{ color: colors.milk, fontSize: "30px" }}  
                                onClick={() => { waveSurferRef.current.stop(); setIsAudioPlaying(false) }}
                            />
                        ) : (
                            <PlayArrowIcon sx={{ color: colors.milk, fontSize: "30px" }}  
                                onClick={() => { waveSurferRef.current.play(); setIsAudioPlaying(true); }}
                            />
                        )
                    }
                </Box>
            </Stack>
        </Box>
    )
}

export default SongPreviewComponent;