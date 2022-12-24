import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import styles from "../../styles/Scheduler.module.css";
const Scheduler = ({ slots, id }) => {
  console.log(slots, "slots");
  return (
    <>
      <Grid
        container
        justifyContent="center"
        className={styles.calendarContainer}
      >
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <Avatar alt="Remy Sharp" />
              <Typography
                sx={{ fontSize: 2 }}
                color="text.secondary"
                gutterBottom
              ></Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography variant="h2">Saroj Adhikari</Typography>
              <Grid container>
                <VideoChatIcon />
                <Typography variant="body2">cal video</Typography>
              </Grid>
              <Grid container>
                <AccessTimeIcon />
                <Typography variant="body2">cal video</Typography>
              </Grid>
              <Grid container>
                <LanguageIcon />
                <Typography variant="body2">cal video</Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
// dynamic parameters have multiple pages
export default Scheduler;
export const getServerSideProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    `https://cal.com/api/trpc/viewer.public.slots.getSchedule?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22eventTypeId%22%3A142164%2C%22eventTypeSlug%22%3A%22${params}%22%2C%22usernameList%22%3A%5B%22bmnepaltest%22%5D%2C%22startTime%22%3A%222022-11-30T18%3A15%3A00.000Z%22%2C%22endTime%22%3A%222022-12-31T18%3A14%3A59.999Z%22%2C%22timeZone%22%3A%22Asia%2FKatmandu%22%2C%22duration%22%3Anull%7D%2C%22meta%22%3A%7B%22values%22%3A%7B%22duration%22%3A%5B%22undefined%22%5D%7D%7D%7D%7D`
  );
  const data = await response.json();
  return {
    // should always return an obj and obj should contain a props key which is an obj
    props: {
      slots: data[0].result.data.json.slots,
      params,
    }, // will be passed to the page component as props
  };
};
