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
    <div class="word-item" v-for="(item, index) in allData" :key="item.word">
      <WordFormate :wordInfo="item" :number="index" />
    </div>
    <div class="add-form-box">
      <a-form layout="">
        <div class="word-box-wrap" v-for="(word, wIndex) in formState.words" :key="word.word">
          <div class="word-upper">
            <div class="word-self">
              <a-form-item label="单词">
                <a-input v-model:value="word.spell" style="width: 150px" />
              </a-form-item>
              <a-form-item label="强调单词">
                <a-radio v-model:checked="word.isEmphasizeWord" style="width: 20px" />
              </a-form-item>
              <a-form-item label="类型">
                <a-select v-model:value="word.type" :options="typeOptions" style="width: 80px" />
              </a-form-item>
              <a-form-item label="释义">
                <a-input v-model:value="word.text" style="width: 150px" />
              </a-form-item>
              <a-form-item label="强调释义">
                <a-radio v-model:checked="word.isEmphasizeText" style="width: 20px" />
              </a-form-item>
            </div>
            <div class="add-word">
              <a-button @click="delItem(word, formState.words)" v-if="formState.words.length > 1" type="link" danger>删除</a-button>
              <a-button @click="addWord" v-if="wIndex === formState.words.length - 1" type="link">添加引申词</a-button>
              <a-button @click="addFormate(word)" v-if="!word.otherFormates.length && wIndex === formState.words.length - 1" type="link"
                >添加单词形式</a-button
              >
              <a-button @click="addPhrase" v-if="!formState.phrases.length && wIndex === formState.words.length - 1" type="link">添加短语</a-button>
            </div>
          </div>
          <div class="word-bottom">
            <div class="word-formates">
              <a-row v-for="(formate, fIndex) in word.otherFormates" :key="formate.type">
                <a-form-item label="其他形式">
                  <a-select
                    v-model:value="formate.type"
                    :options="formateTypeOptions"
                    style="width: 100px"
                  />
                </a-form-item>
                <a-form-item label="单词">
                  <a-input v-model:value="formate.spell" style="width: 120px" />
                </a-form-item>
                <a-button @click="delItem(formate, word.otherFormates)" type="link" danger
                  >删除</a-button
                >
                <a-button @click="addFormate(word)" v-if="fIndex === word.otherFormates.length - 1" type="link"
                  >添加形式</a-button
                >
              </a-row>
            </div>
          </div>
        </div>
        <a-row v-for="(phrase, pIndex) in formState.phrases" :key="phrase.word">
          <a-form-item label="英文短语">
                <a-input v-model:value="phrase.spell" style="width: 280px" />
              </a-form-item>
              <a-form-item label="释义">
                <a-input v-model:value="phrase.text" style="width: 280px" />
              </a-form-item>
              <a-form-item label="强调短语">
                <a-radio v-model:checked="phrase.isEmphasizeWord" style="width: 20px" />
              </a-form-item>
                <a-button @click="delItem(phrase, formState.phrases)" type="link" danger
                  >删除</a-button
                >
              <a-button @click="addPhrase" v-if="pIndex === formState.phrases.length - 1" type="link"
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
        <a-button @click="add" type="primary">确认</a-button>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive } from 'vue'
import { message } from 'ant-design-vue'
import WordFormate from '../components/WordFormate.vue'
import { data } from './data'
const state = reactive({
  isEditing: false
})
const allData = computed(() => {
  return data[0].items.concat(formState)
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
  word.otherFormates.push({
    type: undefined,
    spell: undefined,
    isEmphasize: true
  })
}
const delItem = (word, arr) => {
  const index = arr.indexOf(word);
  arr.splice(index, 1)
}
const addWord = () => {
  // const emptyArr = formState.extraSense.filter(item => !item.word)
  // if (emptyArr.length) {
  //   message.info('需要先将现有条目填写完整，才可以新增')
  //   return
  // }
  formState.words.push({
    spell: undefined,
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
    spell: undefined,
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
.add-form-box {
  :deep(.ant-form-item) {
    // margin-right: 8px;
    margin: 5px 4px;
  }
  margin-top: 20px;
  .word-box-wrap {
    background-color: #0000000d;
    margin-bottom: 10px;
    .word-upper {
      display: flex;
      justify-content: start;
      align-items: center;
      .word-self {
        display: flex;
        justify-content: space-between;
      }
    }
    .word-bottom {
      .word-formates {
        background-color: #0000000d;
        margin-left: 30px;
      }
    }
  }
}
</style>
