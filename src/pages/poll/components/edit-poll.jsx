import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixLoader, Loader, MyModal } from 'src/components';
import returnQType from 'src/helpers/index';
import { pollActions } from 'src/store/actions';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import * as S from '../styles';

const EditPoll = ({ handleClose, handleOpen, title, anonymous, questions, pollId }) => {
  const fixWaiter = useSelector((state) => state.pollReducer.fixWaiter);
  const typeWaiter = useSelector((state) => state.pollReducer.typeWaiter);
  const questionType = useSelector((state) => state.pollReducer.questionType);
  const role = useSelector((state) => state.authReducer.user.role);
  const [formSubmit, setFormSubmit] = useState(false);
  const dispatch = useDispatch();

  const [openModalHandle, setOpenModalHandle] = useState(false);
  const handleOpenHandle = () => setOpenModalHandle(true);
  const handleCloseHandle = () => setOpenModalHandle(false);

  const validationSchema = Yup.object({
    title: Yup.string('')
      .required("Це обов'язкове поле")
      .min(2, 'Мінімум 2 символи')
      .max(50, 'Максимуму 50 символів'),
    questions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required("Це обов'язкове поле")
          .min(2, 'Мінімум 2 символи')
          .max(50, 'Максимуму 50 символів'),
        answers: Yup.array().of(
          Yup.object().shape({
            value: Yup.string()
              .required("Це обов'язкове поле")
              .min(1, 'Мінімум 1 символ')
              .max(50, 'Максимуму 50 символів')
              .nullable(),
          }),
        ),
      }),
    ),
  });

  const initValue = {
    title,
    anonymous,
    questions: questions.map((item) => ({
      ...item,
      id: uuidv4(),
      answers: item.answers.map((answer) => ({
        ...answer,
        id: uuidv4(),
        value: answer.value === null ? '  ' : answer.value,
      })),
    })),
  };

  const handleSubmit = () => {
    handleOpenHandle();
  };

  const formik = useFormik({
    initialValues: initValue,
    validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleAddQuestions = () => {
    const questionsCopy = formik.values.questions;
    questionsCopy.push({
      id: uuidv4(),
      name: '',
      type: 1,
      required: false,
      answers: [
        {
          id: uuidv4(),
          value: '',
        },
      ],
    });

    formik.setFieldValue('questions', questionsCopy);
  };

  const editPoll = async () => {
    const data = formik.values;
    await dispatch(pollActions.editPoll({ data, role, pollId }));

    setFormSubmit(true);
  };

  return (
    <>
      {fixWaiter && <FixLoader />}
      <form onSubmit={formik.handleSubmit} id="editPollModal">
        <FormikProvider value={formik}>
          <S.PollTitle>Редагувати опитування</S.PollTitle>
          <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                name="title"
                label="Назва опитування"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name="anonymous"
                      checked={formik.values.anonymous}
                      onChange={(event) => formik.setFieldValue('anonymous', event.target.checked)}
                    />
                  }
                  label="Анонімно"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <S.QaList>
            <FieldArray
              name="questions"
              render={(helpers) => (
                <>
                  {formik.values.questions &&
                    formik.values.questions.map((child, index) => (
                      <S.QaListRow key={child.id}>
                        <Grid container rowSpacing={5} columnSpacing={5}>
                          <Grid item xs={12} md={8}>
                            <TextField
                              id={`questions[${index}].name`}
                              name={`questions[${index}].name`}
                              label="Запитання"
                              variant="standard"
                              value={child.name}
                              fullWidth
                              error={
                                formik.touched &&
                                formik.touched.questions &&
                                formik.touched.questions[index] &&
                                formik.touched.questions[index].name &&
                                Boolean(
                                  formik.errors &&
                                    formik.errors.questions &&
                                    formik.errors.questions[index] &&
                                    formik.errors.questions[index].name,
                                )
                              }
                              helperText={
                                formik.touched &&
                                formik.touched.questions &&
                                formik.touched.questions[index] &&
                                formik.touched.questions[index].name &&
                                formik.errors &&
                                formik.errors.questions &&
                                formik.errors.questions[index] &&
                                formik.errors.questions[index].name
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            {typeWaiter ? (
                              <Loader />
                            ) : (
                              <FormControl fullWidth>
                                <InputLabel id="label-type">Тип</InputLabel>
                                <Select
                                  labelId="label-type"
                                  id={`questions[${index}].type`}
                                  name={`questions[${index}].type`}
                                  label="Стать"
                                  value={child.type}
                                  onChange={(e) => {
                                    if (e.target.value === 4) {
                                      formik.setFieldValue(`questions[${index}].answers`, []);
                                    }
                                    formik.handleChange(e);
                                  }}
                                  onBlur={formik.handleBlur}
                                >
                                  {questionType.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                      <S.QaListRowTypeFlex>
                                        {returnQType(option.id)}
                                        {option.name}
                                      </S.QaListRowTypeFlex>
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          </Grid>
                        </Grid>
                        <S.Answers>
                          {child.type !== 4 && (
                            <Grid container rowSpacing={2} columnSpacing={5}>
                              <Grid item xs={11} md={4}>
                                <FieldArray
                                  name={`questions[${index}].answers`}
                                  render={(helpers2) => (
                                    <>
                                      {formik.values.questions[index].answers &&
                                        formik.values.questions[index].answers.map(
                                          (child2, index2) => (
                                            <S.AnswersItem key={child2.id}>
                                              <S.AnswersItemType>
                                                {returnQType(child.type)}
                                              </S.AnswersItemType>

                                              <TextField
                                                variant="standard"
                                                fullWidth
                                                name={`questions[${index}].answers[${index2}].value`}
                                                value={child2.value}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                  formik.touched &&
                                                  formik.touched.questions &&
                                                  formik.touched.questions[index] &&
                                                  formik.touched.questions[index].answers &&
                                                  formik.touched.questions[index].answers[index2] &&
                                                  formik.touched.questions[index].answers[index2]
                                                    .value &&
                                                  Boolean(
                                                    formik.errors &&
                                                      formik.errors.questions &&
                                                      formik.errors.questions[index] &&
                                                      formik.errors.questions[index].answers &&
                                                      formik.errors.questions[index].answers[
                                                        index2
                                                      ] &&
                                                      formik.errors.questions[index].answers[index2]
                                                        .value,
                                                  )
                                                }
                                                helperText={
                                                  formik.touched &&
                                                  formik.touched.questions &&
                                                  formik.touched.questions[index] &&
                                                  formik.touched.questions[index].answers &&
                                                  formik.touched.questions[index].answers[index2] &&
                                                  formik.touched.questions[index].answers[index2]
                                                    .value &&
                                                  formik.errors &&
                                                  formik.errors.questions &&
                                                  formik.errors.questions[index] &&
                                                  formik.errors.questions[index].answers &&
                                                  formik.errors.questions[index].answers[index2] &&
                                                  formik.errors.questions[index].answers[index2]
                                                    .value
                                                }
                                              />
                                              {index2 > 0 && (
                                                <S.AnswersItemDelete>
                                                  <IconButton
                                                    color="error"
                                                    onClick={() => helpers2.remove(index2)}
                                                  >
                                                    <DeleteForeverIcon />
                                                  </IconButton>
                                                </S.AnswersItemDelete>
                                              )}
                                            </S.AnswersItem>
                                          ),
                                        )}
                                      {child.type !== 4 && child.answers.length < 6 && (
                                        <Button
                                          startIcon={<AddIcon />}
                                          size="small"
                                          variant="contained"
                                          onClick={() => helpers2.push({ id: uuidv4(), value: '' })}
                                        >
                                          Додати
                                        </Button>
                                      )}
                                    </>
                                  )}
                                />
                              </Grid>
                            </Grid>
                          )}
                        </S.Answers>
                        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  name={`questions[${index}].required`}
                                  checked={child.required}
                                  onChange={(event) => {
                                    formik.setFieldValue(
                                      `questions[${index}].required`,
                                      event.target.checked,
                                    );
                                  }}
                                />
                              }
                              label="Обов'язково"
                            />
                          </FormGroup>
                          {index > 0 && (
                            <IconButton color="error" onClick={() => helpers.remove(index)}>
                              <DeleteForeverIcon />
                            </IconButton>
                          )}
                        </Stack>
                      </S.QaListRow>
                    ))}
                </>
              )}
            />
          </S.QaList>
          {formik.values.questions.length < 15 && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              onClick={handleAddQuestions}
            >
              Додати форму
            </Button>
          )}
        </FormikProvider>
        <Stack justifyContent="flex-end" direction="row" mt={2}>
          <Button type="submit" variant="contained">
            Редагувати
          </Button>
        </Stack>
      </form>

      {formSubmit && (
        <MyModal isOpen={formSubmit} handleOpen={handleOpen} handleClose={handleClose} width={400}>
          {formSubmit && (
            <>
              <S.QaModalTitle>Зміни збережено!</S.QaModalTitle>
              <Stack mt={2} justifyContent="center" direction="row" spacing={2}>
                <Button variant="contained" onClick={handleClose}>
                  Ок
                </Button>
              </Stack>
            </>
          )}
        </MyModal>
      )}

      {openModalHandle && (
        <MyModal
          isOpen={openModalHandle}
          handleOpen={handleOpenHandle}
          handleClose={handleCloseHandle}
          width={400}
        >
          {openModalHandle && (
            <>
              <S.QaModalTitle>Ви дійсно бажаєте внести зміни?</S.QaModalTitle>
              <Stack mt={2} justifyContent="center" direction="row" spacing={2}>
                <Button variant="contained" onClick={handleCloseHandle}>
                  Ні
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    editPoll();
                    handleCloseHandle();
                  }}
                >
                  Так
                </Button>
              </Stack>
            </>
          )}
        </MyModal>
      )}
    </>
  );
};

EditPoll.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  anonymous: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  pollId: PropTypes.number.isRequired,
};
export default EditPoll;
