import { atom } from "recoil";
import { persistAtom } from "./recoilPersist";

export const authTokenState = atom({
  key: "authTokenState",
  default: null, // 기본값 (로그아웃 상태)
  effects_UNSTABLE: [persistAtom],
});
