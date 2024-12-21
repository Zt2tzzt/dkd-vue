<script setup>
import { getToken } from '@/utils/auth'
const { proxy } = getCurrentInstance()

// 文件上传前的校验
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 1
  },
  // 文件类型, 例如['xls', 'xlsx']
  fileType: {
    type: Array,
    default: () => ['xls', 'xlsx']
  }
})

const emits = defineEmits(['closeDialog'])

/** 文件上传 */
const uploadRef = ref(null)
const uploadExcelUrl = ref(import.meta.env.VITE_APP_BASE_API + props.url) // 上传地址
const headers = ref({ Authorization: 'Bearer ' + getToken() }) // 上传请求头
const submitUpload = () => uploadRef.value.submit()

// 上传成功回调
const handleUploadSuccess = (res, file) => {
  if (res.code === 200) {
    proxy.$modal.msgSuccess('上传成功')
    emits('uploadFinish')
  } else {
    proxy.$modal.msgError(res.msg)
  }

  uploadRef.value.clearFiles()
  proxy.$modal.closeLoading() // 关闭 loading 层
}

// 上传失败回掉
const handleUploadError = () => {
  proxy.$modal.msgError('上传失败')

  uploadRef.value.clearFiles()
  proxy.$modal.closeLoading() // 关闭 loading 层
}

// 上传前loading加载
const handleBeforeUpload = file => {
  let isExcel = false

  if (props.fileType.length) {
    let fileExtension = ''

    if (file.name.lastIndexOf('.') > -1)
      fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)

    isExcel = props.fileType.some(
      type => file.type.indexOf(type) > -1 || (fileExtension && fileExtension.indexOf(type) > -1)
    )
  }
  if (!isExcel) {
    proxy.$modal.msgError(`文件格式不正确, 请上传${props.fileType.join('/')}格式文件!`)
    return false
  }
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize
    if (!isLt) {
      proxy.$modal.msgError(`上传Excel图片大小不能超过 ${props.fileSize} MB!`)
      return false
    }
  }
  proxy.$modal.loading('正在上传Excel，请稍候...')
}
</script>

<template>
  <!-- 导入对话框 -->
  <el-upload
    class="upload-demo"
    ref="uploadRef"
    :action="uploadExcelUrl"
    :headers="headers"
    :limit="1"
    :before-upload="handleBeforeUpload"
    :on-success="handleUploadSuccess"
    :on-error="handleUploadError"
    :auto-upload="false"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>
    <span style="margin-right: 5px"></span>
    <el-button class="ml-3" type="success" @click="submitUpload">上传</el-button>
    <template #tip>
      <div class="el-upload__tip">上传文件格式仅支持 xls、xlsx，文件大小不得超过1MB</div>
    </template>
  </el-upload>
</template>

<style scoped lang="scss"></style>
