<template>
	<view class="page">
		<view class="box" :style="{ height: height }">
			<scroll-view class="sv" scroll-y="true">
				<block v-for="(item, index) in List" :key="index">
					<view class="sv-left" :class="tabLIndex == index ? 'select' : ''" @click="tableft(index)">{{ item.CityName }}</view>
				</block>
			</scroll-view>
			<scroll-view class="sv1" scroll-y="true">
				<view class="qunxuan">
					<checkbox-group @change="changeCheckbox" style="display: flex;justify-content: flex-end;">
						<view><checkbox :value="cb" :checked="checkboxed"></checkbox></view>
						<view>全选</view>
					</checkbox-group>
				</view>
				<view class="sv1Box">
					<block v-for="(item, index) in childList" :key="index">
						<view class="sv1-right" :class="item.select == true ? 'selectv1' : ''" @click="tabright(index)">{{ item.Name }}</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<view class="footer">
			<view><button @click="resert">关闭</button></view>
			<view style="color:#DD524D;font-weight: bold;">
				已选:
				<text style="margin-left: 20upx;">{{ num }}</text>
			</view>
			<view><button @click="queding">确定</button></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		Winheight: {
			type: Number,
			default: 0
		}
		// itemList: {
		// 	type: Array
		// }
	},
	data() {
		return {
			checkboxed: false,
			cb: true,
			height: 0, //-75
			tabLIndex: 0,
			tabRIndex: -1,
			List: this.$mdList,
			childList: [],
			num: 0,
			newMDList: []
		};
	},
	created() {
		this.height = this.Winheight - 75 + 'px';
		this.List = this.$mdList;
		this.childList = this.$mdList[0].storeInfoModels;
		this.xzNum();
	},
	computed: {
		pdsfqx() {
			let that = this;
			let index = that.tabLIndex;
			let arr = that.List[index].storeInfoModels;
			var str1 = arr.some(function(x) {
				return x.select == false;
			});
			if (str1) {
				return (that.checkboxed = false);
			} else {
				return (that.checkboxed = true);
			}
		}
	},
	methods: {
		tableft(index) {
			//左侧点击事件
			this.tabLIndex = index;
			this.childList = this.List[index].storeInfoModels;
		},
		tabright(index) {
			//右侧点击事件
			let tabLIndex = this.tabLIndex;
			let arr = this.List[tabLIndex].storeInfoModels;
			arr[index].select = !arr[index].select;
			this.tabRIndex = index;
			this.xzNum();
		},
		changeCheckbox(e) {
			//全选点击事件
			let index = this.tabLIndex;
			if (e.detail.value[0]) {
				this.List[index].storeInfoModels.forEach(x => {
					x.select = true;
				});
			} else {
				this.List[index].storeInfoModels.forEach(x => {
					x.select = false;
				});
			}
			this.xzNum();
		},
		queding() {
			//确定点击事件
			let oldArr = this.$mdList;
			this.xzNum();
			let newArr = this.newMDList;
			let htArr = [];
			newArr.forEach(x => {
				htArr.push(x.ID);
			});
			this.$emit('queding', { oldArr, newArr, htArr, yinC: false });
		},
		resert() {
			this.$emit('resert', { yinC: false });
		},
		xzNum() {
			let arr = this.$mdList;
			let arr1 = [];
			let arr2 = [];
			arr.forEach(x => {
				arr1.push(...x.storeInfoModels);
			});
			arr1.forEach(v => {
				if (v.select) {
					arr2.push(v);
				}
			});
			this.newMDList = arr2;
			this.num = arr2.length;
			this.$store.commit('changeNum', arr2.length);
		}
	}
};
</script>

<style scoped>
.page {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 9999;
	background: #ffffff;
}
.box {
	display: flex;
}

.sv {
	background-color: #f0f2f5;
	border-right: 1upx solid #8f8f94;
	height: 100%;
	width: 30%;
}
.sv-left {
	width: 100%;
	height: 100upx;
	text-align: center;
	line-height: 100upx;
	background-color: #f0f2f5;
	color: #333333;
	font-weight: 600;
}
.select {
	background: #ffffff;
	color: #007aff;
}
.sv1 {
	height: 100%;
	width: 70%;
}
.sv1Box {
	display: flex;
	flex-wrap: wrap;
}
.sv1-right {
	padding: 10upx;
	border: 1upx solid #bcbcbc;
	margin: 10upx;
	color: #aeaeae;
}
.qunxuan {
	margin: 20upx 0;
	padding: 0 30upx;
	text-align: right;
	width: 100%;
}
.selectv1 {
	border: 1upx solid #99b6fc;
	color: #99b6fc;
}
.footer {
	height: 150upx;
	width: 100%;
	display: flex;
	justify-content: space-around;
	border-top: 1upx solid #e5e5e5;
	align-items: center;
}
.footer button {
	background-color: #7ca2ff;
	color: #ffffff;
}
</style>
