import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ThumbButtons = () => {
  const [selected, setSelected] = useState<1 | -1 | null>(null);

  const handleThumbUp = () => {
    setSelected(selected === 1 ? null : 1);
  };

  const handleThumbDown = () => {
    setSelected(selected === -1 ? null : -1);
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
