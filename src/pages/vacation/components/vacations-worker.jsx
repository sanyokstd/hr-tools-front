import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader, MyModal, Pagination } from 'src/components';
import { vacationActions } from 'src/store/actions';

import * as S from '../styles';
import WorkerCreate from './worker-craate';

const VacationWorker = () => {
  const workerVacation = useSelector((state) => state.vacationReducer.workerVacation);
  const workerPagination = useSelector((state) => state.vacationReducer.workerPagination);

  const status = useSelector((state) => state.vacationReducer.status);
  const waiterStatus = useSelector((state) => state.vacationReducer.waiterStatus);
  const waiterVac = useSelector((state) => state.vacationReducer.waiterVac);
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    dispatch(vacationActions.getStatus());
  }, []);

  useEffect(() => {
    dispatch(vacationActions.getVacationsWorker({ page }));
  }, [page]);

  const handleDispatchAll = () => {
    dispatch(vacationActions.getStatus());
    dispatch(vacationActions.getVacationsWorker({ page }));
  };

  const returnStatusName = (statusId) => {
    switch (statusId) {
      case 0:
        return 'Відхилено';
      case 1:
        return 'Схвалено';
      default:
        return 'На розгляді';
    }
  };

  const [selectVac, setSelectVal] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (id) => {
    setSelectVal(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const [isDelete, setIsDelete] = useState(false);
  const handleOpenIsDelete = () => setIsDelete(true);
  const handleCloseIsDelete = () => setIsDelete(false);

  const handleDeleteVac = async () => {
    handleCloseDelete();
    await dispatch(vacationActions.deleteVac(selectVac));
    dispatch(vacationActions.getVacationsWorker({ page }));
    handleOpenIsDelete();
  };

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  return (
    <>
      <S.Title>
        Відпустка/Лікарнянний
        <Button startIcon={<AddIcon />} onClick={handleOpenCreate}>
          Зробити запит
        </Button>
      </S.Title>
      {waiterStatus ? (
        <Loader />
      ) : (
        <Stack
          justifyContent="center"
          alignItems="center"
          mb={4}
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
        >
          <S.VWItem>
            <S.VWChildIcon>
              <HouseboatIcon />
              Відпустка
            </S.VWChildIcon>

            <Stack direction="row" spacing={2} mt={1}>
              <S.VWChild> Доступно: {status?.availableVacationsDays}</S.VWChild>
              <S.VWChild> Використано: {status?.vacationDaysUsed}</S.VWChild>
            </Stack>
          </S.VWItem>

          <S.VWItem>
            <S.VWChildIcon>
              <MedicationLiquidIcon />
              Лікарняний
            </S.VWChildIcon>

            <Stack direction="row" spacing={2} mt={1}>
              <S.VWChild> Доступно: {status?.hospitalDaysUsed}</S.VWChild>
            </Stack>
          </S.VWItem>
        </Stack>
      )}

      <S.Title>Мої запити</S.Title>
      {waiterVac ? (
        <Loader />
      ) : (
        <>
          {workerVacation && workerVacation.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Період</TableCell>
                      <TableCell align="center">Кількість днів</TableCell>
                      <TableCell align="center">Дата запиту</TableCell>
                      <TableCell align="center">Статус</TableCell>
                      <TableCell align="center">Операції</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workerVacation.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">
                          {item.type ? (
                            <S.GreenT>Лікарняний</S.GreenT>
                          ) : (
                            <S.GreenT>Відпустка</S.GreenT>
                          )}
                          {`${item.dateStart}-${item.dateEnd}`}
                        </TableCell>
                        <TableCell align="center">{item.daysCount}</TableCell>
                        <TableCell align="center">{item.dateCreate}</TableCell>
                        <TableCell align="center">
                          <S.BlackT>{returnStatusName(item.status)}</S.BlackT>
                        </TableCell>
                        <TableCell align="center">
                          {item.canDelete && (
                            <IconButton color="error" onClick={() => handleOpenDelete(item.id)}>
                              <DeleteForeverIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Pagination pagination={workerPagination} />
            </>
          ) : (
            <>Запититів немає</>
          )}
        </>
      )}

      {openDelete && (
        <MyModal
          isOpen={openDelete}
          handleOpen={handleOpenDelete}
          handleClose={handleCloseDelete}
          width={400}
        >
          <>
            <S.ModalTitle>Видалити запит?</S.ModalTitle>
            <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
              <Button variant="contained" type="button" onClick={handleCloseDelete}>
                Ні
              </Button>
              <Button variant="contained" type="button" onClick={handleDeleteVac}>
                Так
              </Button>
            </Stack>
          </>
        </MyModal>
      )}

      {isDelete && (
        <MyModal
          isOpen={isDelete}
          handleOpen={handleOpenIsDelete}
          handleClose={handleCloseIsDelete}
          width={400}
        >
          <>
            <S.ModalTitle>Запит видалено</S.ModalTitle>
            <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
              <Button variant="contained" type="button" onClick={handleCloseIsDelete}>
                Ок
              </Button>
            </Stack>
          </>
        </MyModal>
      )}

      {openCreate && (
        <MyModal
          isOpen={openCreate}
          handleOpen={handleOpenCreate}
          handleClose={handleCloseCreate}
          width={600}
        >
          <WorkerCreate handleClose={handleCloseCreate} dispatchAll={handleDispatchAll} />
        </MyModal>
      )}
    </>
  );
};

export default VacationWorker;
