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


export const cardTopic = [
  {
    label: "１．入庫処理",
    key: "/in_stock",
  },
  // {
  //   label: "４．入金処理",
  //   key: "/deposit_process",
  // },
  {
    label: "２．出庫処理",
    key: "/out_stock",
  },
  {
    label: "５．請求処理",
    key: "/billing_process",
  },
  {
    label: "３．倉庫管理",
    key: "/stock",
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
    label: "トップ",
    key: "/home",
  },
  {
    label: "入庫処理",
    key: "/in_stock",
  },
  {
    label: "出庫処理",
    key: "/out_stock",
  },
  {
    label: "在庫管理",
    key: "/stock",
  },
  {
    label: "入金処理",
    key: "/deposit_process",
  },
  {
    label: "請求処理",
    key: "/billing",
    children: [
      {
        label: "請求処理",
        key: "/billing_process",
      },
      {
        label: "請求一覧",
        key: "/billing_list",
      },
    ],
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
  {
    label: "ユーザー",
    key: "/user_process",
  },
  {
    label: "権限",
    key: "/clientPage_process",
  },
];
