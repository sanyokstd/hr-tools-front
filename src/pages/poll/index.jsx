import { useSelector } from 'react-redux';
import { Header, Sidebar } from 'src/components';
import * as GS from 'src/global-styles';

import HrAdminPoll from './components/hr-admin-poll';
import WorkerPoll from './components/worker-poll';

const Poll = () => {
  const role = useSelector((state) => state.authReducer.user.role);

  return (
    <GS.MainWrap>
      <Header pageName="Персональний кабінет" />
      <GS.Wrap>
        <GS.Main>
          <GS.MainLeft>
            <Sidebar />
          </GS.MainLeft>
          <GS.MainRight>{role === 2 ? <WorkerPoll /> : <HrAdminPoll />}</GS.MainRight>
        </GS.Main>
      </GS.Wrap>
    </GS.MainWrap>
  );
};

export default Poll;
