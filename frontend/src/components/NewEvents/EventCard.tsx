import React from "react";
import { Typography, Card, Box } from "@mui/material";

type EventCardProps = {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  calendar_link: string;
  description: string;
  instagram_link: string;
  _id: string;
};

const EventCard = ({
    title,
    startDate,
    endDate,
    location,
    calendar_link,
    description,
    instagram_link,
    _id,
  }: EventCardProps) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const formattedDate = start.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  
    const formattedTime = `${start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })} - ${end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  
    return (
        <Card
            sx={{
            width: "100%",
            height: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid",
            borderImageSlice: 1,
            borderWidth: 2,
            borderImageSource: "linear-gradient(45deg, orange, cyan, purple, blue)",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            }}
        >
            <Typography
                variant="subtitle1"
                fontWeight="bold"
                align="center"
                sx={{ mb: 1,
                      overflowWrap: "break-word", 
                      wordBreak: "break-word", 
                    }}
            >
                {title}
            </Typography>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    {formattedDate} | {formattedTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {location}
                </Typography>
            </Box>
        </Card>      
    );
  };
  

export default EventCard;