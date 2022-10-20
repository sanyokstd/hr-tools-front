import { api } from 'src/api';

export const getVacationsWorker = async (page) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`vacation/?page=${page}`, headers);

  return result;
};

export const getStatus = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`vacation/info`, headers);

  return result;
};

export const deleteVac = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.delete(`vacation/${id}`, headers);

  return result;
};

export const createVac = async (body) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.post(`vacation/`, body, headers);

  return result;
};
