import { Alert, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldMask } from 'src/components';
import { Loader } from 'src/components/';
import * as GS from 'src/global-styles';
import * as S from 'src/pages/auth/styles';
import { authActions } from 'src/store/actions';
import { clearErrors } from 'src/store/reducers/auth.reducer';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Не менше 2 символів')
    .max(50, 'Не більше 50 символів')
    .required("Обов'язкове поле"),
  lastName: Yup.string()
    .min(2, 'Не менше 2 символів')
    .max(50, 'Не більше 50 символів')
    .required("Обов'язкове поле"),
  email: Yup.string().email('Некоректна email адрасса').required("Обов'язкове поле"),
  phone: Yup.string().test('len', 'мінімум 12 цифр', (phone) => {
    if (phone) {
      const phoneNumb = phone.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '');
      return phoneNumb.length >= 12;
    }
    return false;
  }),
  password: Yup.string()
    .required("Обов'язкове поле")
    .min(
      8,
      'Пароль мусить мати 8 і більше символів, хоча б одну велику літеру, хоча б одну малу літеру та одну цифру',
    )
    .minLowercase(1, 'Пароль мусить мати хоча б одну малу літеру')
    .minUppercase(1, 'Пароль мусить мати хоча б одну велику літеру')
    .minNumbers(1, 'Пароль мусить мати хоча б одну цифру'),
  password_confirmation: Yup.string()
    .required("Обов'язкове поле")
    .oneOf([Yup.ref('password'), null], 'Паролі не збігаються'),
});

const SignUp = () => {
  const errors = useSelector((state) => state.authReducer.errors);
  const authLoader = useSelector((state) => state.authReducer.authWaiter);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(clearErrors()), []);

  const handleRequest = async (values) => {
    const res = await dispatch(authActions.createUser(values));

    const userId = res.payload.data.data.user.id;
    navigate(`/auth/resend-email/${userId}`);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => handleRequest(values),
  });

  return (
    <>
      {!authLoader ? (
        <>
          <S.AuthTitle>Реєстрація</S.AuthTitle>

          <form onSubmit={formik.handleSubmit}>
            <S.FormRow>
              <TextField
                required
                value={formik.values.email}
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
              <TextField
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                label="Пароль"
                type="password"
                name="password"
                id="password"
                variant="outlined"
                error={formik.errors.password && formik.touched.password}
                helperText={
                  formik.errors.password && formik.touched.password && formik.errors.password
                }
              />
            </S.FormRow>
            <S.FormRow>
              <TextField
                required
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                label="Підтвердити пароль"
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                variant="outlined"
                error={formik.errors.password_confirmation && formik.touched.password_confirmation}
                helperText={
                  formik.errors.password_confirmation &&
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
              />
            </S.FormRow>
            <S.FormRow>
              <TextField
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                label="Ім’я"
                id="firstName"
                name="firstName"
                variant="outlined"
                error={formik.errors.firstName && formik.touched.firstName}
                helperText={
                  formik.errors.firstName && formik.touched.firstName && formik.errors.firstName
                }
              />
            </S.FormRow>
            <S.FormRow>
              <TextField
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                label="Прізвище"
                name="lastName"
                id="lastName"
                variant="outlined"
                error={formik.errors.lastName && formik.touched.lastName}
                helperText={
                  formik.errors.lastName && formik.touched.lastName && formik.errors.lastName
                }
              />
            </S.FormRow>
            <S.FormRow>
              <FieldMask
                required
                value={formik.values.phone}
                mask="+380-99-999-99-99"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                label="Номер телефону"
                name="phone"
                id="phone"
                variant="outlined"
                error={formik.errors.phone && formik.touched.phone}
                helperText={formik.errors.phone && formik.touched.phone && formik.errors.phone}
              />
            </S.FormRow>
            <S.FormRow>
              <GS.FlexContainer $justify="flex-end">
                <S.StyledLink to="/auth/">У вас є аккаунт? Увійти</S.StyledLink>
              </GS.FlexContainer>
            </S.FormRow>
            <S.FormRow>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Створити аккаунт
              </Button>
            </S.FormRow>
          </form>
          {errors ? <Alert severity="error">{errors}</Alert> : null}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SignUp;
