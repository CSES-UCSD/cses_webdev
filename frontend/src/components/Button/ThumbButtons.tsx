import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ThumbButtons = () => {
  const [selected, setSelected] = useState<"up" | "down" | null>(null);

  const handleThumbUp = () => {
    setSelected(selected === "up" ? null : "up");
  };

  const handleThumbDown = () => {
    setSelected(selected === "down" ? null : "down");
  };

  return (
    <Stack direction="row" spacing={2}>
      {/* Thumbs Up Button */}
      <Button
        variant="contained"
        startIcon={<ThumbUpIcon />}
        onClick={handleThumbUp}
        style={{
          backgroundColor: selected === "up" ? "#1976d2" : "#e0e0e0",
          color: selected === "up" ? "#fff" : "#000",
          textTransform: "none",
        }}
      />
      {/* Thumbs Down Button */}
      <Button
        variant="contained"
        startIcon={<ThumbDownIcon />}
        onClick={handleThumbDown}
        style={{
          backgroundColor: selected === "down" ? "#d32f2f" : "#e0e0e0",
          color: selected === "down" ? "#fff" : "#000",
          textTransform: "none",
        }}
      />
    </Stack>
  );
};

export default ThumbButtons;
