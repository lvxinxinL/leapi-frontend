import { Footer } from '@/components';
import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {LoginForm, ProCard, ProFormText} from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import {Button, Descriptions, message, Tabs} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { createStyles } from 'antd-style';
import {userRegisterUsingPost} from '@/services/leapi-backend/userController';
import { SYSTEM_LOGO } from '@/constants';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const ActionIcons = () => {
  const { styles } = useStyles();
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
    </>
  );
};
const Lang = () => {
  const { styles } = useStyles();
  return;
};
const UserInfo: React.FC = () => {
  const [data, setData] = useState<API.LoginUserVO>();

  const editUserInfo = () => {
    // TODO 点击编辑按钮，跳出编辑用户信息的表单
  };

  return (
    <>
      <ProCard
        // title="个人中心"
        bordered
        headerBordered
        direction="column"
        gutter={[0, 16]}
        style={{ marginBlockStart: 8 }}
      >
        <ProCard title="个人信息详情" type="inner" bordered extra={<Button htmlType="button" onClick={editUserInfo} key="edit">
          一键填写
        </Button>}>
          {data ? (
            <Descriptions column={1} >
              <Descriptions.Item label="头像">{data.userAvatar}</Descriptions.Item>
              <Descriptions.Item label="昵称">{data.userName}</Descriptions.Item>
              <Descriptions.Item label="角色">{data.userRole}</Descriptions.Item>
              <Descriptions.Item label="注册时间">{data.createTime}</Descriptions.Item>
            </Descriptions>
          ) : (
            <>用户不存在</>
          )}
        </ProCard>
        <ProCard title="用户凭证" type="inner" bordered>
          个人信息详情
        </ProCard>
        <ProCard title="开发者 SDK（快速使用 API 接口）" type="inner" bordered>
          Maven 仓库的地址
        </ProCard>
      </ProCard>
    </>
  );
};
export default UserInfo;
