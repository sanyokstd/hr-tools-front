import { Header } from 'src/components';
import * as GS from 'src/global-styles';

import * as S from './styles';

const RolePage = () => (
  <GS.MainWrap>
    <Header pageName="" />
    <GS.Wrap>
      <S.RoleWrap>
        <S.T1>Ви успішно авторизувалися в системі!</S.T1>
        <S.T2>Зачекайте, невдовзі Вам нададуть доступ!</S.T2>
      </S.RoleWrap>
    </GS.Wrap>
  </GS.MainWrap>
);

export default RolePage;
