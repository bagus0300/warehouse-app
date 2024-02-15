import { NavigationItemType, LoginItemType, ButtonType } from "../types";
import { siteInfoSectionType } from "../types/section";

export const siteInfo: siteInfoSectionType = {
  title: "倉庫管理システム",
};

// export const Buttons:

export const loginFileds: LoginItemType = {
  username: "ログインID",
  password: "パスワード",
  rememberme: "remember me",
};

export const cardTopics = [
  "１．入庫処理",
  "４．入金処理",
  "２．出庫処理",
  "５．請求処理",
  "３．倉庫管理",
  "６．マスタ保守",
  " 7 . 荷主一覧",
];

export const cardTopic = [
  {
    label:  "１．入庫処理",
    key: "/in_process",
  },
  {
    label: "４．入金処理",
    key: "/deposit_process",
  },
  {
    label: "２．出庫処理",
    key: "/configout_process",
  },
  {
    label: "５．請求処理",
    key: "/billing_process",
  },
  {
    label: "３．倉庫管理",
    key: "/inventory_control",
  },
  {
    label: "６．マスタ保守",
    key: "/product",
  },
  {
    label: " 7 . 荷主一覧",
    key: "/shipper",
  },
];

export const navigations = [
  {
    label: "TOP",
    key: "/home",
  },
  {
    label: "入庫処理",
    key: "/in_process",
  },
  {
    label: "出庫処理",
    key: "/configout_process",
  },
  {
    label: "在庫管理",
    key: "/inventory_control",
  },
  {
    label: "入金処理",
    key: "/deposit_process",
  },
  {
    label: "請求処理",
    key: "/billing_process",
  },
  {
    label: "マスタ保守",
    key: "/maintenance",
    children: [
      {
        label: "品名一覧",
        key: "/product",
      },
      {
        label: "荷主一覧",
        key: "/shipper",
      },
      {
        label: "単価区分マスタ",
        key: "/warehouse_fee",
      },
    ],
  },
];
