import { colors } from "@/theme";
import { OpenInNew } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const BoardCard = ({ board }) => {
  return (
    <>
      <Grid item xs={3}>
        <Stack
          bgcolor={"black"}
          borderLeft={`5px solid`}
          borderColor={colors[board?.color]}
          p={2}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box width={"50%"}>
              <Typography
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                fontWeight={400}
                variant="h6"
              >
                {board?.name}
              </Typography>
            </Box>

            <IconButton size="small">
              <OpenInNew />
            </IconButton>
          </Stack>
          <Typography variant="caption">
            Created at: {board?.createdAt}
          </Typography>
        </Stack>
      </Grid>
    </>
  );
};

export default BoardCard;
