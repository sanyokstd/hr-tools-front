import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material/';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

import * as S from '../styles';

const UsersFilter = ({ setFilterParam }) => {
  const [filterActive, setFilterActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      fRole: 'all',
      fTime: 'all',
      fPosada: 'all',
      fData: 'all',
    },
  });

  useEffect(() => {
    setFilterParam(formik.values);
  }, [formik.values]);

  return (
    <S.UsersFilter className={filterActive && 'active'}>
      <S.UsersFilterTop>Фільтр</S.UsersFilterTop>
      <S.UsersFilterWrap>
        <S.UsersFilterRow>
          <FormControl>
            <FormLabel id="fRole">Роль</FormLabel>
            <RadioGroup
              aria-labelledby="fRole"
              defaultValue="all"
              name="fRole"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="Всі" />
              <FormControlLabel value="3" control={<Radio />} label="HR" />
              <FormControlLabel value="2" control={<Radio />} label="Працівник" />
              <FormControlLabel value="1" control={<Radio />} label="Адміністратор" />
              <FormControlLabel value="null" control={<Radio />} label="Нульова" />
            </RadioGroup>
          </FormControl>
        </S.UsersFilterRow>
        <S.UsersFilterRow>
          <FormControl>
            <FormLabel id="fTime">Робочий час</FormLabel>
            <RadioGroup
              aria-labelledby="fTime"
              defaultValue="all"
              name="fTime"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="Всі" />
              <FormControlLabel value="1" control={<Radio />} label="є" />
              <FormControlLabel value="0" control={<Radio />} label="немає" />
            </RadioGroup>
          </FormControl>
        </S.UsersFilterRow>
        <S.UsersFilterRow>
          <FormControl>
            <FormLabel id="fPosada">Посада</FormLabel>
            <RadioGroup
              aria-labelledby="fPosada"
              defaultValue="all"
              name="fPosada"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="Всі" />
              <FormControlLabel value="1" control={<Radio />} label="є" />
              <FormControlLabel value="0" control={<Radio />} label="немає" />
            </RadioGroup>
          </FormControl>
        </S.UsersFilterRow>
        <S.UsersFilterRow>
          <FormControl>
            <FormLabel id="fData">Дата прийнятя на роботу</FormLabel>
            <RadioGroup
              aria-labelledby="fData"
              defaultValue="all"
              name="fData"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="Всі" />
              <FormControlLabel value="1" control={<Radio />} label="є" />
              <FormControlLabel value="0" control={<Radio />} label="немає" />
            </RadioGroup>
          </FormControl>
        </S.UsersFilterRow>
      </S.UsersFilterWrap>
      <S.UsersFilterToggle variant="contained" onClick={() => setFilterActive(!filterActive)}>
        {!filterActive ? <FilterAltIcon /> : <FilterAltOffIcon />}
      </S.UsersFilterToggle>
    </S.UsersFilter>
  );
};

UsersFilter.propTypes = {
  setFilterParam: PropTypes.func.isRequired,
};

export default UsersFilter;
