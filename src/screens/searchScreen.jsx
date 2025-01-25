import '../styles/searchScreenStyle.css';
import { useState, useEffect } from 'react';
import HeaderComponent from '../components/header';
import { allPG, findPGName } from '../../utils/pgAPICalls';
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
                const details = await allPG();
                const formattedDetails = details.map((pg, index) => ({
                    id: index, 
                    name: pg.pgName, 
                    pgLocation: pg.pgLocation, 
                    pgImage: pg.pgImage, 
                    overallRating: pg.overallRating,
                    _id: pg._id
                }));
                setPGDetails(formattedDetails);
            } catch (err) {
                console.log(err);
            }
        };

        fetchPGDetails();
    }, []);

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
        setSearchText(item.name || item.pgLocation);  // Modify depending on the search option
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
            <div className="mainPageSearchContainer flex flex-col items-center mt-5">
                <div className="mb-4 flex items-center">
                    <select 
                        value={searchOption} 
                        onChange={(e) => setSearchOption(e.target.value)} 
                        className="p-2 border border-gray-300 rounded-md mr-4">
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
                            autoFocus
                            formatResult={formatResult}
                        />
                    </div>
                </div>
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md" 
                    onClick={searchButtonFunction}>
                    Search
                </button>
            </div>

            <div className={`mainPageSearchResultContainer flex flex-row items-center ${ pgDetails.length !== 0 ? "" : "justify-center"} mt-10`}>
                { pgDetails.length === 0 && <CircularProgress /> }
                {pgDetails.map((pg, index) => (
                    <PgCardComponent key={index} index={index} pg={pg} calculateOverallRating={calculateOverallRating} navigate={navigate} />
                ))}
            </div>
        </>
    );
}

export default SearchScreen;
