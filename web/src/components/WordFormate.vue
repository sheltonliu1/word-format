<script setup>
defineProps({
  wordInfo: {
    type: Object,
    required: true
  },
  number: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="word-item">
    <div class="word-no">{{ number + 1 }}.&nbsp;</div>
    <!-- <span :class="{ emphasize: wordInfo.isEmphasizeWord }">{{ wordInfo.word }}</span>
    <span>{{ wordInfo.type }}</span>
    <span :class="{ emphasize: wordInfo.isEmphasizeText }">{{ wordInfo.text }}</span> -->
    <span v-for="(item, index) in wordInfo.words" :key="index">
      <span class="" v-if="item.isExtra">&nbsp;→&nbsp;</span>
      <span :class="{ emphasize: item.isEmphasizeWord }">{{ item.spell }}</span>
      <span v-if="item.types?.length">
        <span v-for="(typeItem, tIndex) in item.types" :key="typeItem.type" >
          <template class="" v-if="tIndex">&nbsp;&</template>
          {{ typeItem.type === "vt." ? 'v.' : typeItem.type }}
          <span :class="{ emphasize: typeItem.isEmphasizeText }">{{ typeItem.text }}</span>
          <span v-if="typeItem.otherFormates?.length"
            ><span v-for="(formate, fIndex) in typeItem.otherFormates" :key="formate.type"
              >{{ `${fIndex === 0 ? ' (' : ''}${formate.type} `
              }}<span :class="{ emphasize: formate.isEmphasize }">{{ formate.spell }}</span>
              <span v-if="fIndex !== typeItem.otherFormates.length - 1">&nbsp;</span>
              <span v-if="fIndex === typeItem.otherFormates.length - 1">)&nbsp;</span>
            </span></span
          >
        </span>
      </span>
    </span>
    <span v-for="item in wordInfo.phrases" :key="item.spell">
      &nbsp;<span class="word-phrase" v-if="wordInfo.phrases?.length">(ph)</span>&nbsp;
      <span :class="{ emphasize: item.isEmphasizeText }" class="">{{ item.text }}&nbsp;</span>
      <span :class="{ emphasize: item.isEmphasizeWord }">{{ item.spell }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.word-item {
  // font-family: cursive;
  // margin-bottom: 6px;
  .mr4 {
    margin-right: 4px;
  }
  .ml4 {
    margin-left: 4px;
  }
  .word-no {
    // width: 20px;
    display: inline-block;
  }
  .emphasize {
    color: red;
    text-decoration: underline;
    // background: #f7f755;
  }
  .word-phrase {
    font-weight: 600;
    // padding: 0 4px;
  }
}
</style>
