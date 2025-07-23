import axios from '@/lib/axios';

export const createPage = async (title: string, blocks: any[] = []) => {
  const res = await axios.post('/pages', { title, blocks });
  return res.data;
};

export const getPages = async () => {
  const res = await axios.get('/pages');
  return res.data;
};

export const getPageById = async (id: string) => {
  const res = await axios.get(`/pages/${id}`);
  return res.data;
};

export const updatePage = async (id: string, title: string) => {
  const res = await axios.put(`/pages/${id}`, { title });
  return res.data;
};
