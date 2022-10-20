import { useSelector } from 'react-redux';
import { FixLoader, Header, Sidebar } from 'src/components';
import * as GS from 'src/global-styles';

import { VacationWorker } from './components';

const Vacation = () => {
  const role = useSelector((state) => state.authReducer.user.role);

  return (
    <GS.MainWrap>
      <Header pageName="Персональний кабінет" />
      <GS.Wrap>
        <GS.Main>
          <GS.MainLeft>
            <Sidebar />
          </GS.MainLeft>
          <GS.MainRight>{role === 2 ? <VacationWorker /> : <>Адмін</>}</GS.MainRight>
        </GS.Main>
      </GS.Wrap>
    </GS.MainWrap>
  );
};

export default Vacation;
