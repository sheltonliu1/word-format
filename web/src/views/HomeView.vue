<template>
  <div class="main-content">
    <div class="operation-btn" v-if="state.isEditing">
      <a-button
        type="primary"
        style="margin-right: 10px"
        v-if="false"
        @click="state.isEditing = true"
        >编辑</a-button
      >
      <!-- <a-button style="margin-right: 10px"  >取消编辑</a-button> -->
      <a-button type="primary" v-if="state.isEditing" @click="state.isEditing = false" style="margin-right: 10px">打印预览</a-button>
      <a-button type="primary" v-if="state.isEditing" @click="downloadData" style="margin-right: 10px">导出数据</a-button>
      <a-popconfirm
        v-if="state.isEditing" 
        title="导入数据会覆盖当前数据，建议先导出数据进行备份。"
        ok-text="继续导入"
        cancel-text="取消"
        @confirm="importData"
      >
        <a-button type="primary">导入数据</a-button>
      </a-popconfirm>
    </div>
    <a-menu v-model:selectedKeys="state.currentUnit" mode="horizontal" @select="chooseUnit" v-if="state.isEditing">
      <a-menu-item v-for="unit in unitArr" :key="unit">
        {{ unit }}
      </a-menu-item>
    </a-menu>
    <div style="padding: 20px; padding-bottom: 100px" v-if="state.isEditing">
      <div class="word-item-wrap" v-for="(item, index) in allWordData" :key="item.word">
        <WordFormate :wordInfo="item" :number="index" />
        <div class="item-btns" v-if="state.isEditing">
          <a @click="editItem(index, item)" v-if="!(state.editIndex === -1 && index === allWordData.length - 1)" href="javascript:;">编辑</a>
          <a-popconfirm
            v-if="!(state.editIndex === -1 && index === allWordData.length - 1)"
            title="确定删除么？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="delItem(item, state.data[0].items, true)"
          >
            <a class="danger" href="javascript:;">删除</a>
          </a-popconfirm>
          
        </div>
      </div>
      <div class="add-form-box">
        <a-form layout="">
          <div class="word-box-wrap bkg-gray" v-for="(word, wIndex) in formState.words" :key="word.word">
            <div class="word-upper">
              <div class="word-self">
                <a-form-item label="单词">
                  <a-input v-model:value="word.spell" style="width: 150px" />
                </a-form-item>
                <a-form-item label="强调单词">
                  <a-checkbox v-model:checked="word.isEmphasizeWord" style="width: 20px" />
                </a-form-item>
                <div class="word-type-wrapper">
                  <div class="word-type bkg-gray" v-for="(typeItem, tIndex) in word.types" :key="tIndex">
                    <div class="word-type-self">
                      <a-form-item label="类型">
                        <a-select v-model:value="typeItem.type" :options="typeOptions" style="width: 80px" />
                      </a-form-item>
                      <a-form-item label="释义">
                        <a-input v-model:value="typeItem.text" style="width: 150px" />
                      </a-form-item>
                      <a-form-item label="强调释义">
                        <a-checkbox v-model:checked="typeItem.isEmphasizeText" style="width: 20px" />
                      </a-form-item>
                      <a-button @click="addFormate(typeItem)" v-if="!typeItem.otherFormates.length" type="link"
                        >添加形式</a-button
                      > 
                      <a-button @click="delItem(typeItem, word.types)" v-if="tIndex" type="link" danger
                        >删除</a-button
                      >
                      <a-button @click="addType(word)" v-if="tIndex === word.types.length - 1" type="link"
                        >添加单词类型</a-button
                      >
                    </div>
                    <div class="word-formates">
                      <div class="word-formate-item" v-for="(formate, fIndex) in typeItem.otherFormates" :key="formate.type">
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
                        <a-button @click="delItem(formate, typeItem.otherFormates)" type="link" danger
                          >删除</a-button
                        >
                        <a-button @click="addFormate(typeItem)" v-if="fIndex === typeItem.otherFormates.length - 1" type="link"
                          >添加形式</a-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add-word">
                <a-button @click="delItem(word, formState.words)" v-if="formState.words.length > 1" type="link" danger>删除</a-button>
                <a-button @click="addType(word)" v-if="!word.types.length" type="link"
                  >添加类型</a-button
                >
                <a-button @click="addWord" v-if="wIndex === formState.words.length - 1" type="link">添加引申词</a-button>
              </div>
            </div>
          </div>
          <div class="">
            <a-button @click="addPhrase" v-if="!formState.phrases.length" type="link">添加短语</a-button>
          </div>
          <div class="phase-box-wrap  bkg-gray" v-for="(phrase, pIndex) in formState.phrases" :key="phrase.word">
            <a-form-item label="英文短语">
              <a-input v-model:value="phrase.spell" style="width: 280px" />
            </a-form-item>
            <a-form-item label="强调英文">
              <a-checkbox v-model:checked="phrase.isEmphasizeWord" style="width: 20px" />
            </a-form-item>
            <a-form-item label="释义">
              <a-input v-model:value="phrase.text" style="width: 280px" />
            </a-form-item>
            <a-form-item label="强调释义">
              <a-checkbox v-model:checked="phrase.isEmphasizeText" style="width: 20px" />
            </a-form-item>
              <a-button @click="delItem(phrase, formState.phrases)" type="link" danger
                >删除</a-button
              >
            <a-button @click="addPhrase" v-if="pIndex === formState.phrases.length - 1" type="link"
              >添加短语</a-button
            >
          </div>
          <!-- <a-form-item label="引申含义">
            <div class="extra-sense-box" v-for="formate in word.otherFormates" :key="formate.type">
              <a-form-item label="单词">
                <a-input v-model:value="sense.word" />
              </a-form-item>
            </div>
            <a-button size="small" @click="addSense">添加</a-button>
          </a-form-item> -->
          <div class="operations">
            <a-button @click="addItem" type="primary" v-if="state.editIndex === -1">添加</a-button>
            <a-button @click="saveEditItem" type="primary" v-else>保存</a-button>
          </div>
        </a-form>
      </div>
    </div>
    <div v-else>
      <div class="unit-box-wrap" v-for="unitData in state.allData" :key="unitData.unit">
        <div class="unit-no">Day {{unitData.unit}}</div>
        <div class="word-item-wrap" v-for="(item, index) in unitData.items" :key="item.word">
          <WordFormate :wordInfo="item" :number="index" />
          <div class="item-btns" v-if="state.isEditing">
            <a @click="editItem(index, item)" v-if="!(state.editIndex === -1 && index === allWordData.length - 1)" href="javascript:;">编辑</a>
            <a-popconfirm
              v-if="!(state.editIndex === -1 && index === allWordData.length - 1)"
              title="确定删除么？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="delItem(item, state.data[0].items, true)"
            >
              <a class="danger" href="javascript:;">删除</a>
            </a-popconfirm>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive, toRaw, ref } from 'vue'
import { message } from 'ant-design-vue'
import WordFormate from '../components/WordFormate.vue'
// import { data } from './data'

const state = reactive({
  isEditing: true,
  editIndex: -1,
  data: [{items: []}],
  currentUnit: [28],
  allData: [],
})

const unitArr = new Array(15);
for(var i=0;i<unitArr.length;i++){
  unitArr[i] = i + 28;
}

const dataKey = computed(() => {
  return `word-data-${state.currentUnit[0]}`
})

const getUnitData = () => {
  const dataStr = localStorage.getItem(dataKey.value);
  if(dataStr) {
    state.data = JSON.parse(dataStr)
  } else {
    state.data = [{items: []}];
  }
}

const getAllData = () => {
  for(let unit of unitArr) {
    const dataStr = localStorage.getItem(`word-data-${unit}`);
    if(dataStr) {
      const unitData = JSON.parse(dataStr);
      state.allData.push({
        unit,
        items: unitData[0].items
      })
    }
  }
}

const initData = () => {
  getUnitData()
  getAllData();
}

initData();

const downloadData = () => {
  let link = document.createElement('a')
  link.download = 'words.json'
  link.href = 'data:text/plain,' + JSON.stringify(state.allData);
  link.click()
}

const importData = () => {
  // 创建一个file input
  let input = document.createElement('input')
  input.type = 'file'

  // 绑定onchange事件
  input.onchange = (event) => {
    let files = event.target.files
    if (!files || !files.length) {
      input = null
      throw new Error('No files')
    }

    // 当选择文件后，使用FileReader API读取文件，返回数据
    let reader = new FileReader()
    reader.onload = (event) => {
      try {
        let dataArr = JSON.parse(event.target.result)
        for(let dataItem of dataArr) {
          localStorage.setItem(`word-data-${dataItem.unit}`, JSON.stringify([{items: dataItem.items}]));
        }
        // TODO 不存在的unit要不要删除localStorage
        initData();
        message.success("导入成功");
      } catch (e) {
        throw new Error(e)
      }
    }
    reader.readAsText(files[0])
  }

  // 触发上传文件
  input.click()
}

const chooseUnit = ({ key }) => {
  state.currentUnit = [key];
  getUnitData()
}

const allWordData = computed(() => {
  if (state.editIndex !== -1 || !state.isEditing) {
    return state.data[0].items;
  }
  return state.data[0].items.concat(formState.value)
})
const emptyItem = {
  words: [
    {
      spell: undefined,
      isEmphasizeWord: false,
      types: [
        {
          type: undefined,
          text: undefined,
          isEmphasizeText: false,
          otherFormates: [],
        }
      ],
      isExtra: false
    }
  ],
  phrases: [
  ]
}

const newEmptyWord = () => {
  return JSON.parse(JSON.stringify(emptyItem));
}
const formState = ref(newEmptyWord())
const typeOptions = [
  { label: 'n.', value: 'n.' },
  { label: 'vt.', value: 'vt.' },
  { label: 'adj.', value: 'adj.' },
  { label: 'adv.', value: 'adv.' },
  { label: 'prep.', value: 'prep.' },
  { label: 'pron.', value: 'pron.' },
  { label: 'conj.', value: 'conj.' }
]
const formateTypeOptions = [
  { label: '过去式', value: '过去式' },
  { label: '过去分词', value: '过去分词' },
  { label: '现在分词', value: '现在分词' },
  { label: '复数', value: '复数' },
  { label: '比较级', value: '比较级' },
  { label: '最高级', value: '最高级' },
  { label: '反义词', value: '反义词' }
]
const addFormate = (item) => {
  item.otherFormates.push({
    type: undefined,
    spell: undefined,
    isEmphasize: true
  })
}
const addType = (word) => {
  word.types.push({
    type: undefined,
    text: '',
    isEmphasizeText: false,
    otherFormates: [
    ],
  })
}
const delItem = (word, arr, isNeedSave = false) => {
  const index = arr.indexOf(word);
  arr.splice(index, 1)
  if(isNeedSave) {
    localStorage.setItem(dataKey.value, JSON.stringify(state.data))
  }
}
const addWord = () => {
  // const emptyArr = formState.extraSense.filter(item => !item.word)
  // if (emptyArr.length) {
  //   message.info('需要先将现有条目填写完整，才可以新增')
  //   return
  // }
  formState.value.words.push({
    spell: undefined,
    isEmphasizeWord: false,
    types: [{
      type: undefined,
      text: '',
      isEmphasizeText: false,
      otherFormates: [
      ],
    }],
    isExtra: true
  })
}
const addPhrase = () => {
  // const emptyArr = formState.extraSense.filter(item => !item.word)
  // if (emptyArr.length) {
  //   message.info('需要先将现有条目填写完整，才可以新增')
  //   return
  // }
  formState.value.phrases.push({
    spell: undefined,
    isEmphasizeWord: false,
    text: undefined,
    isEmphasizeText: false
  })
}
const addItem = () => {
  state.data[0].items.push(toRaw(formState.value))
  formState.value = newEmptyWord();
  localStorage.setItem(dataKey.value, JSON.stringify(state.data))
}
const editItem = (index, item) => {
  state.editIndex = index;
  formState.value = item;
  // state.data.splice(index, 1, item);
}
const saveEditItem = () => {
  formState.value = newEmptyWord();
  state.editIndex = -1;
  localStorage.setItem(dataKey.value, JSON.stringify(state.data))
}
</script>

<style lang="scss" scoped>
.main-content {
  padding: 10px;
}
.operation-btn {
  display: flex;
  padding: 20px;
}
.word-item-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  .item-btns {
    margin-left: 20px;
    a {
      text-decoration: unset;
      margin-left: 5px;
    }
  }
}
.danger {
  color: #ff4d4f;
}
.unit-box-wrap {
  margin-bottom: 50px;
  .unit-no {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
}
.add-form-box {
  :deep(.ant-form-item) {
    margin: 5px 5px;
  }
  margin-top: 20px;
  .bkg-gray {
    background-color: #0000000d;
  }
  .word-box-wrap {
    padding: 5px;
    margin-bottom: 10px;
    .word-upper {
      display: flex;
      justify-content: start;
      align-items: center;
      .word-self {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .word-type {
          margin-bottom: 5px;
          .word-type-self{
            display: flex;
            align-items: center;
          }
        }
      }
      .word-formates {
        margin-left: 20px;
        .word-formate-item{
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .phase-box-wrap {
    padding: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .operations {
    margin-bottom: 10px;
  }
}
</style>
