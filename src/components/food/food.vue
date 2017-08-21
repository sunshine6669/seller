<template>
   <transition name="move">
       <div class="food" v-show="showFlag"  ref="food">
            <div class="food-warpper">
                <div class="image-header">
                    <img :src="food.image" />
                    <div class="back-btn" @click="back">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="food-info border1px">
                    <h1>{{food.name}}</h1>
                    <div class="sell-count">
                        <span>月售{{food.sellCount}}份</span>
                        <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="nowPrice">￥{{food.price}}</span>
                        <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartControl" v-show="food.count>0">
                        <v-countControl :food="food"></v-countControl>
                    </div>
                    <transition name="fade">
                        <div class="addFirst" @click.stop.prevent="addFirst(food,$event)" v-show="!food.count||food.count ===0">
                            加入购物车   
                        </div>
                    </transition>
                </div>
                <div class="food-desc border1px border1pxtop" v-show="food.info">
                    <h2>商品介绍</h2>
                    <div class="food-con">
                        {{food.info}}
                    </div>
                </div>
                <div class="food-ratings">
                </div>
            </div>
        </div>
   </transition>
</template>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixin.styl';
    .food
        position: fixed;
        top: 0;
        left: 0;
        bottom: 48px;
        background: #f3f5f7;
        width: 100%;
        z-index: 999;
        transition :all 0.4s ease
        &.move-enter,&.move-leave-active
            transform :translate3d(0,0,0)
        &.move-enter-active,&.move-leave-active
            transform :translate3d(100%,0,0)
        .image-header
            width :100%
            position :relative
            padding-top :100%
            height :0
            img 
               position :absolute
               top :0
               left :0
               width :100%
               height :100%
            .back-btn
                width :30px
                height :30px
                position :absolute
                top :10px
                left :10px
                text-align :center
                line-height :30px
                .icon-arrow_lift
                    color :#fff
                    font-size :14px
        .food-info
            padding :18px
            background :#fff
            border_1px(rgba(7,17,27,0.1))
            h1
                font-size :14px
                color :rgb(7,17,27)
                font-weight :700
            .sell-count
                font-size :10px
                color :rgb(147,153,159)
                line-height :10px
                margin :8px 0 18px
                span    
                    margin-right :12px
                    &:last-child
                        margin-right :0
            .price
                .nowPrice
                    color :rgb(240,20,20)
                    font-size :14px
                    font-weight :700
                    margin-right :12px
                .oldPrice
                    text-decoration :line-through
                    font-size :10px
                    color :rgb(147,153,159)
            .cartControl
                position :absolute
                right :12px
                bottom :12px
            .addFirst
                padding: 12px 6px
                color :#fff
                background :rgb(0,160,220) 
                border-radius :24px
                text-align :center
                position :absolute
                right :18px
                bottom :18px
                &.fade-enter,&.fade-leave-active    
                    opacity :0
                    transition :all 0.2s
                &.fade-enter-active 
                    opacity :1
        .food-desc
            padding :18px
            margin :16px 0
            background :#fff
            border_1px(rgba(7,17,27,0.1))
            border_1pxtop(rgba(7,17,27,0.1))
            h2
                font-size :14px
                color :#111
                font-weight :400
                margin-bottom :6px
            .food-con
                font-size :12px
                font-weight :200
                color :rgb(77,85,93)
                line-height :24px
                padding :0 8px
        .food-ratings
            height :100px
            background :red       
</style>

<script>
import Vue from 'vue';
import countControl from 'components/countControl/countControl';
import BScroll from 'better-scroll';
export default {
    name: 'food',
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false
        };
    },
    methods: {
        show() {
            this.showFlag = true;
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        back() {
            this.showFlag = false;
        },
        addFirst(food, event) {
            if (!event._constructed) {
                return;
            }
            Vue.set(this.food, 'count', 1);
            this.$root.eventHub.$emit('cart.add', event.target);
        }
    },
    components: {
        'v-countControl': countControl
    }
};
</script>