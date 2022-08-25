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
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams,useNavigate } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { useStore } from "@/store";
import {observer} from 'mobx-react-lite'
import { useEffect, useRef, useState } from "react";
import { http } from "@/utils";

const { Option } = Select;

const Publish = () => {
  const navigate = useNavigate()
  const {channelStore} = useStore()
  // 存放上传图片的列表
  const [fileList, setFileList] = useState([])
  // 使用useRef声明一个暂存仓库
  const cacheImgList = useRef()
  const onUploadChange = ({fileList}) => {
    // 采取受控的写法：在最后一次log里response
    // 最终react state fileList中存放的数据有response.data.url
    const formatList = fileList.map(file => {
      // 上传完毕 做数据处理
      if(file.response) {
        return {
          url: file.response.data.url
        }
      }
      // 否则在上传中时 不做处理
      return file
    })
    setFileList(formatList)
    cacheImgList.current = formatList
  }

  // 切换图片
  const [imgCount, setImgCount] = useState(1)
  const onRadioChange = (e) => {
    setImgCount(e.target.value)
    // 从仓库里面取对应的图片数量 交给用来渲染图片列表的fileList
    // 通过调用setFileList
    if(e.target.value === 1) {
      const img = cacheImgList.current ? cacheImgList.current[0] : []
      setFileList([img])
    } else if(e.target.value === 3) {
      setFileList(cacheImgList.current)
    }
  }
  const onFinish = async (values) => {
    // 数据的二次处理 重点是处理cover字段
    const {channel_id, content, title, type} = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type,
        images: fileList.map(item => item.url)
      }
    }
    console.log(params)
    if(id) {
      await http.put(`/mp/articles/${id}?draft=false`, params)
    }else {
      await http.post('/mp/articles?draft=false', params)
    }
    // 跳转列表 提示用户
    navigate('/article')
    message.success(`${id?'更新':'发布'}发布成功`)
  }

  // 编辑功能
  // 文案适配 路由参数id 判断条件
  const [params] = useSearchParams()
  const id = params.get('id')

  // 数据回填 id调用接口 1. 表单回填 2. 暂存列表 3. upload组件fileList
  const form = useRef(null)
  useEffect(() => {
    const loadDetail = async () => {
      const {data} = await http.get(`/mp/articles/${id}`)
      // 表单数据回填 实例方法
      form.current.setFieldsValue({...data, type: data.cover.type})
      // 调用setFileList方法回填upload
      const formatImgList = data.cover.images.map(url => ({url}))
      setFileList(formatImgList)
      cacheImgList.current = formatImgList
    }
    // 必须是编辑状态才可以发送请求
    if(id) {
      loadDetail()
    }
  }, [id])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑': '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
            {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onRadioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              theme="snow"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id? '编辑':'发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
