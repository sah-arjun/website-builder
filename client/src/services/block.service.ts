import axios from '@/lib/axios';

export const createBlock = async (pageId: string, content: string) => {
  const res = await axios.post('/blocks', { pageId, content });
  return res.data;
};

export const getBlocksByPage = async (pageId: string) => {
  const res = await axios.get(`/blocks/${pageId}`);
  return res.data;
};

export const updateBlock = async (blockId: string, content: string) => {
  const res = await axios.put(`/blocks/${blockId}`, { content });
  return res.data;
};

export const deleteBlock = async (blockId: string) => {
  const res = await axios.delete(`/blocks/${blockId}`);
  return res.data;
};
