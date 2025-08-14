<template>
  <view class="home-container">
    home页面
    <customVirtualiList :columns="2" :dataList="dataList" :pageSize="pageSize" class="test" custom-style="display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 40rpx;">
      <template #default="{ virtualItem, virtualIndex }">
        <view class="goods-item">
          {{ virtualIndex }}
          <custom-image width="320rpx" height="480rpx" :src="virtualItem.spuSlidingCoverImages[0] || virtualItem.miniCoverImage || virtualItem.coverImage" class="goods-image"> </custom-image>
          <view class="description">
            <view class="description-header">
              <view v-if="virtualItem.spuBrand" class="spuBrand van-ellipsis">{{ virtualItem.spuBrand }} </view>
              <view v-if="virtualItem.brandSuffix" class="brandSuffix van-ellipsis">
                {{ virtualItem.brandSuffix }}
              </view>
              <view v-if="virtualItem.spuName" class="spuName van-multi-ellipsis--l2">
                {{ virtualItem.spuName }}
              </view>
              <view v-if="virtualItem.relateColorCountDescription" class="relateColorCountDescription">
                {{ virtualItem.relateColorCountDescription }}
              </view>
            </view>
            <view class="description-footer">
              <text
                v-if="virtualItem.minSkuPriceStr"
                class="minSkuPriceStr van-ellipsis"
                :style="{
                  color: virtualItem.salePrice ? '#999999' : '#031c24',
                }"
                >¥{{ virtualItem.minSkuPriceStr }}</text
              >
              <text v-if="virtualItem.salePrice" class="salePrice van-ellipsis">{{ virtualItem.salePrice }}</text>
            </view>
          </view>
        </view>
      </template>
    </customVirtualiList>
  </view>
</template>

<script setup>
import customVirtualiList from '@/components/custom-virtuali-list/index.vue';
import { ref, onMounted } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';

const dataList = ref([]);
const pageNum = ref(0);
const pageSize = ref(10);

const addData = () => {
  uni.request({
    url: 'https://www.fabrique.cn/api/fbapp/mini/cont/index/guess/like',
    method: 'POST',
    header: {
      'content-type': 'application/json',
      deviceid: '241e48f5-2f5c-483b-9d28-b16f6212fc33',
    },
    data: {
      pageNum: (pageNum.value += 1),
      pageSize: pageSize.value,
    },
    success(res) {
      dataList.value = dataList.value.concat(res.data.data.goodsVos);
    },
  });
};
onMounted(() => {
  addData();
});

onReachBottom(() => {
  addData();
});
</script>

<style lang="scss" scoped>
.goods-item {
  display: flex;
  flex-direction: column;
  width: 320rpx;

  .goods-image {
    width: 100%;
  }

  .description {
    .spuBrand {
      padding-top: 20rpx;
      font-size: 20rpx;
      line-height: 1.3;
    }

    .brandSuffix {
      padding-top: 4rpx;
      font-size: 20rpx;
      line-height: 1.3;
    }

    .spuName {
      padding-top: 4rpx;
      font-size: 24rpx;
      line-height: 1.5;
    }

    .minSkuPriceStr {
      padding-top: 4rpx;
      font-size: 24rpx;
      line-height: 1.3;
    }

    .relateColorCountDescription {
      padding-top: 4rpx;
      font-size: 24rpx;
      color: #999999;
      line-height: 1.3;
    }

    .salePrice {
      padding-top: 4rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #e88c73;
      line-height: 1.3;
    }
  }
}
</style>
