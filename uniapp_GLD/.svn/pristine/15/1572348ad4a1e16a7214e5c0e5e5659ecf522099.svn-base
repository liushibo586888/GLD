<template>
    <view class="s-switch-container">
        <view class="s-switch-item" :class="{
                's-switch-selected': item.selected
              }"
              @click="selectItem(item)"
              v-for="item in switchArr" :key="item.key">
            {{item.value}}
        </view>
    </view>
</template>

<script>
export default {
    name: 'SSwitch',
    props: {
        defaultValue: {
            type: Number,
            default: 0
        },
        switchList: {
            type: Array,
            default: [
                {
                    key: 0,
                    value: '是'
                },
                {
                    key: 1,
                    value: '否'
                }
            ]
        }
    },
    data () {
        return {
            switchArr: []
        }
    },
    methods: {
        selectItem (info) {
            if (info.selected === false) {
                for (const item of this.switchArr) {
                    if (info.key === item.key) {
                        item.selected = true
                        this.$emit('switchValue', item)
                    } else {
                        item.selected = false
                    }
                }
            }
        }
    },
    created () {
        for (let i = 0; i < 2; i++) {
            const arrItem = {
                key: this.switchList[i].key,
                value: this.switchList[i].value,
                selected: this.defaultValue === this.switchList[i].key ? true : false
            }
            if (this.switchList[i].key === this.defaultValue) {
                this.$emit('switchValue', arrItem)
            }
            this.switchArr.push(arrItem)
        }
    }
}
</script>

<style lang="scss" scoped>
    .s-switch-container {
        padding: 2upx;
        display: flex;
        flex-direction: row;
        width: 140upx;
        height: 50upx;
        border-radius: 100upx;
        border: 4upx solid #85c267;
    }
    .s-switch-item {
        color: #85c267;
        font-size: 30upx;
        width: 80upx;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .s-switch-selected {
        color: #ffffff;
        border-radius: 40upx;
        background: #85c267;
    }
</style>
