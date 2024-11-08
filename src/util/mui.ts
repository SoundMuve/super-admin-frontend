import { createTheme, SxProps, Theme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import colors from '@/constants/kolors';

export const customTextFieldTheme = (outerTheme: Theme, darkTheme: boolean = true) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': darkTheme ? '#FFFFFF' : '#000',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                        '& .MuiInputBase-input': { // Target input text
                            color: darkTheme ? '#fff' : "#000", // Change to your desired text color
                        },
                        '& .MuiInputBase-placeholder': { // Target placeholder text
                            color: 'gray', // Change to your desired placeholder color
                        },

                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });



export const MuiTextFieldStyle = (darkTheme: boolean = true) =>{

    return (
        {
            '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
            },
            '& .MuiInputBase-input': { // Target input text
                color: darkTheme ? '#fff' : "#000",
                fontSize: '1rem',
                fontWeight: '400',
                lineHeight: 1.5
            },
            '& .MuiInputBase-placeholder': { // Target placeholder text
                color: 'gray',
                fontSize: '1rem',
                fontWeight: '400',
                lineHeight: 1.5
            },
            '& .MuiOutlinedInput-root': {
                // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
                borderRadius: '13.79px',
                // height: '42px',
        
                '& fieldset': {
                    border: '1px solid #b9c1cd'
                },
                '&:hover fieldset': {
                    border: '1px solid #434e5e'
                },
                '&.Mui-focused fieldset': {
                    border: '1px solid #434e5e'
                },
            },



            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                display: "none",
            },
            
            "& input[type=number]": {
                MozAppearance: "textfield",
            },
        }
    )
}

export const auth2MuiTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: "#fff",
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '13.79px',
        borderColor: "#fff",
        // height: '42px',

        '& fieldset': {
            // border: `1px solid ${colors.primary}`,
            borderColor: "#fff",
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}

export const releaseTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: colors.dark,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5,
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '13.79px',
        // height: '42px',

        '& fieldset': {
            // border: `1px solid ${colors.primary}`,
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}

export const releaseTextFieldStyle2: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: "#fff", // colors.milk,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '13.79px',
        // height: '42px',

        '& fieldset': {
            border: `1px solid ${colors.milk}`,
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}

export const paymentTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: colors.dark,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '10px',
        // height: '42px',

        '& fieldset': {
            border: `1px solid ${colors.dark}`,
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}

export const releaseSelectStyle3: SxProps<Theme> = {
    color: colors.dark,
    borderRadius: "16px",
    bgcolor: colors.milk,
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: colors.milk,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.primary, // 'rgba(228, 219, 233, 0.25)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.primary, // 'var(--TextField-brandBorderHoverColor)',
    },
    '.MuiSvgIcon-root ': {
        fill: colors.dark,
    }
}

export const releaseSelectStyle2: SxProps<Theme> = {
    color: colors.dark,
    borderRadius: "16px",
    // bgcolor: colors.primary,
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: colors.dark,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.primary, // 'rgba(228, 219, 233, 0.25)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.primary, // 'var(--TextField-brandBorderHoverColor)',
    },
    '.MuiSvgIcon-root ': {
        fill: colors.dark,
    }
}

export const releaseSelectStyle: SxProps<Theme> = {
    color: colors.milk,
    borderRadius: "6px",
    bgcolor: colors.primary,
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: colors.primary,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(228, 219, 233, 0.25)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--TextField-brandBorderHoverColor)',
    },
    '.MuiSvgIcon-root ': {
        fill: colors.milk,
    }
}

export const homeSelectStyle: SxProps<Theme> = {
    color: colors.milk,
    borderRadius: "16px",
    bgcolor: colors.dark,
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: colors.dark,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(228, 219, 233, 0.25)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--TextField-brandBorderHoverColor)',
    },
    '.MuiSvgIcon-root ': {
        fill: colors.milk,
    }
}

export const authMuiTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: colors.dark,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '13.79px',
        // height: '42px',

        '& fieldset': {
            // border: `1px solid ${colors.primary}`,
        },
        '&:hover fieldset': {
            border: `2px solid ${colors.primary}`,
        },
        '&.Mui-focused fieldset': {
            border: `1px solid ${colors.primary}`,
        },
    },



    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}


export const contactMuiTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        // color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: colors.dark,
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5,
        bgcolor: {xs: "#2E2E2E", md: "#F1F1D6"},
        borderRadius: '12px',
        // padding: "15px",
    },

    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '12px',
        // height: '42px',
        border: 0,
        // padding: "15px",
        '&.MuiInputBase-multiline': {
            padding: "0",
            '& .MuiInputBase-input': {
                padding: "15px",
            }
        },


        '& fieldset': {
            // border: '1px solid #b9c1cd',
            border: 0,
        },
        '&:hover fieldset': {
            // border: '1px solid #434e5e',
            border: 0,
        },
        '&.Mui-focused fieldset': {
            // border: '1px solid #434e5e',
            border: 0,
        },
    },

    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}

export const submitBtnStyle: SxProps<Theme> = { 
    bgcolor: colors.primary,
    borderRadius: "17px",
    // p: "10px 26px 10px 26px",
    p: "16px 25px",
    // width: "fit-content",
    height: "auto",
    "&.Mui-disabled": {
        background: "#9c9c9c",
        color: "#797979"
    },
    "&:hover": {
        bgcolor: colors.primary,
    },
    "&:active": {
        bgcolor: colors.primary,
    },
    "&:focus": {
        bgcolor: colors.primary,
    },

    fontWeight: '700',
    fontSize: "12px",
    lineHeight: "12px",
    // letterSpacing: "-0.13px",
    // textAlign: 'center',
    color: colors.milk,
    textTransform: "none"
}

export const MuiSelectFieldStyle = (darkTheme: boolean = true) =>{

    return (
        {
            color: darkTheme ?  "#fff" : "#000",
            borderRadius: "16px",
            // bgcolor: darkTheme ? "#fff" : "#272727",

            '.MuiOutlinedInput-notchedOutline': {
                borderColor: darkTheme ? '#fff' : "#b9c1cd",
                borderWidth: 1
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#434e5e', // 'rgba(228, 219, 233, 0.25)',
                borderWidth: 1
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#434e5e', // 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                borderWidth: 1
            },
            '.MuiSvgIcon-root ': {
                fill: darkTheme ? "#fff" : "#797979",
            }
        }
    )
}

export const numberOfLinesTypographyStyle = (num: number) => {
    const style: SxProps<Theme> = { 
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: num,
    }

    return style;
}


export const contentWidth: SxProps<Theme> = {
    width: {xs: "calc(100% - 40px)", sm: "calc(100% - 100px)", md: "calc(100% - 140px)" },
    maxWidth: "1300px",
    mx: "auto",
}

