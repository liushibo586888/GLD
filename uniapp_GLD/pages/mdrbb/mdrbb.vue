<template>
	<view class="page">
		<view class="top">
			<view class="touxiang"><image :src="imgUrl" mode="aspectFill"></image></view>
			<view class="zhiwei">
				<view style="text-align: center">Hi {{ name }}</view>
				<view>{{ PositionName }}</view>
			</view>
			<view class="shijian">
				<view class="uni-input" @click="dateShow">{{ StartDate }} ></view>
				<view class="uni-input mendian" style="margin-top: 30upx;" @click="mdxz = true">
					门店
					<text>+{{ num }}</text>
					>
				</view>
			</view>
		</view>
		<view v-show="mdxz"><mdslect :Winheight="Winheight" @queding="queding" @resert="resert"></mdslect></view>
		<view>
			<scroll-view :scroll-y="masked" :style="{ height: height }" style="height: 100%;padding: 10upx 0 0 0;box-sizing: border-box;" @scrolltolower="scrolltolower">
				<block v-for="(item, index) in dataList" :key="index">
					<view class="mdsj">
						<view class="dianming">{{ item.StoreName }}</view>
						<view class="mdsj_item">
							<block v-for="(item1, index) in item.DayData" :key="index">
								<view class="fenlei">
									<view style="color:#9195a0">{{ item1.name }}</view>
									<view style="color: #ff6c12;">{{ item1.data }}</view>
								</view>
							</block>
						</view>
					</view>

					<view class="gkly">
						<view class="gkly_box">
							<view class="gkly_name">顾客来源</view>
							<view class="lybt">
								<view></view>
								<view>当天</view>
								<view style="border-right:2upx solid #09BB07">月累计</view>
								<view></view>
								<view>当天</view>
								<view>月累计</view>
							</view>

							<view class="lybt lybt_two">
								<block v-for="(item2, index) in item.SourceData" :key="index">
									<view class="laiyuan">
										<view style="font-size: 25upx;">{{ item2.Name }}</view>
										<view style="color: #ff711b;">{{ item2.DayData }}</view>
										<view v-if="index % 2 == 0" style="border-right:2upx solid #09BB07">{{ item2.MonthData }}</view>
										<view v-if="index % 2 != 0">{{ item2.MonthData }}</view>
									</view>
								</block>
							</view>
						</view>
					</view>

					<view class="gkly">
						<view class="bylj_box">
							<view class="gkly_name">本月累计</view>
							<view class="bylj_item">
								<block v-for="(item3, index) in item.MonthData" :key="index">
									<view class="fenlei">
										<view style="color: #9195a0;font-size: 26upx">{{ item3.name }}</view>
										<view style="color: #4e83ff;font-weight: bold;font-size: 27upx;margin-top: 10upx;">{{ item3.data }}</view>
									</view>
								</block>
							</view>
						</view>
					</view>

					<view class="gkly">
						<view class="mryy_box">
							<view class="gkly_name">明日预约</view>
							<view class="lybt" style="border-bottom: 0;color: #333333;">
								<view style="border-right:2upx solid #09BB07; width: 50%;">
									明日新客预约
									<text style="padding-left: 20upx;font-weight: bold;">{{ item.MakeData.NewMakeNum }}</text>
								</view>
								<view style="width: 50%;">
									明日老客预约
									<text style="padding-left: 20upx;font-weight: bold;">{{ item.MakeData.OldMakeNum }}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>

		<view style="position: fixed;z-index: 100;top: 0;left: 0upx;height: 100%;background-color: #929292;" v-show="riIsshow">
			<yu-calendar :priceList="priceList" bgColor="#3570cc" color="#fff" @click="onClick"></yu-calendar>
			<button type="primary" @click="riIsshow = false">确 定</button>
		</view>
		<mask v-if="!masked"></mask>
	</view>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import yuCalendar from '@/components/yu-calendar/yu-calendar.vue';
import common from '../../common/common.js';
import mdslect from '../../components/mdslect.vue';
import mask from '../../components/mask.vue';
import api from '../../common/http.js';
export default {
	components: { yuCalendar, mdslect, mask },
	data() {
		return {
			masked: true,
			name: uni.getStorageSync('Name'),
			PositionName: uni.getStorageSync('PositionName'),
			// imgUrl: uni.getStorageSync('avatarUrl'),
			imgUrl: '../../static/images/Avatar.jpg',
			mdxz: false,
			Winheight: this.getWindowHeight(),
			height: '500upx',
			riIsshow: false,
			priceList: [{ date: '2000-01-01', price: '￥100' }],
			StartDate: new Date().getNowFormatDate('yyyy-MM-dd'),
			PageIndex: 1,
			totalPage: 0,
			dataList: []
		};
	},
	computed: {
		...mapState({
			num: state => state.num
		})
	},
	created() {
		let that = this;
		that.height = that.getWindowHeight() - 80 + 'px';
	},
	onLoad() {
		this.getList();
	},
	methods: {
		queding(data) {
			//门店选择确定事件
			this.mdxz = data.yinC;
			this.mdnum = data.num;
			Vue.prototype.$mdList = data.oldArr;
			Vue.prototype.$mdListData = data.newArr;
			Vue.prototype.$htData = data.htArr;
			this.PageIndex = 1;
			this.getList(this.PageIndex);
		},
		resert(data) {
			this.mdxz = data.yinC;
		},
		dateShow() {
			this.riIsshow = true;
		},
		// 选择时间
		onClick(e) {
			this.StartDate = e.date;
			this.riIsshow = false;
			this.PageIndex = 1;
			this.dataList = [];
			this.getList(this.PageIndex);
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
			let url = 'Performance/GetrReportDay';
			let data = {
				StartDate: this.StartDate,
				storeIds: this.$htData == undefined ? null : this.$htData.join(','),
				employeeId: uni.getStorageSync('employeeId'),
				PageIndex: page,
				PageSize: 2
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
					this.dataList = list;
					this.totalPage = jkdata.totalPage;
					uni.hideLoading();
					this.masked = true;
				}
			});
		}
	}
};
</script>
<style scoped>
.page {
	background-color: #f1eff5;
	height: 100%;
}
.top {
	width: 100%;
	height: 160upx;
	background-color: #88c36a;
	display: flex;
	color: #ffffff;
}
.top .touxiang {
	width: 20%;
	padding-left: 30upx;
}
.top .zhiwei {
	width: 30%;
	margin-left: 50upx;
	padding-top: 20upx;
}
.top .zhiwei view:nth-of-type(1) {
	font-weight: bold;
}
.top .zhiwei view:nth-of-type(2) {
	margin-top: 10upx;
	height: 50upx;
	border: 1upx solid #333333;
	background-color: #99c487;
	text-align: center;
	line-height: 45upx;
	border-radius: 25upx;
	font-size: 25upx;
}
.top .shijian {
	width: 50%;
	text-align: right;
	padding-right: 30upx;
	padding-top: 20upx;
	font-weight: bold;
}
.top .touxiang image {
	width: 150upx;
	height: 150upx;
	border-radius: 75upx;
}
.mdsj {
	padding: 0 30upx;
	background-color: #f1eff5;
}
.dianming {
	width: 100%;
	height: 100upx;
	text-align: center;
	line-height: 100upx;
	font-weight: bold;
	background-color: #6fb950;
	border-top-left-radius: 30upx;
	border-top-right-radius: 30upx;
	color: #ffffff;
	/* 	margin-top: -50upx; */
}
.mdsj_item {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	background: #ffffff;
	border-bottom-left-radius: 30upx;
	border-bottom-right-radius: 30upx;
}
.fenlei {
	width: 33.33333%;
	text-align: center;
	padding: 10upx 0;
}
.gkly {
	padding: 30upx;
	background-color: #f1eff5;
}
.gkly_box {
	padding: 10upx;
	background: #ffffff;
	border-radius: 30upx;
}
.gkly_name {
	margin-left: 10upx;
	padding-left: 10upx;
	border-left: 5upx solid #09bb07;
	color: #686868;
}
.lybt {
	margin-top: 10upx;
	display: flex;
	justify-content: space-around;
	border-bottom: 1upx solid #c0bdce;
	color: #c0bdce;
	padding: 10upx 0;
	flex-wrap: wrap;
}
.lybt view {
	width: 16.6%;
	text-align: center;
}
.lybt_two {
	margin-top: 40upx;
	color: #333333;
	border-bottom: 0;
	font-weight: bold;
	justify-content: flex-start !important;
}
.laiyuan {
	display: flex;
	width: 50% !important;
	align-items: center;
}
.laiyuan view {
	width: 33.33%;
	padding-bottom: 15upx;
}
.bylj_item {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	background: #ffffff;
}
.bylj_box {
	padding: 10upx;
	background: #ffffff;
	border-radius: 30upx;
}
.mryy_box {
	padding: 10upx;
	background: #ffffff;
	border-radius: 30upx;
}
.mendian {
	height: 50upx;
}
.mendian text {
	display: inline-block;
	height: 50upx;
	width: 80upx;
	border-radius: 25upx;
	text-align: center;
	/* line-height: 50upx; */
	border: 1upx solid #686868;
	margin: 0 10upx;
	background-color: #99c487;
}
</style>
