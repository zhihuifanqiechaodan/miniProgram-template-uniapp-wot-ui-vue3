import {
	useAppStore
} from "@/stores/index.js";
import {
	TabbarRouterGroups
} from "@/utils/router.js";

export const getSystemInfoSync = () => {
	const systemSetting = uni.getSystemSetting();
	const appAuthorizeSetting = uni.getAppAuthorizeSetting();
	const deviceInfo = uni.getDeviceInfo();
	const windowInfo = uni.getWindowInfo();
	const appBaseInfo = uni.getAppBaseInfo();
	const menuButton = uni.getMenuButtonBoundingClientRect();
	return {
		...systemSetting,
		...appAuthorizeSetting,
		...deviceInfo,
		...windowInfo,
		...appBaseInfo,
		menuButton,
	};
};

export const navigateTo = ({
	url = '',
	type = "navigateTo",
	delta = 1,
	checkIsConnected = true,
	events = {},
}) => {
	const appStore = useAppStore();
	return new Promise((resolve, reject) => {
		const options = {
			url,
			success: resolve,
			fail: reject,
		};
		if (type === "navigateTo") {
			options.events = events;
		}
		if (type === "navigateBack") {
			options.delta = delta;
		}
		if (checkIsConnected && !appStore.isConnected) {
			uni.showToast({
				title: "似乎已经断开了与互联网的连接",
				icon: 'none'
			});
			return;
		}
		if (
			TabbarRouterGroups.map((item) => item.path).includes(url.split("?")[0])
		) {
			type = "relaunch";
		}
		switch (type) {
			case "navigateTo":
				uni.navigateTo(options);
				break;
			case "relaunch":
				uni.reLaunch(options);
				break;
			case "redirectTo":
				uni.redirectTo(options);
				break;
			case "switchTab":
				uni.switchTab(options);
				break;
			case "navigateBack":
				uni.navigateBack(options);
				break;
			default:
				break;
		}
	});
};
export const getCurrentPageInfo = ({
	path
} = {}) => {
	if (path) {
		return getCurrentPages()
			.reverse()
			.find((item) => {
				return `/${item.route}` === path;
			});
	} else {
		return getCurrentPages().reverse()[0];
	}
};

export const getCurrentPageIndex = ({
	path
} = {}) => {
	return getCurrentPages()
		.reverse()
		.findIndex((item) => {
			return `/${item.route}` === path;
		});
};
export const checkNetwork = () => {
	const appStore = useAppStore();
	return new Promise((resolve, reject) => {
		if (appStore.isConnected) {
			resolve();
		} else {
			uni.showToast({
				title: '似乎已经断开了与互联网的连接',
				icon: 'none'
			})
			reject("似乎已经断开了与互联网的连接");
		}
	});
};

export const getNetworkType = () => {
	return new Promise((resolve) => {
		wx.getNetworkType({
			success: (value) => {
				resolve(value.networkType);
			},
		});
	});
};

export const shareImageFormat = (params) => {
	const appStore = useAppStore();
	const systemDetail = appStore.systemInfo.system.split(" ");
	const type = systemDetail[0];
	const version = systemDetail[1];
	if (type.toLowerCase() === "ios" && parseInt(version) <= 14) {
		return params.replace("format,webp", "format,jpg");
	} else {
		return params;
	}
};