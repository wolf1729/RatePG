import '../styles/searchScreenStyle.css';
import { Button, Input, Select, Card, CardBody, Image, Stack, Heading, Text, CardFooter, ButtonGroup, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import HeaderComponent from '../components/header';
import { allPG } from '../../utils/pgAPICalls';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function SearchScreen() {
    const navigate = useNavigate()
    const toast = useToast()
    const [searchOption, setSearchOption] = useState('None');
    const [searchText, setSearchText] = useState('');
    const [pgDetails, setPGDetails] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [verified, setVerified] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const fetchPGDetails = async () => {
            try {
                const details = await allPG();
                setPGDetails(details);
            } catch (err) {
                console.log(err);
            }
        };

        fetchPGDetails()
        
    }, []);

    useEffect(() => {
        const gettingUserId = () => {
            try{
                return Cookies.get('userId')
            }
            catch(err) {
                console.log(err)
            }
        }
        
        const data = gettingUserId()
        setUserId(data)
        if(data){
            setVerified(true)
        }
    }, [])
    

    const calculateOverallRating = (overallRatingArray) => {
        let overallRating = 0
        for(let i=0; i<overallRatingArray.length; i++) {
            overallRating += overallRatingArray[i]
        }

        return (overallRating/overallRatingArray.length).toFixed(1)
    }

    const searchButtonFunction = async() => {
        try{
            if(searchText === ''){
                toast({
                    description: "Enter PG Name",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                return
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <HeaderComponent searchScreen={true} isVerified={verified}/>
            <div className="mainPageSearchContainer">
                <Select value={searchOption} onChange={(e) => setSearchOption(e.target.value)} size={['xs', 'md']} width={[59, 36]}>
                    <option value='name'>Name</option>
                </Select>
                <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} size={['xs', 'md']} width={['60%', '75%']} placeholder='Search Your PG' />
                <Button colorScheme="blue" size={['xs', 'md']} onClick={() => searchButtonFunction()}>Search</Button>
            </div>
            <div className='mainPageSearchResultContainer'>
                {pgDetails.map((pg, index) => (
                    <Card key={index} maxW='sm' shadow='rgba(0, 0, 0, 0.35) 0px 5px 15px' marginTop={10} marginLeft={5} marginRight={5}>
                        <CardBody>
                            <Stack display='flex' alignItems='center' justifyContent='center'>
                                <Image
                                    src={pg.pgImage}
                                    alt='PG image'
                                    borderRadius='lg'
                                />
                            </Stack>
                            <Stack mt='6' spacing='3'>
                                <Heading size='lg'>{pg.pgName}</Heading>
                                <Text>{pg.pgLocation}</Text>
                                <Text color='blue.600' fontSize= {20}>Rating : {calculateOverallRating(pg.overallRating)}/5.0</Text>
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
