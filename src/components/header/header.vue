<template>
    <div class="header">
        <div class="h-foodwarp">
            <div class="hp-avatar">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="hp-description">
                <h2>
                    <span class="dpg-icon"></span>
                    <span>{{seller.name}}</span>
                </h2>
                <p class="dpg-send">{{seller.description}} / {{seller.deliveryTime}}分送达</p>
                <p class="dpg-active" v-if="seller.supports">
                    <span class="active-icon" :class="activeIcon[seller.supports[0].type]" :data="seller.supports[0].type"></span>{{seller.supports[0].description}}</p>
            </div>
            <div class="hp-supports" @click="detailMark = !detailMark">
                <span class="supports-counts" v-if="seller.supports">{{seller.supports.length}}个</span>
                <span class="supports-more icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="h-notice" @click="detailMark = !detailMark">
            <span class="hn-icon"></span><span class="hn-desc">{{seller.bulletin}}</span>
            <span class="notice-more icon-keyboard_arrow_right"></span>
        </div>
        <div class="fd-bg">
            <img :src="seller.avatar" alt=""/>
        </div>
        <transition name="fade">
            <div class="h-showDetail" v-show="detailMark">
                <div class="hs-warpper clearfix">
                    <div class="hsw-main">
                        <h1 class="hsm-title">{{seller.name}}</h1>
                        <div class="hsm-star">
                            <v-star :size="48" :score="seller.score"></v-star>
                        </div>
                        <div class="hsm-activeInfo">
                            <div class="hma-title">
                                <div class="hmt-line"></div>
                                <div class="hmt-text">优惠信息</div>
                                <div class="hmt-line"></div> 
                            </div>
                            <ul class="hma-con" v-if="seller.supports">
                                <li v-for="(item,index) in seller.supports"><span class="a-icon" :class="activeIcon[seller.supports[index].type]"></span><span>{{item.description}}</span></li>
                            </ul>
                            <div class="hma-title">
                                <div class="hmt-line"></div>
                                <div class="hmt-text">商家信息</div>
                                <div class="hmt-line"></div>
                            </div>
                            <div class="hma-bulletin">
                                {{seller.bulletin}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hs-close">
                    <i class="icon-close hs-closeicon" @click="detailMark=false"></i>
                </div> 
            </div>
        </transition>
    </div>
</template>
<script>
import star from 'components/star/star';
export default {
    name: 'header',
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailMark: false
        };
    },
    created() {
        this.activeIcon = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
        'v-star': star
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
  .header
     color:#fff
     position :relative
     background: rgba(7,17,27,0.5)
     overflow :hidden
   .h-foodwarp
      font-size:0
      padding:24px 12px 18px 24px
      position:relative
      .hp-avatar
         width:64px
         height:64px
         display:inline-block
         &>img
           width:100%
           height:100%      
      .hp-description
          display:inline-block
          font-size:14px
          margin-left:16px
          &>h2
            font-size:16px
            font-weight:bold
            line-height:18px
            margin: 2px 0 8px;
            .dpg-icon
                width:30px
                height:18px
                display:inline-block
                bg_icon('brand')
                background-size:30px 18px
                margin-right:6px
                vertical-align: top;
        .dpg-send
            font-size:12px
            line-height:12px
            margin-bottom:10px
        .dpg-active
            font-size:10px
            line-height:12px 
            &>.active-icon
              width:12px
              height:12px
              display:inline-block
              background-size:12px 12px
              margin-right:4px
              vertical-align: top;
            & .decrease
                bg_icon('decrease_1')
            & .discount
                bg_icon('discount_1')  
            & .guarantee
                bg_icon('guarantee_1') 
            & .invoice
                bg_icon('invoice_1') 
            & .special
                bg_icon('special_1') 
     .hp-supports
        position: absolute;
        bottom: 19px;
        right: 12px;
        font-size: 10px;
        // line-height: 12px;
        background: rgba(0,0,0,0.5);
        padding: 7px 8px;
        border-radius: 18px;
        & .supports-counts
           font-size :10px
        & .supports-more
           vertical-align: top
   .h-notice
     height:28px
     line-height:28px
     padding:0 12px;
     position :relative
     background :rgba(7,17,27,0.2)
    .hn-icon
        width: 22px
        height : 12px
        display :inline-block
        bg_icon('brand')
        background-size :22px 12px
        vertical-align :top
        margin-top :8px

    .hn-desc
        display: inline-block
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        width: 86%
        margin:0 4px
        font-size :10px
        font-weight :200
        vertical-align :top
    .notice-more
        position :absolute
        right :12px
        top :8px
   .fd-bg
      position :absolute
      top :0
      left :0px
      width :100%
      height :100%
      z-index: -1
      background :rgba(7,17,27,0.5)
      & >img
        width :100%
        height :100%
        border :0
        filter:blur(10px)
    .h-showDetail
        position :fixed
        top :0
        left :0
        z-index :999
        width :100%
        height :100%
        overflow :auto
        backdrop-filter :blur(10px)
        transition :all 0.8s
        background :rgba(7,17,27,0.8)
        &.fade-enter-active,&fade-leave-active
            transition :all 0.8s
        &.fade-enter,&.fade-leave-active
            opacity :0
            background :rgba(7,17,27,0.8)
        .hs-warpper
            min-height :100%
            width :100%
            .hsw-main
                margin:64px auto 0
                padding:0 36px 80px 
                .hsm-title
                    text-align :center
                    font-size :16px
                    font-weight :700
                    line-height :16px
                .hsm-star
                    text-align :center
                    padding: 16px 0 0px
                .hsm-activeInfo
                    .hma-title
                        display :flex
                        margin:28px 0 24px
                        .hmt-line
                            flex :1
                            position :relative
                            border-bottom :1px solid rgba(255,255,255,0.2)
                            bottom :7px
                        .hmt-text
                            padding :0 12px
                            font-size :14px
                            font-weight :700
                            line-height :14px
                    .hma-con
                        padding :0 12px
                        &>li
                            margin-bottom :12px
                            font-size :12px
                            font-weight :200
                            line-height: 16px;
                        &:last-child
                            margin-bottom :0
                        .a-icon
                            display :inline-block
                            width :16px
                            height :16px
                            vertical-align :top
                            background-size :16px 16px
                            margin-right :6px
                            &.decrease
                                bg_icon('decrease_2')
                            &.discount
                                bg_icon('discount_2')  
                            &.guarantee
                                bg_icon('guarantee_2') 
                            &.invoice
                                bg_icon('invoice_2') 
                            &.special
                                bg_icon('special_2') 
                    .hma-bulletin
                        font-size :12px
                        color: rgb(255,255,255)
                        line-height :24px
                        font-weight :200
                        padding :0 12px
        .hs-close
            position :relative
            width :32px
            height :32px
            clear :both
            margin :-92px auto 0
         .hs-closeicon
            color:rgba(255,255,255,0.5)
            font-size :32px
</style>