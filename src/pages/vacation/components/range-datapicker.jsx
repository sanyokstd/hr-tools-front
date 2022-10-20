import { Stack, TextField } from '@mui/material/';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import * as S from '../styles';

const RangeDatapicker = ({ setFieldValue }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    if (startDate) {
      const [day, month, year] = startDate.toLocaleDateString().split('.');
      const dateStart = `${year}-${month}-${day}`;
      setFieldValue('dateStart', dateStart);
    }
    if (endDate) {
      const [day2, month2, year2] = endDate.toLocaleDateString().split('.');
      const dateEnd = `${year2}-${month2}-${day2}`;
      setFieldValue('dateEnd', dateEnd);
    }
  }, [startDate, endDate]);

  return (
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
          customInput={<TextField readOnly fullWidth label="Від" />}
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
          customInput={<TextField readOnly fullWidth label="До" />}
        />
      </S.Picker>
    </Stack>
  );
};

RangeDatapicker.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};

export default RangeDatapicker;
