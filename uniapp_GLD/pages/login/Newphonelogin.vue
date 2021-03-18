<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class="header"><image mode="widthFix" src="../../static/bg-login.jpg"></image></view>
				<view class="content">
					<view>
						<text class="LogoTitle">塑青春科技祛痘管理端</text>
						申请获取以下授权
					</view>
					<text class="Step">Tip：请使用绑定的手机号授权登录</text>
				</view>
				<button
					hover-class="none"
					:disabled="btnDisab"
					class="bottom"
					type="primary"
					open-type="getPhoneNumber"
					withCredentials="true"
					lang="zh_CN"
					@getphonenumber="getPhoneNumber"
				>
					手机号授权登录
				</button>
			</view>
		</view>
		<!-- <view class="content" style="color: #77A14B;font-weight: bold;font-size: 35upx;">Tip：请使用绑定的手机号授权登录</view> -->
		<!-- #endif -->
	</view>
</template>

<script>
import Vue from 'vue';
import api from '../../common/http.js';
export default {
	data() {
		return {
			btnDisab: false, //默认授权按钮启用
			isCanUse: uni.getStorageSync('isCanUse') || true, //默认为true
			purePhoneNumber: '', //没有区号的手机号
			numCode: ''
		};
	},
	onLoad() {
		// this.login();
	},
	onShow() {
		uni.hideHomeButton();
		uni.hideShareMenu();
		this.login();
	},
	methods: {
		login() {
			let _this = this;
			// 1.wx获取登录用户code
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					if (loginRes.errMsg == 'login:ok') {
						_this.numCode = loginRes.code;
					} else {
						uni.showToast({
							title: '获取授权码Code失败',
							icon: 'none',
							duration: 2000,
							mask: true
						});
					}
				}
			});
		},
		//授权手机号
		getPhoneNumber(e) {
			this.btnDisab = true;
			let detail = e.detail;
			if (detail.errMsg == 'getPhoneNumber:ok') {
				let url = 'Manage/UserAuthorPhone';
				let d = {
					AesIV: detail.iv,
					encryptedData: detail.encryptedData,
					Code: this.numCode
				};
				uni.showLoading({
					title: '正在登录...',
					mask: true
				});
				api.httpRequestPost(url, d).then(res => {
					// console.log(res);
					let result = res.data;
					if (result.error_code == 'Success') {
						if (res.data.data != null && res.data.data.Phone != null && res.data.data.OpenID != null) { 
							uni.setStorageSync('customer', res.data);
							uni.setStorageSync('employeeId', res.data.data.ID);
							uni.setStorageSync('list', res.data.data.list);
							uni.setStorageSync('Name', res.data.data.Name);
							uni.setStorageSync('PositionName', res.data.data.PositionName);
							uni.setStorageSync('DeptType', res.data.data.DeptType);
							// console.log(res.data.data);
							Vue.prototype.$mdList = uni.getStorageSync('list');
							setTimeout(() => {
								uni.reLaunch({
									url: '../index/index'
								});
							}, 500);
							uni.hideLoading();
						} else {
							this.btnDisab = false;
							//请求失败
							uni.showToast({
								title: '系统不存在手机号，请联系管理员',
								icon: 'none',
								duration: 4000,
								mask: true
							});
						}
					} else {
						this.btnDisab = false;
						//请求失败
						uni.showToast({
							title: res.data.error_message,
							icon: 'none',
							duration: 4000,
							mask: true
						});
					}
				});
			} else {
				this.btnDisab = false;
				//授权失败提示
				uni.showToast({
					title: '授权登录失败',
					icon: 'none',
					duration: 4000,
					mask: true
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	margin: 0 50rpx 90rpx 50rpx;
	.LogoTitle {
		display: inline;
		font-size: 35upx;
		color: #77a14b;
		margin-right: 30upx;
	}
	.Step {
		color: #77a14b;
	}
	text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}
}
.header {
	width: 100%;
	height: 537upx;
	margin-bottom: 100upx;
	image {
		width: 100%;
		height: 100%;
	}
}
.bottom {
	border-radius: 80rpx;
	margin: 70rpx 50rpx;
	font-size: 35rpx;
	background-color: #77a14b;
}
</style>
