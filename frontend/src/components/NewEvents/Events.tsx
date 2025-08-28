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
                const sortedPastEvents = pastRes.data.sort((a, b) => 
                    new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
                );
                setUpcomingEvents(upcomingRes.data);
                setPastEvents(sortedPastEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, mt: 12, maxWidth: "1600px", mx: "auto" }}>
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
                    gap: 3,
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
                                minWidth: {
                                    xs: "120px",
                                    sm: "160px",
                                    m: "200px",
                                    lg: "240px"
                                },
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: "bold",
                                fontSize: { xs: "0.8rem", sm: "1rem", lg: "1.5rem"},
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
            <Box sx={{ textAlign: "center", px: 0 }}>
                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                    sx={{ mb: 4, color: "white" }}
                >
                    Past Events
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {pastEvents.length > 0 ? (
                        pastEvents.map((event) => (
                            <Grid item key={event._id}>
                                <Box sx={{ width: 350, mr: 4 }}>
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
                            </Grid>
                        ))
                    ) : (
                        <Typography sx={{ color: "white", mt: 2 }} align="center">
                            No past events yet.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default EventsPage;