import ClearIcon from '@mui/icons-material/Clear';
import { TextField } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import * as S from './styles';

const MyDataPicker = ({
  value,
  name,
  setFieldValue,
  maxData,
  clearButton = false,
  ...otherProps
}) => {
  const [dateFormated, setDateFormated] = useState();

  const handleSetDate = (date) => {
    const [day, month, year] = date.toLocaleDateString().split('.');
    const dateString = `${year}-${month}-${day}`;

    setFieldValue(name, dateString);
  };

  const handleClear = () => {
    setDateFormated(false);
    setFieldValue(name, null);
  };

  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split('-');
      setDateFormated(new Date(year, month - 1, day));
    } else if (!clearButton) {
      handleSetDate(new Date());
    }
  }, [value]);

  return (
    <S.Picker>
      <DatePicker
        selected={dateFormated || null}
        maxDate={maxData ? new Date() : null}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => handleSetDate(date)}
        customInput={<TextField readOnly {...otherProps} />}
      />
      {clearButton && value && (
        <S.PickerClear onClick={handleClear}>
          <ClearIcon />
        </S.PickerClear>
      )}
    </S.Picker>
  );
};
MyDataPicker.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  maxData: PropTypes.bool.isRequired,
  clearButton: PropTypes.bool.isRequired,
};
export default MyDataPicker;
