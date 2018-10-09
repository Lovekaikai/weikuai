<template>
  <div>
    <group>
      <x-input title="用户名" v-model="username"></x-input>
    </group>
    <group>
      <x-input title="密码" type="password" v-model="password"></x-input>
    </group>
    <div style="padding:15px">
      <x-button @click.native="login()" type="primary" :disabled="isLoading">登录</x-button>
    </div>
  </div>
</template>
<script>
import { Group, XButton, XInput } from 'vux'
import validate from 'assets/js/validate'
import base64 from 'assets/js/base64'
import utf8 from 'assets/js/utf8'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const fields = this.getFields()
      const result = validate.validateForm(fields)
      if (result) {
        const params = {
          username: this.username,
          password: base64.encode((utf8.encode(this.password)))
        }
        this.submitForm(params)
      }
    },
    getFields() {
      return [{
          type: 'require',
          title: '用户名',
          value: this.username
        }, {
          type: 'require',
          title: '密码',
          value: this.password
        }]
    },
    submitForm(params) {
      this.goAjax('post', 'admin/base/login', params).then((res) => {
        if (res.token) {
          this.handleSuccess(res)
        }
      }).catch((err) => {
        console.log('err = ', err)
      })
    },
    handleSuccess(res) {
      _g.setLoginResult(res)
      setTimeout(() => {
        router.push({ name: 'self' })
      }, 200)
    },
  },
  computed: {
    isLoading() {
      return store.state.loading.show
    }
  },
  components: {
    XInput,
    XButton,
    Group
  }
}
</script>
