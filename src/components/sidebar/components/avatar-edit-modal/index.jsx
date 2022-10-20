import { Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'src/components';
import { authActions } from 'src/store/actions';

import * as S from '../../styles';

const AvatarEditModal = ({ handleClose }) => {
  const waiter = useSelector((state) => state.authReducer.waiter);

  const [result, setResult] = useState(null);
  const [sizeValidate, setSizeValidate] = useState(true);

  const dispatch = useDispatch();

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  };

  const handeReques = async () => {
    if (result) {
      const file = await urlToFile(result, 'avatar.jpg', 'image/jpeg');
      dispatch(authActions.editAvatar(file)).then(() => handleClose());
    }
  };

  const onClose = () => {
    setResult(null);
  };

  const onCrop = (img) => {
    setResult(img);
  };

  const onBeforeFileLoad = (e) => {
    const file = e.target.files[0];

    if (file.size < 41943040) {
      setSizeValidate(true);
    } else {
      setSizeValidate(false);
      file.target.value = '';
    }
  };

  return (
    <S.AvatarEditModal>
      {!waiter ? (
        <>
          <S.AvatarEditCrop>
            <Avatar
              width={300}
              height={300}
              label="Вибрати фото (jpeg, png, 5MB)"
              imageWidth={300}
              onCrop={onCrop}
              onClose={onClose}
              cropRadius={50}
              labelStyle={{
                width: '100%',
                display: 'block',
                height: '100%',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '20px',
              }}
              onBeforeFileLoad={onBeforeFileLoad}
            />
          </S.AvatarEditCrop>
          {!sizeValidate && <S.AvatarErrorText>Файл має бути до 5MB!</S.AvatarErrorText>}
          <S.AvatarEditButtons>
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
              <Button
                variant="contained"
                disabled={sizeValidate && !result}
                onClick={() => handeReques()}
              >
                Зберегти
              </Button>
              <Button variant="outlined" onClick={() => handleClose()}>
                Відмінити
              </Button>
            </Stack>
          </S.AvatarEditButtons>
        </>
      ) : (
        <Loader />
      )}
    </S.AvatarEditModal>
  );
};
AvatarEditModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default AvatarEditModal;
