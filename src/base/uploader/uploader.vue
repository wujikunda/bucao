<template>
  <div class="vue-uploader">
    <div class="file-list"  v-show="!hideImg">
      <section v-for="(file, index) of files" class="file-item draggable-item" :key="index">
        <img :src="file.src" alt="" ondragstart="return false;">
        <p class="file-name">{{file.name}}</p>
        <span class="file-remove" @click="remove(index)">+</span>
      </section>
      <section v-if="status == 'ready'" class="file-item">
        <div @click.stop="add" class="add needsclick">
            <span>+</span>
        </div>
      </section>
    </div>
    <section v-if="files.length != 0" class="upload-func"  v-show="!hideImg">
      <div class="progress-bar">
        <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
      </div>
      <div class="operation-box" >
        <button v-if="status == 'ready'" @click="submit">上传</button>
        <button v-if="status == 'finished'" @click="finished">完成</button>
      </div>
    </section>
    <input type="file" accept="image/*" @change="fileChanged" ref="file"multiple="multiple">
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String
    },
    hideImg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      status: "ready",
      files: [],
      point: {},
      uploading: false,
      percent: 0
    };
  },
  methods: {
    add() {
      this.$refs.file.click();
    },
    submit() {
      if (this.files.length === 0) {
        console.warn("no file!");
        return;
      }
      const formData = new FormData();
      this.files.forEach(item => {
        console.log(item.file);
        formData.append(item.name, item.file);
        console.log(formData);
      });

      return;
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", this.uploadProgress, false);
      xhr.open("POST", this.src, true);
      this.uploading = true;

      xhr.send(formData);
      xhr.onload = () => {
        this.uploading = false;
        if (xhr.status === 200 || xhr.status === 304) {
          this.status = "finished";
          console.log("upload success!");
        } else {
          console.log(`error：error code ${xhr.status}`);
        }
      };
    },
    finished() {
      this.files = [];
      this.status = "ready";
    },
    remove(index) {
      this.files.splice(index, 1);
    },
    fileChanged(e) {
      if (typeof FileReader === "undefined") {
        return alert("你的浏览器不支持上传图片哟！");
      }
      const list = this.$refs.file.files;
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          };
          this.$emit("selectFinish", list[i]);
          this.files.push(item);
        }
      }
      this.$refs.file.value = "";
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      let _this = this;
      reader.onload = e => {
        var IMG = new Image();
        IMG.src = e.target.result;
        _this.$set(item, "src", e.target.result);
        _this.$emit("selectFinish", _this.files);
        IMG.onload = function(e) {
          return
          var w = this.naturalWidth,
            h = this.naturalHeight,
            resizeW = 0,
            resizeH = 0;
          // maxSize 是压缩的设置，设置图片的最大宽度和最大高度，等比缩放，level是报错的质量，数值越小质量越低
          var maxSize = {
            width: 500,
            height: 500,
            level: 0.6
          };
          // if (w > maxSize.width || h > maxSize.height) {
          var multiple = Math.max(w / maxSize.width, h / maxSize.height);
          resizeW = w / multiple;
          resizeH = h / multiple;
          // } else {
          //   // 如果图片尺寸小于最大限制，则不压缩直接上传
          //   _this.$emit("selectFinish", _this.files);
          //   return false;
          // }
          var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
          // if (window.navigator.userAgent.indexOf("iPhone") > 0) {
          //   canvas.width = resizeH;
          //   canvas.height = resizeW;
          //   ctx.rotate(90 * Math.PI / 180);
          //   ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
          // } else {
            canvas.width = resizeW;
            canvas.height = resizeH;
            ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
          // }
          var base64 = canvas.toDataURL("image/jpeg", maxSize.level);
          let blob = _this.convertBlob(window.atob(base64.split(",")[1]),item);
          console.log(_this.files)
          _this.$set(item, "size", blob.size);
          _this.$set(item, "file", blob);
          _this.$emit("selectFinish", _this.files);
        };
      };
      reader.readAsDataURL(file);
    },
    convertBlob(base64, item) {
      var buffer = new ArrayBuffer(base64.length);
      var ubuffer = new Uint8Array(buffer);
      for (var i = 0; i < base64.length; i++) {
        ubuffer[i] = base64.charCodeAt(i);
      }
      var blob;
      try {
      blob = new File([buffer], item.name, { type: "image/jpeg" });
        // blob = new Blob([buffer], { type: "image/jpeg" });
      } catch (e) {
        window.BlobBuilder =
          window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder ||
          window.MSBlobBuilder;
        if (e.name === "TypeError" && window.BlobBuilder) {
          var blobBuilder = new BlobBuilder();
          blobBuilder.append(buffer);
          blob = blobBuilder.getBlob("image/jpeg");
        }
      }
      return blob
    },
    isContain(file) {
      this.files.forEach(item => {
        if (item.name === file.name && item.size === file.size) {
          return true;
        }
      });
      return false;
    },
    uploadProgress(evt) {
      const component = this;
      if (evt.lengthComputable) {
        const percentComplete = Math.round(evt.loaded * 100 / evt.total);
        component.percent = percentComplete / 100;
      } else {
        console.warn("upload progress unable to compute");
      }
    }
  }
};
</script>
<style>
.vue-uploader {
  border: 1px solid #e5e5e5;
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 100px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 80px;
  height: 80px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  display: none;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 80px;
  border: 1px dashed #ececec;
  font-size: 30px;
  cursor: pointer;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.vue-uploader > input[type="file"] {
  display: none;
}
</style>