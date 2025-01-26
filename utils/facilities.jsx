import { GiCctvCamera, GiClothes, GiHotMeal } from "react-icons/gi";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
import { FaHouse, FaTv, FaWifi } from "react-icons/fa6";
import { MdEmojiTransportation } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { TbAirConditioning } from "react-icons/tb";

export const facilitiesDetails = [
    {
        facilitiesName: "Meals",
        facilitiesValue: "meals",
        icon: <GiHotMeal size={25} />
    },
    {
        facilitiesName: "House Keeping",
        facilitiesValue: "houseKeeping",
        icon: <FaHouse size={25} />
    },
    {
        facilitiesName: "Laundry Service",
        facilitiesValue: "laundryService",
        icon: <GiClothes size={25} />
    },
    {
        facilitiesName: "Wi-fi",
        facilitiesValue: "wifi",
        icon: <FaWifi />
    },
    {
        facilitiesName: "Security",
        facilitiesValue: "security",
        icon: <GiCctvCamera />
    },
    {
        facilitiesName: "Common Area",
        facilitiesValue: "commonArea",
        icon: <PiMapPinSimpleAreaBold size={25} />
    },
    {
        facilitiesName: "Transportation",
        facilitiesValue: "transportation",
        icon: <MdEmojiTransportation size={25} />
    },
    {
        facilitiesName: "Gym",
        facilitiesValue: "gym",
        icon: <CgGym size={25} />
    },
    {
        facilitiesName: "TV",
        facilitiesValue: "tv",
        icon: <FaTv size={25} />
    },
    {
        facilitiesName: "Air Conditioning",
        facilitiesValue: "airConditioning",
        icon: <TbAirConditioning size={25} />
    },
  ]