import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message} from 'antd';
import React, {useRef, useState} from 'react';
import {
  addInterfaceInfoUsingPost, deleteInterfaceInfoUsingPost,
  offlineInterfaceInfoUsingPost, onlineInterfaceInfoUsingPost,
  updateInterfaceInfoUsingPost
} from "@/services/leapi-backend/interfaceInfoController";
import {SortOrder} from "antd/lib/table/interface";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";
import {deleteUserUsingPost, getUserByListUsingGet, updateUserUsingPost} from "@/services/leapi-backend/userController";

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserVO[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields:  API.UserUpdateRequest) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateUserUsingPost({
        id: currentRow.id,
        ...fields
      });
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * 发布接口
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPost({
        id: record.id
      });
      hide();
      message.success('发布成功');
      actionRef.current?.reload();// 自动更新数据
      return true;
    } catch (error: any) {
      hide();
      message.error('发布失败，' + error.message);
      return false;
    }
  };

  /**
   * 下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPost({
        id: record.id
      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload();// 自动更新数据
      return true;
    } catch (error: any) {
      hide();
      message.error('下线失败，' + error.message);
      return false;
    }
  };

  /**
   *  ban user
   * @zh-CN 禁用用户：将用户状态设置为 suspend，之后还可以解除封号
   *
   * @param record
   */
  const handleSuspend = async (fields:  API.UserUpdateRequest) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('禁用中');
    try {
      if (currentRow.userRole === "suspend") {
        currentRow.userRole = "user";
      } else if (currentRow.userRole === "user") {
        currentRow.userRole = "suspend";
      }
      await updateUserUsingPost({
        id: currentRow.id,
        userRole: currentRow.userRole,
        ...fields
      });
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.UserVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      copyable: true,
      hideInForm: true,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: "image",
      hideInSearch: true,
      // render: (_, record) => (
      //   <div>
      //     <Image src={record.userAvatar} width={50}/>
      //   </div>
      // )
    },
    // {
    //   title: '性别',
    //   dataIndex: 'gender',
    //   valueEnum: {
    //     "0": { text: '男' },
    //     "1": { text: '女' },
    //   },
    // },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        "user": { text: '普通用户', status: 'Default' },
        "admin": { text: '管理员', status: 'Success' },
        "suspend": { text: '已禁用', status: 'Error'},
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="text"
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </Button>,
        <Button
          type="text"
          key="config"
          onClick={() => {
            handleOnline(record);
          }}
        >
          发布
        </Button>,
        record.userRole === "user" ?
        <Button
          type="text"
          key="config"
          danger
          onClick={() => {
            setCurrentRow(record);
            handleSuspend(record);
          }}
        >
          禁用
        </Button> : null,
        record.userRole === "suspend" ?
          <Button
            type="text"
            key="config"
            danger
            onClick={() => {
              setCurrentRow(record);
              handleSuspend(record);
            }}
          >
            解除禁用
          </Button> : null,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'用户信息列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}

        request={async (params, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
          const res = await getUserByListUsingGet({
            ...params
          })
          if (res?.data) {
            return {
              data: res?.data || [],
              success: true,
              total: res.data,
            }
          } else {
              return {
                data: [],
                success: false,
                total: 0,
              }
            }
        }}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />

      <ModalForm
        title={'新建规则'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal columns={columns} onCancel={() => {handleModalOpen(false)}} onSubmit={(values) => {handleAdd(values)}} visible={createModalOpen}/>
    </PageContainer>
  );
};
export default TableList;
