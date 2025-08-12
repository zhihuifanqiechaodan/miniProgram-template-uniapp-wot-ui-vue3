import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    systemInfo: null, // 设备信息
    networkType: '', // 网络类型
    isConnected: true, // 网络状态
    videoContextComponent: null, // VideoContextComponent，VideoContext实例所在的组件，用于处理视频播放相关业务
  }),
  getters: {},
  actions: {
    setSystemInfo(systemInfo) {
      this.systemInfo = systemInfo;
    },
    setNetworkType(networkType) {
      this.networkType = networkType;
    },
    setIsConnected(isConnected) {
      this.isConnected = isConnected;
    },
  },
});
