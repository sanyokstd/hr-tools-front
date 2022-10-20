import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material/';
import { FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'src/components';
import { vacationActions } from 'src/store/actions';
import * as Yup from 'yup';

import * as S from '../styles';

const validationSchema = Yup.object({
  dateStart: Yup.string('').required("Це обов'язкове поле"),
  dateEnd: Yup.string('').required("Це обов'язкове поле"),
});

const WorkerCreate = ({ handleClose, dispatchAll }) => {
  const status = useSelector((state) => state.vacationReducer.status);
  const waiterStatus = useSelector((state) => state.vacationReducer.waiterStatus);
  const waiterVac = useSelector((state) => state.vacationReducer.waiterVac);
  const error = useSelector((state) => state.vacationReducer.error);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleCreate = async (values) => {
    await dispatch(vacationActions.createVac(values));
    dispatchAll();
    setIsSubmit(true);
  };

  const formik = useFormik({
    initialValues: {
      type: 0,
      dateStart: '',
      dateEnd: '',
      comment: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleCreate(values);
    },
  });

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  useEffect(() => {
    if (startDate) {
      const [day, month, year] = startDate.toLocaleDateString().split('.');
      const dateStart = `${year}-${month}-${day}`;
      formik.setFieldValue('dateStart', dateStart);
    }
    if (endDate) {
      const [day2, month2, year2] = endDate.toLocaleDateString().split('.');
      const dateEnd = `${year2}-${month2}-${day2}`;
      formik.setFieldValue('dateEnd', dateEnd);
    }
  }, [startDate, endDate]);

  return (
    <>
      {waiterStatus || waiterVac ? (
        <Loader />
      ) : (
        <>
          {isSubmit ? (
            <>
              {error ? (
                <>
                  <S.ModalTitle>{error}</S.ModalTitle>
                  <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                    <Button variant="contained" type="button" onClick={handleClose}>
                      Ок
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <S.ModalTitle>Запит відправлено, очікуйте відповідь</S.ModalTitle>
                  <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                    <Button variant="contained" type="button" onClick={handleClose}>
                      Ок
                    </Button>
                  </Stack>
                </>
              )}
            </>
          ) : (
            <form id="createVacModal" onSubmit={formik.handleSubmit}>
              <S.Title>Створення запиту</S.Title>
              <Stack mt={2} mb={2}>
                <FormControl fullWidth mt={2} mb={2}>
                  <InputLabel id="label-type">Тип</InputLabel>
                  <Select
                    labelId="label-type"
                    label="Тип"
                    value={formik.values.type}
                    name="type"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={0}>Відпустка</MenuItem>
                    <MenuItem value={1}>Лікарняний</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <FormControl fullWidth>
                <Stack spacing={2} direction="row" mt={2} mb={2}>
                  <S.Picker>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      startDate={startDate}
                      endDate={endDate}
                      customInput={
                        <TextField
                          fullWidth
                          label="Від"
                          name="dateStart"
                          value={formik.values.dateStart}
                          readOnly
                          error={formik.touched.dateStart && Boolean(formik.errors.dateStart)}
                          helperText={formik.touched.dateStart && formik.errors.dateStart}
                        />
                      }
                    />
                  </S.Picker>
                  <S.Picker>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      dateFormat="yyyy-MM-dd"
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || new Date()}
                      maxDate={
                        formik.values.type === 0 &&
                        addDays(startDate || new Date(), status.availableVacationsDays)
                      }
                      customInput={
                        <TextField
                          fullWidth
                          label="До"
                          name="dateEnd"
                          value={formik.values.dateEnd}
                          readOnly
                          error={formik.touched.dateEnd && Boolean(formik.errors.dateEnd)}
                          helperText={formik.touched.dateEnd && formik.errors.dateEnd}
                        />
                      }
                    />
                  </S.Picker>
                </Stack>
              </FormControl>
              <Stack mt={2} mb={2}>
                <FormControl fullWidth>
                  <TextField
                    multiline
                    fullWidth
                    label="Коментар"
                    placeholder="Не обовязково"
                    name="comment"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    inputProps={{ maxLength: 200 }}
                    rows={2}
                  />
                </FormControl>
              </Stack>
              <Stack mt={2} mb={2} justifyContent="flex-end" direction="row" spacing={2}>
                <Button variant="contained" type="button" onClick={handleClose}>
                  Скасувати
                </Button>
                <Button variant="contained" type="submit">
                  Підтвердити
                </Button>
              </Stack>
            </form>
          )}
        </>
      )}
    </>
  );
};

WorkerCreate.propTypes = {
  handleClose: PropTypes.func.isRequired,
  dispatchAll: PropTypes.func.isRequired,
};

export default WorkerCreate;
