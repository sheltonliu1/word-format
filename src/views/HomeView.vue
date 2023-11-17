<script setup>
import { reactive } from 'vue'
import { message } from 'ant-design-vue';
import WordFormat from '../components/WordFormat.vue'
import { data } from './data';
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
const formateTypeOptions = [
  { label: '过去式', value: '过去式' },
  { label: '过去分词', value: '过去分词' },
  { label: '复数', value: '复数' },
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
      <a-form  layout="">
        <a-row v-for="word in item.words" :key="word.word">
          <a-col :span="4">
            <a-form-item label="单词">
              <a-input v-model:value="word.word" />
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item label="类型">
              <a-select v-model:value="word.type" :options="typeOptions" style="width: 80px" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="释义">
              <a-input v-model:value="word.text" />
            </a-form-item>
          </a-col>
          <a-row v-for="formate in word.otherFormates" :key="formate.type">
            <a-col :span="2">
              <a-form-item label="类型">
                <a-select v-model:value="formate.type" :options="formateTypeOptions" style="width: 80px" />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item label="单词">
                <a-input v-model:value="formate.word" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-row>
        <!-- <a-form-item label="引申含义">
          <div class="extra-sense-box" v-for="formate in word.otherFormates" :key="formate.type">
            <a-form-item label="单词">
              <a-input v-model:value="sense.word" />
            </a-form-item>
          </div>
          <a-button size="small" @click="addSense">添加</a-button>
        </a-form-item> -->
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