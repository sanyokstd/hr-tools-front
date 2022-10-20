import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'src/components/';
import * as GS from 'src/global-styles';
import { authActions } from 'src/store/actions';
import { clearErrors } from 'src/store/reducers/auth.reducer';
import * as Yup from 'yup';

import * as S from '../styles';

const ForgotPassSchema = Yup.object().shape({
  email: Yup.string().email('Некоректна email адрасса').required("Обов'язкове поле"),
});

const ForgotPass = () => {
  const authLoader = useSelector((state) => state.authReducer.authWaiter);
  const error = useSelector((state) => state.authReducer.errors);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(clearErrors()), []);

  const handleRequest = async (values) => {
    await dispatch(authActions.forgotPass(values));
    setSubmitConfirm(true);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPassSchema,
    onSubmit: (values) => handleRequest(values),
  });

  return (
    <>
      {!authLoader ? (
        <>
          <S.AuthTitle>Забули пароль?</S.AuthTitle>
          <S.AuthSubTitle>
            Вам на пошту буде відправлено з посиланням для зміни пароля
          </S.AuthSubTitle>

          <form onSubmit={formik.handleSubmit}>
            <S.FormRow>
              <TextField
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                label="E-mail"
                name="email"
                id="email"
                variant="outlined"
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email && formik.touched.email && formik.errors.email}
              />
            </S.FormRow>
            <S.FormRow>
              <GS.FlexContainer $justify="flex-end">
                <S.StyledLink to="/auth/">Повернутися до авторизації</S.StyledLink>
              </GS.FlexContainer>
            </S.FormRow>
            <S.FormRow>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
              >
                Надіслати лист
              </Button>
            </S.FormRow>
          </form>
          {submitConfirm && !error && (
            <S.AlertStyled severity="success">
              Вам відправленно лист на електрону адресу.
              <br /> Перейдіть за посиланням у описі
            </S.AlertStyled>
          )}
          {error && <S.AlertStyled severity="error">{error}</S.AlertStyled>}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ForgotPass;
