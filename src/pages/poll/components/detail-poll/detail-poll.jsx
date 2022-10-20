import { Button, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixLoader, Loader, MyModal } from 'src/components';
import { pollActions } from 'src/store/actions';

import * as S from '../../styles';
import EditPoll from '../edit-poll';
import AnswersTable from './answers-table';
import WorkerListPoll from './worker-list-poll';

const DetailPoll = ({ role, selectPollId, handleClose }) => {
  const fixWaiter = useSelector((state) => state.pollReducer.fixWaiter);
  const detailPollWaiter = useSelector((state) => state.pollReducer.detailPollWaiter);
  const poll = useSelector((state) => state.pollReducer.detailPoll);
  const ableWorkers = useSelector((state) => state.pollReducer.ableWorkers);

  // Модалка видалення
  const [openModalDel, setOpenModalDel] = useState(false);
  const handleOpenDel = () => setOpenModalDel(true);
  const handleCloseDel = () => setOpenModalDel(false);
  const [isDelete, setIsDelete] = useState(false);

  // Модалка завершення
  const [openModalComplete, setOpenModalComplete] = useState(false);
  const handleOpenComplete = () => setOpenModalComplete(true);
  const handleCloseComplete = () => setOpenModalComplete(false);

  // Модалка відправлення
  const [openModalSend, setOpenModalSend] = useState(false);
  const handleOpenSend = () => setOpenModalSend(true);
  const handleCloseSend = () => setOpenModalSend(false);
  const [workerId, setWorkerId] = useState([]);
  const [isSend, setIsSend] = useState(false);

  // Модалка редагування
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenEdit = () => setOpenModalEdit(true);
  const handleCloseEdit = () => setOpenModalEdit(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pollActions.getPollDetail({ selectPollId, role }));
    dispatch(pollActions.getUsers(role));
  }, []);

  const deletePoll = async () => {
    const pollId = poll.id;
    await dispatch(pollActions.deletePoll({ role, pollId }));
    setIsDelete(true);
  };

  const completePoll = async () => {
    const pollId = poll.id;
    await dispatch(pollActions.completePoll({ role, pollId }));
  };

  const handleSendPoll = (whichId) => {
    handleOpenSend();
    setWorkerId(whichId);
  };

  const sendPoll = async (whichId) => {
    const pollId = poll.id;
    await dispatch(pollActions.sendPoll({ pollId, whichId, role }));
    setIsSend(true);
  };

  return (
    <>
      {fixWaiter && <FixLoader />}
      {detailPollWaiter ? (
        <Loader />
      ) : (
        <>
          {poll && (
            <>
              {isDelete ? (
                <Stack mt={5} mb={5}>
                  <S.QaModalTitle>Опитування видалено!</S.QaModalTitle>
                  <Stack mt={2} justifyContent="center" direction="row" spacing={2}>
                    <Button variant="contained" type="button" onClick={handleClose}>
                      Ок
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <>
                  <Stack
                    spacing={2}
                    mt={1}
                    mb={2}
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <S.detailTitle> {poll.title}</S.detailTitle>

                    <Stack spacing={2} direction="row">
                      {poll.status === 1 && (
                        <Button variant="contained" onClick={() => handleOpenEdit()}>
                          Редагувати
                        </Button>
                      )}

                      <Button variant="contained" color="error" onClick={() => handleOpenDel()}>
                        Видалити
                      </Button>
                    </Stack>
                  </Stack>
                  <S.detailInfo>
                    {poll.author && (
                      <S.detailInfoItem>Автор: {poll.author.fullName}</S.detailInfoItem>
                    )}
                    {poll.date && <S.detailInfoItem>Створенно {poll.date}</S.detailInfoItem>}
                    <S.detailInfoItem>Анонімно {poll.anonymous ? 'Так' : 'Ні'}</S.detailInfoItem>
                  </S.detailInfo>
                  <Stack
                    mt={2}
                    mb={2}
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <S.detailWorkersList>
                      {poll.status !== 3 && (
                        <WorkerListPoll
                          workers={ableWorkers}
                          wichList={poll.workers}
                          sendPoll={handleSendPoll}
                        />
                      )}
                    </S.detailWorkersList>
                    <S.detailStatusInfo>
                      <S.detailStatus>
                        Пройдено/всього
                        <S.detailStatusText>
                          {poll.resultCount}/{poll.workersCount}
                        </S.detailStatusText>
                      </S.detailStatus>
                      {poll.status === 3 ? (
                        <>Опитування завершено</>
                      ) : (
                        <Button variant="contained" onClick={handleOpenComplete}>
                          Завершити
                        </Button>
                      )}
                    </S.detailStatusInfo>
                  </Stack>
                  <AnswersTable />
                </>
              )}
            </>
          )}

          {openModalDel && (
            <MyModal
              isOpen={openModalDel}
              handleOpen={handleOpenDel}
              handleClose={handleCloseDel}
              width={400}
            >
              {openModalDel && (
                <>
                  <S.QaModalTitle>Видалити це опитування?</S.QaModalTitle>
                  <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                    <Button variant="contained" type="button" onClick={handleCloseDel}>
                      Cкасувати
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        deletePoll();
                        handleCloseDel();
                      }}
                    >
                      Видалити
                    </Button>
                  </Stack>
                </>
              )}
            </MyModal>
          )}

          {openModalComplete && (
            <MyModal
              isOpen={openModalComplete}
              handleOpen={handleOpenComplete}
              handleClose={handleCloseComplete}
              width={400}
            >
              {openModalComplete && (
                <>
                  <S.QaModalTitle>Ви дійсно бажаєте завершити це опитування?</S.QaModalTitle>
                  <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                    <Button variant="contained" type="button" onClick={handleCloseComplete}>
                      Cкасувати
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        completePoll();
                        handleCloseComplete();
                      }}
                    >
                      Завершити
                    </Button>
                  </Stack>
                </>
              )}
            </MyModal>
          )}

          {openModalSend && (
            <MyModal
              isOpen={openModalSend}
              handleOpen={handleOpenSend}
              handleClose={() => {
                handleCloseSend();
                setIsSend(false);
              }}
              width={400}
            >
              {openModalSend && !fixWaiter ? (
                <>
                  {isSend ? (
                    <>
                      <S.QaModalTitle>Опитування надіслано</S.QaModalTitle>
                      <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          type="button"
                          onClick={() => {
                            handleCloseSend();
                            setIsSend(false);
                          }}
                        >
                          Ок
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <>
                      {poll.status === 2 ? (
                        <S.QaModalTitle>
                          Ви дійсно бажаєте внести зміни і надіслати ще раз?
                        </S.QaModalTitle>
                      ) : (
                        <S.QaModalTitle>Надіслати це опитування працівникам?</S.QaModalTitle>
                      )}

                      <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                        <Button variant="contained" type="button" onClick={handleCloseSend}>
                          Ні
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            sendPoll(workerId);
                          }}
                        >
                          Так
                        </Button>
                      </Stack>
                    </>
                  )}
                </>
              ) : (
                <Loader />
              )}
            </MyModal>
          )}

          {openModalEdit && (
            <MyModal isOpen={openModalEdit} handleClose={handleCloseEdit} width={1000}>
              {openModalEdit && (
                <EditPoll
                  title={poll.title}
                  anonymous={poll.anonymous}
                  questions={poll.questions}
                  pollId={poll.id}
                  handleClose={handleCloseEdit}
                />
              )}
            </MyModal>
          )}
        </>
      )}
    </>
  );
};
DetailPoll.propTypes = {
  handleClose: PropTypes.func.isRequired,
  selectPollId: PropTypes.number.isRequired,
  role: PropTypes.number.isRequired,
};
export default DetailPoll;
