<template>
   <transition name="move">
       <div class="food" v-show="showFlag">
            <div class="image-header">
                <img :src="food.image" />
                <div class="back-btn" @click="back">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div>
                
            </div>
        </div>
   </transition>
</template>

<style lang="stylus" scoped>
    .food
        position: fixed;
        top: 0;
        left: 0;
        bottom: 48px;
        background: #fff;
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
</style>

<script>
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
        },
        back() {
            this.showFlag = false;
        }
    }
};
</script>