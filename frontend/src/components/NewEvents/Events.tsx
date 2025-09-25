import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import axios from "axios";
import EventCard from "./EventCard";

const categories = ["General", "Dev", "Open Source", "Innovate"];

const categoryColors: Record<string, string> = {
    General: "#EBB111",
    Dev: "#5DF0C4",
    "Open Source": "#64C3E3",
    Innovate: "#725DF0",
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
    event_type: string;
}

const EventsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const [upcomingRes, pastRes] = await Promise.all([
                    axios.get<Event[]>(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events?type=upcoming`),
                    axios.get<Event[]>(`${process.env.REACT_APP_BACKEND_URL}/api/v1/events?type=past`),
                ]);

                const sortedUpcoming = upcomingRes.data.sort(
                    (a, b) =>
                        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
                );
                const sortedPast = pastRes.data.sort(
                    (a, b) =>
                        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
                );

                setUpcomingEvents(sortedUpcoming);
                setPastEvents(sortedPast);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));

    const VISIBLE_COUNT = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? Math.max(upcomingEvents.length - VISIBLE_COUNT, 0) : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev >= Math.max(upcomingEvents.length - VISIBLE_COUNT, 0) ? 0 : prev + 1
        );
    };

    const filteredUpcomingEvents = selectedCategory
        ? upcomingEvents.filter((event: any) => event.event_type === selectedCategory)
        : upcomingEvents;

    const filteredPastEvents = selectedCategory
        ? pastEvents.filter((event: any) => event.event_type === selectedCategory)
        : pastEvents;

    let visibleEvents: Event[] = [];
    if (filteredUpcomingEvents.length <= VISIBLE_COUNT) {
        visibleEvents = filteredUpcomingEvents;
    } else {
        visibleEvents = filteredUpcomingEvents.slice(currentIndex, currentIndex + VISIBLE_COUNT);

        if (visibleEvents.length < VISIBLE_COUNT) {
            const wrapCount = VISIBLE_COUNT - visibleEvents.length;
            visibleEvents = visibleEvents.concat(filteredUpcomingEvents.slice(0, wrapCount));
        }
    }

    const [pastIndex, setPastIndex] = useState(0);

    const pastCols = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;
    const pastRows = 3;
    const pastPerPage = pastCols * pastRows;

    const paginatedPastEvents = [];
    for (let i = 0; i < filteredPastEvents.length; i += pastPerPage) {
        paginatedPastEvents.push(filteredPastEvents.slice(i, i + pastPerPage));
    }

    const handlePastPrev = () => {
        setPastIndex((prev) => (prev === 0 ? paginatedPastEvents.length - 1 : prev - 1));
    };

    const handlePastNext = () => {
        setPastIndex((prev) => (prev === paginatedPastEvents.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 4 },
                mt: 18,
                mb: 18,
                maxWidth: "1600px",
                mx: "auto",
            }}
        >
            <Typography
                variant="h3"
                align="center"
                fontWeight="bold"
                sx={{ mb: 2, color: "white", fontSize: { sm: "30px", md: "65px" } }}
            >
                Events
            </Typography>

            {/* Category Buttons */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: { xs: 2, md: 6 },
                    flexWrap: "wrap",
                    mb: 3,
                    mt: 6,
                }}
            >
                {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    const color = categoryColors[cat];
                    return (
                        <Button
                            key={cat}
                            onClick={() => setSelectedCategory(isSelected ? null : cat)}
                            variant={isSelected ? "contained" : "outlined"}
                            sx={{
                                minWidth: { xs: "120px", sm: "160px", lg: "240px" },
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: "bold",
                                fontSize: { xs: "0.8rem", sm: "1rem", lg: "1.5rem" },
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

            {/* Upcoming Events */}
            <Box sx={{ textAlign: "center", mb: 20, mt: 8 }}>
                {filteredUpcomingEvents.length > 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            gap: { xs: 1, sm: 3 },
                        }}
                    >
                        {filteredUpcomingEvents.length > VISIBLE_COUNT && (
                            <IconButton
                                disableRipple
                                onClick={handlePrev}
                                sx={{
                                    color: "white",
                                    position: { xs: "absolute", sm: "static" },
                                    left: { xs: 0, sm: "auto" },
                                    zIndex: 2,
                                    "&:hover": { color: "rgba(255,255,255,0.3)" },
                                }}
                            >
                                <ArrowBackIosNewRounded sx={{ fontSize: { xs: 28, sm: 36 } }} />
                            </IconButton>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mx: { xs: 4, sm: 2 },
                                width: { xs: "100%", sm: "auto" },
                                maxWidth: { xs: "70%", sm: "none" },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: { xs: 2, sm: 4, md: 8 },
                                    flexWrap: "nowrap",
                                }}
                            >
                                {visibleEvents.map((event) => (
                                    <Box
                                        key={event._id}
                                        sx={{
                                            flex: "1 1 0",
                                            minWidth: "260px",
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
                                ))}
                            </Box>
                        </Box>
                        {filteredUpcomingEvents.length > VISIBLE_COUNT && (
                            <IconButton
                                disableRipple
                                onClick={handleNext}
                                sx={{
                                    color: "white",
                                    position: { xs: "absolute", sm: "static" },
                                    right: { xs: 0, sm: "auto" },
                                    zIndex: 2,
                                    "&:hover": { color: "rgba(255,255,255,0.3)" },
                                }}
                            >
                                <ArrowForwardIosRounded sx={{ fontSize: { xs: 28, sm: 36 } }} />
                            </IconButton>
                        )}
                    </Box>
                ) : (
                    <Typography sx={{ color: "white", mt: 2, fontSize: "1.5rem" }} align="center">
                        No upcoming events.
                    </Typography>
                )}
            </Box>

            {/* Past Events */}
            <Box sx={{ textAlign: "center" }}>
                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                    fontSize={65}
                    sx={{ mb: 8, color: "white", fontSize: { sm: "30px", md: "65px" } }}
                >
                    Past Events
                </Typography>

                {filteredPastEvents.length > 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            gap: { xs: 0 },
                        }}
                    >
                        {paginatedPastEvents.length > 1 && (
                            <IconButton
                                disableRipple
                                onClick={handlePastPrev}
                                sx={{
                                    color: "white",
                                    position: { xs: "absolute", sm: "static" },
                                    left: { xs: 0, sm: "auto" },
                                    zIndex: 2,
                                    "&:hover": { color: "rgba(255,255,255,0.3)" },
                                }}
                            >
                                <ArrowBackIosNewRounded sx={{ fontSize: { xs: 28, sm: 36 } }} />
                            </IconButton>
                        )}

                        <Box
                            sx={{
                                flex: 1,
                                mx: { xs: 8, sm: 2 },
                                width: "100%",
                            }}
                        >
                            <Grid container spacing={3} justifyContent="center">
                                {paginatedPastEvents[pastIndex].map((event) => (
                                    <Grid
                                        item
                                        key={event._id}
                                        xs={12} sm={6} md={4} lg={3}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box sx={{ width: "100%" }}>
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
                                ))}
                            </Grid>
                        </Box>

                        {paginatedPastEvents.length > 1 && (
                            <IconButton
                                disableRipple
                                onClick={handlePastNext}
                                sx={{
                                    color: "white",
                                    position: { xs: "absolute", sm: "static" },
                                    right: { xs: 0, sm: "auto" },
                                    zIndex: 2,
                                    "&:hover": { color: "rgba(255,255,255,0.3)" },
                                }}
                            >
                                <ArrowForwardIosRounded sx={{ fontSize: { xs: 28, sm: 36 } }} />
                            </IconButton>
                        )}
                    </Box>
                ) : (
                    <Typography
                        sx={{ color: "white", mt: 8, mb: 8, fontSize: "1.5rem", width: "100%" }}
                        align="center"
                    >
                        No past events.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default EventsPage;