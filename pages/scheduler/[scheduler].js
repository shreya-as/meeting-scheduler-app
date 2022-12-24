import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  ButtonGroup,
  Link,
} from "@mui/material";

import styles from "../../styles/Scheduler.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DisplayInfo from "../../components/DisplayInfo";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../state/store/hooks";
import { getSlotDisplaySuccessAction } from "../../state/redux/scheduler/schedulerSlice";
const Scheduler = ({ slots, params }) => {
  let date = new Date();
  const currYear = date?.getFullYear();
  console.log(currYear, "currYear");
  const dispatch = useAppDispatch();
  const currMonth = date?.getMonth();
  console.log(slots, "slots");
  const [timeSlots, setTimeSlots] = useState([]);
  useEffect(() => {
    dispatch(getSlotDisplaySuccessAction(params));
  }, []);
  //handle toggle for hour format
  const [hourFormat, set24HourFormat] = useState(false);
  const days = ["Sun", " Mon", " Tue", "Wed", "Thu", " Fri", " Sat"];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const arrayOfDay = Object.values(slots)?.map((slot, i) => {
    return {
      day: i + 1,
      availableTime: slot?.length > 0 ? true : false,
      time: slot,
    };
  });
  const handleTime = (time) => {
    setTimeSlots(time);
  };
  //   get time in 12 hour
  const get12HourTime = () => {
    let date = new Date(timeSlots[0]?.time);
    let day = date.getDay();
    return `${days[day]}, ${month[currMonth].slice(0, 3)} ${date.getDate()}`;
  };
  //   get am and pm
  const formatAMAndPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const data = hours >= 12 ? "pm" : "am";
    hours %= 12;
    console.log((hours %= 12), "test data");
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes}${data}`;
    return strTime;
  };
  //   get 24 hour format
  const get24HourTime = (date) => {
    var date = new Date(date);
    var hours = date.getHours(); // gives the value in 24 hours format
    var minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
  //   handle toggle of hour format
  const handleHour = (status) => {
    set24HourFormat(status);
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        className={styles.calendarContainer}
      >
        <Grid item xs={2} className={styles.displayInfo}>
          <DisplayInfo params={params} />
        </Grid>
        <Grid item xs={3.5}>
          <Grid container justifyContent="space-between">
            <div className="wrapper">
              <header>
                <p className="current-date"></p>
                <Grid
                  className="icons"
                  container
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary" gutterBottom>
                    {`${month[currMonth]} ${currYear}`}
                  </Typography>
                  <Grid item>
                    <ArrowBackIosIcon fontSize="small" />
                    <ArrowForwardIosIcon fontSize="small" />
                  </Grid>
                </Grid>
              </header>
              <div className="calendar">
                <ul className="weeks">
                  {days?.map((day) => {
                    return <li>{day}</li>;
                  })}
                </ul>
                <ul className="days">
                  {arrayOfDay?.map(({ day, availableTime, time }) => {
                    console.log(day, "day");
                    return (
                      <Grid
                        key={day}
                        className={
                          availableTime
                            ? "availableTime weeksAndDays"
                            : "weeksAndDays"
                        }
                      >
                        <Button
                          className="date-grid"
                          onClick={() => handleTime(time)}
                        >
                          {day}
                        </Button>
                      </Grid>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>
        {timeSlots?.length > 0 && (
          <Grid item xs={2} className={styles.timeSlotContainer}>
            <Card>
              <Grid container justifyContent="space-between">
                <Typography color="text.secondary" gutterBottom>
                  {get12HourTime()}
                </Typography>
                <ButtonGroup disableElevation>
                  <Button onClick={() => handleHour(false)}>12h</Button>
                  <Button onClick={() => handleHour(true)}>24h</Button>
                </ButtonGroup>
              </Grid>
              <Grid className={styles.timeSlot}>
                {timeSlots?.map((timeSlot) => {
                  const updatedTime = new Date(timeSlot.time);
                  return (
                    <Grid className={styles.slot}>
                      <Link href={`/book`}>
                        <p>
                          {hourFormat
                            ? get24HourTime(updatedTime)
                            : formatAMAndPM(updatedTime)}
                        </p>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
          </Grid>
        )}
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
