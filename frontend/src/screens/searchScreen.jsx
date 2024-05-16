import '../styles/searchScreenStyle.css'
import { Button, Input, Select } from "@chakra-ui/react"
import { useState } from "react"
import HeaderComponent from '../components/header';

function SearchScreen() {
    const [searchOption, setSearchOption] = useState('None');
    const [searchText, setSearchText] = useState('')

    return (
        <>
        <HeaderComponent searchScreen = {true}/>
        <div className="mainPageSearchContainer">
            <Select value={searchOption} onChange={(e) => setSearchOption(e.target.value)} size='md' width={36}>
                <option value='name'>Name</option>
                <option value='location'>Location</option>
            </Select>
            <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} size='md' width='75%' placeholder='Search Your PG'/>
            <Button colorScheme="blue">Search</Button>
        </div>
        </>
    )
}

export default SearchScreen
