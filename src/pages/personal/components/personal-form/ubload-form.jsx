import { Alert, Button, Collapse } from '@mui/material';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { suportedFormat } from 'src/constants';
import { authActions } from 'src/store/actions';

import * as S from '../../styles';

const UploadForm = ({ resumeFileName, path }) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState(resumeFileName);
  const inputFile = useRef(null);
  const [err, setErr] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const handleAction = async (file) => {
    try {
      await dispatch(authActions.personalResumeUpload(file));
      setFileName(file.name);
      setIsSave(true);
      setTimeout(() => {
        setIsSave(false);
      }, 5000);
    } catch (error) {
      setErr('сталася помилка');
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }
  };

  const onFileChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      if (file.size >= 5000000) {
        setErr('файл занадто великий!');
      } else if (!suportedFormat.includes(file.type)) {
        setErr('Невірний тип файла!');
      } else {
        handleAction(file);
      }
    }
  };

  const onFileRemove = async () => {
    try {
      await dispatch(authActions.personalResumeDelete());
      inputFile.current.value = '';
      setFileName('');
      setIsSave(true);
      setTimeout(() => {
        setIsSave(false);
      }, 5000);
    } catch (error) {
      setErr('сталася помилка');
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }
  };

  return (
    <>
      <S.UploadFlex>
        <S.UploadFlexButton>
          <Button variant="contained" component="label">
            Додати резюме
            <input
              ref={inputFile}
              name="resume"
              id="resume"
              hidden
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              type="file"
              onChange={onFileChange}
            />
          </Button>
          <S.UploadText>doc, docs, PDF (до 5мб)</S.UploadText>
        </S.UploadFlexButton>
        {fileName ? (
          <S.UploadFile>
            <S.UploadFileIconDelete onClick={() => onFileRemove()} />
            <S.ResumeLink target="_blank" href={path}>
              <S.UploadFileIcon />
              <S.UploadFileText>Резюме завантаженно</S.UploadFileText>
            </S.ResumeLink>
          </S.UploadFile>
        ) : null}
      </S.UploadFlex>

      <Collapse in={isSave}>
        <S.PersonalBlock>
          <Alert severity="success">Дані успішно збережено</Alert>
        </S.PersonalBlock>
      </Collapse>

      <Collapse in={Boolean(err)}>
        <S.PersonalBlock>
          <Alert severity="error">{err}</Alert>
        </S.PersonalBlock>
      </Collapse>
    </>
  );
};
UploadForm.propTypes = {
  resumeFileName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
export default UploadForm;
