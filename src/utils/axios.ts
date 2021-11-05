import axios, { AxiosRequestConfig, Canceler, Method } from "axios";
import Qs from "qs";
// import { getUserInfo } from "./utils";

export interface IDataProps<T> {
	// data: T;
	// msg: string;
	// state: any;

	code: number
	data: T
	errno: number
	st: number

}

// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers["Content-Type"] = "application/json";

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending: any = new Map();
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: any) => {
	const url = [config.method, config.url, Qs.stringify(config.params), Qs.stringify(config.data)].join("&");
	config.cancelToken =
		config.cancelToken ||
		new axios.CancelToken((cancel) => {
			if (!pending.has(url)) {
				// 如果 pending 中不存在当前请求，则添加进去
				pending.set(url, cancel);
			}
		});
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: AxiosRequestConfig, c?: Canceler) => {
	const url = [config.method, config.url, Qs.stringify(config.params), Qs.stringify(config.data)].join("&");
	if (pending.has(url)) {
		// 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
		const cancel = pending.get(url);
		cancel("取消重复请求 " + url);
		pending.delete(url);
	}
};
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
	for (const [url, cancel] of pending) {
		cancel(url);
	}
	pending.clear();
};

let config = {
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 60 * 1000, // Timeout
};
const _axios = axios.create(config);
_axios.interceptors.request.use(
	(config) => {
		// Do something before request is sent
		// config.headers["Authorization"] = "";
		// getUserInfo()?.token && (config.headers["token"] = getUserInfo()?.token);
		// config.headers["appid"] = process.env.REACT_APP_ID;
		// config.headers = { token: getUserInfo()?.token, ...config.headers };
		removePending(config); // 在请求开始前，对之前的请求做检查取消操作
		addPending(config); // 将当前请求添加到 pending 中

		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
_axios.interceptors.response.use(
	(response) => {
		// C-10005
		if (["C-10005", "C-10003"].includes(response.data.state)) {
			alert("身份验证信息已过期,请重新登录!");
			window.location.href = "/";
			return response;
		}
		removePending(response); // 在请求结束后，移除本次请求
		// Do something with response data
		return response;
	},
	(error) => {
		if (error.message.startsWith("取消")) return Promise.reject(error.message);
		// Do something with response error
		return Promise.reject(error);
	}
);
// React.Component.prototype.$axios = _axios;

// export default axios;

export interface IAxiosGetProps {
	url: string;
	data?: { [key: string]: string | number } | any;
	method?: Method;
	isStringify?: boolean;
}

const axiosGet = <T>(props: IAxiosGetProps): Promise<IDataProps<T>> => {
	let { url, data, method = "GET", ...rest } = props;
	return new Promise(async (resolve, reject) => {
		let res = await _axios.request({ ...rest, url, params: data, method });
		if (res.data.errno) reject(res.data);
		resolve(res.data);
	});
};

const axiosPost = <T>(props: IAxiosGetProps): Promise<IDataProps<T>> => {
	let { url, data, ...rest } = props;
	return new Promise(async (resolve, reject) => {
		let res = await _axios.request({ ...rest, url, data: (data), method: "post" });
		if (res.data.errno) reject(res.data);
		resolve(res.data);
	});
};

export default _axios;

export { axiosGet, axiosPost };
