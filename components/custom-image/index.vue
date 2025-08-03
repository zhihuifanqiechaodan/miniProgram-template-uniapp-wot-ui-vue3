<template>
	<view :style="styleObj" class="image-wrapper" :class="{ 'image-round': round, flex: flex }">
		<image :src="src" :mode="mode" :webp="webp" :lazy-load="lazyLoad" :show-menu-by-longpress="showMenuByLongpress"
			@error="handleError" @load="handleLoad" class="image-tag" />
		<view v-if="state.loading && showLoading" class="image-loading" :class="{ 'image-round': round }">
			<view v-if="placeholder" class="image-loading-placeholder"></view>
		</view>
		<view v-if="state.error && showError" class="image-error" :class="{ 'image-round': round }"></view>
		<slot />
	</view>
</template>

<script setup>
	import {
		computed,
		reactive
	} from "vue";

	const props = defineProps({
		src: {
			type: String,
		},
		width: {
			type: String || Number,
			default: "100%",
		},
		height: {
			type: String || Number,
			default: "100%",
		},
		mode: {
			type: String,
			default: "aspectFill",
		},
		webp: {
			type: Boolean,
			default: true,
		},
		lazyLoad: {
			type: Boolean,
			default: true,
		},
		round: {
			type: Boolean,
			default: false,
		},
		flex: {
			type: Boolean,
			default: false,
		},
		showMenuByLongpress: {
			type: Boolean,
			default: false,
		},
		showError: {
			type: Boolean,
			default: true,
		},
		showLoading: {
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
		radius: {
			type: Number || String,
			default: 0,
		},
	});
	const state = reactive({
		loading: true,
		error: false,
	});
	const styleObj = computed(() => {
		return `width: ${addUnit(props.width)}; height: ${addUnit(props.height)}; radius: ${props.radius ? addUnit(props.radius) : 0}; ${props.customStyle}`
	})
	const addUnit = (value) => {
		if (typeof value === "number") {
			return `${value}px`;
		} else {
			return value;
		}
	};
	const handleError = (e) => {
		state.loading = false
		state.error = true
	}
	const handleLoad = (e) => {
		state.loading = false
	}
</script>

<style lang="scss" scoped>
	.image-wrapper {
		position: relative;
		overflow: hidden;

		&.flex {
			display: flex;
			align-items: center;
		}

		&.image-round {
			border-radius: 50%;
		}

		.image-tag {
			width: 100%;
			height: 100%;
		}

		.image-error,
		.image-loading {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #edf0f0;

			&.image-round {
				border-radius: 50%;
			}
		}
	}
</style>