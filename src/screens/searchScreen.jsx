/* eslint-disable no-unused-vars */
import '../styles/searchScreenStyle.css';
import { Button, Select, Card, CardBody, Image, Stack, Heading, Text, CardFooter, ButtonGroup, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import HeaderComponent from '../components/header';
import { allPG, findPGName } from '../../utils/pgAPICalls';
import { useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useSelector } from 'react-redux';

function SearchScreen() {
    const navigate = useNavigate();
    const toast = useToast();
    
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
                toast({
                    description: "Enter PG Name",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
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
            return <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>;
        } else if (searchOption === 'location') {
            return <span style={{ display: 'block', textAlign: 'left' }}>{item.pgLocation}</span>;
        }
    };

    return (
        <>
            <HeaderComponent searchScreen={true} isVerified={verified} />
            <div className="mainPageSearchContainer">
                <Select value={searchOption} onChange={(e) => setSearchOption(e.target.value)} size={['xs', 'md']} width={[59, 36]}>
                    <option value='name'>Name</option>
                    <option value='location'>Location</option>
                </Select>
                <Stack size={['xs', 'md']} width={['60%', '75%']} height='fit-content' zIndex={10}>
                    <ReactSearchAutocomplete
                        items={pgDetails}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                    />
                </Stack>
                <Button colorScheme="blue" size={['xs', 'md']} onClick={searchButtonFunction}>Search</Button>
            </div>
            <div className='mainPageSearchResultContainer'>
                {pgDetails.map((pg, index) => (
                    <Card key={index} width={['150px', '350px']} height={['250px', '500px']} shadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' marginTop={10} marginLeft={2} marginRight={2}>
                        <CardBody>
                            <Stack display='flex' alignItems='center' justifyContent='center'>
                                <Image
                                    src={pg.pgImage}
                                    alt='PG image'
                                    borderRadius='lg'
                                />
                            </Stack>
                            <Stack mt={['1', '6']}>
                                <Heading fontSize={['15px', '30px']}>{pg.name}</Heading>
                                <Text fontSize={['10px', '20px']}>{pg.pgLocation}</Text>
                                <Text color='blue.600' fontSize={['10px', '20px']}>Rating : {calculateOverallRating(pg.overallRating)}/5.0</Text>
                            </Stack>
                        </CardBody>
                        <CardFooter position='absolute' bottom='0' left='0'>
                            <ButtonGroup>
                                <Button variant='solid' size={['xs', 'lg']} colorScheme='blue' onClick={() => navigate(`/pgDetails/${pg._id}`)}>Show Details</Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default SearchScreen;
