/* eslint-disable react/prop-types */

import { Avatar, Button, Divider, Drawer, Stack } from '@mui/material';
import { GoPerson } from 'react-icons/go';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/User/userSlice';

function SideNavigation({ user, isOpen, setIsOpen }) {
    const btnRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutFunction = () => {
        dispatch(logout());
        navigate('/search');
        setIsOpen(false)
    };

    const addNewPGFunction = () => {
        if (user.username !== null) {
            navigate('/newPGEntry');
        } else {
            navigate('/loginRegistration');
        }
    };

    return (
        <div>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
                ref={btnRef}
            >
                <Avatar alt="User Avatar" src={user.img || <GoPerson />} />
                <p className="text-sm md:text-lg">{user.username}</p>
            </Stack>

            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="overflow-hidden"
            >
                <div className="p-4 w-64">
                    <div className="text-center mb-4">
                        <p
                            onClick={addNewPGFunction}
                            className="text-lg cursor-pointer text-blue-600"
                        >
                            Add Your PG
                        </p>
                    </div>
                    <Divider />
                    <div className="text-center my-4">
                        <p
                            onClick={() => navigate('/profile')}
                            className="text-lg cursor-pointer text-blue-600"
                        >
                            Profile
                        </p>
                    </div>

                    <Button
                        variant="contained"
                        color="error"
                        className="w-full mt-4"
                        onClick={logoutFunction}
                    >
                        LogOut
                    </Button>
                </div>
            </Drawer>
        </div>
    );
}

export default SideNavigation;
