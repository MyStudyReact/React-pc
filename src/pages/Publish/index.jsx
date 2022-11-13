import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
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
  Select,
  message
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
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  // 频道列表管理
  const { channelStore } = useStore()

  // 存放上传图片的列表
  const [fileList, setFileList] = useState([])

  // 1.使用useRef声明一个暂存仓库
  const cacheImgList = useRef()

  const onUploadChange = ({ fileList }) => {
    console.log(fileList, '=====fileList')
    /**
     * 采取受控的写法：在最后一次log里面 response
     * 最终在react state fileList中存放的数据有response.data.url
     * 
     * 但是我们不需要那么多参数，需要做数据格式化
     */
    const formatList = fileList.map(file => {
      // 上传完毕 做数据处理
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }

      // 否则再上传中时不做处理
      return file
    })
    setFileList(formatList)

    // 同时把图片列表存入仓库一份
    cacheImgList.current = formatList
  }

  // 切换图片
  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    setImgCount(e.target.value)

    /**
     *  从仓库里面取对应的图片数量，交给我们用来渲染图片列表fileList
     * 
     *  通过调用 setFileList
     */

    let img = []
    // 这里的判断依据我们采用原始值
    if (e.target.value === 1) {
      img = cacheImgList.current ? [cacheImgList.current[0]] : []
    } else if (e.target.value === 3) {
      img = cacheImgList.current
    }
    setFileList(img)
  }

  // 提交表单
  const onFinish = async (values) => {
    // 数据的二次处理，重点是处理cover字段
    // const { channel_id, content, title, type } = values
    // const params = {
    //   channel_id,
    //   content,
    //   title,
    //   type,
    //   cover: {
    //     type,
    //     images: fileList.map(item => item.response.data.url)
    //   }
    // }

    // 简写
    const { type, ...res } = values

    console.log(values, fileList, '===values')
    const params = {
      ...res,
      cover: {
        type,
        images: fileList.map(item => item.url) //这里数据有问题，需处理
      }
    }

    let title = ''
    if (articleId) {
      // 编辑
      await http.put(`/mp/articles/${articleId}?draft=false`, params)
      title = '更新'
    } else {
      // 新增
      await http.post('/mp/articles?draft=false', params)
      title = '发布'
    }
    // 跳转列表 提示用户
    navigate('/article')
    message.success(`${title}成功!`)
  }

  // 1.表单回填
  const formRef = useRef(null)

  // 编辑功能
  // 文案适配：路由参数 articleId 判断条件
  const [params] = useSearchParams()
  const articleId = params.get('id')
  // 数据回填 id调用接口 1.表单回填 2.暂存回填 3.Upload组件fileList
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/mp/articles/${articleId}`)
      const { cover, ...formValue } = res.data
      // 1.表单数据回填 实例方法
      formRef.current.setFieldsValue({ ...formValue, type: cover.type })

      // 2.暂存回填
      const imageList = cover.images.map(url => ({ url }))
      setFileList(imageList)
      // 暂存列表也存一份
      cacheImgList.current = imageList
    }

    // 必须是编辑状态，才可以发送请求
    if (articleId) {
      loadDetail()
    }
  }, [articleId])


  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          ref={formRef}
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
                {articleId ? '更新' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)