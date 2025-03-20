import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import kolors from '@/constants/kolors';
import TextField from '@mui/material/TextField';
import { newsletterMuiTextFieldStyle } from '@/util/mui';


interface myProps {
    keywords: string[];
    setKeywords: (keywords: string[]) => void;

    metaTitle: string;
    setMetaTitle: (metaTitle: string) => void;

    metaDescription: string;
    setMetaDescription: (metaTitle: string) => void;
};

const SeoMetaDataComponent: React.FC<myProps> = ({
    keywords, setKeywords, metaTitle, setMetaTitle, metaDescription, setMetaDescription
}) => {
    // Function to handle the string input and update the state
    const handleKeywordsInput = (inputString: string) => {
        // Split the string by commas, trim extra spaces, and filter out empty items
        const newArray = inputString
            .split(',').map(item => item.trim())
            .filter(item => item !== ''); // Remove empty strings
    
        // Update the state by appending the new array to the existing one
        setKeywords([...keywords, ...newArray]);
        // setInputValue('');
    };

    
    return (
        <Card variant="outlined">
            <CardHeader
                title={
                    <Typography variant='subtitle1'
                        sx={{
                            color: kolors.dark,
                            fontSize: "14px",
                            fontWeight: "500",
                            // lineHeight: "11.101px",
                            // letterSpacing: "-0.463px",
                        }}
                    >SEO</Typography>
                }
                // subheader="September 14, 2016"
                sx={{
                    borderBottom: "1px solid #c4c4c4"
                }}
            />

            <CardContent>
                <Box>
                    {/* Keywords */}
                    <Box mb={2}>
                        <Typography variant='subtitle1'
                            sx={{
                                color: kolors.dark,
                                fontSize: "14px",
                                fontWeight: "500",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.463px",
                                my: 1
                            }}
                        >Keywords - <Typography component="span"
                                sx={{
                                    color: "grey",
                                    fontSize: "12px",
                                    fontWeight: "400",
                                }}
                            > Separate keywords with commas</Typography>
                        </Typography>

                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            name='keywords'
                            placeholder=''
                            size='small'
                            value={keywords.toString()}
                            onChange={(e) => handleKeywordsInput(e.target.value)}
                            sx={{
                                ...newsletterMuiTextFieldStyle
                            }}
                        />
                    </Box>
                    
                    {/* metaTitle */}
                    <Box mb={2}>
                        <Typography variant='subtitle1'
                            sx={{
                                color: kolors.dark,
                                fontSize: "14px",
                                fontWeight: "500",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.463px",
                                my: 1
                            }}
                        >Meta Title</Typography>

                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            name='metaTitle'
                            placeholder=''
                            size='small'
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            sx={{
                                ...newsletterMuiTextFieldStyle
                            }}
                        />
                    </Box>

                    <Box mb={2}>
                        <Typography variant='subtitle1'
                            sx={{
                                color: kolors.dark,
                                fontSize: "14px",
                                fontWeight: "500",
                                lineHeight: "11.101px",
                                letterSpacing: "-0.463px",
                                my: 1
                            }}
                        >Meta Description</Typography>

                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            placeholder=''
                            name='metaDescription'
                            size='small'
                            multiline
                            rows={5}
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            sx={{
                                ...newsletterMuiTextFieldStyle
                            }}
                        />
                    </Box>

                </Box>
            </CardContent>
        </Card>            
    );
}

export default SeoMetaDataComponent;

