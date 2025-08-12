# uni-app 小程序项目交付文档

## 项目概述

本项目是基于 uni-app 框架开发的微信小程序模板，采用 Vue 3 语法和 Pinia 状态管理，集成了 wot-design-uni 组件库，包含高性能虚拟列表等高级组件，适用于构建复杂的小程序应用。

## 技术栈

- 前端框架：uni-app
- Vue 版本：Vue 3
- 状态管理：Pinia
- UI 组件库：wot-design-uni ^1.10.0
- 工具库：lodash-es ^4.17.21

## 项目结构

```
├── .gitignore
├── App.vue                  // 应用入口文件
├── api/                     // API 请求目录
│   └── index.js
├── components/              // 自定义组件目录
│   ├── custom-broken-network/  // 断网提示组件
│   ├── custom-image/           // 图片组件
│   ├── custom-nav-bar/         // 导航栏组件
│   └── custom-virtuali-list/   // 虚拟列表组件
├── hooks/                   // 自定义钩子
│   └── useXxxHook.js
├── index.html
├── jsconfig.json
├── main.js                  // 主入口文件
├── manifest.json            // 小程序配置文件
├── package.json             // 项目依赖
├── pages.json               // 页面路由配置
├── pages/                   // 页面目录
│   ├── home/                 // 首页
│   └── index/                // 索引页
├── pnpm-lock.yaml
├── static/                  // 静态资源
├── stores/                  // Pinia 状态管理
│   └── index.js
├── uni.promisify.adaptor.js
├── uni.scss                 // 全局样式
└── utils/                   // 工具函数
    ├── catchAndLogException.js  // 异常捕获
    ├── index.js                 // 工具函数集合
    └── router.js                // 路由配置
```

## 核心功能

### 1. 高性能虚拟列表

项目中的 `custom-virtuali-list` 组件实现了高性能虚拟列表功能，支持以下特性：

- 支持多列布局
- 动态计算列表项高度
- 只渲染可视区域附近的列表项
- 支持自定义样式

使用示例：

```vue
<custom-virtuali-list :dataList="listData" :pageSize="20" :columns="2">
  <template v-slot:default="{ virtualItem, virtualIndex }">
    <view class="list-item">{{ virtualItem.title }}</view>
  </template>
</custom-virtuali-list>
```

### 2. 网络状态监测

应用通过 `utils/index.js` 中的 `getNetworkType` 和 `onNetworkStatusChange` 监测网络状态，并在断网时显示提示。

### 3. 应用更新机制

`App.vue` 中实现了应用更新检查功能，当有新版本时会提示用户更新。

### 4. 路由管理

`utils/router.js` 中定义了路由配置，`utils/index.js` 中的 `navigateTo` 函数提供了统一的路由跳转处理。

### 5. 状态管理

使用 Pinia 进行状态管理，`stores/index.js` 中定义了全局状态。

## 页面说明

### 首页 (pages/home/index.vue)

应用首页，主要功能如下：

- 使用高性能虚拟列表组件 `customVirtualiList` 展示商品数据
- 支持两列布局的商品列表展示
- 实现下拉加载更多功能 (`onReachBottom`)
- 从远程 API 获取商品数据
- 商品卡片包含图片、品牌名称、商品名称、价格等信息
- 支持图片懒加载和错误处理

数据加载流程：

1. 页面加载时调用 `addData()` 加载第一页数据
2. 滚动到底部时再次调用 `addData()` 加载更多数据
3. 数据追加到 `dataList` 中，虚拟列表自动更新

### 索引页 (pages/index/index.vue)

示例页面，主要功能如下：

- 使用自定义导航栏组件 `custom-nav-bar`
- 包含断网提示组件 `custom-broken-network`
- 使用 wot-design-uni 的标签页组件 `wd-tabs`，展示三个标签
- 展示多种类型的按钮组件 `wd-button`，包括主要按钮、成功按钮、信息按钮、警告按钮和危险按钮
- 实现按钮点击事件，如切换断网状态、页面跳转、显示遮罩层等
- 包含遮罩层组件 `wd-overlay`
- 自定义标签页下划线样式

交互功能：

1. 点击"断网按钮"可切换断网状态
2. 点击"危险按钮"可跳转到首页
3. 点击"显示遮罩层"按钮可显示遮罩层，点击遮罩层可关闭
4. 标签页切换时显示对应内容

## 组件说明

### custom-virtuali-list

高性能虚拟列表组件，参数说明：

- `dataList`: 数据源数组
- `pageSize`: 每页显示数量
- `estimatedHeight`: 估计高度
- `columns`: 列数
- `customStyle`: 自定义样式

### custom-nav-bar

自定义导航栏组件，参数说明：

- `showHome`: 是否显示首页按钮
- `custom-style`: 自定义样式

### custom-broken-network

断网提示组件，参数说明：

- `brokenNetworkStatus`: 断网状态

## 使用说明

### 安装依赖

```bash
pnpm install
```

### 运行项目

使用 HBuilderX 打开项目，选择对应的运行环境（微信小程序、H5等）。

### 构建项目

在 HBuilderX 中选择"发行" -> "小程序-微信"进行构建。

## 注意事项

1. 虚拟列表使用时，确保 `pageSize` 设置合理，以保证良好的性能
2. 网络请求前请检查网络状态
3. 自定义组件使用前请确保已在 `pages.json` 中配置
4. 项目使用 pnpm 管理依赖，请使用 pnpm 安装依赖包

## 版本记录

- v1.0.0: 项目初始化，实现核心功能
