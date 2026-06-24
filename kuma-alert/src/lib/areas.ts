// 秋田県の市町村（25市町村）を地域でグルーピング。
// 縦に25個並べると選びにくいので、県北・県央・県南に分けて表示する。
export type AreaGroup = {
  region: string
  areas: string[]
}

export const AKITA_AREA_GROUPS: AreaGroup[] = [
  {
    region: '県北',
    areas: [
      '大館市',
      '鹿角市',
      '北秋田市',
      '能代市',
      '小坂町',
      '上小阿仁村',
      '藤里町',
      '三種町',
      '八峰町',
    ],
  },
  {
    region: '県央',
    areas: [
      '秋田市',
      '男鹿市',
      '潟上市',
      '由利本荘市',
      'にかほ市',
      '五城目町',
      '八郎潟町',
      '井川町',
      '大潟村',
    ],
  },
  {
    region: '県南',
    areas: [
      '大仙市',
      '仙北市',
      '横手市',
      '湯沢市',
      '美郷町',
      '羽後町',
      '東成瀬村',
    ],
  },
]

// 全市町村のフラットな一覧（保存・表示の補助に使う）。
export const AKITA_AREAS: string[] = AKITA_AREA_GROUPS.flatMap((g) => g.areas)
