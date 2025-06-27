import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Typography,
  useTheme,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { usePromotions } from "../../context/PromotionsContext";

const CalendarView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { promotions } = usePromotions(); // Pull from shared context

  const handleEventClick = (info) => {
    // Redirect to promotions page on event click
    navigate("/promotions");
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={2} fontWeight="bold">
        🗓 Promotion Calendar
      </Typography>

      <Card elevation={4} sx={{ padding: 2 }}>
        <CardContent>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listWeek",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={false}
            height="80vh"
            events={promotions}
            eventDisplay="block"
            eventClick={handleEventClick}
            eventContent={(arg) => (
              <div
                style={{
                  backgroundColor:
                    arg.event.backgroundColor || colors.greenAccent[600],
                  color: "#fff",
                  padding: "4px 6px",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                }}
              >
                <strong>{arg.timeText}</strong>
                <div>{arg.event.title}</div>
              </div>
            )}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              meridiem: false,
            }}
          />
        </CardContent>
      </Card>

      <Box mt={2} textAlign="center">
        <Link href="/promotions" underline="hover" color="primary">
          View and Manage All Promotions →
        </Link>
      </Box>
    </Box>
  );
};

export default CalendarView;
