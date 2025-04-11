import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  selectedJob: null,
  jobStatus: {},
  jobLogs: {},
  loading: false,
  error: null
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    fetchJobStatusStart: (state, action) => {
      state.loading = true;
    },
    fetchJobStatusSuccess: (state, action) => {
      state.jobStatus[action.payload.jobId] = action.payload.status;
      state.loading = false;
    },
    fetchJobStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchJobLogsStart: (state) => {
      state.loading = true;
    },
    fetchJobLogsSuccess: (state, action) => {
      state.jobLogs[action.payload.jobId] = action.payload.logs;
      state.loading = false;
    },
    fetchJobLogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  selectJob,
  fetchJobStatusStart,
  fetchJobStatusSuccess,
  fetchJobStatusFailure,
  fetchJobLogsStart,
  fetchJobLogsSuccess,
  fetchJobLogsFailure
} = jobsSlice.actions;

export default jobsSlice.reducer;
