import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schedules: [],
  selectedSchedule: null,
  loading: false,
  error: null
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    fetchSchedulesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSchedulesSuccess: (state, action) => {
      state.schedules = action.payload;
      state.loading = false;
    },
    fetchSchedulesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createScheduleStart: (state) => {
      state.loading = true;
    },
    createScheduleSuccess: (state, action) => {
      state.schedules.push(action.payload);
      state.loading = false;
    },
    createScheduleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateScheduleStart: (state) => {
      state.loading = true;
    },
    updateScheduleSuccess: (state, action) => {
      const index = state.schedules.findIndex(schedule => schedule.id === action.payload.id);
      if (index !== -1) {
        state.schedules[index] = action.payload;
      }
      state.loading = false;
    },
    updateScheduleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteScheduleStart: (state) => {
      state.loading = true;
    },
    deleteScheduleSuccess: (state, action) => {
      state.schedules = state.schedules.filter(schedule => schedule.id !== action.payload);
      state.loading = false;
    },
    deleteScheduleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectSchedule: (state, action) => {
      state.selectedSchedule = action.payload;
    }
  }
});

export const {
  fetchSchedulesStart,
  fetchSchedulesSuccess,
  fetchSchedulesFailure,
  createScheduleStart,
  createScheduleSuccess,
  createScheduleFailure,
  updateScheduleStart,
  updateScheduleSuccess,
  updateScheduleFailure,
  deleteScheduleStart,
  deleteScheduleSuccess,
  deleteScheduleFailure,
  selectSchedule
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
