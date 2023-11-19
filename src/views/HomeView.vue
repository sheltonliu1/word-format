<template>
  <div class="operation-btn">
    <a-button
      type="primary"
      style="margin-right: 10px"
      v-if="state.isEditing"
      @click="state.isEditing = true"
      >编辑</a-button
    >
    <a-button style="margin-right: 10px" v-else @click="state.isEditing = false">取消编辑</a-button>
    <a-button type="primary">打印预览</a-button>
  </div>
  <div style="padding: 20px">
    <div class="word-item" v-for="(item, index) in data[0].items" :key="item.word">
      <WordFormat :wordInfo="item" :number="index" />
    </div>
    <div class="add-word">
      <a-form layout="">
        <a-row v-for="(word, wIndex) in formState.words" :key="word.word">
          <a-col :span="12" style="display: flex">
            <a-form-item label="单词">
              <a-input v-model:value="word.word" style="width: 150px" />
            </a-form-item>
            <a-form-item label="类型">
              <a-select v-model:value="word.type" :options="typeOptions" style="width: 80px" />
            </a-form-item>
            <a-form-item label="释义">
              <a-input v-model:value="word.text" style="width: 150px" />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-row v-for="(formate, fIndex) in word.otherFormates" :key="formate.type">
              <a-form-item label="类型">
                <a-select
                  v-model:value="formate.type"
                  :options="formateTypeOptions"
                  style="width: 100px"
                />
              </a-form-item>
              <a-form-item label="单词">
                <a-input v-model:value="formate.word" style="width: 120px" />
              </a-form-item>
              <a-button @click="addFormate(word)" v-if="fIndex === word.otherFormates.length - 1"
                >添加形式</a-button
              >
            </a-row>
            <a-button @click="addFormate(word)" v-if="!word.otherFormates.length"
              >添加形式</a-button
            >
          </a-col>
          <a-col :span="2">
            <a-button @click="addWord" v-if="wIndex === formState.words.length - 1">添加词</a-button>
          </a-col>
        </a-row>
        <a-row v-for="(phrase, pIndex) in formState.phrases" :key="phrase.word">
          <a-form-item label="英文短语">
                <a-input v-model:value="phrase.word" style="width: 280px" />
              </a-form-item>
              <a-form-item label="释义">
                <a-input v-model:value="phrase.text" style="width: 280px" />
              </a-form-item>
              <a-button @click="addPhrase" v-if="pIndex === formState.phrases.length - 1"
                >添加短语</a-button
              >
        </a-row>
        <!-- <a-form-item label="引申含义">
          <div class="extra-sense-box" v-for="formate in word.otherFormates" :key="formate.type">
            <a-form-item label="单词">
              <a-input v-model:value="sense.word" />
            </a-form-item>
          </div>
          <a-button size="small" @click="addSense">添加</a-button>
        </a-form-item> -->
        <a-button @click="add">确认</a-button>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import WordFormat from '../components/WordFormat.vue'
import { data } from './data'
const state = reactive({
  isEditing: false
})

const formState = reactive({
  words: [
    {
      word: undefined,
      isEmphasizeWord: false,
      type: undefined,
      text: undefined,
      isEmphasizeText: false,
      otherFormates: [],
      isExtra: false
    }
  ],
  phrases: [
    {
      word: 'enable sb to do sth',
      isEmphasizeWord: false,
      text: '使某人能够做某事',
      isEmphasizeText: false
    }
  ]
})
const typeOptions = [
  { label: 'n.', value: 'n.' },
  { label: 'vt.', value: 'vt.' },
  { label: 'adj.', value: 'adj.' },
  { label: 'adv.', value: 'adv.' },
  { label: 'n.', value: 'n.' }
]
const formateTypeOptions = [
  { label: '过去式', value: '过去式' },
  { label: '过去分词', value: '过去分词' },
  { label: '复数', value: '复数' }
]
const addFormate = (word) => {
  // const emptyArr = formState.extraSense.filter(item => !item.word)
  // if (emptyArr.length) {
  //   message.info('需要先将现有条目填写完整，才可以新增')
  //   return
  // }
  word.otherFormates.push({
    type: undefined,
    word: undefined,
    isEmphasize: true
  })
}
const addWord = () => {
  // const emptyArr = formState.extraSense.filter(item => !item.word)
  // if (emptyArr.length) {
  //   message.info('需要先将现有条目填写完整，才可以新增')
  //   return
  // }
  formState.words.push({
    word: undefined,
    isEmphasizeWord: false,
    type: undefined,
    text: undefined,
    isEmphasizeText: false,
    otherFormates: [],
    isExtra: false
  })
}
const addPhrase = () => {
  // const emptyArr = formState.extraSense.filter(item => !item.word)
  // if (emptyArr.length) {
  //   message.info('需要先将现有条目填写完整，才可以新增')
  //   return
  // }
  formState.phrases.push({
    word: undefined,
    isEmphasizeWord: false,
    text: undefined,
    isEmphasizeText: false
  })
}
const add = () => {
  data.push(formState)
}
</script>

<style lang="scss" scoped>
.operation-btn {
  display: flex;
  padding: 20px;
}
.add-word {
  margin-top: 20px;
}
</style>
