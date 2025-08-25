import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import axios from "axios";
import EventCard from "./EventCard";

const categories = ["General", "Dev", "Open Source", "Innovate"];

const categoryColors: Record<string, string> = {
  General: "orange",
  Dev: "teal",
  "Open Source": "blue",
  Innovate: "purple",
};

interface Event {
    calendar_link: string;
    description: string;
    end_time: string;
    instagram_link: string;
    location: string;
    start_time: string;
    title: string;
    _id: string;
}

const EventsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);

    useEffect(() => {
        const upcomingEventsEndpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/events?type=upcoming`;
        const pastEventsEndpoint = `${process.env.REACT_APP_BACKEND_URL}/api/v1/events?type=past`;

        const fetchEvents = async () => {
            try {
                const [upcomingRes, pastRes] = await Promise.all([
                    axios.get<Event[]>(upcomingEventsEndpoint),
                    axios.get<Event[]>(pastEventsEndpoint),
                ]);
            setUpcomingEvents(upcomingRes.data);
            setPastEvents(pastRes.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const toPST = (iso: string) =>
        new Date(new Date(iso).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );

    return (
        <Box sx={{ p: 4, mt: 12 }}>
        <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        sx={{ mb: 2, color: "white" }}
        >
            Events
        </Typography>

        {/* Categories */}
        <Box
            sx={{
            textAlign: "center",
            mb: 3,
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
            }}
        >
        {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const color = categoryColors[cat];
            return (
                <Button
                    key={cat}
                    onClick={() =>
                    setSelectedCategory(isSelected ? null : cat)
                    }
                    variant={isSelected ? "contained" : "outlined"}
                    sx={{
                    minWidth: 200,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: 24,
                    borderColor: color,
                    color: isSelected ? "white" : color,
                    bgcolor: isSelected ? color : "transparent",
                    "&:hover": {
                    bgcolor: isSelected ? color : "rgba(255,255,255,0.3)",
                    },
                    }}
                >
                    {cat}
                </Button>
            );
        })}
        </Box>
        {/* Past Events */}
        <Box sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
            <Typography
                variant="h3"
                align="center"
                fontWeight="bold"
                sx={{ mb: 4, color: "white" }}
            >
                Past Events
            </Typography>

            <Box
                sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 3, // spacing between cards
                }}
            >
                {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                    <Box
                    key={event._id}
                    sx={{
                        width: 320, // fixed card width
                        flex: "0 0 auto", // prevents stretching
                    }}
                    >
                    <EventCard
                        title={event.title}
                        startDate={event.start_time}
                        endDate={event.end_time}
                        location={event.location}
                        calendar_link={event.calendar_link}
                        description={event.description}
                        instagram_link={event.instagram_link}
                        _id={event._id}
                    />
                    </Box>
                ))
                ) : (
                <Typography sx={{ color: "white", mt: 2 }} align="center">
                    No past events yet.
                </Typography>
                )}
            </Box>
        </Box>
    </Box>
  );
};

export default EventsPage;


