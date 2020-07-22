<template>
	<view class="page">
		<view style="height: 110upx;">
			<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag="true" :isEqually="false" @clickItem="onClickItem"></tabControl>
		</view>

		<!-- 使用 swiper 配合 滑动切换 -->
		<swiper class="swiper" :style="{ height: height }" @change="scollSwiper" :current="current">
			<swiper-item v-for="(item, index) in dataList" :key="index">
				<!-- 使用 scroll-view 来滚动内容区域 -->
				<scroll-view scroll-y="true" :style="{ height: height }"><image :src="rootUrl + item.ImgPath" mode="widthFix" @click="photoClick(index)"></image></scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import Vue from 'vue';
import common from '../../common/common.js';
import api from '../../common/http.js';
import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
export default {
	components: { tabControl },
	data() {
		return {
			rootUrl: api.baseUrl,
			dataList: [],
			items: [],
			current: 0,
			height: '500upx'
		};
	},
	created() {
		let that = this;
		that.height = that.getWindowHeight() - 55 + 'px';
	},
	onLoad() {
		this.getList();
	},
	methods: {
		photoClick(index) {
			let arr = [];
			arr.push(this.rootUrl + this.dataList[index].ImgPath);
			uni.previewImage({
				current: index,
				urls: arr
			});
		},
		onClickItem(val) {
			this.current = val.currentIndex;
		},
		scollSwiper(e) {
			this.current = e.target.current;
		},
		getList() {
			let url = 'Performance/GetTipsPictureRoute';
			let data = {
				ID: '1'
			};
			api.httpRequestGet(url, data).then(res => {
				if (res.data.error_code == 'Success') {
					let arr = res.data.data.list;
					this.dataList = arr;
					arr.forEach(v => {
						this.items.push(v.TypeName);
					});
				}
			});
		}
	}
};
</script>

<style>
page {
	height: 100%;
}
.page {
	/* padding-top: 98rpx; */
	height: 100%;
}
</style>
