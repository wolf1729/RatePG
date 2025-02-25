import '../styles/searchScreenStyle.css';
import { useState, useEffect } from 'react';
import HeaderComponent from '../components/header';
import { findPGName } from '../../utils/pgAPICalls';
import { useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useSelector } from 'react-redux';
import PgCardComponent from '../components/pgCardComponent';
import { CircularProgress } from '@mui/material';

function SearchScreen() {
    const navigate = useNavigate();
    const [searchOption, setSearchOption] = useState('name');
    const [searchText, setSearchText] = useState('');
    const [pgDetails, setPGDetails] = useState([]);

    // Access Redux state
    const user = useSelector((state) => state.user);
    const { status } = user;
    const verified = status === 'succeeded';

    // Fetch PG details when the component mounts
    useEffect(() => {
        const fetchPGDetails = async () => {
            try {
                const pgData = localStorage.getItem("pgData");
                
                if (pgData) {
                    setPGDetails(JSON.parse(pgData));
                } else {
                    const allPGData = await fetch(`${import.meta.env.VITE_SERVER}/pgRoutes/allPGs`);
                    const data = await allPGData.json();
                    
                    localStorage.setItem("pgData", JSON.stringify(data));
                    
                    setPGDetails(data);
                }
            } 
            catch (err) {
                console.log("Error fetching PG details:", err);
            }
        };
    
        fetchPGDetails();
    }, []);
    
    useEffect(() => {
        const fetchBookmarkedPG = async () => {
            try {
                const bookmarkedPg = localStorage.getItem("bookmarkedPgData");
                console.log(bookmarkedPg)
                
                if (bookmarkedPg && bookmarkedPg!==undefined) {
                    console.log("in undefined section")
                    return
                } else {
                    const bookmarkedPGData = await fetch(`${import.meta.env.VITE_SERVER}/userRoutes/getBookmarkedPG`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            token: user.token,
                            uid: user.uid
                        })
                    });
                    const data = await bookmarkedPGData.json();
                    console.log(data)
                    localStorage.setItem("bookmarkedPgData", JSON.stringify(data.data));
                }
            } 
            catch (err) {
                console.log("Error fetching PG details:", err);
            }
        };
    
        fetchBookmarkedPG();
    }, [user]);

    useEffect(() => {
        const fetchUploadedPG = async () => {
            try {
                const uploadedPG = localStorage.getItem("uploadedPgData");
                
                if (uploadedPG) {
                    return
                } else {
                    const uploadedPGData = await fetch(`${import.meta.env.VITE_SERVER}/userRoutes/getUploadedPG`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            token: user.token,
                            uid: user.uid
                        })
                    });
                    const data = await uploadedPGData.json();
                    
                    localStorage.setItem("uploadedPgData", JSON.stringify(data.data));
                    
                    setPGDetails(data);
                }
            } 
            catch (err) {
                console.log("Error fetching PG details:", err);
            }
        };
    
        fetchUploadedPG();
    }, [user]);

    const calculateOverallRating = (overallRatingArray) => {
        let overallRating = 0;
        for (let i = 0; i < overallRatingArray.length; i++) {
            overallRating += overallRatingArray[i];
        }
        return (overallRating / overallRatingArray.length).toFixed(1);
    };

    const searchButtonFunction = async () => {
        try {
            if (searchText === '') {
                alert("Enter PG Name");
                return;
            }
            const newData = await findPGName(searchText);
            setPGDetails(newData);
        } catch (err) {
            console.log(err);
        }
    };

    // Auto Complete Search bar functions
    const handleOnSearch = (string, results) => {
        console.log(string, results);
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const handleOnSelect = (item) => {
        setSearchText(item.name || item.pgLocation); 
    };

    const handleOnFocus = () => {
        console.log('Focused');
    };

    const formatResult = (item) => {
        if (searchOption === 'name') {
            return <span className="block text-left">{item.name}</span>;
        } else if (searchOption === 'location') {
            return <span className="block text-left">{item.pgLocation}</span>;
        }
    };

    return (
        <>
            <HeaderComponent searchScreen={true} isVerified={verified} />
            <div className="flex flex-row items-center justify-evenly mt-5">
                <select 
                    value={searchOption} 
                    onChange={(e) => setSearchOption(e.target.value)} 
                    className="p-2 border border-gray-300 rounded-md m-2">
                    <option value='name'>Name</option>
                    <option value='location'>Location</option>
                </select>
                <div className="w-[75%]">
                    <ReactSearchAutocomplete
                        items={pgDetails}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        formatResult={formatResult}
                    />
                </div>
                <button 
                    className="px-4 py-2 bg-black text-white rounded-md m-2" 
                    onClick={searchButtonFunction}>
                    Search
                </button>
            </div>

            <div className={`mainPageSearchResultContainer flex flex-row items-center ${ pgDetails.length !== 0 ? "" : "justify-center"} mt-10`}>
                { pgDetails.length === 0 && <CircularProgress sx={{ color: 'black' }} /> }
                {pgDetails.map((pg, index) => (
                    <PgCardComponent key={index} index={index} pg={pg} calculateOverallRating={calculateOverallRating} navigate={navigate} />
                ))}
            </div>
        </>
    );
}

export default SearchScreen;
