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
    <span :class="{ emphasize: wordInfo.isEmphasizeWord }">{{ wordInfo.word }}</span>
    <span>{{ wordInfo.type }}</span>
    <span :class="{ emphasize: wordInfo.isEmphasizeText }">{{ wordInfo.text }}</span>
    <span v-for="sense in wordInfo.extraSense" :key="sense.word">
      ->
      <span :class="{ emphasize: sense.isEmphasizeWord }">{{ sense.word }}</span>
      <span>{{ sense.type }}</span>
      <span :class="{ emphasize: sense.isEmphasizeText }">{{ sense.text }}</span>
    </span> 
    <span class="word-phrase" v-if="wordInfo.phrase.length">(ph)</span>
    <span v-for="item in wordInfo.phrase" :key="item.phrase">
      ->
      <span :class="{ emphasize: item.isEmphasizeText }">{{ item.text }}</span>
      <span :class="{ emphasize: item.isEmphasizeWord }">{{ item.phrase }}</span>
    </span> 
  </div>
</template>

<style lang="scss" scoped>
.word-item {
  // font-family: cursive;
  margin-bottom: 6px;
  span {
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
