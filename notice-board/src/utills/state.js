import { atom } from "recoil";
import { persistAtom } from "./recoilPersist";

export const authTokenState = atom({
  key: "authTokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userIdState = atom({
  key: "userIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
