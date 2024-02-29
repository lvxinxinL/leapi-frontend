import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {BLOG_LINK, GITHUB_LINK} from "@/constants";
import {LinkOutlined} from "@ant-design/icons/lib/icons";

const Footer: React.FC = () => {
  const defaultMessage = 'LeAPI 接口开放平台 v1.0.0';
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
          title: <> 乐小鑫 CSDN <LinkOutlined /></>,
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
