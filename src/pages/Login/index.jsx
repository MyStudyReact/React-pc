import { Card, Button, Checkbox, Form, Input } from 'antd'

import logo from '@/assets/logo.png'
import './index.scss'

function Login () {
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt=''></img>

        {/* 登录表单 */}
        {/* 子项用到的触发事件 需要在Form中都需要声明一下 */}
        <Form validateTrigger={['onBlur', 'onChange']}>
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
              { required: true, message: '请输入手机号' }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { len: 6, message: '请输入6个密码', validateTrigger: 'onBlur' },
              { required: true, message: '请输入密码' }
            ]}
          >
            <Input size="large" placeholder="请输入密码" maxLength={6} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked">
            <Checkbox className="login-checkbox-label">我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login