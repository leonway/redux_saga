import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { login } from 'services/auth';
import { userActions } from 'reducers/auth';
import styles from './styles.module.less';
const FormItem = Form.Item;
console.log(styles);

@Form.create()
@connect(
    (state) => {
        console.log(state)
        return {}
    },
    { userLogin: userActions.userLogin }
)
 class LoginPage extends React.PureComponent {
    state = {};
    // componentDidMount() {
    //     AuthService.logout();
    // }
    handleLogin(user) {
        const { location, history } = this.props;
        this.props.userLogin(user, location, history);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.handleLogin(values);
            }
        });
    };
    getBtnText(state) {
        return state ? '登录中...' : '登 录';
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { isloading } = this.props;
        return (
            <div className={styles['login-page']}>
                <div className={styles.box}>
                    <div className={styles['left-box']} />
                    <div className={styles['right-box']}>
                        <h2 className={styles['page-title']}>reamey</h2>
                        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }]
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                        autoComplete="username"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }]
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                        autoComplete="current-password"
                                    />
                                )}
                            </FormItem>
                            <FormItem style={{ paddingTop: '12px' }}>
                                <Button type="primary" size="large" htmlType="submit" loading={isloading} block>
                                    {this.getBtnText(isloading)}
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;