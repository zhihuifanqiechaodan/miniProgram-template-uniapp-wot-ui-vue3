<template>
  <view
    catchtap="handleBackTop"
    :style="{ 'z-index': zIndex, customStyle }"
    class="custom-nav-bar"
    :class="{ 'custom-nav-bar--fixed': fixed }"
  >
    <view
      :style="{ height: `${appStore.systemInfo.menuButton.top || 48}px` }"
    ></view>
    <view
      v-if="showSlot"
      :style="{
        height: `${height ? height : systemInfo.menuButton.height}px;`,
      }"
      class="custom-nav-bar-content"
    >
      <view class="custom-nav-bar-slot">
        <slot />
      </view>
    </view>
    <view
      v-else
      :style="{ height: `${appStore.systemInfo.menuButton.height}px` }"
      class="custom-nav-bar-content"
    >
      <view v-if="title" class="custom-nav-bar-title van-ellipsis">{{
        title
      }}</view>
      <view
        v-if="showHome"
        @click="handleReLaunchHome"
        class="custom-nav-bar-home-icon"
      >
        <custom-image
          src="/static/home.png"
          mode="heightFix"
          :height="`${appStore.systemInfo.menuButton.height}px`"
        />
      </view>
      <view
        v-if="showBack"
        @click="handleNavigateBack"
        class="custom-nav-bar-back-icon"
      >
        <custom-image
          src="/static/back.png"
          mode="heightFix"
          :height="`${appStore.systemInfo.menuButton.height}px`"
        />
      </view>
    </view>
  </view>
  <view
    v-if="fixed && placeholder"
    :style="{ height: `${appStore.systemInfo.menuButton.bottom}px` }"
  ></view>
</template>

<script setup>
import { useAppStore } from "@/stores/index.js";
import { navigateTo } from "@/utils/index.js";
import { Home } from "@/utils/router.js";

const appStore = useAppStore();
const props = defineProps({
  fixed: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
  backTop: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: Boolean,
    default: true,
  },
  customStyle: {
    type: String,
    default: "",
  },
  showHome: {
    type: Boolean,
    default: false,
  },
  showBack: {
    type: Boolean,
    default: false,
  },
  showSlot: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 100,
  },
  height: {
    type: String,
    default: "",
  },
});
const handleNavigateBack = () => {
  navigateTo({
    type: "navigateBack",
  });
};
const handleReLaunchHome = () => {
  navigateTo({
    url: Home.path,
    type: "reLaunch",
  });
};
</script>

<style scoped lang="scss">
.custom-nav-bar {
  &.custom-nav-bar--fixed {
	  z-index: 100000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }

  .custom-nav-bar-content {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20rpx;

    .custom-nav-bar-slot {
      padding: 0 20rpx;
    }

    .custom-nav-bar-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50vw;
      text-align: center;
      font-weight: 500;
    }

    .custom-nav-bar-home-icon,
    .custom-nav-bar-back-icon {
      padding: 0 20rpx;
    }
  }
}
</style>
