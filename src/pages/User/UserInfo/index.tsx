import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import {
  getLoginUserUsingGet,
  updateMyUserUsingPost,
} from '@/services/leapi-backend/userController';
import { values } from 'lodash';
import { Button } from 'antd';

/**
 * 用户测试主页
 * @constructor
 */
const UserInfoTest: React.FC = () => {
  return (
    <ProCard
      bordered
      headerBordered
      direction="column"
      gutter={[0, 16]}
      style={{ marginBlockStart: 8 }}
    >
      <ProCard title="个人信息" type="inner" bordered>
        <ProDescriptions
          column={1}
          request={async () => {
            const res = await getLoginUserUsingGet({
              ...values(),
            });
            if (res?.data) {
              return {
                data: res?.data || '',
                success: true,
                total: res.data,
              };
            } else {
              return {
                data: '',
                success: false,
                total: 0,
              };
            }
          }}
          emptyText={'空'}
          editable={{
            onSave: async (keypath, newInfo, oriInfo) => {
              console.log(keypath, newInfo, oriInfo);
              const res = await updateMyUserUsingPost(newInfo);
              console.log(res.data);
              if (res?.data) {
                return {
                  data: res?.data || '',
                  success: true,
                  total: res.data,
                };
              } else {
                return {
                  data: '',
                  success: false,
                  total: 0,
                };
              }
              return true;
            },
          }}
          columns={[
            {
              title: '头像',
              dataIndex: 'userAvatar',
              valueType: 'image',
              hideInSearch: true,
              // render: (_, record) => (
              //   <div>
              //     <Image src={record.userAvatar} width={50}/>
              //   </div>
              // )
              editable: false,
            },
            {
              title: '用户名',
              dataIndex: 'userName',
              copyable: true,
            },
            {
              title: '角色',
              dataIndex: 'userRole',
              valueType: 'select',
              valueEnum: {
                user: { text: '普通用户', status: 'Default' },
                admin: { text: '管理员', status: 'Success' },
                suspend: { text: '禁用', status: 'Error' },
              },
              editable: false,
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              valueType: 'dateTime',
              hideInForm: true,
              editable: false,
            },
          ]}
        ></ProDescriptions>
      </ProCard>
      {/*TODO 点击更新凭证按钮，更新用户凭证*/}
      <ProCard title="用户凭证" type="inner" bordered extra={<Button>更新凭证</Button>}>
        AccessKey:
        <div></div>
        SecretKey:
      </ProCard>
      <ProCard
        title="开发者 SDK（快速调用接口）"
        type="inner"
        bordered
        extra={<Button>一键复制</Button>}
      >
        Maven 仓库地址
        <div></div>
        dependency
      </ProCard>
    </ProCard>
  );
};

export default UserInfoTest;
