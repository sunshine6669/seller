<template>
   <div class="rating">
       <div class="rating-type border1px">
           <span @click="select(2,$event)" :class="{'activity': selectType===2}">{{desc.all}}<label>{{ratings.length}}</label></span>
           <span @click="select(0,$event)" :class="{'activity': selectType===0}">{{desc.positive}}<label>{{positive.length}}</label></span>
           <span @click="select(1,$event)" :class="{'activity': selectType===1}">{{desc.negative}}<label>{{negative.length}}</label></span>
       </div>
       <div @click="toggleContent($event)" class="rating-onlyCon" :class="{'on':onlyContent}">
           <i class="icon-check_circle"></i>
           <span>只看有内容的评价</span>
       </div>
   </div>
</template>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';
    .rating
        .rating-type
            padding :0 0 18px 0
            font-size: 0
            border_1px(rgba(7,17,27,0.1))
            span 
                display :inline-block
                padding :8px 12px
                font-size :12px
                border-radius :2px
                margin :0 8px 0 0
                color :rgb(77,85,93)
                &.activity
                    background :rgb(0,160,220)!important
                    color :#fff!important
                label 
                    margin-left :4px
            span:first-child
                background :rgba(0,160,220,0.2)
            span:nth-child(2)
                background :rgba(0,160,220,0.2)
            span:last-child
                background :rgba(77,85,93,0.2)
                margin-right :0
                &.activity
                    background :rgb(77,85,93)!important
        .rating-onlyCon
            padding :12px 0
            &.on
                .icon-check_circle
                    color :#00c850
            .icon-check_circle
                font-size :24px
                color :rgb(147,153,159)
                line-height :24px
                margin-right :4px
                vertical-align :top
            span 
                font-size 12px
                color :rgb(147,153,159)
                line-height :24px
                vertical-align :top
</style>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    name: 'rating',
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    computed: {
        positive() {
            return this.ratings.filter((posrating) => {
                return posrating.rateType === POSITIVE;
            });
        },
        negative() {
            return this.ratings.filter((posrating) => {
                return posrating.rateType === NEGATIVE;
            });
        }
    },
    methods: {
        select(type, event) {
            if (!event._constructed) {
                return;
            }
            this.$root.eventHub.$emit('rating.select', type);
        },
        toggleContent(event) {
            if (!event._constructed) {
                return;
            }
            this.$root.eventHub.$emit('toggle.con');
        }
    }
};
</script>
