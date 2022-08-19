import { Card, Form, Input, Checkbox, Button } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'

function Login() {
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt="" />
        <Form
          initialValues={{ remember: true }}
          autoComplete="off"
          validateTrigger={['onBlur', 'onChange']}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: '请输入手机号'
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: '请输入密码'
              },
              {
                len: 6,
                message: '请输入6位密码',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input.Password size="large" placeholder='请输入密码' />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className='login-checkbox-label'>
              我已阅读并同意[用户协议]和[隐私条款]
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
