/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Card, Avatar, CardContent, Typography } from "@mui/material";
import { GoPerson } from "react-icons/go";

function TestamonialCard({ name, testamonial, college }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <div className="flex flex-row m-2">
                <Avatar aria-label="recipe" sx={{ backgroundColor: '#E9E9E9' }}>
                    <GoPerson />
                </Avatar>
                <div className="flex flex-col items-start ml-2">
                    <p className="text-md font-bold">{name}</p>
                    <p className="text-xs">{college}</p>
                </div>
            </div>
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>"{testamonial}"</Typography>
            </CardContent>
        </Card>
    )
}

export default TestamonialCard;