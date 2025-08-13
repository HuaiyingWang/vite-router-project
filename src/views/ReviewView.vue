<template>
  <h1>複習</h1>

  <div>
    <input type="text" v-model="newName" placeholder="輸入新名稱" />
  </div>
  <br />

  <div>
    <input type="text" v-model="newNumber" placeholder="輸入新價格" />
  </div>
  <br />

  <div>你所新增的飲料及價格為 : {{ newName }} {{ newNumber }}</div>

  <br />

  <div>
    <button type="button" v-on:click="addProduct">新增到資料集裡面</button>
  </div>
  <br />

  <table>
    <thead>
      <tr>
        <th>標題</th>
        <th>價格</th>
        <th>調整價格</th>
        <th>刪除</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td><input type="text" v-model="item.price" /></td>
        <td>
          <button type="button" @click="delItem(item.id)">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>

  <h2>總價 : {{ sum }}</h2>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const newName = ref('')
const newNumber = ref(0)
const data = ref([])

const addProduct = () => {
  data.value.push({
    id: new Date().getTime(),
    name: newName.value,
    price: newNumber.value,
  })

  newName.value = ''
  newNumber.value = 0
}

const delItem = (id) => {
  // alert('delitem: ' + id)
  // data.value = data.value.filter((item) => item.id !== id)

  // 這兩行程式碼的作用是：找到 id 符合的第一個物件，並把它從陣列中刪掉一筆。
  const index = data.value.findIndex((item) => item.id === id)
  if (index !== 1) {
    data.value.splice(index, 1)
  }
}

// 第一次就載入 . 檢查是否有使用ref的方法再一起追蹤跟反饋
// ex : 購物車的即時動態更新加總數值
const sum = computed(() => {
  // console.log('sum' + data.value)
  let tempSum = 0
  data.value.forEach((item) => {
    tempSum += Number(item.price)
  })
  return tempSum
})

// 生命週期範例
onMounted(() => {
  // 外部資料
  setTimeout(() => {
    data.value = [
      { id: 1, name: '珍珠奶茶', price: 50 },
      { id: 2, name: '波霸奶茶', price: 50 },
      { id: 3, name: '烏龍奶茶', price: 50 },
      { id: 4, name: '厚切奶茶', price: 50 },
      { id: 5, name: '雙Q奶茶', price: 50 },
      { id: 6, name: '鍋燒意麵', price: 50 },
      { id: 7, name: '台灣清查', price: 50 },
      { id: 8, name: '條條奶茶', price: 50 },
    ]
  }, 500)
})

// Ajax : 請求資料且等回傳
// 逐行執行
// Axios
async function getData() {
  console.log('tesdt')
  const response = await axios.get('https://randomuser.me/api/')
  // 使用 axios 向 https://randomuser.me/api/ 發送 GET 請求
  // await 會「等待」伺服器回應後再往下執行
  // response 會是一個包含 API 回傳資料的物件
  console.log(response)
}

getData()
</script>

<style></style>
