import {atom, selector} from "recoil";

export const loginState = atom({
  key: "key",
  default: "",
});

export const apiKeyState = selector({
  key: "jaethem8APIKey",
  get: ({get}) => {
    const key = get(loginState);

    return key;
  },
});