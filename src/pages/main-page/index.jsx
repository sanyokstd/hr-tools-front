import { Footer, Header, Sidebar } from 'src/components';
import * as GS from 'src/global-styles';

import { News, Poll } from './components';
import * as S from './styles';

const mainPage = () => (
  <GS.MainWrap>
    <Header pageName="Головна" />
    <GS.Wrap>
      <GS.Main>
        <GS.MainLeft>
          <Sidebar />
        </GS.MainLeft>
        <GS.MainRight>
          <S.MainRightBlock>
            <News />
          </S.MainRightBlock>
          <S.MainRightBlock>
            <Poll />
          </S.MainRightBlock>
        </GS.MainRight>
      </GS.Main>
    </GS.Wrap>
  </GS.MainWrap>
);

export default mainPage;
