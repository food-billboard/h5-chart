const Client = require('ssh2-sftp-client')
const path = require('path')
const chalk = require('chalk')

require('dotenv').config()

const client = new Client() 

const baseServiceConfig = {
  host: process.env.RASPBERRY_IP,
  username: process.env.RASPBERRY_NAME,
  password: process.env.RASPBERRY_PASSWORD
}

// 把prev文件夹删除
async function deleteThePreviousServiceDir() {
  return client.exists(process.env.RASPBERRY_PREVIOUS_PROJECT_PATH)
  .then((result) => {
    if(result) {
      return client.rmdir(process.env.RASPBERRY_PREVIOUS_PROJECT_PATH, true)
    }
  })
}

async function renameServiceDir(oldDirName, newDirName) {
  return client.exists(oldDirName)
  .then((result) => {
    if(result) {
      return client.rename(oldDirName, newDirName)
    }
  })
}

// 把本地文件夹上传到服务器
async function deployLocalDir() {
  return client.uploadDir(path.join(process.cwd(), 'dist'), process.env.RASPBERRY_DIST_PROJECT_PATH)
}

client.connect(baseServiceConfig)
.then(deleteThePreviousServiceDir)
.then(() => {
  // 把当前文件夹重命名为prev
  return renameServiceDir(process.env.RASPBERRY_PROJECT_PATH, process.env.RASPBERRY_PREVIOUS_PROJECT_PATH)
})
.then(() => {
  return deployLocalDir()
})
.then(() => {
  // 把上传的文件夹重命名为正式文件夹
  return renameServiceDir(process.env.RASPBERRY_DIST_PROJECT_PATH, process.env.RASPBERRY_PROJECT_PATH)
})
.then(() => {
  console.log(chalk.green('success'))
})
.catch(err => {
  console.log(chalk.red(err))
})
.then(() => {
  client.end()
  process.exit(0)
})