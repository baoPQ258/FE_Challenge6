export type FormDatas = {
  email: string;
  password: string;
  token?: string;
};
export type FormEdit = {
  email: string;
  name: string;
  bio: string;
  phone: number;
};
export type User = {
  email: string;
  token?: string;
  name?: string;
  bio?: string;
  phone?: number;
  password: string;
  photo?: string;
};
export type Group = {
  name: string;
  title: string;
  _id?: string;
  members: [];
};
export type Messages = {
  name: string;
  text: string;
};
