<template>
  <v-card>
    <v-container fluid>
      <v-card-title>
        Contact Form
      </v-card-title>
      <v-card-text>
        <v-form method="post" netlify @submit.prevent>
          <v-text-field
            v-show="false"
            v-model="title"
            name="form-name"
          />
          <v-text-field
            v-model="name"
            label="お名前"
            dense
            outlined
            required
          />
          <v-text-field
            outlined
            dense
            v-model="email"
            label="メールアドレス"
            required
          />
          <v-text-field
            outlined
            dense
            v-model="company"
            label="会社名（法人の方のみ）"
          />
          <v-textarea
            outlined
            dense
            v-model="message"
            label="お問い合わせ内容"
            required
          />
          <v-btn :disabled="isEmpty" type="submit" color="primary" @click="submit" small>send message</v-btn>
        </v-form>
      </v-card-text>
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
                this.$parent.$data.snackbar = true
            },
        },
    }
</script>
