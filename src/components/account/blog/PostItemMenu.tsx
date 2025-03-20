import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import kolors from '@/constants/kolors';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { blogInterface } from '@/typeInterfaces/blog.interface';
import { useBlogHook } from '@/hooks/blog/useBlogHook';


interface _props {
    blogPost: blogInterface,
    getBlogPosts: () => void,
}

const PostMenuComponent: React.FC<_props> = ({ blogPost, getBlogPosts }) => {
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({
		action: () => {},
		state: false,
		title: '',
		description: '',
	});

    const {
        deleteBlogPost
    } = useBlogHook();

    const handleDelete = () => {
        setDialogData({
            action: async () => {
                setIsLoading(true);
                setDialogData({
                    action: () => {},
                    state: false,
                    title: '',
                    description: '',
                });

                await deleteBlogPost(
                    `${blogPost._id}`,
                    () => {
                        getBlogPosts();
                        // setIsLoading(false);
                    }    
                );
                setIsLoading(false);
            },
            state: true,
            title: 'Confirm',
            description: 'Are you sure, you want to proceed with deleting this blog post?',
        });
  

        handleClose();
    }

    const menuItems = [
        {
            name: "View Post",
            action: () => {
                navigate(`/admin/blog/${blogPost._id}`);
                // navigate({
                //     pathname: `/admin/blog/${blogPost._id}`,
                //     search: `?${createSearchParams({
                //         blogPost_id: blogPost._id || ''
                //     })}`,
                // });
            },
            // display: blogPost.status != "Incomplete"
        },
        {
            name: "Edit",
            action: () => {
                navigate(`/admin/blog/edit/${blogPost._id}`);
            },
            // display: blogPost.status == "Incomplete" || blogPost.status == "Unpaid"
        },
        {
            name: "Delete",
            action: () => handleDelete(),
            // display: blogPost.status == "Incomplete" || blogPost.status == "Unpaid"
        }
    ];


    return (
        <Box>
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    size='small'
                    sx={{ 
                        bgcolor: kolors.tertiary,
                        ":hover": {
                            bgcolor: kolors.dark,
                        },  
                    }}
                >
                    <MoreVertIcon sx={{ color: "#fff" }} />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                // width: '20ch',
                            },
                        },
                    }}
                >
                    {
                        menuItems.map((item, index) => (
                            <MenuItem key={index} onClick={() => item.action()}
                                sx={item.name == "Delete" ? {
                                    bgcolor: "#A80D05",
                                    color: "#fff",
                                    ":hover": {
                                        bgcolor: "#701920",
                                    },    
                                } : {}}
                            > {item.name} </MenuItem>
                        ))
                    }
                </Menu>

                <ConfirmationDialog 
                    actionYes={() => {
                        dialogData.action();
                    }}
                    isSubmitting={isLoading}
                    openDialog={dialogData.state}
                    setOpenDialog={() => {
                        setDialogData({
                            action: () => {},
                            state: false,
                            title: '',
                            description: '',
                        });
                        setIsLoading(false);
                    }}
                    title={dialogData.title}
                    description={dialogData.description}
                />
            </div>
        </Box>
    );
}

export default PostMenuComponent;
