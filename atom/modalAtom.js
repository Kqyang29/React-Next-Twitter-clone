import { atom } from "recoil";

export const modalState = atom({
  key: 'modalState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const postIdState = atom({
  key: 'postIdState', // unique ID (with respect to other atoms/selectors)
  default: "siTFwMRoubM3T7YiLA0M", // default value (aka initial value)
});