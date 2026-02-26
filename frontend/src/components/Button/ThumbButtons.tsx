import React, { useState, useEffect} from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";

interface ThumbButtonProps {
  userEmail: string;
  eventId: string;
}

const ThumbButtons = ({ userEmail, eventId } : ThumbButtonProps) => {
  const [selected, setSelected] = useState<1 | -1 | null>(null);
  const API = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1` });

  useEffect(() => {
    const fetchReaction = async () => {
      try {
        const response = await API.get(`/reactions/${userEmail}/${eventId}`);
        if (response.data && response.data.reactionType) {
          setSelected(response.data.reactionType);
        }
      } catch (error) {
        console.error("Error fetching reaction:", error);
      }
    };

    fetchReaction();
  }, [userEmail, eventId]);

  const updateReaction = async (reaction: 1 | -1 | null) => {
    try {
      await API.post("/reactions/create", {
        userEmail,
        eventId,
        reactionType: reaction,
      });
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };
  
  const handleThumbUp = () => {
    const newReaction = selected === 1 ? null : 1;
    setSelected(newReaction);
    updateReaction(newReaction);
  };

  const handleThumbDown = () => {
    const newReaction = selected === -1 ? null : -1;
    setSelected(newReaction);
    updateReaction(newReaction);
  };

  return (
    <Stack direction="row" spacing={2}>
      {/* Thumbs Up Button */}
      <Button
        variant="contained"
        startIcon={<ThumbUpIcon />}
        onClick={handleThumbUp}
        style={{
          backgroundColor: selected === 1 ? "#1976d2" : "#e0e0e0",
          color: selected === 1 ? "#fff" : "#000",
          textTransform: "none",
        }}
      />
      {/* Thumbs Down Button */}
      <Button
        variant="contained"
        startIcon={<ThumbDownIcon />}
        onClick={handleThumbDown}
        style={{
          backgroundColor: selected === -1 ? "#d32f2f" : "#e0e0e0",
          color: selected === -1 ? "#fff" : "#000",
          textTransform: "none",
        }}
      />
    </Stack>
  );
};

export default ThumbButtons;
