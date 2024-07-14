/* eslint-disable no-unused-vars */
import '../styles/searchScreenStyle.css';
import { Button, Select, Card, CardBody, Image, Stack, Heading, Text, CardFooter, ButtonGroup, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import HeaderComponent from '../components/header';
import { allPG, findPGName } from '../../utils/pgAPICalls';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function SearchScreen() {
    const navigate = useNavigate();
    const toast = useToast();
    const [searchOption, setSearchOption] = useState('name');
    const [searchText, setSearchText] = useState('');
    const [pgDetails, setPGDetails] = useState([]);
    const [verified, setVerified] = useState(false);
    const [userId, setUserId] = useState('');

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

    useEffect(() => {
        const gettingUserId = () => {
            try {
                return Cookies.get('userId');
            } catch (err) {
                console.log(err);
            }
        };

        const data = gettingUserId();
        setUserId(data);
        if (data) {
            setVerified(true);
        }
    }, []);

    const calculateOverallRating = (overallRatingArray) => {
        let overallRating = 0;
        for (let i = 0; i < overallRatingArray.length; i++) {
            overallRating += overallRatingArray[i];
        }
        return (overallRating / overallRatingArray.length).toFixed(1);
    };

    const searchButtonFunction = async (pgName) => {
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
            const newData = await findPGName(pgName)
            await setPGDetails(newData)
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
        setSearchText(item)
    };

    const handleOnFocus = () => {
        console.log('Focused');
    };

    const formatResult = (item) => {
        if (searchOption === 'name') {
            return (
                <>
                    <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
                </>
            )
        }
        else if(searchOption === 'location') {
            return (
                <>
                    <span style={{ display: 'block', textAlign: 'left', height: 'fit-content' }}>{item.pgLocation}</span>
                </>
            )
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
                <Button colorScheme="blue" size={['xs', 'md']} onClick={() => searchButtonFunction()}>Search</Button>
            </div>
            <div className='mainPageSearchResultContainer'>
                {pgDetails.map((pg, index) => (
                    <Card key={index} maxW='sm' shadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' marginTop={10} marginLeft={2} marginRight={2}>
                        <CardBody>
                            <Stack display='flex' alignItems='center' justifyContent='center'>
                                <Image
                                    src={pg.pgImage}
                                    alt='PG image'
                                    borderRadius='lg'
                                />
                            </Stack>
                            <Stack mt='6' spacing='3'>
                                <Heading size='lg'>{pg.name}</Heading>
                                <Text>{pg.pgLocation}</Text>
                                <Text color='blue.600' fontSize={20}>Rating : {calculateOverallRating(pg.overallRating)}/5.0</Text>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='blue' onClick={() => navigate(`/pgDetails/${pg._id}`)}>Show Details</Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default SearchScreen;
