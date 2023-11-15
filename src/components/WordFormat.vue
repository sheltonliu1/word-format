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
    <div class="word-no">{{ number + 1 }}.</div>
    <!-- <span :class="{ emphasize: wordInfo.isEmphasizeWord }">{{ wordInfo.word }}</span>
    <span>{{ wordInfo.type }}</span>
    <span :class="{ emphasize: wordInfo.isEmphasizeText }">{{ wordInfo.text }}</span> -->
    <span v-for="item in wordInfo.words" :key="item.word">
      <span class="mr4" v-if="item.isExtra">-></span>
      <span :class="{ emphasize: item.isEmphasizeWord, mr4: true }">{{ item.word }}</span>
      <span class="mr4">{{ item.type }}</span>
      <span :class="{ emphasize: item.isEmphasizeText }">{{ item.text }}</span>
      <span v-if="item.otherFormates?.length"
        ><span v-for="(format, index) in item.otherFormates" :key="format.type"
          >{{ `${index === 0 ? '(' : ''}${format.type} `
          }}<span :class="{ emphasize: format.isEmphasize }">{{ item.word }}</span>
          <span v-if="index === item.otherFormates.length - 1">)</span>
        </span></span
      >
    </span>
    <span class="word-phrase" v-if="wordInfo.phrases?.length">(ph)</span>
    <span v-for="item in wordInfo.phrases" :key="item.word">
      <span :class="{ emphasize: item.isEmphasizeText }">{{ item.text }}</span>
      <span :class="{ emphasize: item.isEmphasizeWord }">{{ item.word }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.word-item {
  // font-family: cursive;
  margin-bottom: 6px;
  .mr4 {
    margin-right: 4px;
  }
  .word-no {
    width: 20px;
    display: inline-block;
  }
  .emphasize {
    color: red;
    text-decoration: underline;
    background: #f7f755;
  }
  .word-phrase {
    font-weight: 600;
  }
}
</style>
