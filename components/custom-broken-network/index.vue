<template>
	<view v-if="brokenNetworkStatus" @touchmove.stop.prevent="noop" class="custom-broken-network">
		<view class="message">
			<text space="nbsp">似乎已断开与互联网的连接</text>
		</view>
		<view @click="handleRefresh" class="refresh">刷新</view>
	</view>
</template>

<script setup>
	import {
		useAppStore
	} from '@/stores/index.js'
	import {
		checkNetwork,
		getCurrentPageInfo
	} from '@/utils/index.js'
	const appStore = useAppStore()
	const props = defineProps({
		brokenNetworkStatus: {
			type: Boolean,
			default: false
		}
	})
	const currentPageInfo = getCurrentPageInfo()
	const noop = () => {}
	const handleRefresh = async () => {
		await checkNetwork()
		currentPageInfo.$vm.brokenNetworkStatus = false
		currentPageInfo.$vm.initData()
	}
</script>

<style scoped lang="scss">
	.custom-broken-network {
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 40rpx;
		width: 100%;
		height: 100%;
		background-color: #ffffff;

		.message {
			text-align: center;
		}

		.refresh {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 240rpx;
			height: 80rpx;
			border: 2rpx solid $uni-color-primary;

			.custom-refresh {
				width: 240rpx;
			}
		}
	}
</style>