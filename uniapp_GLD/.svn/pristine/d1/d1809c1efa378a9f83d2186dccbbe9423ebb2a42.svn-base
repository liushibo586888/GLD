<template>
	<view>
		<view class="shbox">
			<block v-for="(item, index) in tabslist" :key="index">
				<view @click="tabclick(index)" :class="tabIndex == index ? 'tabSelected' : ''">{{ item }}</view>
			</block>
		</view>
		<scroll-view scroll-y="true" :style="{ height: height }" style="background-color: #f4f7ff;padding:20upx 0;" @scrolltolower="scrolltolower">
			<block v-for="(item, index) in dataList" :key="index">
				<view class="list_box" @click="tzxqy(index)">
					<view class="boxCont">
						<view><image src="../../static/gktx.jpg" mode=""></image></view>
						<view class="boxRight">
							<view>{{ item.CustomerName }} {{ item.TypeName }}</view>
							<view style="color: #82b1ff;font-size: 28upx;">[{{ item.StoreName }}]</view>
						</view>
					</view>
					<view class="boxContL">
						<view style="color: #9e9e9e; font-size: 28upx">申请时间: {{ item.ApplyTime }}</view>
						<view style="color: #ffaa00;" v-if="tabIndex == 0">{{ item.StatusName }}</view>
						<view style="color: #28c38f;" v-if="tabIndex == 1">{{ item.StatusName }}</view>
						<view style="color: #ff0000;" v-if="tabIndex == 2">{{ item.StatusName }}</view>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
import api from '../../common/http.js';
export default {
	data() {
		return {
			dataList: [],
			tabslist: ['待处理', '已同意', '已拒绝'],
			tabIndex: 0,
			height: 0,
			PageIndex: 1,
			totalPage: 0
		};
	},
	created() {
		let that = this;
		that.height = that.getWindowHeight() - 50 + 'px';
	},
	onShow() {
		this.getList();
	},
	methods: {
		tabclick(index) {
			this.tabIndex = index;
			this.getList();
		},
		tzxqy(index) {
			let data = this.dataList[index].slist;
			data['typeUrl'] = 'NewAudit/AuditNursingPerformanceTargetNew';
			data = JSON.stringify(data);
			uni.navigateTo({
				url: '../shxq/shxq?data=' + data
			});
		},
		// 下拉加载
		scrolltolower() {
			this.PageIndex++;
			if (this.PageIndex <= this.totalPage) {
				this.getList(this.PageIndex);
			} else {
				uni.showToast({
					title: '暂无更多数据',
					duration: 1000
				});
			}
		},
		getList(page = 1, size = 20) {
			let url = 'NewAudit/GetNewAuditNursingPerformanceTargetList';
			let data = {
				storeIds: this.$htData == undefined ? null : this.$htData.join(','),
				employeeId: uni.getStorageSync('employeeId'),
				StateType: this.tabIndex,
				PageIndex: page,
				PageSize: size
			};
			uni.showLoading({
				title: '加载中'
			});
			api.httpRequestGet(url, data).then(res => {
				if (res.data.error_code == 'Success') {
					let jkdata = res.data.data;
					if (page > 1) {
						var list = this.dataList;
						list = list.concat(jkdata.list);
					} else {
						var list = [];
						list = jkdata.list;
					}
					this.dataList = list;
					this.totalPage = jkdata.totalPage;
					uni.hideLoading();
				} else {
					uni.hideLoading();
					uni.showToast({
						title: res.data.error_message,
						duration: 2000,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style scoped>
.shbox {
	display: flex;
	justify-content: space-around;
	height: 100upx;
	align-items: center;
}
.shbox > view {
	padding-bottom: 10upx;
}
.tabSelected {
	color: #88c36a;
	border-bottom: 5upx #88c36a solid;
}
image {
	width: 100upx;
	height: 100upx;
	border-radius: 50upx;
}
.list_box {
	margin: 0 30upx;
	padding: 10upx 20upx;
	background-color: #ffffff;
	margin-bottom: 20upx;
	border-radius: 10upx;
	box-sizing: border-box;
	box-shadow: 5upx 5upx 10upx rgb(0, 0, 255, 0.3);
}
.boxCont {
	display: flex;
}
.boxRight {
	margin-left: 30upx;
	margin-top: 15upx;
}
.boxContL {
	margin-top: 20upx;
	display: flex;
	justify-content: space-around;
}
</style>
