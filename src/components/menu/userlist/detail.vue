<template>
  <div class="pageDetail_container messages_detail_container">
    <div class="pageDetail_main">
      <div class="pageDetail_box pageDetail_box_messages">
        <div class="pageDetail_title">
          留言详情
          <i class="el-icon-close close_xxx" @click="closeInfo"></i>
        </div>
        <div class="pageDetail_content_messages">
          <div class="pageDetail_right_messages">
            <div class="pageDetail_chat_messages">
              <div class="pageDetail_chat_list_messages" ref="chatlist">
                <div
                  class="pageDetail_chat_block_messages"
                  v-for="(val, index) in chatList"
                  :key="index"
                  :class="`pageDdetail_chat_${
                    getIsSelf(val) ? 'mine' : 'other'
                  }`"
                >
                  <div class="pageDetail_chat_block">
                    <div class="pageDetail_chat_name">
                      {{ getShowName(val) }}
                    </div>
                    <div class="pageDetail_chat_text">{{ val.content }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pageDetail_chat_msg">
              <div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入回复内容"
                  v-model="replyItem.content"
                >
                </el-input>
              </div>
              <div>
                <el-button type="primary" size="mini" @click="sendMsg"
                  >发送</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pageDetail_grayBg"></div>
    </div>
  </div>
</template>
<script>
import axios from "@/common/axios";
import urls from "@/common/urls";
import config from "@/common/config";
import tool from "@/common/tool";
import tips from "@/common/tips";
export default {
  name: "coursewareDetail",
  props: {
    item: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  created() {
    this.loadChat();
  },
  data() {
    return {
      dict: config.table.messages,
      data: {},
      replyItem: {
        from_user:1,
        to_user:'',
        root_id:'',
        content:''
      },
      chatList: [],
    };
  },
  created(){
    this.replyItem.to_user = this.item.from_user;
    this.replyItem.root_id = this.item.id;
    this.loadChat();
  },
  methods: {
    closeInfo() {
      this.$emit("closeInfo");
    },
    loadChat() {
      let url = tool.getURL(urls.messages.list, {
        root_id: this.item.root_id,
      });
      axios.get(url, (res) => {
        this.chatList = res.data;
        this.$nextTick(() => {
          this.$refs.chatlist.scrollTop = this.$refs.chatlist.scrollHeight;
        });
      });
    },
    getShowName(item) {
      return `${item.create_time} ${item.from_name}`;
    },
    getIsSelf(item) {
      console.log(item)
      return Number(item.from_user) === 1;
    },
    getImageList(key) {
      if (!this.data[key]) return [];
      return this.data[key].split(",");
    },
    getData(key, val) {
      return tool.fotmatData(key, this.data[key]);
    },
    sendMsg() {
      if (this.replyItem.content === "") {
        tips.error({ text: "请输入回复内容" });
        return;
      }
      axios.post(urls.messages.create, this.replyItem, (res) => {
        this.loadChat()
        this.replyItem.text = "";
        this.$nextTick(() => {
          this.$refs.chatlist.scrollTop = this.$refs.chatlist.scrollHeight;
        });
      });
    },
  },
};
</script>
<style >
.pageDetail_box_messages {
  max-height: 100% !important;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.pageDetail_content_messages {
  flex: 1 0 0;
  width: 100%;
  display: flex;
  overflow: hidden;
  padding-bottom: 20px;
}
.pageDetail_left_messages {
  /* min-width:50%; */
  width: 33%;
  height: 100%;
  border-right: 1 solid #666;
  overflow: auto;
}
.pageDetail_value_messages {
  width: auto;
  display: flex;
  flex-wrap: wrap;
}
.pageDetail_left_content_messages {
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.pageDetail_row_messages {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  font-size: 14px;
  background: #fff;
  margin: 15px 0;
}
.pageDetail_image_messages {
  width: 100px;
  height: 100px;
}
.pageDetail_right_messages {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  background: #f6f6f6;
}
.pageDetail_chat_messages {
  flex: 1 0 0;
  width: 100%;
  overflow: hidden;
}
.pageDetail_chat_list_messages {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.pageDetail_chat_block_messages {
  padding: 20px 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.pageDetail_chat_name {
  font-weight: 700;
  font-size: 14px;
}
.pageDetail_chat_text {
  padding: 10px 0;
  text-align: left;
  font-size: 14px;
}
.pageDetail_chat_block {
  /* width:50%; */
  /* display: flex; */
  /* flex-direction: column; */
}
.pageDdetail_chat_mine {
  align-items: flex-end;
}
.pageDdetail_chat_other {
  align-items: flex-start;
}
.pageDetail_chat_msg {
  border-top: 1px solid #000;
  flex: 200px 0 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.pageDetail_chat_msg > div:first-child {
  flex: 1 0 0;
}
.pageDetail_chat_msg > div:last-child {
  flex: 40px 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-image-viewer__close {
  color: #fff;
}
.messages_detail_container .el-textarea,
.messages_detail_container .el-textarea__inner {
  height: 100%;
  border: none;
}
</style>>
