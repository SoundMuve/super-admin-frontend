import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import kolors from '@/constants/kolors';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


interface myProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
};

let categories = ["All", "Artist spotlight", "Update"];

const CategoriesComponent: React.FC<myProps> = ({
    selectedCategories, setSelectedCategories
}) => {
    const [addNewCategory, setAddNewCategory] = React.useState(false);
    const [categoryInput, setCategoryInput] = React.useState('');

    const handleToggle = (value: string) => () => {
        const currentIndex = selectedCategories.indexOf(value);
        const newChecked = [...selectedCategories];
    
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    
        setSelectedCategories(newChecked);
    };
    
    
    return (
        <Box>
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
                        >Categories</Typography>
                    }
                    // subheader="September 14, 2016"
                    sx={{
                        borderBottom: "1px solid #c4c4c4"
                    }}
                />

                <CardContent>
                    <Box>
                        <Box>
                            <List sx={{ width: '100%', maxHeight: "250px", overflow: "scroll" }} dense disablePadding>
                                {categories.map((value, index) => {
                                    const labelId = `checkbox-list-label-${index}`;

                                    return (
                                        <ListItem key={index} disablePadding dense>
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={selectedCategories.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>

                                                <ListItemText id={labelId} primary={value} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>

                            <Button size='small' 
                                onClick={() => {
                                    setCategoryInput("");
                                    setAddNewCategory(!addNewCategory);
                                }}
                                sx={{ 
                                    width: "fit-content",
                                    textTransform: "none",
                                    textDecorationLine: "underline",
                                    mt:2
                                }} 
                            >+ Add New Category</Button>
                        </Box>

                        {
                            addNewCategory &&
                            <Box mt={2}>
                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    // placeholder='Category'
                                    size='small'
                                    value={categoryInput}
                                    onChange={(e) => setCategoryInput(e.target.value)}
                                    sx={{ mb: 2 }}
                                />

                                <Button variant='outlined' size='small'
                                    onClick={() => {
                                        if (categoryInput.length) {
                                            categories.push(categoryInput);
                                            setAddNewCategory(!addNewCategory);
                                            setCategoryInput("");
                                        }
                                    }}
                                    sx={{ 
                                        width: "fit-content",
                                        textTransform: "none",
                                        // textDecorationLine: "underline",
                                    }} 
                                >Add New Category</Button>
                            </Box>
                        }
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default CategoriesComponent;

