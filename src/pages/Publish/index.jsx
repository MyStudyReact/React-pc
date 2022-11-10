import { Link } from 'react-router-dom'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useStore } from '@/store'
import { http } from '@/utils'

import './index.scss'

const { Option } = Select

const initialValues = {
  type: 1,
  content: 'this is content',
}


const Publish = () => {
  const [value, setValue] = useState('')

  // 频道列表管理
  const { channelStore } = useStore()

  // 存放上传图片的列表
  const [fileList, setFileList] = useState([])

  const onUploadChange = ({ fileList }) => {
    /**
     * 采取受控的写法：在最后一次log里面 response
     * 最终在react state fileList中存放的数据有response.data.url
     */
    setFileList(fileList)
  }

  // 切换图片
  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    setImgCount(e.target.value)
  }

  // 提交表单
  const onFinish = async (values) => {
    // 数据的二次处理，重点是处理cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type,
        images: fileList.map(item => item.response.data.url)
      }
    }

    await http.post('/mp/articles?draft=false', params)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}

            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                maxCount={imgCount}
                multiple={imgCount > 1}
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}

          </Form.Item>

          {/* 这里的富文本组件，已经被Form.Item控制 */}
          {/* 他的输入内容 会在onFinished中收集起来 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill className='publish-quill' theme="snow" value={value} onChange={setValue} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)