// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const records = db.collection('records')



// 云函数入口函数
exports.main = async(event, context) => {
  try {
    return await records.get()
  } catch (err) {
    console.error(err)
  }
}