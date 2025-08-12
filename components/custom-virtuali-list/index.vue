<template>
  <view class="custom-virtual-list">
    <view
      v-for="(virtualData2DListItem, virtualData2DListIndex) in virtualData2DList"
      :key="virtualData2DListIndex"
      :data-virtual-index="virtualData2DListIndex"
      class="virtual-list-item"
      :class="`virtual-list-item-${virtualData2DListIndex}`"
    >
      <view v-if="state.virtualValue.includes(virtualData2DListIndex) || !state.virtualValue.length" :style="customStyle">
        <view v-for="(item, index) in virtualData2DListItem" :key="item.id || index">
          <slot :virtualItem="item" :virtualIndex="pageSize * virtualData2DListIndex + index"></slot>
        </view>
      </view>
      <view v-else :style="{ height: state.virtualHeight[virtualData2DListIndex] + 'px' }"></view>
    </view>
  </view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, reactive, watch } from 'vue';
import * as _ from 'lodash-es';

const currentInstance = getCurrentInstance();
let virtualListObserve = null;
const props = defineProps({
  dataList: {
    type: Array,
    default() {
      return [];
    },
  },
  //   虚拟列表每页显示的数量，注意item高度+数量+列数一定要超过当前屏幕的展示区域
  pageSize: {
    type: Number,
    default: 20,
  },
  estimatedHeight: {
    type: Number,
    default: 40,
  },
  columns: {
    type: Number,
    default: 1, // 支持1,2,3等多列布局
  },
  customStyle: {
    type: String,
    default: '',
  },
});
const state = reactive({
  virtualHeight: {},
  virtualValue: [0, 1],
});
const virtualData2DList = computed(() => {
  return _.chunk(_.flattenDeep(props.dataList), props.pageSize);
});
onMounted(() => {
  watch(
    () => virtualData2DList.value,
    () => {
      uni
        .createSelectorQuery()
        .in(currentInstance.proxy)
        .selectAll('.virtual-list-item')
        .boundingClientRect()
        .exec((value) => {
          value[0].forEach((item, index) => {
            if (item.height > 0) {
              if (state.virtualHeight[index] === item.height) return;
              state.virtualHeight[index] = item.height;
            } else {
              const rows = Math.ceil(virtualData2DList.value[index].length / props.columns);
              state.virtualHeight[index] = rows * props.estimatedHeight;
            }
          });
          closeVirtualListObserve();
          observeVirtualList();
        });
    },
    {
      immediate: true,
    }
  );
});
onUnmounted(() => {
  closeVirtualListObserve();
});
const observeVirtualList = () => {
  virtualListObserve = uni.createIntersectionObserver(currentInstance.proxy, {
    observeAll: true,
    nativeMode: true,
  });
  virtualListObserve.relativeToViewport().observe('.virtual-list-item', (value) => {
    const {
      intersectionRatio,
      dataset: { virtualIndex },
    } = value;
    if (intersectionRatio) {
      uni
        .createSelectorQuery()
        .in(currentInstance.proxy)
        .select(`.virtual-list-item-${virtualIndex}`)
        .boundingClientRect()
        .exec((value) => {
          if (state.virtualHeight[virtualIndex] === value[0].height) return;
          state.virtualHeight[virtualIndex] = value[0].height;
        });
      state.virtualValue = [Math.max(virtualIndex - 1, 0), virtualIndex, Math.min(virtualData2DList.value.length - 1, virtualIndex + 1)];
    }
  });
};
const closeVirtualListObserve = () => {
  if (virtualListObserve) {
    virtualListObserve.disconnect();
    virtualListObserve = null;
  }
};
</script>
