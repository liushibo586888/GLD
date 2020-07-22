<template>
	<view class="page">
		<!-- tab选项 -->
		<view style="height: 100upx;">
			<tabControl
				:current="current"
				:currentRRR="currentRRR"
				:values="items"
				bgc="#fff"
				:fixed="true"
				:scrollFlag="true"
				:isEqually="true"
				@clickItem="onClickItem"
			></tabControl>
		</view>
		<!-- 使用 swiper 配合 滑动切换 -->
		<swiper @change="scollSwiper" :style="{ height: height }" :current="current">
			<swiper-item v-for="(item, index) in items" :key="index">
				<scroll-view scroll-y="true" style="height: 100%;padding: 10upx 10upx;box-sizing: border-box;">
					<!-- 早上 -->
					<view class="list_item" v-if="current == 0">
						<view class="list_item_child">
							<view>今日目标:</view>
							<view class="itemMB">{{ mubiao }}</view>
						</view>
						<view class="list_item_child">
							<view>今日回访目标：</view>
							<view class="itemMB">{{ MoringData.HFMB }}</view>
						</view>
						<view class="list_item_child">
							<view>今日护理客目标：</view>
							<view class="itemMB">{{ MoringData.HLKMB }}</view>
						</view>
						<view class="list_item_child">
							<view>好评：</view>
							<view class="itemMB">{{ MoringData.HP }}</view>
						</view>
						<view class="list_item_child">
							<view>门店预约：</view>
							<view class="itemMB">{{ MoringData.MDYY }}</view>
						</view>
						<view class="list_item_child">
							<view>商品核销：</view>
							<view class="itemMB">{{ MoringData.SPHX }}</view>
						</view>
					</view>
					<!-- 晚上 -->
					<view class="list_item" v-else>
						<view class="list_item_child">
							<view>姓名：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.EmployeeName }}</view>
						</view>
						<view class="list_item_child">
							<view>时间：</view>
							<view class="itemMB">{{ dateTime }}</view>
						</view>
						<view class="fenlei">月目标及完成情况</view>
						<view class="list_item_child">
							<view>业绩总目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.YYJMB == null ? '' : selectDailySummaryNightDto.YYJMB }}</view>
						</view>

						<view class="list_item_child">
							<view>护理客目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.YHLKMB == null ? '' : selectDailySummaryNightDto.YHLKMB }}</view>
						</view>

						<view class="list_item_child">
							<view>好评总目/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.YHPMB == null ? '' : selectDailySummaryNightDto.YHPMB }}</view>
						</view>

						<view class="list_item_child">
							<view>转介绍目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.YZJSMB == null ? '' : selectDailySummaryNightDto.YZJSMB }}</view>
						</view>
						<view class="list_item_child">
							<view>回访总目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.YHFMB == null ? '' : selectDailySummaryNightDto.YHFMB }}</view>
						</view>

						<view class="list_item_child">
							<view>回访到店目标/已完成：</view>
							<view v-if="selectDailySummaryNightDto.YHFDDMB == null" class="itemMB">
								{{ selectDailySummaryNightDto.YHFDDMB == null ? '' : selectDailySummaryNightDto.YHFDDMB }}
							</view>
							<view class="itemMBHFDD">{{ selectDailySummaryNightDto.YHFDDMB == null ? '' : selectDailySummaryNightDto.YHFDDMB }}</view>
						</view>
						<view class="fenlei">老客升单目标完成情况</view>
						<view class="list_item_child">
							<view>5k-1w目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.SD51 == null ? '' : selectDailySummaryNightDto.SD51 }}</view>
						</view>
						<view class="list_item_child">
							<view>1w-2w目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.SD12 == null ? '' : selectDailySummaryNightDto.SD12 }}</view>
						</view>
						<view class="list_item_child">
							<view>2w-3w目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.SD23 == null ? '' : selectDailySummaryNightDto.SD23 }}</view>
						</view>
						<view class="list_item_child">
							<view>3w以上目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.SD3S == null ? '' : selectDailySummaryNightDto.SD3S }}</view>
						</view>
						<view class="fenlei">当日完成情况和明日目标</view>
						<view class="list_item_child">
							<view>业绩目标/完成/明日目标：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.RYJMB == null ? '' : selectDailySummaryNightDto.RYJMB }}</view>
						</view>
						<view class="list_item_child">
							<view>好评目标/已完成：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.RHPMB == null ? '' : selectDailySummaryNightDto.RHPMB }}</view>
						</view>
						<view class="list_item_child">
							<view>回访目标/完成/明日目标：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.RHFMB == null ? '' : selectDailySummaryNightDto.SD51 }}</view>
						</view>
						<view class="list_item_child">
							<view>护理客目标/完成/明日目标：</view>
							<view class="itemMB">{{ selectDailySummaryNightDto.RHLKMB == null ? '' : selectDailySummaryNightDto.RHLKMB }}</view>
						</view>
						<view class="list_item_child">
							<view>当日各项目标未完成原因/完成分享：</view>
							<view v-if="selectDailySummaryNightDto.RGXBZ == ''" class="itemMB">
								{{ selectDailySummaryNightDto.RGXBZ == '' ? '' : selectDailySummaryNightDto.RGXBZ }}
							</view>
							<view v-else class="itemMBHFDD">{{ selectDailySummaryNightDto.RGXBZ == '' ? '' : selectDailySummaryNightDto.RGXBZ }}</view>
							<!-- <textarea disabled="true" maxlength="-1" :value="selectDailySummaryNightDto.RGXBZ" placeholder="" /> -->
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
import common from '../../common/common.js';
import api from '../../common/http.js';
export default {
	components: { tabControl },
	data() {
		return {
			RGXBZ: '123',
			height: '500upx',
			items: ['早上', '晚上'],
			current: 0,
			hlsID: '',
			dateTime: '',
			mubiao: '',
			MoringData: '',
			selectDailySummaryNightDto: ''
		};
	},
	created() {
		let that = this;
		that.height = that.getWindowHeight() - 50 + 'px';
	},
	onLoad(data) {
		data = data.data.replace(/""/g, '');
		data = JSON.parse(data);
		this.hlsID = data.hlsID;
		this.dateTime = data.dateTime;
		this.getList();
	},
	methods: {
		//tab切换
		onClickItem(val) {
			this.current = val.currentIndex;
		},
		//scoll卡片切换
		scollSwiper(e) {
			this.current = e.target.current;
			// this.getList();
		},
		getList() {
			let url = 'dailysummary/GetDailySummaryAll';
			let data = {
				EmployeeId: this.hlsID,
				StoreID: this.$htData == undefined ? null : this.$htData.join(','),
				dateTime: this.dateTime,
				xm: 0,
				cp: 0,
				PrePay: 0
			};
			uni.showLoading({
				title: '加载中'
			});
			api.httpRequestGet(url, data).then(res => {
				if (res.data.error_code == 'Success') {
					this.mubiao = res.data.data.selectDailySummaryMoringDto.summarizeKeyCustomersModel.TargetToday;
					this.MoringData = res.data.data.selectDailySummaryMoringDto.MoringData;
					this.selectDailySummaryNightDto = res.data.data.selectDailySummaryNightDto;
				} else {
					uni.showModal({
						title: '提示',
						content: res.data.error_message,
						success: function(res) {
							if (res.confirm) {
								uni.navigateBack({
									delta: 1
								});
							} else if (res.cancel) {
								uni.navigateBack({
									delta: 1
								});
							}
						}
					});
				}
				uni.hideLoading();
			});
		}
	}
};
</script>

<style scoped>
.fontSize {
	font-size: 30upx;
}
.page {
	height: 100%;
	background: #f4f7ff;
}
.list_item {
	border: 1px solid rgb(205, 207, 205);
	border-radius: 25upx;
	width: 100%;
	padding: 15upx;
	margin-bottom: 10upx;
	box-shadow: 5upx 5upx 5upx rgba(41, 40, 40, 0.1);
	background-color: #fff;
}
.list_item_child {
	margin-bottom: 30upx;
}
.itemMB {
	border: 1px solid #ecc40f;
	height: 60upx;
	padding: 5upx 15upx;
	margin-top: 15upx;
	border-radius: 15upx;
}
.itemMBHFDD {
	border: 1px solid #ecc40f;
	padding: 5upx 15upx;
	margin-top: 15upx;
	border-radius: 15upx;
}
.fenlei {
	color: black;
	font-weight: bold;
	font-size: 30upx;
	margin-bottom: 10upx;
}

textarea {
	box-sizing: border-box;
	width: 100%;
	border: 1upx solid #fba1a0;
	padding: 5upx;
	padding-left: 10upx;
}
</style>
