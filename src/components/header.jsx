/* eslint-disable react/prop-types */
import '../styles/homePageHeaderStyle.css';
import { MdAir } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoPerson } from 'react-icons/go';
import { useState } from 'react';
import SideNavigation from './sideNavigation';

function HeaderButtons({ searchScreen, newEntryPage, user, navigation, setSideDrawer }) {
    if (searchScreen) {
        return user.username ? (
            <div className="flex flex-row items-center cursor-pointer" onClick={() => setSideDrawer(true)}>
                {user.img ? (
                    <img src={user.img} alt="Profile" className="rounded-full w-10 h-10" />
                ) : (
                    <GoPerson size={40} />
                )}
                <p className="font-sm md:text-2xl ml-2">{user.username}</p>
            </div>
        ) : (
            <div className="flex flex-wrap items-center justify-evenly">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm md:text-base"
                    onClick={() => {
                        if (user.username) {
                            navigation('/newPGEntry');
                        } else {
                            navigation('/loginRegistration');
                        }
                    }}
                >
                    Add a PG
                </button>
            </div>
        );
    } else if (newEntryPage) {
        return (
            <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm md:text-base"
                onClick={() => navigation('/search')}
            >
                Find a PG
            </button>
        );
    } else {
        return (
            <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm md:text-base"
                onClick={() => navigation('/FAQ')}
            >
                FAQ
            </button>
        );
    }
}

function HeaderComponent({ searchScreen = false, newEntryPage = false }) {
    const user = useSelector((state) => state.user);
    const navigation = useNavigate();
    const [sideDrawer, setSideDrawer] = useState(false);

    return (
        <div className="homepageHeaderMainContainer">
            <div className="flex items-center mb-5 mt-5 mx-2 md:mx-10" onClick={() => navigation("/")}>
                <MdAir size={25} />
                <span className="text-lg md:text-2xl font-bold ml-2">RatePG</span>
            </div>
            <div className="mb-5 mt-5 mx-2 md:mx-10">
                <HeaderButtons searchScreen={searchScreen} newEntryPage={newEntryPage} user={user} navigation={navigation} setSideDrawer={setSideDrawer} />
            </div>
            {sideDrawer && <SideNavigation user={user} isOpen={sideDrawer} setIsOpen={setSideDrawer} />}
        </div>
    );
}

export default HeaderComponent;
