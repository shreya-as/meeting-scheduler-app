import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import React from "react";
import { memo } from "react";
import { useAppSelector } from "../state/store/hooks";
import { schedulerSelector } from "../state/store/selector";

const DisplayInfo = ({ params }) => {
  const { slots } = useAppSelector(schedulerSelector);
  console.log(slots, "slots");
  return (
    <>
      <Card>
        <CardContent>
          <Avatar alt="Remy Sharp" />
          <Typography
            sx={{ fontSize: 2 }}
            color="text.secondary"
            gutterBottom
          ></Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography variant="h6">Shreya Shahi</Typography>
          <Grid container>
            <VideoChatIcon />
            <Typography variant="body2">cal video</Typography>
          </Grid>
          <Grid container>
            <AccessTimeIcon />
            <Typography variant="body2">{params.scheduler}</Typography>
          </Grid>
          <Grid container>
            <LanguageIcon />
            <Typography variant="body2">Asia/Kathmandu</Typography>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(DisplayInfo);
