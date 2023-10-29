import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { add_pills, getUser, username } from '../backend/database';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const dosages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const timesOfDay = [
  '12:00 AM', '12:30 AM',
  '1:00 AM', '1:30 AM',
  '2:00 AM', '2:30 AM',
  '3:00 AM', '3:30 AM',
  '4:00 AM', '4:30 AM',
  '5:00 AM', '5:30 AM',
  '6:00 AM', '6:30 AM',
  '7:00 AM', '7:30 AM',
  '8:00 AM', '8:30 AM',
  '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM',
  '10:00 PM', '10:30 PM',
  '11:00 PM', '11:30 PM'
];

const PillForm = () => {
  const classes = useStyles();
  const [pillName, setPillName] = useState('');
  const [day, setDay] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handlePillChange = (event) => {
    setPillName(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleDosageChange = (event) => {
    setDosage(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleNotes = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = (event) => {
    add_pills(username, dosage, false, pillName, time, day, notes);
    event.preventDefault();
    console.log('Username:', username);
    console.log('Dosage:', dosage);
    console.log('Pill Name:', pillName);
    console.log('Time:', time);
    console.log('day:', day);
    console.log('Notes:', notes);
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Pill Name"
            variant="outlined"
            fullWidth
            value={pillName}
            onChange={handlePillChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="day-label">Day of the Week</InputLabel>
          <Select
            labelId="day-label"
            id="day"
            variant="outlined"
            fullWidth
            value={day}
            onChange={handleDayChange}
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="dosage-label">Dosage (# of pieces)</InputLabel>
          <Select
            labelId="dosage-label"
            id="dosage"
            variant="outlined"
            fullWidth
            value={dosage}
            onChange={handleDosageChange}
          >
            {dosages.map((dosage) => (
              <MenuItem key={dosage} value={dosage}>
                {dosage}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="time">Time of Day</InputLabel>
            <Select
              labelId="time"
              id="time"
              label="Time of Day"
              defaultValue={timesOfDay[0]}
              value={time}
              onChange={handleTimeChange}
            >
              {timesOfDay.map((time, index) => (
                <MenuItem key={index} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Additional Notes"
            multiline
            minRows={4}
            variant="outlined"
            fullWidth
            value={notes}
            onChange={handleNotes}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.button}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PillForm;