import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { gradientImgWrapper, gradientImg } from "./styles";

type Division = "general" | "dev" | "open-source" | "innovate";
type Member = {
  name: string;
  company: string;
  division: Division;
  linkedin?: string;
  email?: string;
  photo?: string;
};

const PLACEHOLDER_PHOTO = "https://placehold.co/400x400?text=Photo";

// Mock data (all placeholders).
const TEAM: Member[] = [
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "general" },
  { name: "[name]", company: "[company]", division: "dev" },
  { name: "[name]", company: "[company]", division: "dev" },
  { name: "[name]", company: "[company]", division: "dev" },
  { name: "[name]", company: "[company]", division: "open-source" },
  { name: "[name]", company: "[company]", division: "open-source" },
  { name: "[name]", company: "[company]", division: "innovate" },
  { name: "[name]", company: "[company]", division: "innovate" },
];

const DIVISIONS: { label: string; value: Division }[] = [
  { label: "General", value: "general" },
  { label: "Dev", value: "dev" },
  { label: "Open Source", value: "open-source" },
  { label: "Innovate", value: "innovate" },
];

const PAGE_SIZE = 8; // 3 x 2 grid

function TeamCard({ m }: { m: Member }) {
  return (
    <Box>
      {/* Gradient border wrapper */}
      <Box sx={gradientImgWrapper}>
        {/* Surface keeps square ratio and lets us overlay icons */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            bgcolor: "rgba(255,255,255,0.04)",
            borderRadius: 0, // flat corners
          }}
        >
          <Box
            component="img"
            src={m.photo || PLACEHOLDER_PHOTO}
            alt={m.name}
            sx={{
              ...gradientImg,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Bottom-left: LinkedIn */}
          <IconButton
            size="small"
            component="a"
            href={m.linkedin || "#"}
            target={m.linkedin ? "_blank" : undefined}
            rel={m.linkedin ? "noopener noreferrer" : undefined}
            disabled={!m.linkedin}
            sx={{
              position: "absolute",
              left: 8,
              bottom: 8,
              bgcolor: "rgba(0,0,0,0.55)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
            }}
            aria-label={`LinkedIn ${m.name}`}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>

          {/* Bottom-right: Email */}
          <IconButton
            size="small"
            component="a"
            href={m.email ? `mailto:${m.email}` : "#"}
            disabled={!m.email}
            sx={{
              position: "absolute",
              right: 8,
              bottom: 8,
              bgcolor: "rgba(0,0,0,0.55)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
            }}
            aria-label={`Email ${m.name}`}
          >
            <EmailIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Typography
        variant="subtitle1"
        sx={{ color: "white", textAlign: "center", mt: 1, fontWeight: 600 }}
      >
        {m.name}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "white", textAlign: "center", opacity: 0.9 }}
      >
        {m.company}
      </Typography>
    </Box>
  );
}

export default function MeetTheTeam() {
  const [tab, setTab] = useState<Division>("general");
  const [page, setPage] = useState(0);

  useEffect(() => setPage(0), [tab]);

  const filtered = useMemo(() => TEAM.filter((t) => t.division === tab), [tab]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const canPrev = page > 0;
  const canNext = page < pageCount - 1;

  return (
    <Container disableGutters sx={{marginTop: '10%'}}>
      <Typography
        component="h2"
        sx={{
          color: "white",
          textAlign: "center",
          fontFamily: "Chakra Petch",
          fontWeight: 700,
          fontSize: "clamp(28px, 6vw, 56px)",
          mb: 3,
        }}
      >
        Meet the Team
      </Typography>

      {/* Pill tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Box
          sx={{
            border: "2px solid rgba(82,229,231,0.8)",
            borderRadius: 9999,
            px: 1,
            overflow: "hidden",
            maxWidth: 760,
            width: "100%",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            textColor="inherit"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              "& .MuiTab-root": {
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                minHeight: 44,
                borderRight: "1px solid rgba(82,229,231,0.35)",
              },
              "& .MuiTab-root:last-of-type": { borderRight: "none" },
              "& .Mui-selected": { background: "rgba(82,229,231,0.18)" },
            }}
          >
            {DIVISIONS.map((d) => (
              <Tab key={d.value} label={d.label} value={d.value} />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Pager with arrows */}
      <Box sx={{ position: "relative", px: { xs: 0, md: 6 } }}>
        <IconButton
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={!canPrev}
          sx={{
            position: "absolute",
            left: { xs: -4, md: 0 },
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.4)",
            color: 'white',
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
          }}
          aria-label="Previous"
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={!canNext}
          sx={{
            position: "absolute",
            right: { xs: -4, md: 0 },
            top: "40%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.4)",
            color: 'white',
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
          }}
          aria-label="Next"
        >
          <ChevronRightIcon />
        </IconButton>

        <Grid container spacing={4} justifyContent="flex-start" alignItems="flex-start">
          {visible.map((m, i) => (
            <Grid item xs={6} sm={4} md={3} key={`${m.division}-${i}`}>
              <TeamCard m={m} />
            </Grid>
          ))}
          {visible.length < PAGE_SIZE &&
            Array.from({ length: PAGE_SIZE - visible.length }).map((_, i) => (
              <Grid item key={`spacer-${i}`} />
            ))}
        </Grid>
      </Box>

      <Box
    sx={{
      display: { xs: "flex", md: "none" }, // only show on mobile
      justifyContent: "center",
      gap: 2,
      mt: 2,
    }}
  >
    <IconButton
      onClick={() => setPage((p) => Math.max(0, p - 1))}
      disabled={!canPrev}
      sx={{
        bgcolor: "rgba(0,0,0,0.4)",
        color: "white",
        "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
        "&.Mui-disabled": { opacity: 0 },
      }}
      aria-label="Previous"
    >
      <ChevronLeftIcon />
    </IconButton>
    <IconButton
      onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
      disabled={!canNext}
      sx={{
        bgcolor: "rgba(0,0,0,0.4)",
        color: "white",
        "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
        "&.Mui-disabled": { opacity: 0 },
      }}
      aria-label="Next"
    >
      <ChevronRightIcon />
    </IconButton>
  </Box>
    </Container>
  );
}
