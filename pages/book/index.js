import { Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import DisplayInfo from "../../components/DisplayInfo";
import { useAppSelector } from "../../state/store/hooks";
import { schedulerSelector } from "../../state/store/selector";

const Book = () => {
  const { slots } = useAppSelector(schedulerSelector);
  let router = useRouter();
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <DisplayInfo params={{ scheduler: "test" }} />
        </Grid>
        <Grid>
          <Card>
            <TextField />
            <TextField />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default Book;
