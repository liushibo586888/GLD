<template>
	<view class="page">
		<view class="top">
			<view class="top-left"><image src="../../static/gktx.jpg" mode=""></image></view>
			<view class="top-right">
				<view>
					<span>门店 :</span>
					{{ dataList.StoreName }}
				</view>
				<view v-if="dataList.SceneEmployeeName != null">
					<span>总监 :</span>
					{{ dataList.SceneEmployeeName }}
				</view>
				<view>
					<span>护理师 :</span>
					{{ dataList.EmName }}
				</view>
			</view>
		</view>
		<view class="pjStart">
			<block v-for="(item, index) in dataList.ListTag" :key="index">
				<view class="itemContent">
					<view>{{ item.Name }}</view>
					<view>
						<blck v-for="(item1, index1) in item.Score" :key="index1"><image src="../../static/images/khpj/start.png" mode=""></image></blck>
					</view>
				</view>
			</block>
		</view>
		<block v-for="(item2, index2) in dataList.ListComment" :key="index2">
			<view class="pjnr">
				<view>{{ item2.Title }}</view>
				<view>{{ item2.Text }}</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataList: []
		};
	},
	onLoad(options) {
		let data = JSON.parse(options.data);
		this.dataList = data;
	},
	methods: {}
};
</script>

<style lang="less" scoped>
.page {
	padding: 0 10upx;
	height: 100%;
	background-color: #f4f7ff;
	color: #666666;
}
.top {
	background-color: #ffffff;
	display: flex;
	align-items: center;
	padding: 10upx;
	image {
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		vertical-align: middle;
	}
	.top-left {
		flex: 1;
		text-align: center;
	}
	.top-right {
		flex: 2;
		font-size: 28upx;
		span {
			color: #88c36a;
		}
	}
}
.pjStart {
	margin-top: 20upx;
	background-color: #ffffff;
	padding: 30upx 20upx;
	view:nth-of-type(1) {
		margin-top: 0;
	}
	image {
		width: 50upx;
		height: 50upx;
		vertical-align: middle;
		margin-right: 15upx;
	}
	.itemContent {
		display: flex;
		align-items: center;
		margin-top: 20upx;
		view {
			flex: 1;
			font-size: 28upx;
		}
	}
}
.pjnr {
	margin-top: 20upx;
	padding: 30upx 20upx;
	background-color: #ffffff;
	view:nth-of-type(1) {
		color: #fabe66;
	}
	view:nth-of-type(2) {
		font-size: 28upx;
		margin-top: 10upx;
	}
}
</style>
