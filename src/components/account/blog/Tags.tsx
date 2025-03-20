import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';


interface myProps {
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
};

const TagsComponent: React.FC<myProps> = ({
    selectedTags, setSelectedTags
}) => {
    // State to hold the input value
    const [inputValue, setInputValue] = React.useState('');

    // Function to handle the string input and update the state
    const handleStringInput = (inputString: string) => {
        // Split the string by commas, trim extra spaces, and filter out empty items
        const newArray = inputString
            .split(',').map(item => item.trim())
            .filter(item => item !== ''); // Remove empty strings
    
        // Update the state by appending the new array to the existing one
        setSelectedTags([...selectedTags, ...newArray]);
        setInputValue('');
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
                    >Tags</Typography>
                }
                // subheader="September 14, 2016"
                sx={{
                    borderBottom: "1px solid #c4c4c4"
                }}
            />

            <CardContent>
                <Box>
                    <Stack direction="row" alignItems="center" spacing="15px">
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            size='small'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        <Button variant='outlined' size='small' 
                            onClick={() => handleStringInput(inputValue)}
                            sx={{ 
                                width: "fit-content",
                                textTransform: "none",
                            }} 
                        >Add</Button>
                    </Stack>

                    <Stack mt={2} direction="row" 
                        alignItems="center" gap="10px"
                        flexWrap="wrap"
                    >
                        {
                            selectedTags.map((tag, index) => (
                                <Chip key={index} variant="outlined" 
                                    size='small'
                                    label={tag}
                                    onDelete={() => {
                                        // Use the filter method to create a new array excluding the item to remove
                                        const newTags = selectedTags.filter(item => item !== tag);
                                        setSelectedTags(newTags);
                                    }} 
                                />
                            ))
                        }
                    </Stack>

                    <Typography
                        sx={{
                            color: "grey",
                            fontSize: "12px",
                            fontWeight: "400",
                            // lineHeight: "11.101px",
                            // letterSpacing: "-0.463px",
                            mt: 2
                        }}
                    >Separate tags with commas</Typography>
                </Box>
            </CardContent>
        </Card>            
    );
}

export default TagsComponent;

