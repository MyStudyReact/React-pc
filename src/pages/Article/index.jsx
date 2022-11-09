
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  Popconfirm
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'

import { http } from '@/utils/http'


import './index.scss'
import img404 from '@/assets/img/error.png'

const { Option } = Select
const { RangePicker } = DatePicker

const initialValues = {
  status: -1,
  channel_id: '',
  date: '',
}

const Article = () => {
  // 页面是否加载中
  const [isLoadingData, setIsLoadingData] = useState(false)

  // 频道列表管理
  const [channelList, setChannelList] = useState([])

  // useEffect的依赖非常必要，非常容易出现循环执行
  // 在里面写了引起组件重新渲染的逻辑，重新渲染又会导致useEffect执行
  useEffect(() => {
    const loadChannelList = async () => {
      const res = await http.get('/channels')
      setChannelList(res.data.channels)
    }
    loadChannelList()
  }, [])

  // 文章列表管理
  const [articleData, setArticleData] = useState({
    // 统一管理数据，将来修改setArticleData穿对象
    list: [], //文章列表
    count: 0, //文章数量
  })

  // 文章参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  })


  /**
   * 如果异步请求函数需要依赖一些数据的变化而重新执行
   * 推荐把他写在内部
   * 统一不抽离函数到外面，只要涉及到异步请求的函数，都放在useEffect内部
   * 
   * 本质区别
   * 写到外面每次组件更新都会重新进行函数初始化，这本身就是一次性能消耗
   * 而写到useEffect中 只会在依赖项发生变化的时候 函数才会进行重新初始化
   * 
   * 避免性能损失
   */
  useEffect(() => {
    const loadList = async () => {
      setIsLoadingData(true)
      const res = await http.get('/mp/articles', { params })
      setArticleData({
        list: res.data.results,
        count: res.data.total_count,
      })
      setIsLoadingData(false)
    }
    loadList()
  }, [params])


  const formatStatus = (type) => {
    const TYPES = {
      1: <Tag color='red'>审核失败</Tag>,
      2: <Tag color='green'>审核成功</Tag>
    }
    return TYPES[type]
  }

  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    // 更新回调
    setParams({
      ...params,
      page: 1,
    })
  }

  const navigate = useNavigate()
  const goPublish = (data => {
    navigate(`/publish?id=${data.id}`)
  })

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => formatStatus(data)
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          articleData.list.length >= 1 ? (
            <Space size="middle">
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => goPublish(data)} />
              <Popconfirm
                title="确定要删除吗?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => delArticle(data)}>
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Space>

          ) : null
        )
      }
    }
  ]

  const onFinish = (values) => {
    const { channel_id, date, status } = values
    // 数据处理
    const _params = {}
    if (status !== -1) {
      _params.status = status
    }
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }

    /**
     * 修改params数据 引起接口的重新发送 
     * 
     * 类组件
     * 对象合并操作，不会进行覆盖
     * 
     * 函数组件
     * 对象合并是一个整体覆盖，改了对象的整体引用
     */
    setParams({
      ...params,
      ..._params,
    })
  }

  const pageChange = (page, pageSize) => {
    setParams({
      ...params,
      page
    })
  }

  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={initialValues}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
        <Table
          loading={isLoadingData}
          scroll={{ y: 'calc(100vh - 680px)' }}
          rowKey="id"
          columns={columns}
          dataSource={articleData.list}
          pagination={{
            pageSize: params.per_page,
            total: articleData.count,
            onChange: pageChange,
          }}
        />
      </Card>
    </div>
  )
}

export default Article