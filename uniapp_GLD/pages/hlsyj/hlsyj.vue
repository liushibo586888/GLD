<template>
	<view class="page">
		<view style="position: fixed;left: 20upx;top: 10upx;" @click="mdxz = true">
			<image style="width: 60upx;height: 60upx;" src="../../static/images/index/mendian.png" mode="aspectFill"></image>
		</view>
		<view
			@click="mdxz = true"
			style="position: fixed;left: 50upx;top: 5upx;z-index: 10;width: 40upx;height: 40upx;background: #DD524D;color: #FFFFFF;border-radius: 20upx;text-align: center;line-height: 40upx;"
		>
			{{ num }}
		</view>
		<view v-show="mdxz"><mdslect :Winheight="Winheight" @queding="queding" @resert="resert"></mdslect></view>
		<view style="display: flex;flex-direction: column;align-items: center;background-color: #FFFFFF;padding: 20upx 0 0 0;height: 60upx;">
			<view class="shijian_box" @click="onShowDatePicker('range')">
				<view class="shijian">
					<view class="shijian_title" v-if="range.length == 0">自定义时间</view>
					<view class="shijian_title" v-if="isShow && range.length != 0">{{ range[0] }} - {{ range[1] }}</view>
					<view class="shijian_title" v-if="!isShow && range.length != 0">{{ range[0] }} - {{ range[0] }}</view>
					<view class="xiala"><image src="../../static/images/index/dbsx.png" mode="aspectFill"></image></view>
				</view>
			</view>
		</view>
		<!-- 选择日期 -->
		<view class="zhezc" v-if="showPicker"></view>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		<!-- tab选项 -->
		<tabControl :current="current" :currentRRR="currentRRR" :values="items" bgc="#fff" :fixed="true" :scrollFlag="true" :isEqually="true" @clickItem="onClickItem"></tabControl>
		<!-- 使用 swiper 配合 滑动切换 -->
		<view style="display: flex;justify-content: space-between;height: 80upx;padding: 20upx;">
			<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
				<view class="xse">{{ cxName }} v</view>
			</picker>
			<view class="sjx"><s-switch @switchValue="getSwitchValue" :defaultValue="0" :switchList="arr"></s-switch></view>
		</view>
		<swiper class="swiper" :style="{ height: height }" @change="scollSwiper" :current="current">
			<swiper-item v-for="(item, index) in items" :key="index">
				<scroll-view :scroll-y="masked" style="height: 100%;padding: 10upx 10upx;box-sizing: border-box;" @scrolltolower="scrolltolower">
					<block v-for="(item, index) in dataList" :key="index">
						<view class="HLS_box">
							<view style="background: #FFFFFF;height: 80upx;">
								<view class="HLS_shang">{{ item.EmployeeName }}</view>
								<view v-if="Sort == 0">
									<image v-if="index == 0" class="HLS_shang_img" src="../../static/images/HYJpng/Gjun.png" mode=""></image>
									<image v-if="index == 1" class="HLS_shang_img" src="../../static/images/HYJpng/Yjun.png" mode=""></image>
									<image v-if="index == 2" class="HLS_shang_img" src="../../static/images/HYJpng/Jjun.png" mode=""></image>
								</view>
							</view>
							<view class="HLS_zhong">
								<view>
									<text class="numfsize">{{ item.TotalPerformance }}</text>
									<text class="fontSize" style="color: #a2a2a2;">总业绩</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text class="numfsize">{{ item.NewPerformance }}</text>
									<text class="fontSize" style="color: #a2a2a2;">新客业绩</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text class="numfsize">{{ item.OldPerformance }}</text>
									<text class="fontSize" style="color: #a2a2a2;">老客业绩</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text class="numfsize">{{ item.ProductAmount }}</text>
									<text class="fontSize" style="color: #a2a2a2;">产品业绩</text>
								</view>
							</view>
							<view class="HLS_zhong HLS_xia">
								<view>
									<text style="font-weight: bold;">{{ item.NewComNum }}</text>
									<text class="fontSizeS">服务新客(次)</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text style="font-weight: bold;">{{ item.OldComNum }}</text>
									<text class="fontSizeS">服务老客(次)</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text style="font-weight: bold;">{{ item.NewClinch }}</text>
									<text class="fontSize">新客成交</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text style="font-weight: bold;">{{ item.OldClinch }}</text>
									<text class="fontSize">老客成交</text>
								</view>
							</view>
							<view class="HLS_zhong HLS_xia">
								<view>
									<text style="font-weight: bold;">{{ item.SuggestNum }}</text>
									<text class="fontSizeS">转介绍人数</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text style="font-weight: bold;">{{ item.Suggestformance }}</text>
									<text class="fontSizeS">转介绍成交数</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text style="font-weight: bold;">{{ item.FocusNum }}</text>
									<text class="fontSize">重点人数</text>
									<text class="xian_h"></text>
								</view>
								<view>
									<text style="font-weight: bold;">{{ item.ReturnVisitNum }}</text>
									<text class="fontSize">回访人数</text>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
		<mask v-if="!masked"></mask>
	</view>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import common from '../../common/common.js';
import SSwitch from '@/components/s-switch/s-switch.vue';
import mdslect from '../../components/mdslect.vue';
import mask from '../../components/mask.vue';
import api from '../../common/http.js';
export default {
	components: { tabControl, MxDatePicker, SSwitch, mdslect, mask },
	data() {
		return {
			masked: true,
			mdnum: 0,
			mdxz: false,
			Winheight: this.getWindowHeight(),
			// itemList: this.$mdList,
			height: '500upx',
			isShow: true,
			showPicker: false,
			date: new Date().getNowFormatDate('yyyy-MM-dd'),
			range: [],
			type: 'rangetime',
			value: '',
			items: ['昨天', '今天', '本周', '本月', '上月'],
			cxName: '总业绩',
			array: [{ id: '1', name: '总业绩' }],
			current: 1,
			currentRRR: 0,
			arr: [
				{
					key: 0,
					value: '降'
				},
				{
					key: 1,
					value: '升'
				}
			],
			PageIndex: 1,
			totalPage: 0,
			DateChoose: null,
			Sort: 0,
			SortType: 1,
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
		that.height = that.getWindowHeight() - 120 + 'px';
	},
	onLoad() {
		// this.getList();
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
			this.dataList = [];
			this.getList(this.PageIndex);
		},
		resert(data) {
			this.mdxz = data.yinC;
		},
		onClickItem(val) {
			//tab切换
			this.current = val.currentIndex;
		},
		scollSwiper(e) {
			//scoll卡片切换
			this.current = e.target.current;
			this.range = [];
			this.currentRRR = 0;
			this.DateChoose = null;
			this.PageIndex = 1;
			this.dataList = [];
			this.getList(this.PageIndex);
		},
		onShowDatePicker(type) {
			//显示时间
			this.type = type;
			this.showPicker = true;
			this.value = this[type];
		},
		onSelected(e) {
			//选择时间
			this.showPicker = false;
			if (e) {
				this[this.type] = e.value;

				if (e.value.length > 1) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
				this.currentRRR = -1;
				//选择的值
				this.DateChoose = e.value.join(',');
				this.PageIndex = 1;
				this.dataList = [];
				this.getList(this.PageIndex);
			}
		},
		// 选择销售类别
		bindPickerChange(e) {
			let index = e.detail.value;
			this.SortType = this.array[index].id;
			this.cxName = this.array[index].name;
			this.PageIndex = 1;
			this.dataList = [];
			this.getList(this.PageIndex);
		},
		// 切换switch
		getSwitchValue(e) {
			this.Sort = e.key;
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
			let url = 'Performance/GetPractitionerResults';
			let data = {
				storeIds: this.$htData == undefined ? null : this.$htData.join(','),
				employeeId: uni.getStorageSync('employeeId'),
				DateChoose: this.DateChoose,
				DateType: this.DateChoose == null ? this.current : null,
				Sort: this.Sort,
				SortType: this.SortType,
				PageIndex: page,
				PageSize: 5
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
.numfsize {
	color: #8dabff;
	font-weight: bold;
	font-size: 28upx;
}
.fontSize {
	font-size: 30upx;
}
.fontSizeS {
	font-size: 25upx;
}
.page {
	height: 100%;
	background: #f4f7ff;
}
.shijian_box {
	display: inline-block;
}
.shijian {
	display: flex;
	height: 50upx;
	border-radius: 25upx;
	border: 1upx solid #6fb950;
	justify-content: space-between;
	padding: 5upx 10upx;
	align-items: center;
	margin: 0 auto;
}
.xiala image {
	width: 30upx;
	height: 30upx;
}
.shijian_title {
	font-size: 25upx;
	padding: 0 10upx;
	line-height: 50upx;
}
.swiper {
	padding: 0 20upx;
}
/* 遮罩层 */
.zhezc {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 100;
	background-color: #333333;
	opacity: 0.4;
}
.xse {
	/* width: 140upx; */
	padding: 0 20upx;
	height: 60upx;
	background-color: #88c36a;
	border-radius: 5upx;
	color: #ffffff;
	text-align: center;
	line-height: 60upx;
}
.HLS_box {
	/* background-color: #b0c8ff; */
	border-radius: 5upx;
	margin-bottom: 30upx;
}
.HLS_shang {
	width: 65%;
	height: 60upx;
	margin: 0 auto;
	text-align: center;
	line-height: 60upx;
	background-color: #88c36a;
	color: #ffffff;
	border-bottom-right-radius: 20upx;
	border-bottom-left-radius: 20upx;
}
.HLS_shang_img {
	width: 80upx;
	height: 80upx;
	position: relative;
	left: 0;
	top: -60upx;
}
.HLS_zhong {
	display: flex;
	align-items: center;
	height: 150upx;
	background: #ffffff;
	border-bottom-right-radius: 15upx;
	border-bottom-left-radius: 15upx;
}
.HLS_zhong view {
	width: 33.333333%;
	text-align: center;
	position: relative;
}
.HLS_zhong text {
	display: block;
	padding: 10upx;
}
.xian_h {
	position: absolute;
	top: 15%;
	right: 0;
	height: 40%;
	border-right: 1upx solid #007aff;
}
.HLS_xia {
	/* background: #88c36a !important; */
	justify-content: space-around;
}
.HLS_xia view {
	width: 33%;
	/* color: #ffffff; */
}
.HLS_xia .xian_h {
	border-right: 1upx solid #007aff;
}
</style>
