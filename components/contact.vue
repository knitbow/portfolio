<template>
  <v-card>
    <v-container fluid>
      <v-card-title>
        Contact Form
      </v-card-title>
      <v-form name="contact" method="post" netlify @submit.prevent data-netlify="true">
        <v-card-text>
          <v-text-field
            v-show="false"
            v-model="title"
            name="form-name"
            value="contact"
          />
          <v-text-field
            v-model="name"
            label="お名前"
            name="name"
            dense
            outlined
            required
          />
          <v-text-field
            outlined
            dense
            name="email"
            v-model="email"
            label="メールアドレス"
            required
          />
          <v-text-field
            outlined
            dense
            v-model="company"
            name="company"
            label="会社名（法人の方のみ）"
          />
          <v-textarea
            outlined
            dense
            name="message"
            v-model="message"
            label="お問い合わせ内容"
            required
          />
          <v-btn :disabled="isEmpty" type="submit" color="primary" @click="submit" small>send message</v-btn>
        </v-card-text>
      </v-form>
    </v-container>
  </v-card>

</template>

<script>
    export default {
        name: 'Contact',
        data() {
            return {
                title: "contact",
                name: "",
                email: "",
                company: "",
                message: "",
                botfield: "bot",
            }
        },
        computed: {
            isEmpty() {
                return !(this.name !== '' &&
                    this.email !== '' &&
                    this.message !== '');
            }
        },
        methods: {
            async submit() {
                const params = new FormData()
                //以下、ダミーフォームの各フォーム要素のnameと合わせる
                params.append('form-name', 'contact')
                params.append('name', this.name)
                params.append('email', this.email)
                params.append('company', this.company)
                params.append('message', this.message)
                params.append('bot-field', this.botfield)

                const response = await this.$axios.$post(window.location.origin, params)
                //実際はresponseを使って画面側にフィードバックさせるが、ここでは仮にconsoleに出力
                console.log(response)
                this.$parent.$data.snackbar = true
            },
        },
    }
</script>

