import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { getPillSchedule } from '../backend/database'

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[9 + Math.floor(Math.random() * 7)];
  }
  return color;
}

const Calendar = () => {
  
  //let pills = getPillSchedule();
  const [pills, setPills] = useState([]);
  const calendarRef = useRef()
  let eventNum = 0;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayNum = 0;

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };

  function makeCalendarRefs() {
    console.log("in make calendar.");
    const dp = calendarRef.current.control;
    for (let i = 0; i < pills.length; i++) {
      let day = pills[i][0];
      for (let j = 0; j < days.length; j++) {
        if (day == days[j]) {
          dayNum = j;
        }
      }
  
      let timeString = pills[i][1];
      const [time, period] = timeString.split(' ');
      const [hours, minutes] = time.split(':');
      let hours24 = parseInt(hours, 10);
      if (period === 'pm' && hours24 < 12) {
        hours24 += 12;
      } else if (period === 'am' && hours24 === 12) {
        hours24 = 0;
      }
  
      let startDate = new Date();
      startDate.setDate(startDate.getDate() + (dayNum !== startDate.getDay() ? (dayNum - 7 - startDate.getDay()) % 7 : 7));
      startDate.setHours(hours24 - 4, parseInt(minutes, 10), 0, 0);
      console.log(startDate);
  
  
      let endDate = new Date();
      endDate.setDate(endDate.getDate() + (dayNum !== endDate.getDay() ? (dayNum - 7 - endDate.getDay()) % 7 : 7))
      endDate.setHours(hours24 - 4, parseInt(minutes, 10) + 30, 0, 0);
      
      let numOfWeeks = 10;
      let background = getRandomColor();
  
      for (let k = 0; k < numOfWeeks; k++) {
        let tempStart = new Date(startDate.getTime() + (k * 7 * 24 * 60 * 60 * 1000));
        
        let tempEnd = new Date(endDate.getTime() + (k * 7 * 24 * 60 * 60 * 1000));
  
        dp.events.add({
          start: tempStart.toISOString(),
          end: tempEnd.toISOString(),
          id: DayPilot.guid(),
          text: pills[i][2],
          backColor: background,
          eventNumber: eventNum
        });
      }
      eventNum++;
    }
  }

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (!modal.result) { return; }

      let numberOfWeeks = 10;
      let startDate = new Date(args.start);
      startDate.setHours(startDate.getHours() - 4, startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
      let endDate = new Date(args.end);
      endDate.setHours(endDate.getHours() - 4, endDate.getMinutes(), endDate.getSeconds(), endDate.getMilliseconds());
      let background = getRandomColor();
      for (let i = 0; i < numberOfWeeks; i++) {
        let tempStart = new Date(startDate.getTime() + (i * 7 * 24 * 60 * 60 * 1000));
      
        let tempEnd = new Date(endDate.getTime() + (i * 7 * 24 * 60 * 60 * 1000));
      


        dp.events.add({
          start: tempStart.toISOString(),
          end: tempEnd.toISOString(),
          id: DayPilot.guid(),
          text: modal.result,
          backColor: background,
          eventNumber: eventNum
        });
      }
      eventNum++;
      
    },
    onEventClick: async args => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
      ]
    }),
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          }
        }
      ];

      const participants = args.data.participants;
      if (participants > 0) {
        // show one icon for each participant
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `https://picsum.photos/24/24?random=${i}`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
          });
        }
      }
    }
  });

  useEffect(() => {
    const fetchPills = async () => {
      try {
        const pillsData = await getPillSchedule();
        setPills(pillsData);
      } catch (error) {
        // Handle errors, log, or set default data
        console.error("Error fetching pills data:", error);
        setPills([]); // Set default data or handle errors
      }
    };

    fetchPills();
  }, []);

  useEffect(() => {
    makeCalendarRefs();
  }, [pills]);
  
  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          startDate={"2023-10-02"}
          selectionDay={"2023-10-02"}
          onTimeRangeSelected={ args => {
            calendarRef.current.control.update({
              startDate: args.day
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
    </div>
  );
}

export default Calendar;