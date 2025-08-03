<script setup>
	import {
		onLaunch,
		onShow,
		onHide,
		onPageNotFound
	} from '@dcloudio/uni-app'
	import {
		useAppStore
	} from '@/stores/index.js'
	import {
		getSystemInfoSync,
		getNetworkType,
		navigateTo
	} from '@/utils/index'
	import {
		Home
	} from '@/utils/router'

	const appStore = useAppStore()
	onLaunch(async () => {
		console.log('App Launch')
		const updateManager = uni.getUpdateManager();
		updateManager.onUpdateReady(function() {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				showCancel: false,
				success: () => {
					updateManager.applyUpdate();
				},
			});
		});
		const systemInfo = getSystemInfoSync()
		appStore.setSystemInfo(systemInfo)
		const networkType = await getNetworkType()
		appStore.setNetworkType(networkType)
		appStore.setIsConnected(networkType == 'none' ? false : true)
		console.log(appStore.$state)
	})
	onShow(() => {
		console.log('App Show')
		uni.onNetworkStatusChange((value) => {
			appStore.setIsConnected(value.isConnected)
			appStore.setNetworkType(value.networkType)
		});
	})
	onHide(() => {
		console.log('App Hide')
	})
	onPageNotFound(() => {
		navigateTo({
			url: Home.path,
			type: 'relanch'
		})
	})
</script>

<style>
	/*每个页面公共css */
</style>