<template>
	<view class="page">
		<view style="display: flex;justify-content: space-between;padding: 20upx 30upx;height: 100upx;align-items: center;background-color: #FFFFFF;">
			<view style="position: relative;" @click="mdxz = true">
				<image style="width: 60upx;height: 60upx;" src="../../static/images/index/mendian.png" mode="aspectFill"></image>
				<view
					@click="mdxz = true"
					style="position: absolute;left: 40upx;top:0;z-index: 10;width: 40upx;height: 40upx;background: #DD524D;color: #FFFFFF;border-radius: 20upx;text-align: center;line-height: 40upx;"
				>
					{{ num }}
				</view>
			</view>
			<view v-show="mdxz"><mdslect :Winheight="Winheight" @queding="queding" @resert="resert"></mdslect></view>
			<view>
				<picker @change="bindPickerChange" :value="index" :range="xseList" range-key="name">
					<view class="xse">{{ cxName }} ▼</view>
				</picker>
			</view>
			<view @click="isShow = true" style="color: #007AFF;" v-if="hlsNum == 0">选择护理师 ▼</view>
			<view @click="isShow = true" style="color: #007AFF;" v-else>已选{{ hlsNum }}位护理师 ▼</view>
			<view class="sjx"><s-switch @switchValue="getSwitchValue" :defaultValue="0" :switchList="arr"></s-switch></view>
		</view>
		<scroll-view :scroll-y="masked" :style="{ height: height }" @scrolltolower="scrolltolower">
			<block v-for="(item, index) in dataList" :key="index">
				<view class="gkBox">
					<image v-if="index == 0 && Sort == 0" class="HLS_shang_img" src="../../static/images/HYJpng/Gjun.png" mode=""></image>
					<image v-if="index == 1 && Sort == 0" class="HLS_shang_img" src="../../static/images/HYJpng/Yjun.png" mode=""></image>
					<image v-if="index == 2 && Sort == 0" class="HLS_shang_img" src="../../static/images/HYJpng/Jjun.png" mode=""></image>
					<view><image style="width: 80upx;height: 80upx;border-radius: 40upx;" src="../../static/gktx.jpg" mode="aspectFill"></image></view>
					<view>{{ item.CustomerName }}</view>
					<view class="gkBox_z">
						<view style="position: relative;">
							<text style="color: #8caaff;">{{ item.TotalConsumption }}</text>
							<text>总消费</text>
							<text class="diweiX"></text>
						</view>
						<view style="position: relative;">
							<text style="color: #ff6c6c;">{{ item.ConsumptionNumber }}</text>
							<text>累计消费次数</text>
							<text class="diweiX"></text>
						</view>
						<view>
							<text style="color: #cb8ed6;">{{ item.MonomerConsumption }}</text>
							<text>单体消费</text>
						</view>
					</view>
					<view style="margin:40upx 0 20upx 0;color: #afafaf">上次消费时间 : {{ item.RecentConsumptionDate }}</view>
					<view style="color: #afafaf;">首次消费时间 : {{ item.FirstConsumptionDate }}</view>
					<!-- <view style="text-align: right;font-size: 30upx;font-weight: bold;">></view> -->
				</view>
			</block>
		</scroll-view>
		<view class="zheZC" v-show="isShow">
			<view class="mnPicker">
				<view class="mnPickerTop">
					<view style="color: #adadad;" @click="isShow = false">取消</view>
					<view>请选择</view>
					<view style="color: #7ca2ff;" @click="HLqueding">确定</view>
				</view>
				<view class="mnPickerBottom">
					<block v-for="(item, index) in array" :key="index">
						<view class="itemList">
							<view>{{ item.NursePractitionerName }}</view>
							<view>
								<label>
									<checkbox @click="itemClick(index)" :value="item.id" :checked="item.select ? true : false" />
									<text></text>
								</label>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<mask v-if="!masked"></mask>
	</view>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import common from '../../common/common.js';
import SSwitch from '@/components/s-switch/s-switch.vue';
import mdslect from '../../components/mdslect.vue';
import mask from '../../components/mask.vue';
import api from '../../common/http.js';
export default {
	components: { SSwitch, mdslect, mask },
	data() {
		return {
			hlsNum: 0,
			masked: true,
			mdnum: 0,
			mdxz: false,
			Winheight: this.getWindowHeight(),
			height: '500upx',
			isShow: false,
			showPicker: false,
			name: '选择护理师',
			array: [],
			xzHLSarr: '',
			cxName: '总消费',
			xseList: [{ id: '1', name: '总消费' }],
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
			Sort: 0,
			SortType: 1,
			dataList: []
		};
	},
	onLoad() {
		this.getList();
		this.getHLSList();
	},
	created() {
		let that = this;
		that.height = that.getWindowHeight() - 50 + 'px';
	},
	computed: {
		...mapState({
			num: state => state.num
		})
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
			this.hlsNum = 0;
			this.dataList = [];
			this.array = [];
			this.getList(this.PageIndex);
			this.getHLSList();
		},
		resert(data) {
			this.mdxz = data.yinC;
		},
		// 切换switch
		getSwitchValue(e) {
			this.Sort = e.key;
			this.PageIndex = 1;
			this.dataList = [];
			this.getList(this.PageIndex);
		},
		bindPickerChange(e) {
			let index = e.detail.value;
			this.SortType = this.xseList[index].id;
			this.cxName = this.xseList[index].name;
			this.PageIndex = 1;
			this.dataList = [];
			this.getList(this.PageIndex);
		},
		itemClick(index) {
			this.array[index].selects = !this.array[index].selects;
		},
		HLqueding() {
			//选择护理师
			let arr = this.array;
			let newArr = [];
			arr.forEach(x => {
				if (x.selects) {
					newArr.push(x.NursePractitionerID);
				}
			});
			this.isShow = false;
			this.xzHLSarr = newArr.join(',');
			this.hlsNum = newArr.length;
			this.PageIndex = 1;
			this.dataList = [];
			this.getList();
			// console.log(newArr.join(','));
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
			let url = 'NewCustomer/GetNewCustomerConsumption';
			let data = {
				storeIds: this.$htData == undefined ? null : this.$htData.join(','),
				employeeId: uni.getStorageSync('employeeId'),
				NursePractitionerID: this.xzHLSarr,
				Sort: this.Sort,
				SortType: this.SortType,
				PageIndex: page,
				PageSize: 10
			};
			this.masked = false;
			uni.showLoading({
				title: '加载中'
			});
			// console.log(data);
			api.httpRequestGet(url, data).then(res => {
				if (res.data.error_code == 'Success') {
					// console.log(res.data);
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
		},
		getHLSList() {
			//获取护理师
			let url = 'NewCustomer/GetNursePractitioner';
			let data = {
				storeIds: this.$htData == undefined ? null : this.$htData.join(','),
				employeeId: uni.getStorageSync('employeeId')
			};
			api.httpRequestGet(url, data).then(res => {
				if (res.data.error_code == 'Success') {
					this.array = res.data.data;
					// console.log(res.data.data);
				}
			});
		}
	}
};
</script>

<style scoped>
.page {
	height: 100%;
	background: #f4f7ff;
}
.zheZC {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background-color: #808080;
	z-index: 10;
}
.mnPicker {
	width: 100%;
	height: 630upx;
	border: 1upx solid #007aff;
	overflow: hidden;
	position: absolute;
	bottom: 0;
	z-index: 20;
	background-color: #ffffff;
}
.mnPickerTop {
	z-index: 10;
	display: flex;
	height: 100upx;
	line-height: 100upx;
	padding: 0 30upx;
	background-color: #f7f7f7;
}
.mnPickerBottom {
	height: 100%;
	overflow: auto;
	padding-bottom: 100upx;
}
.mnPickerTop view {
	width: 33.33%;
}
.mnPickerTop view:nth-of-type(2) {
	text-align: center;
}
.mnPickerTop view:nth-of-type(3) {
	text-align: right;
}
.itemList {
	display: flex;
	justify-content: space-between;
	height: 100upx;
	padding: 0 30upx;
	border-bottom: 1upx solid #e2e2e2;
	line-height: 100upx;
}
scroll-view {
	padding: 10upx 30upx;
	box-sizing: border-box;
	/* 	background-color: #09bb07; */
}
.gkBox {
	background-color: #ffffff;
	padding: 15upx;
	margin-bottom: 20upx;
	border-radius: 10upx;
	box-shadow: 0 2upx 5upx #9b9b9b;
	position: relative;
}
.HLS_shang_img {
	width: 80upx;
	height: 80upx;
	position: absolute;
	left: 0;
}
.gkBox view:nth-of-type(1) {
	text-align: center;
}
.gkBox view:nth-of-type(2) {
	text-align: center;
}
.gkBox_z {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10upx 0;
}
.gkBox_z view {
	text-align: center;
	width: 33.333%;
}
.gkBox_z view > text {
	display: block;
	margin-top: 10upx;
}
/* 定位实线 */
.diweiX {
	position: absolute;
	top: 10%;
	right: 0;
	height: 80%;
	border: 2upx solid #f5f5f5;
}
</style>
