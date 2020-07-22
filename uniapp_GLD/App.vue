<script>
export default {
	data() {
		return {
			windowWidth: 0,
			windowHeight: 0
		};
	},
	onLaunch: function() {},
	onShow: function() {
		this.getSystemInfo();
		this.checkNewbb();
	},
	onLoad: function() {
		this.getSystemInfo();
	},
	onHide: function() {
		// console.log('App Hide');
	},
	methods: {
		getSystemInfo() {
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowWidth = res.windowWidth;
					that.windowHeight = res.windowHeight;
				}
			});
		},
		checkNewbb() {
			// console.log(123);
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res2) {
						uni.showModal({
							title: '更新提示',
							content: '发现新版本，是否重启应用?',
							cancelColor: '#eeeeee',
							confirmColor: '#FF0000',
							success(res2) {
								if (res2.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
				}
			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '提示',
					content: '检查到有新版本，但下载失败，请检查网络设置',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
		}
	}
};
</script>

<style>
/* @import './common/uni.css'; */
/*每个页面公共css */
html,
body,
#app {
	height: 100%;
}
view {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}
canvas {
	/* z-index: -5 !important; */
}
scroll-view {
	box-sizing: border-box;
}
/* 隐藏滚动条 */
scroll-view ::-webkit-scrollbar {
	width: 0;
	height: 0;
	background-color: transparent;
}
</style>
