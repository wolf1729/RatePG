import { GiCctvCamera, GiClothes, GiHotMeal } from "react-icons/gi";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
import { FaHouse, FaTv, FaWifi } from "react-icons/fa6";
import { MdEmojiTransportation } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { TbAirConditioning } from "react-icons/tb";

export const facilitiesDetails = [
    {
        facilitiesName: "Meals",
        facilitiesValue: "Meals",
        icon: <GiHotMeal size={25} />
    },
    {
        facilitiesName: "House Keeping",
        facilitiesValue: "houseKeeping",
        icon: <FaHouse size={25} />
    },
    {
        facilitiesName: "Laundry Service",
        facilitiesValue: "Laundry Service",
        icon: <GiClothes size={25} />
    },
    {
        facilitiesName: "Wi-fi",
        facilitiesValue: "Wi-fi",
        icon: <FaWifi />
    },
    {
        facilitiesName: "Security",
        facilitiesValue: "Security",
        icon: <GiCctvCamera />
    },
    {
        facilitiesName: "Common Area",
        facilitiesValue: "Common Area",
        icon: <PiMapPinSimpleAreaBold size={25} />
    },
    {
        facilitiesName: "Transportation",
        facilitiesValue: "Transportation",
        icon: <MdEmojiTransportation size={25} />
    },
    {
        facilitiesName: "Gym",
        facilitiesValue: "Gym",
        icon: <CgGym size={25} />
    },
    {
        facilitiesName: "TV",
        facilitiesValue: "TV",
        icon: <FaTv size={25} />
    },
    {
        facilitiesName: "Air Conditioning",
        facilitiesValue: "Air Conditioning",
        icon: <TbAirConditioning size={25} />
    },
  ]