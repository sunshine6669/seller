<template>
  <div class="shopWarp">
     <div class="content" @click="toggleClass">
         <div class="content-left">
             <div class="logo-warp">
                <div class="logo" :class="{'highLight':totalCount>0}">
                    <i class="icon-shopping_cart icon-car"></i>
                </div>
                <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>
             </div>
             <div class="price" :class="{'highLight':totalPrice>0}">
                 ￥ {{totalPrice || 0}} 元
             </div>
             <div class="cdesc">
                另需配送费￥{{deliveryPrice}}元
             </div>
         </div>
         <div class="content-right" @click.stop.prevent="pay">
             <div class="pay" :class="payDesc">
                {{showCon}}
             </div>
         </div>
     </div>
     <div class="ball-warpper">
            <transition name="drop" 
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                v-for="(ball,index) in balls"
                key="index"
            >
                <div v-show="ball.showMark" class="ball">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
     </div>
     <transition name="fold">
         <div class="shop-list" v-show="showList">
            <div class="shop-title border_1px">
                <span class="shopCar">购物车</span>
                <span class="shopClear" @click="empty">清空</span>
            </div>
            <div class="shop-content" ref="shopContent">
                <ul>
                    <li v-for="food in selectFood" class="foodList border_1px">
                        <span class="food-name">{{food.name}}</span>
                        <div class="food-price">
                            <span class="price">￥{{food.count*food.price}}</span>
                            <v-countControl :food='food'></v-countControl>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
     </transition>
     <transition name="fade">
         <div class="bg-mark" v-show="showList" @click="toggleClass"></div>
     </transition>
  </div>
</template>

<style lang="stylus" type="text/css">
 @import '../../common/stylus/mixin.styl';
    .shopWarp
        position :fixed
        bottom :0
        left :0
        background :#141d27
        height :48px
        width :100%
        z-index :1000
        .content
            display :flex
            color :rgba(255,255,255,0.4)
            .content-left
                flex :1
                font-size :0
                .logo-warp
                    width :56px
                    height :56px
                    margin :0 0 0 12px
                    padding :6px
                    position :relative
                    top :-10px
                    border-radius :50%
                    background :#141d27
                    box-sizing: border-box;
                    vertical-align :top
                    display :inline-block
                    z-index: 999
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        box-sizing: border-box
                        background: #2b343c
                        text-align: center
                        &.highLight
                            background :#00a0dc
                            .icon-car
                              color :#fff
                        .icon-car
                            line-height :44px
                            font-size :24px
                            color :#80858a
                    .totalCount
                        height :16px
                        position :absolute
                        top :0
                        right :0
                        background :#f01414
                        color:rgb(255,255,255)
                        font-size :9px
                        text-align :center
                        line-height :16px
                        border-radius :16px
                        padding: 1px 7px;
               
                .price
                    display :inline-block
                    font-size :16px
                    color :#919396
                    font-weight :700
                    border-right :1px solid rgba(255,255,255,0.1)
                    margin :12px 0 0 12px
                    padding-right :12px
                    box-sizing :border-box
                    line-height :24px
                    vertical-align :top
                    &.highLight
                        color: #fff
                .cdesc
                    display :inline-block
                    font-size :10px
                    padding-left :12px
                    line-height :24px
                    margin :12px 0 0 0;
                    box-sizing : border-box
                    vertical-align :top
            .content-right
                flex :0 0 105px
                width :105px      
                .pay
                    background :#2b333b
                    text-align :center
                    font-size :12px
                    line-height :48px
                    font-weight :700
                    padding :0 8px
                    &.not-enough
                        background :#2b333b
                        color :#979a9c
                    &.enough
                        color:#fff
                        background :#00b43c    
        .ball-warpper
            .ball
                position :fixed
                left :32px
                bottom :22px
                z-index :200
                &.drop-enter,&.drop-enter-active
                    transition all 0.4s cubic-bezier(.17,-0.35,.68,-0.31)
                .inner
                    width :16px
                    height :16px
                    border-radius :50%
                    background :rgb(0,160,220)
                    transition :all 0.4s linear;
        .shop-list
            position :absolute
            top :0
            left :0
            width :100%
            z-index :99
            transform :translate3d(0,-100%,0)
            &.fold-enter-active,&.fold-leave-active
                transition :all 0.5s
            &.fold-enter,&.fold-leave-active
                transform :translate3d(0,0,0)
            .shop-title
                height :40px
                background :#f5f3f7
                display :flex
                line-height :40px
                padding :0 18px
                border_1px(rgba(7,17,27,0.1))
                .shopCar
                    flex :1
                    text-align :left
                    font-size :14px
                    font-weight :200
                    color :rgb(7,17,27)
                .shopClear
                    flex :0 0 40px
                    text-align :right
                    font-size :12px
                    color :rgb(0,160,220)
            .shop-content
                background :#fff
                padding :0 18px
                max-height :217px
                overflow :hidden
                .foodList
                    display :flex
                    border_1px(rgba(7,17,27,0.1))
                    box-sizing :border-box
                    &:last-child
                        border_none()
                    .food-name
                        flex :1
                        font-size :14px
                        color :rgb(7,17,27)
                        line-height :48px
                    .food-price
                        flex: 0 0 120px
                        position :relative
                        .price
                            font-size :14px
                            color :rgb(240,20,20)
                            font-weight :700
                            line-height: 48px;
                        .countControl
                            position :absolute
                            right :0
                            top: 13px;
        .bg-mark
            background :rgba(7,17,27,0.6)
            backdrop-filter:blur(10px)
            position :fixed
            top :0
            left :0
            right :0
            bottom :0
            z-index :-1
            &.fade-enter,&.fade-leave-active
                opacity:0
                transition :all 0.5s
            &.fade-enter-active
                opacity:1
</style>
    
<script>
import BScroll from 'better-scroll';
import countControl from 'components/countControl/countControl';
export default {
    name: 'shopWarp',
    props: {
        selectFood: {
            type: Array,
            default() {
                return [{
                    count: 10,
                    price: 10
                }];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            balls: [{
                showMark: false
            },
            {
                showMark: false
            },
            {
                showMark: false
            },
            {
                showMark: false
            },
            {
                showMark: false
            }
            ],
            dropballs: [],
            fold: true
        };
    },
    computed: {
        totalCount() {
            let count = 0;
            this.selectFood.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        totalPrice() {
            let price = 0;
            this.selectFood.forEach((food) => {
                price += food.price * food.count;
            });
            return price;
        },
        showCon() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                return `还差￥${this.minPrice - this.totalPrice}元起送`;
            } else {
                return '去结算';
            }
        },
        payDesc() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        },
        showList() {
            if (!this.totalCount) {
                this.fold = true;
                return;
            }
            let mark = !this.fold;
            if (mark) {
                this.$nextTick(() => {
                    if (!this.bscroll) {
                        this.bscroll = new BScroll(this.$refs.shopContent, {
                            'click': true
                        });
                    } else {
                        this.bscroll.refresh();
                    }
                });
            }
            return mark;
        }
    },
    components: {
        'v-countControl': countControl
    },
    methods: {
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.showMark) {
                    ball.showMark = true;
                    ball.el = el;
                    this.dropballs.push(ball);
                    return;
                }
            }
        },
        beforeEnter(el) {
            let count = this.dropballs.length;
            while (count--) {
                let ball = this.dropballs[count];
                let rect = ball.el.getBoundingClientRect();
                if (ball.showMark) {
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter(el) {
            /*eslint no-unused-vars: "error"*/
            el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
            });
        },
        afterEnter(el) {
            let ball = this.dropballs.shift();
            if (ball) {
                ball.showMark = false;
                el.style.display = 'none';
            }
        },
        toggleClass() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        empty() {
            this.selectFood.forEach((food) => {
                food.count = 0;
            });
        },
        pay() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert(`你需要支付${this.totalPrice}元`);
        }
    }
};
</script>
