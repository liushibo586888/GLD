<template>
	<view>
		<view class="boxCont">
			<view><image src="../../static/gktx.jpg" mode=""></image></view>
			<view class="boxRight">
				<view>{{ Indata.CustomerName }}</view>
				<view style="color: #82b1ff;font-size: 28upx;" v-if="Status == 0">[{{ shzt }}]</view>
				<view style="color: #ff0000;font-size: 28upx;" v-else>[{{ shzt }}]</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{ height: height }" style="padding: 0 20upx;">
			<block v-for="(item, index) in list" :key="index">
				<view class="HLS_box">
					<view style="background: #FFFFFF;">
						<view class="HLS_shang">{{ item.Title }}</view>
					</view>
					<view class="HLS_zhong">
						<view>
							<text style="color: #7DAEFD;">{{ item.Value }}</text>
							<text v-if="showType == 'jm'">单价</text>
							<text v-else>申请数量</text>
							<text class="xian_h"></text>
						</view>
						<view>
							<text style="color: #7DAEFD;">{{ item.Value2 }}</text>
							<text v-if="showType == 'jm'">减免金额</text>
							<text v-else>规格</text>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view style="text-align: center;height: 240upx;position: absolute;left: 35%;top: 40%;">
			<image style="width: 200upx; height: 200upx;border-radius: 100upx;transform:rotate(-20deg);" :src="src" mode=""></image>
		</view>
		<!-- <view style="height: 240upx;padding: 0 20upx;" v-if="Status == 2"><text>备注: 呜呜呜呜</text></view> -->
		<view class="footBtn" v-if="Status == 0">
			<button type="warn" @click="reject">拒绝</button>
			<button type="primary" @click="agree">通过</button>
		</view>
		<view class="uni-textarea jjly" v-if="showtextarea" @click="showtextarea = false">
			<view class="dhk" @click.stop="">
				<view style="text-align: center;font-weight: bold;">拒绝理由</view>
				<textarea maxlength="-1" placeholder="请输入拒绝原因" @input="txtcont" />
				<view style="display: flex;margin-top: 20upx;">
					<button type="warn" @click="showtextarea = false">取消</button>
					<button type="primary" @click="queding">确定</button>
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
			height: 100,
			showtextarea: false,
			txtvalue: '',
			Indata: {},
			list: [],
			Status: 0,
			status: 1,
			Id: '',
			shzt: '',
			src: '',
			typeUrl: '',
			showType: ''
		};
	},
	created() {
		let that = this;
		that.height = that.getWindowHeight() - 130 + 'px';
	},
	onLoad(options) {
		let data = JSON.parse(options.data);
		this.Indata = data;
		this.list = data.newAuditGoShopInsides;
		this.Status = data.Status;
		this.typeUrl = data.typeUrl;
		this.Id = data.ID;
		if (data.typeUrl == 'NewAudit/AuditGoodNew') {
			this.showType = 'wz';
		} else {
			this.showType = 'jm';
		}
		if (this.Status == 0) {
			this.shzt = '待审核';
			this.src = '../../static/wait.png';
		} else if (this.Status == 1) {
			this.shzt = '已同意';
			this.src = '../../static/agree.png';
		} else if (this.Status == 2) {
			this.shzt = '已拒绝';
			this.src = '../../static/jujue.png';
		}
	},
	methods: {
		agree() {
			let that = this;
			uni.showModal({
				title: '提示',
				content: '确定要通过审批吗?',
				success: function(res) {
					if (res.confirm) {
						that.getList(1);
					}
				}
			});
		},
		//点击拒绝按钮
		reject() {
			this.showtextarea = true;
		},
		//获取textarea内容
		txtcont(event) {
			this.txtvalue = event.detail.value;
		},
		//点击确定按钮
		queding() {
			this.showtextarea = false;
			this.getList(2);
		},
		getList(Status) {
			let url = this.typeUrl;
			let data = {
				EmployeeId: uni.getStorageSync('employeeId'),
				Id: this.Id,
				Status: Status,
				AuditRemark: this.txtvalue
			};
			api.httpRequestPost(url, data).then(res => {
				if (res.data.error_code == 'Success') {
					uni.showToast({
						title: '提交成功',
						duration: 2000
					});
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 2000);
				} else {
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

<style>
page {
	width: 100%;
	height: 100%;
	background-color: #f4f7ff;
}
image {
	width: 100upx;
	height: 100upx;
	border-radius: 50upx;
	margin: 20upx 0 0 20upx;
}
.box {
	display: flex;
	margin-top: 30upx;
	background-color: #ffffff;
	padding: 30upx 0;
}
.boxCont {
	display: flex;
	background-color: #ffffff;
	height: 140upx;
	margin-bottom: 20upx;
}
.boxRight {
	margin-left: 30upx;
	margin-top: 30upx;
}
.footBtn {
	position: absolute;
	left: 0;
	bottom: 0;
	display: flex;
	height: 100upx;
	width: 100%;
}
button {
	width: 50%;
	border-radius: 0;
}
.jjly {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #6d6d6d;
	background: rgba(0, 0, 0, 0.5);
	padding: 20upx;
}
.dhk {
	margin-top: 40%;
	width: 100%;
	height: 500upx;
	border: 1px solid #6d6d72;
	padding: 20upx;
	background-color: #ffffff;
}
textarea {
	width: 100%;
	height: 300upx;
	border: 1px solid #6d6d72;
	padding: 20upx;
	box-sizing: border-box;
}
.HLS_box {
	background-color: #b0c8ff;
	border-radius: 15upx;
	margin-bottom: 30upx;
	box-shadow: 0 2upx 2upx #9b9b9b;
}
.HLS_shang {
	width: 50%;
	height: 60upx;
	margin: 0 auto;
	text-align: center;
	line-height: 60upx;
	background-color: #817efd;
	color: #ffffff;
	border-bottom-right-radius: 20upx;
	border-bottom-left-radius: 20upx;
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
	width: 50%;
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
</style>
