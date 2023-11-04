<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
const data = [
  {
    unitNo: 1,
    items: [
      {
        no: 1,
        word: 'abandon',
        isEmphasizeWord: true,
        sense: [
          {
            type: 'vt',
            text: '放弃；遗弃；抛弃',
            isEmphasize: false
          }
        ],
        extraSense: [
          {
            word: 'abandoned dogs',
            type: 'adj',
            text: '被遗弃的狗'
          }
        ],
        phrase: []
      },
      {
        no: 2,
        word: 'ability',
        sense: [
          {
            type: 'n',
            text: '能力，才能'
          }
        ],
        extraSense: [
          {
            word: 'able',
            type: 'a',
            text: '能够，有能力的'
          },
          {
            word: 'unable',
            type: 'adj',
            text: '不能的'
          },
          {
            word: 'diabled',
            type: 'adj',
            text: '残疾的'
          },
          {
            word: 'disability',
            type: 'n',
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
</script>

<template>
  <main>
    <div class="word-item" v-for="(item, index) in data[0].items">
      <span class="word-no">{{ index }}</span><span class="">{{item.word}}</span>
    </div>
  </main>
</template>
