import { atom } from "recoil";
import { persistAtom } from "./recoilPersist";

export const authToken = atom({
  key: "authTokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userId = atom({
  key: "userIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
