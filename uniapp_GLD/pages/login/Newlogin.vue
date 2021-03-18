<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class="header"><image mode="scaleToFill" src="../../static/bg-login.jpg"></image></view>
				<view class="content">
					<view>
						<text class="LogoTitle">塑青春科技祛痘</text>
						申请获取以下授权
					</view>
					<text class="Step">第一步：获取您的信息(昵称.头像.地区等)</text>
					<text>第二步：获取您的手机号</text>
				</view>
				<button
					hover-class="none"
					:disabled="btnDisab"
					class="bottom"
					type="primary"
					open-type="getUserInfo"
					withCredentials="true"
					lang="zh_CN"
					@getuserinfo="wxGetUserInfo"
				>
					授权登录
				</button>
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
			</view>
		</view>
		<view class="content" style="color: #77A14B;font-weight: bold;font-size: 35upx;">说明：请使用管理账号绑定的手机号登陆，登录后才可使用门店业务审核、查询等功能</view>
		<!-- #endif -->
	</view>
</template>

<script>
import Vue from 'vue';
import api from '../../common/http.js';
export default {
	data() {
		return {
			isCanUse: uni.getStorageSync('isCanUse') || true, //默认为true
			numCode: '', //客户的授权码
			btnDisab: false //默认是启用的
		};
	},
	onShow() {
		uni.hideHomeButton();
	},
	methods: {
		//第一授权获取用户信息===》按钮触发
		wxGetUserInfo() {
			let _this = this;
			_this.btnDisab = true; //授权成功按钮不能点击
			uni.showLoading({
				title: '正在授权...',
				mask: true
			}); 
			//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
			if (_this.numCode != undefined && _this.numCode != null) {
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						let data = {
							nickName: infoRes.userInfo.nickName, //昵称
							avatarUrl: infoRes.userInfo.avatarUrl //头像
						};
						uni.setStorageSync('avatarUrl', data.avatarUrl);
						uni.setStorageSync('UserInfo', data);
						try {
							uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
						} catch (e) {}
         
						//授权成功 获取OpenID
						_this.UserAuthorization(data.nickName);

						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
					},
					//授权失败提示
					fail(res) {
						_this.btnDisab = false;
						uni.showToast({
							title: '授权失败',
							icon: 'none',
							duration: 2000,
							mask: true
						});
					}
				});
			} else {
				_this.btnDisab = false;
				uni.showToast({
					title: '授权码Code有误',
					icon: 'none',
					duration: 2000,
					mask: true
				});
			}
		},
		//用户授权的方法
		UserAuthorization(username) {
			let _this = this;
			let url = 'Manage/EmployeeOpenId';
			let d = {
				Code: _this.numCode
			};   
			api.httpRequestGet(url, d).then(res => { 
				let result = res.data;
				if (result.error_code == 'Success' && result.data.openid != null && result.data.session_key != null) {
					uni.showToast({
						title: '授权成功',
						icon: 'none',
						duration: 2000,
						mask: true
					}); 
					uni.redirectTo({
						url: 'phonelogin?openid=' +
							encodeURIComponent(result.data.openid) +
							'&session_key=' +
							encodeURIComponent(result.data.session_key) +
							'&username=' +
							encodeURIComponent(username)
					});
				} else {
					_this.btnDisab = false;
					uni.showToast({
						title: '用户授权请求失败',
						icon: 'none',
						duration: 2000,
						mask: true
					});
				}
			});
		},
		//登录
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
		getPhoneNumber (e) {
		    console.log(e.detail.errMsg)
		    console.log(e.detail.iv)
		    console.log(e.detail.encryptedData)
		  }
	},
	onLoad() {
		//默认加载
		this.login();
	}
};
</script>

<style lang="less" scoped>
.content {
	margin: 0 50rpx 90rpx 50rpx;
	.LogoTitle {
		display: inline;
		font-size: 40upx;
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
