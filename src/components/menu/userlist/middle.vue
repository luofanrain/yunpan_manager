<template>
  <div class="pageMiddle_detail">
    <div class="pageMiddle_main">
      <div class="pageMiddle_box">
        <div class="pageMiddle_title">
          {{ item.id ? config.label.update : config.label.create }}
          <i class="el-icon-close close_xxx" @click="closeInfo"></i>
        </div>
        <div class="box_pageMiddle">
          <div class="box_content">
            <div class="pageMiddle_row">
              <div class="pageMiddle_field pageMiddle_field_name">昵称</div>
              <div class="pageMiddle_value">
                <el-input
                  v-model.trim="data.Nickname"
                  placeholder="请输入昵称"
                ></el-input>
              </div>
            </div>
            <div class="pageMiddle_row">
              <div class="pageMiddle_field pageMiddle_field_name">密码</div>
              <div class="pageMiddle_value">
                <el-input
                  v-model.trim="data.Password"
                  placeholder="请输入密码"
                ></el-input>
              </div>
            </div>
            <div class="pageMiddle_row">
              <div class="pageMiddle_field pageMiddle_field_name">邮箱</div>
              <div class="pageMiddle_value">
                <el-input
                  v-model.trim="data.Email"
                  placeholder="请输入邮箱"
                ></el-input>
              </div>
            </div>
            <div class="pageMiddle_row">
              <div class="pageMiddle_field pageMiddle_field_name">姓名</div>
              <div class="pageMiddle_value">
                <el-input
                  v-model.trim="data.name"
                  placeholder="请输入姓名"
                ></el-input>
              </div>
            </div>
            <div class="pageMiddle_row">
              <div class="pageMiddle_field pageMiddle_field_name">生日</div>
              <div class="pageMiddle_value">
                <div class="block">
                  <el-date-picker
                    v-model="data.birthday"
                    value-format='yyyy-MM-dd'
                    type="date"
                    placeholder="选择生日">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="pageMiddle_row">
              <div class="pageMiddle_field pageMiddle_field_name">学校</div>
              <div class="pageMiddle_value">
                <el-input
                  v-model.trim="data.hospital"
                  placeholder="请输入学校"
                ></el-input>
              </div>
            </div>
            <div class="pageMiddle_row">
              <div class="pageMiddle_field pageMiddle_field_name">性别</div>
              <div class="pageMiddle_value">
                <el-select v-model="data.gender" placeholder="请选择">
                  <el-option label="男" value="0"> </el-option>
                  <el-option label="女" value="1"> </el-option>
                </el-select>
              </div>
            </div>
            <div class="pageMiddle_row pageMiddle_row_group">
              <el-button type="primary" @click="doCommit">{{
                 item.id ? config.label.update : config.label.create
              }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="pageMiddle_grayBg"></div>
    </div>
  </div>
</template>
<script>
import axios from "@/common/axios";
import config from "@/common/config";
import $ from "jquery";
import tips from "@/common/tips";
import urls from "@/common/urls";
export default {
  name: "pageMiddle",
  props: {
    item: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      data: {
        Nickname: "",
        Password: "",
        Email: "",
        Headimg: "",
        name: "",
        birthday: "",
        hospital: "",
        gender: "",
        disabled:""
      },
      config: {
        label: config.table.label,
      },
      loading: false,
    };
  },

  mounted() {
    if (this.item.id) {
      this.initData();
      return;
    }
  },
  methods: {
    initData() {
      this.data = { ...this.item };
    },
    closeInfo() {
      this.$emit("closeInfo");
    },
    inputCode() {
      this.data.count = this.data.count.replace(/\D/g, "").substr(0, 8);
    },
    formatData() {
      if (this.data.name === "") {
        tips.error(this,{ text: "请输入用户名" });
        return false;
      }
      return true;
    },
    doCommit() {
      if (this.loading || !this.formatData()) {
        return;
      }
      this.loading = true;
      console.log(1111111111111111111111111111)
      console.log(this.item)
      if (this.item.id) {
        this.update();
      } else {
        this.create();
      }
    },
    update() {
      let url = urls.userlist.update;
      axios.patch(url, this.data, (res) => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        if (res.errcode) return;
        tips.success(this,{ text: config.showTips.update });
        this.loading = true;
        this.$emit("closeInfo", true);
      });
    },
    create() {
      let url = urls.userlist.create;
      axios.post(url, this.data, (res) => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        if (res.errcode) return;
        tips.success(this,{ text: config.showTips.create });
        this.loading = true;
        this.$emit("closeInfo", true);
      });
    },
  },
};
</script>
<style>


</style>