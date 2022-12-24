import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AlarmIcon from "@mui/icons-material/Alarm";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const meetings = [
    {
      id: "30min",
      meetingName: "30 Min Meeting",
      time: "30m",
    },
    { id: "15min", meetingName: "15 Min Meeting", time: "15m" },
  ];
  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Saroj Subedi
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Test
      </Typography>
      {meetings?.map((meeting) => {
        const { meetingName, time, id } = meeting;
        return (
          <>
            <Link href={`scheduler/${id}`} className={styles.link} key={id}>
              <Card className={styles.meetingCard}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {meetingName}
                  </Typography>
                  <AlarmIcon />
                  {time}
                  <PermIdentityIcon />
                </CardContent>
              </Card>
            </Link>
          </>
        );
      })}
    </>
  );
}
