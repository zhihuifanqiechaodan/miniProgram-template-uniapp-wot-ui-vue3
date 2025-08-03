<template>
  <view class="content">
    <custom-nav-bar :showHome="true" />
    <wd-tabs v-model="tab" auto-line-width lineHeight="1">
      <block v-for="item in tabs" :key="item">
        <wd-tab :title="`${item}`" :name="item">
          <view class="content">内容{{ tab }}</view>
        </wd-tab>
      </block>
    </wd-tabs>
    <wd-button>主要按钮</wd-button>
    <wd-button type="success">成功按钮</wd-button>
    <wd-button type="info">信息按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button @click="navigateTo({ url: Home.path, toast })" type="error"
      >危险按钮</wd-button
    >
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area"> </view>
  </view>
  <wd-toast />
</template>

<script setup>
import { useToast } from "wot-design-uni";
import { getCurrentPageInfo, navigateTo } from "@/utils/index.js";
import { Home } from "@/utils/router.js";
import { onMounted, ref } from "vue";
const toast = useToast();
const tabs = ref(["Wot", "Design", "Uni"]);
const tab = ref("Design");
const title = "12312";
const initData = () => {
  console.log(111);
};
</script>

<style>
.wd-tabs__line {
  background-color: transparent !important;
  background-image: url("https://fabrique.oss-cn-qingdao.aliyuncs.com/fabrique-miniProgram/navbar-underline.png") !important;
  background-size: 100% 100% !important;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
