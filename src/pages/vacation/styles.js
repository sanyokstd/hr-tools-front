import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';

export const Title = styled.div`
  font-size: 24px;
  border-bottom: 1px dashed #000;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

export const GreenT = styled.div`
  color: #73c41d;
  font-weight: bold;
`;

export const BlackT = styled.div`
  font-weight: bold;
`;

export const VWItem = styled.div`
  width: 240px;
  border-radius: 15px;
  border: 1px solid #333;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const VWChildIcon = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  svg {
    margin-right: 10px;
  }
`;

export const VWChild = styled.div`
  font-size: 14px;
`;
export const CreateModal = styled.div``;
export const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const Picker = styled.div`
  position: relative;
  width: 100%;
`;

export const PickerClear = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;
