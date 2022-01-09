<template>
 <Form :model="formState" ref="formRef" layout="vertical"  :label-col="labelCol"  :rules="rules" style="width: 380px;">
      <FormItem label="昵称" name="nickname" >
            <Input v-model:value="formState.nickname" placeholder="请输入昵称" />
        </FormItem>
        <FormItem label="邮箱" name="email">
            <Input v-model:value="formState.email"    placeholder="请输入邮箱" />
        </FormItem>
         <FormItem label="联系电话" name="phone">
            <Input v-model:value="formState.phone" :maxlength="11"  placeholder="请输入联系电话" />
        </FormItem>

        <FormItem label="联系地址" name="address">
            <Textarea v-model:value="formState.address"  :rows="4"  placeholder="请输入联系地址" />
        </FormItem>

        <FormItem>
            <Button type="primary" @click="onSubmit">更新基本信息</Button>
        </FormItem>
 </Form>
</template>
<script lang="ts">
import { defineComponent, reactive, UnwrapRef, ref, toRaw } from "vue";
import { Form,Input,Button } from "ant-design-vue";
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

interface FormState {
    nickname: string;
    email: string;
    phone: string;
    address:string;
}

export default defineComponent({
    name: "Basic",
    components: {Form,  FormItem: Form.Item, Input, Button, Textarea: Input.TextArea},
    setup() {
        const formRef = ref(); 
        const formState: UnwrapRef<FormState> = reactive({
            nickname: '',
            email: '',
            phone: '',
            address: ''
        });

         const rules = {
            nickname: [
                { required: true, message: '请输入昵称', trigger: 'blur' },
            ],
            email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
            ],
        }
         const onSubmit = () => {
            formRef.value.validate().then(() => {
                console.log('values', formState, toRaw(formState));

            }) .catch((error: ValidateErrorEntity<FormState>) => {
                console.log('error', error);
            });
        };


        return {
            rules,
            formRef,
            formState,
            labelCol: { span: 4},
            onSubmit,
        }
    }
})
</script>