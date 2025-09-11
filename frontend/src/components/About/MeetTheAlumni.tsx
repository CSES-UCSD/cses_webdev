import React, { useMemo, useState } from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { gradientImgWrapper, gradientImg } from "./styles";

type Member = {
  name: string;
  company: string;
  linkedin?: string;
  email?: string;
  photo?: string;
};

type Props = {
  title?: string;
  items?: Member[];
};

const PLACEHOLDER_PHOTO = "https://placehold.co/400x400?text=Photo";
const PAGE_SIZE = 6;

const DEFAULT_ALUMNI: Member[] = Array.from({ length: 12 }).map(() => ({
  name: "[name]",
  company: "[company]",
  photo: PLACEHOLDER_PHOTO,
}));

function Card({ m }: { m: Member }) {
  return (
    <Box sx={{ width: 260 }}>
      {/* Gradient border wrapper */}
      <Box sx={gradientImgWrapper}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            bgcolor: "rgba(255,255,255,0.04)",
            borderRadius: 0,
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

          {/* overlay icons */}
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

export default function MeetTheAlumni({
  title = "Meet the Alumni",
  items = DEFAULT_ALUMNI,
}: Props) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = useMemo(() => items.slice(start, start + PAGE_SIZE), [items, start]);

  const canPrev = page > 0;
  const canNext = page < pageCount - 1;

  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
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
        {title}
      </Typography>

      <Box sx={{ position: "relative", px: { xs: 0, md: 6 } }}>
        <IconButton
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={!canPrev}
          sx={{
            position: "absolute",
            left: { xs: -4, md: 0 },
            top: "40%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.4)",
            color: 'white',
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
          }}
          aria-label="Previous alumni"
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
          aria-label="Next alumni"
        >
          <ChevronRightIcon />
        </IconButton>

        <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
          {visible.map((m, i) => (
            <Grid item key={`${start + i}`}>
              <Card m={m} />
            </Grid>
          ))}
          {visible.length < PAGE_SIZE &&
            Array.from({ length: PAGE_SIZE - visible.length }).map((_, i) => (
              <Grid item key={`spacer-${i}`} sx={{ width: 260 }} />
            ))}
        </Grid>

        <Typography
          variant="caption"
          sx={{ display: "block", textAlign: "center", color: "white", mt: 2, opacity: 0.8 }}
        >
          Page {page + 1} of {pageCount}
        </Typography>
      </Box>
    </Container>
  );
}
