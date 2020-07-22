<template>
	<view class="qiun-columns">
		<view class="qiun-charts"><canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchend="touchEndLineA"></canvas></view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
var that;
var canvaLineA = null;
export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: '',
			Interactive: '' //交互显示的数据
		};
	},
	onLoad() {
		that = this;
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//that.pixelRatio =res.pixelRatio;
					that.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	methods: {
		getServerData() {
			let LineA = { categories: [], series: [] };
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			LineA.categories = ['2012', '2013', '2014', '2015', '2016', '2017'];
			LineA.series = [
				{
					name: '成交量A',
					data: [35, 8, 25, 37, 4, 20]
				}
			];

			//第二根线为虚线的设置
			// LineA.series[1].lineType = 'dash';
			// LineA.series[1].dashLength = 10;
			that.showLineA('canvasLineA', LineA);
		},
		showLineA(canvasId, chartData) {
			canvaLineA = new uCharts({
				$this: that,
				canvasId: canvasId,
				type: 'line',
				colors: ['#facc14', '#f04864', '#8543e0', '#90ed7d'],
				fontSize: 11,
				padding: [15, 15, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: that.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				xAxis: {
					type: 'grid',
					gridColor: '#CCCCCC',
					gridType: 'dash',
					dashLength: 8
					//disableGrid:true
				},
				yAxis: {
					gridType: 'dash',
					gridColor: '#CCCCCC',
					dashLength: 8
				},
				width: that.cWidth * that.pixelRatio,
				height: that.cHeight * that.pixelRatio,
				extra: {
					line: {
						type: 'straight'
					}
				}
			});
		},
		touchEndLineA(e) {
			canvaLineA.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		}
	}
};
</script>

<style scoped>
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
