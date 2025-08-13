<template>
  <h1>Level 1：串接課程 API，完成註冊、登入、驗證</h1>
  <h2>註冊功能</h2>

  <div class="mb-3 form-check">
    <input type="email" placeholder="Email" v-model="signupFild.email" class="form-control" />
  </div>
  <div class="mb-3 form-check">
    <input type="password" placeholder="密碼" v-model="signupFild.password" class="form-control" />
  </div>
  <div class="mb-3 form-check">
    <input type="text" placeholder="暱稱" v-model="signupFild.nickname" class="form-control" />
  </div>

  <!-- <br />
  {{ signupFild }} -->
  <br />

  <button type="button" @click="signup" class="btn btn-primary">註冊</button>
  <br />

  {{ signupRes }}
  <br /><br />

  <h2>登入功能</h2>
  <div class="mb-3 form-check">
    <input type="email" placeholder="Email" v-model="signInFild.email" class="form-control" />
    <br />
    <input type="password" placeholder="密碼" v-model="signInFild.password" class="form-control" />
  </div>
  <!-- <br />
  token : {{ signInRes }} -->
  <br />

  <button type="button" @click="signIn" class="btn btn-primary">登入</button>

  <br />

  <h2>驗證</h2>
  <div v-if="user.uid">
    <p>UID : {{ user.uid }}</p>
    <p>NickName : {{ user.nickname }}</p>
  </div>
  <div v-else>尚未登入!!</div>
  <br />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const api = 'https://todolist-api.hexschool.io/'

// 註冊
const signupFild = ref({
  email: '',
  password: '',
  nickname: '',
})

const signupRes = ref('')
const signup = async () => {
  // console.log(`${api}users/sign_up`)
  // const res = await axios.post(`${api}users/sign_up`, signupFild.value)
  // console.log(res)

  // 先把錯誤訊息印清楚，你就會知道是哪個欄位不過：
  try {
    const res = await axios.post(`${api}users/sign_up`, signupFild.value)
    console.log(res)
    signupRes.value = res.data.uid
  } catch (error) {
    console.error('❌ 註冊失敗', error.response?.data || error.message)
    alert(error.response?.data?.message || '註冊失敗')
  }
}

// 登入
const signInFild = ref({
  email: '',
  password: '',
})

const signInRes = ref('')
const signIn = async () => {
  // 先把錯誤訊息印清楚，你就會知道是哪個欄位不過：
  try {
    const res = await axios.post(`${api}users/sign_in`, signInFild.value)
    console.log(res)
    signInRes.value = res.data.token

    // 儲存永久登入的cookie 資訊
    document.cookie = `cumstomerTodoToken=${res.data.token}; path=/`
  } catch (error) {
    // Axios 的錯誤物件：error.response.data 會有後端回傳的提示
    console.error('❌ 登入失敗', error.response?.data || error.message)
    alert(error.response?.data?.message || '登入失敗')
  }
}

// 驗證
const user = ref({
  uid: '',
  nickname: '',
})

onMounted(async () => {
  // 驗證登入
  const token = document.cookie.replace(/(?:^|.*;\s*)cumstomerTodoToken\s*=\s*([^;]*).*$/i, '$1')
  // console.log(token)

  const res = await axios.get(`${api}users/checkout`, {
    headers: {
      Authorization: token,
    },
  })
  console.log(res)

  user.value = res.data
})
</script>

<style></style>
