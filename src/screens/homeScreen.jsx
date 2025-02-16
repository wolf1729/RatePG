import { TextField, Button } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import TestamonialCard from "../components/testmonialCard";
import HeaderComponent from "../components/header";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
    const navigation = useNavigate()

    return (
        <div className="w-full">
            <HeaderComponent />
            <div className="flex flex-col items-center justify-center text-center space-y-4 px-4 bg-[#F4F4F5] h-[600px] w-[100%]">
                <p className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                    Find Your Perfect Student Accommodation
                </p>
                <p className="text-muted-foreground text-gray-500 md:text-xl">
                    Discover comfortable and affordable PG accommodations near your college or school.
                </p>
                <div className="flex flex-row items-center gap-3">
                    <TextField 
                        id="outlined-basic" 
                        label="Enter your location" 
                        variant="outlined" 
                        size="small"
                        sx={{ backgroundColor: 'white'}}
                    />
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }} 
                        startIcon={<IoIosSearch />} 
                        size="large"
                        onClick={() => navigation("/search")}
                    >
                        Search
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-4 px-4 h-[500px] w-[100%]">
                <p className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                    What Students Say
                </p>
                <div className="flex flex-row items-center justify-evenly p-10">
                    <TestamonialCard name={"Rohit Kumar"} college={"Guru Gobind Singh Indraprastha University"} testamonial={"Great experience! The PG was clean, comfortable, and close to my college. Highly recommend!"} />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-4 px-4 bg-[#F4F4F5] h-[500px] w-[100%]">
                <p className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                    Ready to Find Your New Home?
                </p>
                <p className="text-muted-foreground text-gray-500 md:text-xl">
                    Join thousands of students who have found their perfect PG accommodation with us.
                </p>
                <div className="flex flex-row items-center gap-3">
                    <TextField 
                        id="outlined-basic" 
                        label="Enter your Email" 
                        variant="outlined" 
                        size="small"
                        sx={{ backgroundColor: 'white'}}
                    />
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }} 
                        size="large"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;
