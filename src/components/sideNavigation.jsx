/* eslint-disable react/prop-types */
import { Button, Divider, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/User/userSlice';

function SideNavigation({ user, isOpen, setIsOpen }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutFunction = () => {
        dispatch(logout());
        navigate('/search');
        setIsOpen(false);
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
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="overflow-hidden"
            >
                <div className="p-4 w-64 flex flex-col justify-between h-full">
                    <div>
                        <div className="text-center mb-4">
                            <p
                                onClick={addNewPGFunction}
                                className="text-lg cursor-pointer"
                            >
                                Add Your PG
                            </p>
                        </div>
                        <Divider />
                        <div className="text-center my-4">
                            <p
                                onClick={() => console.log('Bookmarked Pg')}
                                className="text-lg cursor-pointer"
                            >
                                Bookmarked
                            </p>
                        </div>
                        <Divider />
                        <div className="text-center my-4">
                            <p
                                onClick={() => navigate('/profile')}
                                className="text-lg cursor-pointer"
                            >
                                Profile
                            </p>
                        </div>
                        
                    </div>

                    {/* LogOut button at the bottom */}
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
