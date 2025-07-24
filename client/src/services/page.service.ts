import axios from '@/lib/axios';

export const createPage = async (title: string, blocks: any[] = []) => {
  const res = await axios.post('/pages', { title, blocks });
  return res.data;
};

export const getPages = async () => {
  const res = await axios.get('/pages');
  console.log('res ', res);
  return res.data;
};

export const getPageById = async (id: string) => {
  const res = await axios.get(`/pages/${id}`);
  return res.data;
};

export const updatePage = async (
  id: string,
  data: { title: string; blocks: any[] }
) => {
  const res = await axios.put(`/pages/${id}`, data);
  return res.data;
};
