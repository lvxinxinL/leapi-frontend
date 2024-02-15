import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {BLOG_LINK, GITHUB_LINK} from "@/constants";

const Footer: React.FC = () => {
  const defaultMessage = '乐小鑫的 API 接口开放平台';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'blog',
          title: '开发者 CSDN 地址',
          href: BLOG_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <>   Github <GithubOutlined /></>,
          href: GITHUB_LINK,
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
