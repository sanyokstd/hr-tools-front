import { ContentCutOutlined } from '@mui/icons-material';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { vacationService } from 'src/services';

export const getVacationsWorker = createAsyncThunk(
  'vacation/getVacationsWorker',
  async ({ page }, { rejectWithValue }) => {
    try {
      const pageNumber = page || 1;
      const result = await vacationService.getVacationsWorker(pageNumber);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getStatus = createAsyncThunk(
  'vacation/getStatus',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationService.getStatus();

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteVac = createAsyncThunk('vacation/deleteVac', async (id, { rejectWithValue }) => {
  try {
    const result = await vacationService.deleteVac(id);

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createVac = createAsyncThunk(
  'vacation/createVac',
  async (body, { rejectWithValue }) => {
    try {
      const result = await vacationService.createVac(body);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
