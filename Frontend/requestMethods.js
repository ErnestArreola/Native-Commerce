import axios from "axios";
import { AsyncStorage } from "react-native";
import deviceStorage from './redux/deviceStorage';

const BASE_URL = "https://native-commerce.herokuapp.com/api/";
// const TOKEN =
//   JSON.parse(JSON.parseetItem("persist:root")).user).currentUser
//     .accessToken || "";(localStorage.g
// console.log(AsyncStorage.getItem('id_token'));

// const user = JSON.parse(AsyncStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${(async () => {
    console.log(await deviceStorage.loadJWT())
  })()}` },
});
