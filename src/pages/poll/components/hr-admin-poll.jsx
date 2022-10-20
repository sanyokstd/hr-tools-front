import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader, MyModal, Pagination } from 'src/components';
import { pollActions } from 'src/store/actions';

import * as S from '../styles';
import CreatePoll from './create-poll';
import DetailPoll from './detail-poll/detail-poll';

function getStatusTitle(statusId) {
  switch (statusId) {
    case 1:
      return 'Нове';
    case 2:
      return 'Активне';
    case 3:
      return 'Завершене';
    default:
      return 'Нове';
  }
}

const HrAdminPoll = (props) => {
  const waiter = useSelector((state) => state.pollReducer.waiter);
  const polls = useSelector((state) => state.pollReducer.polls);
  const pagination = useSelector((state) => state.pollReducer.hrAdminPagination);
  const { page } = useParams();

  const dispatch = useDispatch();
  const role = useSelector((state) => state.authReducer.user.role);

  const [openCreatePoll, setOpenCreatePoll] = useState(false);
  const handleOpen = () => setOpenCreatePoll(true);
  const handleClose = () => setOpenCreatePoll(false);

  const [selectPollId, setSelectPollId] = useState(0);
  const [openDetailPoll, setOpenDetailPoll] = useState(false);
  const handleOpenDetail = () => setOpenDetailPoll(true);
  const handleCloseDetail = () => setOpenDetailPoll(false);

  useEffect(() => {
    if (role === 1) {
      dispatch(pollActions.getPollsAdmin({ page }));
    } else if (role === 3) {
      dispatch(pollActions.getPollsHr({ page }));
    }

    dispatch(pollActions.getPollsType());
  }, [page]);

  return (
    <>
      <S.Title>
        Всі опитування
        <Button startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Cтворити опитування
        </Button>
      </S.Title>
      {!waiter ? (
        <>
          {polls && polls.length ? (
            <>
              <S.HrList>
                {polls.map((item) => (
                  <S.HrRow key={item.id}>
                    <S.HrName
                      onClick={() => {
                        setSelectPollId(item.id);
                        handleOpenDetail();
                      }}
                    >
                      {item.title}
                    </S.HrName>
                    <S.HrWrap>
                      <S.HrCol>
                        <S.HrColInfo>
                          {item.date && <S.HrColInfoItem>Створенно: {item.date}</S.HrColInfoItem>}
                          {!item.anonymous ? (
                            <S.HrColInfoItem>Автор: {item.author.fullName}</S.HrColInfoItem>
                          ) : (
                            <S.HrColInfoItem>Анонімне</S.HrColInfoItem>
                          )}
                        </S.HrColInfo>
                      </S.HrCol>
                      <S.HrCol>
                        <S.HrStatus>{getStatusTitle(item.status)}</S.HrStatus>
                      </S.HrCol>
                      <S.HrCol>
                        <S.HrStatusCount>
                          {item.resultCount}/{item.workersCount}
                        </S.HrStatusCount>
                      </S.HrCol>
                    </S.HrWrap>
                  </S.HrRow>
                ))}
              </S.HrList>
              <Pagination pagination={pagination} />
            </>
          ) : (
            <>Немає опитувань</>
          )}
        </>
      ) : (
        <Loader />
      )}

      {openCreatePoll && (
        <MyModal
          isOpen={openCreatePoll}
          handleOpen={handleOpen}
          handleClose={handleClose}
          width={1000}
        >
          {openCreatePoll && <CreatePoll handleClose={handleClose} handleOpen={handleOpen} />}
        </MyModal>
      )}

      {openDetailPoll && (
        <MyModal
          isOpen={openDetailPoll}
          handleOpen={handleOpenDetail}
          handleClose={handleCloseDetail}
          width={1000}
        >
          {openDetailPoll && (
            <DetailPoll role={role} selectPollId={selectPollId} handleClose={handleCloseDetail} />
          )}
        </MyModal>
      )}
    </>
  );
};

export default HrAdminPoll;
