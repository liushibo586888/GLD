<template>
	<view>
		<scroll-view :scroll-y="masked" :style="{ height: height }" style="background-color: #f4f7ff;padding:20upx 0;" @scrolltolower="scrolltolower">
			<block v-for="(item, index) in dataList" :key="index">
				<view class="list_box" @click="tzxqy(item)">
					<view class="boxCont">
						<view><image src="../../static/gktx.jpg" mode=""></image></view>
						<view class="boxRight">
							<view>{{ item.CustName }} {{ item.Date }}</view>
							<view style="color: #82b1ff;font-size: 28upx;">[{{ item.StoreName }}]</view>
						</view>
					</view>
					<block v-for="(item1, index1) in item.ListComment" :key="index1">
						<view class="boxContL">
							<view style="color: #ff0000; font-size: 28upx">{{ item1.Title }}</view>
							<view style="color: #9e9e9e;">{{ item1.Text }}</view>
						</view>
					</block>
				</view>
			</block>
			<view style="display: flex;justify-content: center;align-items: flex-end;" :style="{ height: heightNull }" v-if="dataList.length == 0">暂无数据</view>
		</scroll-view>
	</view>
</template>

<script>
import api from '../../common/http.js';
import common from '../../common/common.js';
export default {
	data() {
		return {
			vueData: {},
			masked: true,
			dataList: [],
			height: 0,
			heightNull: 0,
			PageIndex: 1,
			totalPage: 0
		};
	},
	created() {
		let that = this;
		that.height = that.getWindowHeight() + 'px';
		that.heightNull = that.getWindowHeight() / 2 + 'px';
	},
	onLoad(options) {
		let data = JSON.parse(options.data);
		this.vueData = data;
		this.getList();
	},
	methods: {
		tzxqy(item) {
			let data = JSON.stringify(item);
			uni.navigateTo({
				url: 'mdpj?data=' + data
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
		getList(page = 1) {
			let url = 'Manage/ManageComplaintsTxt';
			let data = {
				employeeId: this.vueData.EmployeeId,
				DeptType: uni.getStorageSync('DeptType'),
				page: page,
				size: 10
			};
			this.masked = false;
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
					list.forEach(v => {
						v.Date = common.GetNowTimeIOS(new Date(v.Date), 2);
					});
					this.dataList = list;
					this.totalPage = jkdata.totalPage;
					uni.hideLoading();
					this.masked = true;
				} else {
					uni.hideLoading();
					this.masked = true;
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
}
</style>
