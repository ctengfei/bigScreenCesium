<template>
  <!--home页面-->
  <div id="login" class="loginP" v-loading="loading">
    <div
      class="login"
      :style="`width:${width};height:${height};left:${top};transform:scale(${scaleX})`"
    >
    <div class="login-box">
      <div class="login-top">
        <img src="../../assets/logo.png"/>
        <span>数字孪生王英水库信息化管理平台</span>
      </div>
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix><img  class="el-input__icon input-icon" src="../../assets/images/name.png"/></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix><img  class="el-input__icon input-icon" src="../../assets/images/password.png"/></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix><img  class="el-input__icon input-icon" src="../../assets/images/yanzheng.png"/></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width:100%;"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        
      </el-form-item>
    </el-form>
    </div>
      
    </div>
  </div>
</template>

<script>
import {} from "../../utils/tools";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { setToken } from '@/utils/auth'
export default {
  data() {
    return {
      loading: false,
      token: "",
      width: "3840px", //设计稿宽
      height: "1080px", //设计稿高
      top: "0px",
      scaleX: 1, //默认缩放比例
      loginForm : {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
     loginRules : {
        username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      captchaEnabled:true,//是否开启验证码
      codeUrl:'',//验证码图片
    };
  },
  components: {
  },
  computed: {},
  beforeDestroy() {
    let that = this;
  },
  watch: {},
  mounted() {
    let that = this;
    that.setScale();
    //动态监听窗口缩放
    window.addEventListener("resize", () => {
      that.setScale();
    });
    this.getCode()
  },
  beforeDestory() {
  },
  methods: {
    setScale() {
      //获取浏览器与设计稿的宽高比例
      let that = this;
      const dom = document.querySelector("#app");
      that.$nextTick(() => {
        let width = dom.clientWidth;
        let hight = dom.clientHeight;
        // let scaleX = hight / 1350;
        // that.scaleX = scaleX;
        // let top = (width - 3840 * that.scaleX) / 2
        // that.top = top + 'px'
        // localStorage.setItem("scaleX", scaleX);
        let myscaleX = width / 3840;
        that.scaleX = myscaleX;
        localStorage.setItem("scaleX", myscaleX);

        // 获取所有类名为  trans-common 的元素，设置 transform 属性
        let selectorAll = document.querySelectorAll(".transCommon");
        for (let i = 0; i < selectorAll.length; i++) {
          selectorAll[i].style =
            "transform: scale(" + that.scaleX + ") !important; ";
        }
      });
    },
    handleLogin() {
      this.$refs.loginRef.validate(valid => {
        if (valid) {
          this.loading = true;
          // 调用登录方法
          let username = this.loginForm.username.trim()
          let password = this.loginForm.password
          let code = this.loginForm.code
          let uuid = this.loginForm.uuid
          //密码加密
          this.$api.login.login(username,encrypt(password),code,uuid).then((res) => {
          // this.$api.login.login(username,password,code,uuid).then((res) => {
            let data = res.data
              setToken(data.access_token)
              this.$router.replace("/gqjc");
            
          }).catch(() => {
            this.loading = false;
            // 重新获取验证码
            if (this.captchaEnabled) {
              this.getCode();
            }
          });
        }
      });
    },
    //获取验证码
    getCode(){
      this.$api.login.getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled ) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
  },
};
</script>

<style lang="less">
@import "index.less";
</style>
