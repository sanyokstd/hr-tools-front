import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import * as S from './styles';

const mainContainer = document.getElementById('root');

const View = ({ isOpen, children, handleClose, width = 600 }) => {
  const modalBack = useRef();
  const modalWrap = useRef();

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = '';
    }

    return () => {
      document.querySelector('body').style.overflow = '';
    };
  }, [isOpen]);

  return (
    <S.MyModal ref={modalBack} className={isOpen && 'active'}>
      <S.MyModalDialog>
        <S.MyModalWrap ref={modalWrap} $width={width}>
          <S.MyModalClose aria-label="delete" onClick={() => handleClose()}>
            <CloseIcon />
          </S.MyModalClose>
          {children}
        </S.MyModalWrap>
      </S.MyModalDialog>
    </S.MyModal>
  );
};

const MyModal = (props) => createPortal(<View {...props} />, mainContainer);

View.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};
export default MyModal;
