import { createSlice } from '@reduxjs/toolkit';

import { vacationActions } from '../actions';

const vacationSlice = createSlice({
  name: 'vacation',
  initialState: {
    workerVacation: [],
    waiterStatus: false,
    waiterVac: false,
    workerPagination: [],
    status: null,
    error: null,
  },
  reducers: {
    clearErrors(state) {
      state.errors = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // getVacation worker
      .addCase(vacationActions.getVacationsWorker.pending, (state) => {
        state.waiterVac = true;
      })
      .addCase(vacationActions.getVacationsWorker.fulfilled, (state, action) => {
        state.waiterVac = false;
        state.workerVacation = action.payload.data.data;
        state.workerPagination = action.payload.data.meta;
      })
      .addCase(vacationActions.getVacationsWorker.rejected, (state) => {
        state.waiterVac = false;
        state.workerVacation = [];
        state.workerPagination = [];
      })

      // getStatus
      .addCase(vacationActions.getStatus.pending, (state) => {
        state.waiterStatus = true;
      })
      .addCase(vacationActions.getStatus.fulfilled, (state, action) => {
        state.waiterStatus = false;
        state.status = action.payload.data.data;
      })
      .addCase(vacationActions.getStatus.rejected, (state) => {
        state.waiterStatus = false;
        state.status = null;
      })

      // delete vac
      .addCase(vacationActions.deleteVac.pending, (state) => {
        state.waiterVac = true;
      })
      .addCase(vacationActions.deleteVac.fulfilled, (state) => {
        state.waiterVac = false;
      })
      .addCase(vacationActions.deleteVac.rejected, (state) => {
        state.waiterVac = false;
      })

      // create vac
      .addCase(vacationActions.createVac.pending, (state) => {
        state.waiterVac = true;
        state.waiterStatus = true;
        state.error = null;
      })
      .addCase(vacationActions.createVac.fulfilled, (state) => {
        state.waiterVac = false;
        state.waiterStatus = false;
        state.error = null;
      })
      .addCase(vacationActions.createVac.rejected, (state, action) => {
        state.waiterVac = false;
        state.waiterStatus = false;
        state.error = action.payload.error.message;
      });
  },
});

export const { clearErrors } = vacationSlice.actions;
export default vacationSlice.reducer;
