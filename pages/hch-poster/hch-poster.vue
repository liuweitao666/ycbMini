<template>
  <view class="content">
    <!-- 为了展示个各种文本，图像，绘图demo -->
    <img
      class="poster-img"
      src="https://huangchunhongzz.gitee.io/imgs/poster/poster_1.jpg"
      alt=""
      srcset=""
    />
    <button class="share-btn" @tap="shareEvn">生成海报模板</button>
    <!-- 分享弹窗-->
    <view class="share-pro">
      <view class="share-pro-mask" v-if="deliveryFlag"></view>
      <view class="share-pro-dialog" :class="deliveryFlag ? 'open' : 'close'">
        <view class="close-btn" @tap="handleClose">
          <span class="font_family">&#xe81d;</span>
        </view>
        <view class="share-pro-title">分享</view>
        <view class="share-pro-body">
          <view class="share-item">
            <button open-type="share">
              <view class="font_family share-icon">&#xe786;</view>
              <view>分享给好友</view>
            </button>
          </view>
          <view class="share-item" @tap="handleShowPoster">
            <view class="font_family share-icon">&#xe600;</view>
            <view>生成分享图片</view>
          </view>
        </view>
      </view>
    </view>
    <hch-poster
      ref="hchPoster"
      @cancel="handleCancel"
      :posterData.sync="posterData"
      @previewImage="previewImage"
    />
  </view>
</template>

<script>
  import HchPoster from '../../components/hch-poster/hch-poster.vue'
  export default {
    components: {
      HchPoster,
    },
    data() {
      return {
        deliveryFlag: false, //
        // 海报模板数据
        posterData: {
          poster: {
            //根据屏幕大小自动生成海报背景大小
            url: 'https://huangchunhongzz.gitee.io/imgs/poster/poster_bg_3.png', //图片地址
            r: 10, //圆角半径
            w: 300, //海报宽度
            h: 480, //海报高度
            p: 20 //海报内边距padding
          },
          mainImg: {
            //海报主商品图
            url: 'https://huangchunhongzz.gitee.io/imgs/poster/product.png', //图片地址
            r: 10, //圆角半径
            w: 250, //宽度
            h: 200 //高度
          },
          title: {
            //商品标题
            text: '今日上新水果，牛奶草莓，颗粒饱满，每盒 200g', //文本
            fontSize: 16, //字体大小
            color: '#000', //颜色
            lineHeight: 25, //行高
            mt: 20 //margin-top
          },
          codeImg: {
            //小程序码
            url: 'https://huangchunhongzz.gitee.io/imgs/poster/code.png', //图片地址
            w: 100, //宽度
            h: 100, //高度
            mt: 20, //margin-top
            r: 50 //圆角半径
          },
          tips: [
            //提示信息
            {
              text: '记忆之王', //文本
              fontSize: 14, //字体大小
              color: '#2f1709', //字体颜色
              align: 'center', //对齐方式
              lineHeight: 25, //行高
              mt: 20 //margin-top
            },
            {
              text: '长按/扫描识别查看商品', //文本
              fontSize: 12, //字体大小
              color: '#2f1709', //字体颜色
              align: 'center', //对齐方式
              lineHeight: 25, //行高
              mt: 20 //margin-top
            }
          ]
        }
      }
    },
    onLoad() {},
    methods: {
      /**
       * @description: 生成海报
       * @param {type}
       * @return {type}
       * @author: hch
       */
      handleShowPoster() {
        this.$refs.hchPoster.posterShow()
        this.deliveryFlag = false
      },
      /**
       * @description: 分享弹窗
       * @param {type}
       * @return {type}
       * @author: hch
       */
      shareEvn(type) {
        this.deliveryFlag = true
      },
      /**
       * @description: 关闭分享弹窗
       * @param {type}
       * @return {type}
       * @author: hch
       */
      handleClose() {
        this.deliveryFlag = false
      },
      /**
       * @description: 取消海报
       * @param {type}
       * @return {type}
       * @author: hch
       */
      handleCancel(val) {
        // this.canvasFlag = val
      },
      /**
       * @description: h5的情况下，点击海报保存按钮到图片预览海报，可以长按保存
       * @param {*} base64
       * @return {*}
       * @author: hch
       */
      previewImage(base64) {
        // 预览图片
        uni.previewImage({
          urls: [base64]
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 每个页面公共css 放app.vue页面的 */
  @font-face {
    font-family: 'font_family'; /* project id 1991769 */
    src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot');
    src: url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.eot?#iefix') format('embedded-opentype'),
      url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff2') format('woff2'),
      url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.woff') format('woff'),
      url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_1991769_u8wpg8jfhpq.svg#iconfont') format('svg');
  }

  .font_family {
    font-family: 'font_family' !important;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-style: normal;
    -webkit-text-stroke-width: 0.2px;
  }

  /* 按钮去掉边框 */
  button::after {
    border: none;
  }

  button {
    height: auto; //支付宝需要加
    padding-right: 0;
    padding-left: 0;
    margin-right: 0;
    margin-left: 0;
    font-size: 28rpx;
    line-height: 1;
    color: #1c1c1c;
    background: none;
    border: none; //支付宝需要加
  }

  .button-hover {
    color: #1c1c1c;
    background: none;
  }

  .poster-img {
    width: 40%;
  }

  /* 每个页面公共css */
  .content {
    height: 100%;
    text-align: center;
  }

  // .share-btn {
  //   padding: 30rpx 60rpx;
  //   color: $uni-text-color-inverse;
  //   background-color: $uni-btn-color;
  // }

  .share-pro {
    z-index: 5;
    display: flex;
    line-height: 1;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;

    .share-pro-mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    .share-pro-dialog {
      position: relative;
      position: fixed;
      bottom: 0;
      width: 750rpx;
      height: 310rpx;
      overflow: hidden;
      background-color: #fff;
      border-radius: 24rpx 24rpx 0 0;
      box-sizing: border-box;

      .close-btn {
        position: absolute;
        top: 0rpx;
        right: 29rpx;
        padding: 20rpx 15rpx;
      }

      .share-pro-title {
        padding: 28rpx 41rpx;
        font-size: 28rpx;
        color: #1c1c1c;
        background-color: #f7f7f7;
      }

      .share-pro-body {
        display: flex;
        font-size: 28rpx;
        color: #1c1c1c;
        flex-direction: row;
        justify-content: space-around;

        .share-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          justify-content: space-around;

          .share-icon {
            margin-top: 39rpx;
            margin-bottom: 16rpx;
            font-size: 70rpx;
            color: #42ae3c;
            text-align: center;
          }

          &:nth-child(2) {
            .share-icon {
              color: #ff5f33;
            }
          }
        }
      }
    }

    /* 显示或关闭内容时动画 */

    .open {
      transform: translateY(0);
      transition: all 0.3s ease-out;
    }

    .close {
      transform: translateY(310rpx);
      transition: all 0.3s ease-out;
    }
  }
</style>
