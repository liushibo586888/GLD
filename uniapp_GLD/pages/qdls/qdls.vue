<template>
	<view class="view">
		<map id="map" :latitude="latitude" :longitude="longitude" :show-location="true" :scale="scale" :markers="covers" @callouttap="callouttap">
			<!-- 门店详情列表 -->
			<cover-view class="img_bd" @click="clickItemList"><cover-image class="coverImage" src="../../static/images/qdls/maplist.png"></cover-image></cover-view>
			<!-- 回到当前位置 -->
			<cover-view class="removeLocation" @click="moveToLocation"><cover-image class="coverImage" src="../../static/images/qdls/mbaddress.png"></cover-image></cover-view>
		</map>
		<!-- 遮罩层 -->
		<view class="commodity_screen" @click="hideModal" v-if="showModalStatus"></view>
		<!-- 对话框 -->
		<view :animation="animationData" class="commodity_attr_box" v-if="showModalStatus">
			<view class="placeBox">
				<view class="placeViewLt">
					<view class="viewTitle">{{ storeName }}</view>
					<view class="viewDis">{{ address }}</view>
					<!-- <button class="viewAddr" data-text="{{address}}" @click="copyText">复制地址</button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '../../common/http.js';
export default {
	data() {
		return {
			storeName: '',
			address: '',
			showModalStatus: false,
			//默认北京
			//longitude: 116.4965075,
			//latitude: 40.006103,
			longitude: 116.4965075,
			latitude: 40.006103,
			speed: 0,
			accuracy: 0,
			scale: 12,
			mapData: [],
			covers: []
		};
	},
	onLoad() {
		this.height = this.getWindowHeight() + 'px';
		this.mapStart();
	},
	methods: {
		//详情列表
		clickItemList() {
			let data = {
				longitude: this.longitude,
				latitude: this.latitude
			};
			data = JSON.stringify(data);
			uni.navigateTo({
				url: '/pages/mapStoreList/mapStoreList?data=' + data
			});
		},

		// 移动到自己位置
		moveToLocation() {
			let mpCtx = uni.createMapContext('map');
			mpCtx.moveToLocation();
		},
		//复制地址
		copyText(e) {
			uni.setClipboardData({
				data: e.currentTarget.dataset.text,
				success: function(res) {
					uni.getClipboardData({
						success: function(res) {
							uni.showToast({
								title: '门店地址复制成功'
							});
						}
					});
				}
			});
		},
		callouttap(e) {
			// 开启遮罩层
			this.DDanimation(true);
			let index = e.markerId;
			let arr = this.mapData;
			this.storeName = arr[index].StoreName;
			this.address = arr[index].Address;
		},

		hideModal() {
			// 隐藏遮罩层
			this.DDanimation(false);
		},

		//控制动画与遮罩层、弹出框
		DDanimation(data) {
			let that = this;
			var animation = uni.createAnimation({
				duration: 200,
				timingFunction: 'linear',
				delay: 0
			});
			that.animation = animation;
			animation.translateY(300).step();

			that.animationData = animation.export();
			that.showModalStatus = data;

			setTimeout(
				function() {
					animation.translateY(0).step();
					that.animationData = animation.export();
				}.bind(that),
				200
			);
		},
		mapStart() {
			var that = this;
			uni.showLoading({
				title: '定位中',
				mask: true
			});
			uni.getLocation({
				type: 'wgs84',
				altitude: true, //高精度定位
				//定位成功，更新定位结果
				success: function(res) {
					var latitude = res.latitude;
					var longitude = res.longitude;
					var speed = res.speed;
					var accuracy = res.accuracy;
					var markers = new Array();

					let url = 'stores/GetStoreAllByMap';
					let data = {
						CityId: '',
						LongItude: latitude,
						LatItude: longitude
					};
					api.httpRequestGet(url, data).then(
						res => {
							//console.log(res.data.data); //打印请求返回的数据
							if (res.data.error_code == 'Success') {
								let urldata = res.data.data.list;

								that.mapData = urldata;
								// var dataArr = that.data.mapData;
								var dataArr = that.mapData;
								for (var i = 0; i < dataArr.length; i++) {
									var name = dataArr[i].StoreName; //名称
									var lat = dataArr[i].LatItude; //经度
									var lon = dataArr[i].LongItude; //纬度
									var info = {
										id: 0,
										iconPath: '../../static/images/qdls/location.png',
										latitude: '',
										longitude: '',
										width: 50,
										height: 50,
										title: '',
										callout: {
											content: '',
											color: '#ff0000',
											fontSize: '16',
											borderRadius: '10',
											bgColor: '#ffffff',
											padding: '10',
											display: 'ALWAYS'
										}
									};
									info.id = i;
									info.latitude = lat;
									info.longitude = lon;
									info.title = name;
									info.callout.content = name;
									markers.push(info);
									that.covers.push(info);
								}
								var str = JSON.stringify(markers);
								that.latitude = latitude;
								that.longitude = longitude;
								that.markers = markers;
								//console.log(that.markers);
							}
						},
						error => {
							//console.log(error);
						}
					);
				},
				//定位失败回调
				fail: function() {
					uni.showToast({
						title: '定位失败',
						icon: 'none'
					});
				},
				complete: function() {
					//隐藏定位中信息进度
					uni.hideLoading();
				}
			});
		}
	}
};
</script>

<style scoped>
/**index.wxss**/

/* 不加page无法全屏 */

page {
	height: 100%;
}

.view {
	width: 100%;
	height: 100%;
}

map {
	width: 100%;
	height: 100%;
	background-color: white;
}

/*底部弹窗开始 -使屏幕变暗  */

.commodity_screen {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: #000;
	opacity: 0.2;
	overflow: hidden;
	z-index: 1000;
	color: #fff;
}

.commodity_attr_box {
	height: 280rpx;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 2000;
	background: #fff;
	padding: 20rpx;
	overflow: auto;
}

.placeBox {
	width: 100%;
	height: 280rpx;
}

.placeViewLt {
	width: 100%;
}

.viewTitle {
	display: block;
	font-size: 38rpx;
	color: #3f51b5;
}

.viewDis {
	display: block;
	font-size: 26rpx;
	color: gray;
	margin-top: 20rpx;
	white-space: pre-wrap;
}

.viewAddr {
	display: inline-block;
	font-size: 28rpx;
	color: gray;
	padding: 0 10rpx !important;
	margin-top: 20rpx;
}

.img_bd {
	position: fixed;
	left: 50rpx;
	bottom: 400rpx;
	width: 80rpx;
	height: 80rpx;
	background: white;
	text-align: center;
	border-radius: 5rpx;
	box-shadow: 5rpx 0rpx 10rpx rgba(0, 0, 0, 0.9);
	display: flex; /*设置显示样式**/
	align-items: center; /**子view垂直居中*/
	vertical-align: center; /**垂直居中*/
	justify-content: center; /**内容居中*/
}

.removeLocation {
	position: fixed;
	left: 50rpx;
	bottom: 300rpx;
	width: 80rpx;
	height: 80rpx;
	background: white;
	text-align: center;
	border-radius: 5rpx;
	box-shadow: 5rpx 0rpx 10rpx rgba(0, 0, 0, 0.9);
	display: flex; /*设置显示样式**/
	align-items: center; /**子view垂直居中*/
	vertical-align: center; /**垂直居中*/
	justify-content: center; /**内容居中*/
}

.coverImageLocation {
	width: 50rpx;
	height: 50rpx;
	/* margin: 15rpx 0 0 15rpx; */
}

.coverImage {
	width: 50rpx;
	height: 50rpx;
	/* margin: 15rpx 0 0 15rpx; */
}
</style>
