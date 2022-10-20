import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Header } from 'src/components';
import * as GS from 'src/global-styles';

import * as S from './styles';

const NotFound = () => (
  <GS.MainWrap>
    <Header pageName="" />
    <GS.Wrap>
      <S.NotFound>
        Сторінку не знайдено
        <br />
        <NavLink to="/">
          <Button variant="contained">На головну</Button>
        </NavLink>
      </S.NotFound>
    </GS.Wrap>
  </GS.MainWrap>
);

export default NotFound;
