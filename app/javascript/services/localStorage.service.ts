import { UserModel } from "../model/UserModel";

const testUser = {
  id: 1,
  name: "pochi",
};

export const persistUser = (user: UserModel): void => {
  localStorage.sertItem("user", JSON.stringify(user));
};

export const ReadUser = (): UserModel | null => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : testUser;
};
