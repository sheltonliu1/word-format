<script setup>
import { reactive } from 'vue'
import { message } from 'ant-design-vue';
import WordFormat from '../components/WordFormat.vue'
const data = [
  {
    unitNo: 1,
    items: [
      {
        no: 1,
        word: 'abandon',
        isEmphasizeWord: true,
        type: 'vt.',
        text: '放弃；遗弃；抛弃',
        isEmphasizeText: false,
        extraSense: [
          {
            word: 'abandoned dogs',
            isEmphasizeWord: false,
            type: 'adj.',
            text: '被遗弃的狗',
            isEmphasizeText: false,
          }
        ],
        phrase: []
      },
      {
        no: 2,
        word: 'ability',
        sense: [
          {
            type: 'n.',
            text: '能力，才能'
          }
        ],
        extraSense: [
          {
            word: 'able',
            type: 'a.',
            text: '能够，有能力的'
          },
          {
            word: 'unable',
            type: 'adj.',
            text: '不能的'
          },
          {
            word: 'diabled',
            type: 'adj.',
            text: '残疾的'
          },
          {
            word: 'disability',
            type: 'n.',
            text: '残疾'
          }
        ],
        phrase: [
          {
            text: '使某人能够做某事',
            phrase: 'enable sb to do sth'
          }
        ]
      }
    ]
  }
]
const state = reactive({
  isEditing: false,
})

const formState = reactive({
  word: '',
  isEmphasizeWord: false,
  type: '',
  text: '',
  isEmphasizeText: false,
  extraSense: [
  ],
  phrase: []
})
const typeOptions = [
  { label: 'n.', value: 'n.' },
  { label: 'vt.', value: 'vt.' },
  { label: 'adj.', value: 'adj.' },
  { label: 'adv.', value: 'adv.' },
  { label: 'n.', value: 'n.' },
]
const addSense = () => {
  const emptyArr = formState.extraSense.filter(item => !item.word)
  if (emptyArr.length) {
    message.info('需要先将现有条目填写完整，才可以新增')
    return
  }
  formState.extraSense.push({
    word: '',
    isEmphasizeWord: false,
    type: '',
    text: '',
    isEmphasizeText: false,
  })
}
</script>

<template>
  <div class="operation-btn">
    <a-button type="primary" style="margin-right: 10px" v-if="state.isEditing" @click="state.isEditing = true">编辑</a-button>
    <a-button style="margin-right: 10px" v-else @click="state.isEditing = false">取消编辑</a-button>
    <a-button type="primary">打印预览</a-button>
  </div>
  <div style="padding: 20px">
    <div class="word-item" v-for="(item, index) in data[0].items" :key="item.word">
      <WordFormat :wordInfo="item" :number="index"/>
    </div>
    <div class="add-word">
      <a-form :labelCol="{ span: 1 }" :wrapperCol="{ span: 9 }">
        <a-form-item label="单词">
          <a-input v-model:value="formState.word" />
        </a-form-item>
        <a-form-item label="类型">
          <a-select v-model:value="formState.type" :options="typeOptions" />
        </a-form-item>
        <a-form-item label="释义">
          <a-input v-model:value="formState.text" />
        </a-form-item>
        <a-form-item label="引申含义">
          <div class="extra-sense-box" v-for="sense in formState.extraSense" :key="sense.word">
            <a-form-item label="单词">
              <a-input v-model:value="sense.word" />
            </a-form-item>
          </div>
          <a-button size="small" @click="addSense">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.operation-btn{
  display: flex;
  padding: 20px;
}
.add-word {
  margin-top: 20px;
}
</style>