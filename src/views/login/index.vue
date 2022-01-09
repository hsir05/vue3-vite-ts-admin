<template>
    <div class="login">
        <div class="login-box">
            <div class="img-wrap">
                <img src="../../assets/login_img.png" alt="">
            </div>
            <div class="login-wrap">
                <span>欢迎登录</span>
                <h3 class="login-logo-title"> <span>业务管理平台</span></h3>
                <Form :model="formState" layout="vertical"  ref="formRef" :rules="rules">
                    <FormItem label="账号" name="account">
                        <Input v-model:value="formState.account" placeholder="请输入账号" size="large">
                            <template #prefix>
                                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </Input>
                    </FormItem>
                    <FormItem label="密码" name="password">
                        <Input v-model:value="formState.password" type="password" size="large"   placeholder="请输入密码">
                            <template #prefix>
                                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </Input>
                    </FormItem>

                     <FormItem >
                        <Checkbox v-model:checked="rememberMe" size="small"> 记住密码  </Checkbox>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="onSubmit" :loading="loading" size="large" style="width:100%">登录</Button>
                    </FormItem>
                </Form>
                <!-- <Divider> 其他登录方式 </Divider> 
                <div class="other">
                    <Space :size="10">
                        <div class="other-img-wrap"><img src="../../assets/wechat.png" alt=""></div>
                        <div class="other-img-wrap" style="width: 26px;"><img src="../../assets/qq.png" alt=""></div>
                    </Space>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, UnwrapRef, ref,unref, toRaw } from "vue";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Form,Divider, Input,Button, Space, Checkbox, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

import { locStorage } from "@/utils/Storage";
import { ACCESS_TOKEN } from "@/config/config";

interface FormState {
    account: string;
    password: string;
}
export default defineComponent({
    name: "Login",
    components: {
        UserOutlined,
        LockOutlined,
        Form, FormItem: Form.Item, Space, Checkbox, Input, Button, Divider
    },
    setup() {
        const formRef = ref(); 
        const router = useRouter();
        const { currentRoute } = useRouter()
        const rememberMe = ref(false)
        const loading = ref(false)
        const formState: UnwrapRef<FormState> = reactive({
            account: '',
            password: '',
        });
        const rules = {
            account: [
                { required: true, message: '请输入帐号', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
        }
         const onSubmit = () => {
            formRef.value.validate().then(() => {
                loading.value = true
                console.log('values', formState, toRaw(formState));

                setTimeout(() => {
                    message.success('登录成功！');
                }, 800);
                const { query } = unref(currentRoute)
                
                setTimeout(() => {
                    locStorage.set(ACCESS_TOKEN, '123123qweqweqwe123e1se12e1s112we12ds')
                    if (query.redirect) {
                        router.replace(query.redirect as string)
                    } else {
                        router.replace('/dashboard/welcome')
                    }
                    loading.value = false
                }, 1000);
            }) .catch((error: ValidateErrorEntity<FormState>) => {
                console.log('error', error);
                loading.value = false
            });
        };
        return {
            rules,
            formRef,
            formState,
            rememberMe,
            onSubmit,
            loading,
            
        };
    },
});
</script>
<style lang="less">
.login {
    background-color: #fff;
    height: 100%;
    width: 100%;
    background: url('../../assets/bg.jpg') center 100%;
    position: relative;
    .login-box{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 45%;
        left: 48%;
        transform: translate(-50%, -50%);
    }
    .img-wrap{
        width: 600px;
        img{
            width: 100%;
        }
    }
    .login-wrap{
        border-radius: 8px;
        width: 380px;
        background-color: @white;
        padding: 20px 40px;
    }
    .other{
        width: 60px;
        display: flex;
        margin: 0 auto;
        img{
            width: 100%;
        }
    }
    .login-logo-title{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 22px;
        padding: 10px 0;
        font-weight: 500;
        color: #3f9eff;
        margin-bottom: 0;
    }
    .logo{
        width: 50px;
        margin-right: 10px;
    }
    
}
</style>