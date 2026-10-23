import { defineConfig } from 'vitepress'
import { katex } from '@mdit/plugin-katex'

// 部署到子站点（如 GitHub Pages 的 /仓库名/）时，通过环境变量覆盖：
//   BASE_PATH=/knowledge-base/ npm run build
// 生成 sitemap 时可用：SITE_HOSTNAME=https://example.com npm run build
const BASE_PATH = process.env.BASE_PATH || '/'
const SITE_HOSTNAME = process.env.SITE_HOSTNAME || ''

export default defineConfig({
  lang: 'zh-CN',
  title: 'JasonChan的知识库',
  description: '数学 · 语文 · 经济学 · 会计学 学习笔记与资料整理',
  base: BASE_PATH,
  cleanUrls: true,
  lastUpdated: true,
  // README.md 是项目说明，不参与站点构建（否则会被渲染成 /README.html 页面）
  srcExclude: ['README.md'],
  appearance: true, // 跟随系统 + 右上角手动切换浅色/深色
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE_PATH}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#16ab77' }],
    // 主题色防闪烁：渲染首屏前读回用户上次选择的色板（默认翡翠绿）
    [
      'script',
      {},
      `(function(){try{var p=localStorage.getItem('kb-palette');if(['violet','ocean','obsidian'].indexOf(p)>-1){document.documentElement.setAttribute('data-palette',p)}}catch(e){}})()`
    ]
  ],

  // ---------- Markdown：LaTeX 公式 ----------
  markdown: {
    config(md) {
      // 行内：$...$ 或 \(...\)   块级：$$...$$ 或 \[...\]
      md.use(katex, {
        delimiters: 'all',
        throwOnError: false, // 公式写错时只标红，不中断构建
        errorColor: '#cc0000',
        strict: 'ignore',
        output: 'htmlAndMathml' // 无障碍 + 可复制源码
      })
    },
    image: { lazyLoading: true }
  },

  // ---------- 主题配置 ----------
  themeConfig: {
    nav: [
      { text: '税务师',
        items: [
          { text: '《税法一》', link: '/subjects/taxlaw/taxlaw1/123.md'},
          { text: '《税法二》', link: '/item-2' },
          { text: '《涉税实务》', link: '/item-3' },
          { text: '《财务与会计》', link: '/item-3' },
          { text: '《涉税法律》', link: '/item-3' }
        ]
      },
      { text: '数学', link: '/subjects/math/', activeMatch: '/subjects/math/' },
      { text: '语文', link: '/subjects/chinese/', activeMatch: '/subjects/chinese/' },
      { text: '经济学', link: '/subjects/economics/', activeMatch: '/subjects/economics/' },
      { text: '会计', activeMatch: '/subjects/accounting/',
        items: [
          { text: '《实务》', link: '/item-1' },
          { text: '《经济法》', link: '/item-2' }
        ]
       },
      { text: '财务分析', activeMatch: '/about/',
        items: [
          { text: '《财务分析》', link: '/item-1' },
          { text: '《财务管理》', link: '/item-2' }
        ]
      }
    ],

    // 多侧边栏：按学科（目录前缀）分别配置，支持「分组 → 页面」多级结构
    sidebar: {
      '/subjects/math/': [
        { text: '数学总览', link: '/subjects/math/' },
        {
          text: '微积分',
          collapsed: false,
          items: [
            { text: '极限与连续（模板）', link: '/subjects/math/calculus/limits-and-continuity' },
            { text: '导数与微分应用', link: '/subjects/math/calculus/derivatives' }
          ]
        },
        {
          text: '线性代数',
          collapsed: true,
          items: [{ text: '矩阵与行列式', link: '/subjects/math/linear-algebra/matrices' }]
        },
        {
          text: '概率统计',
          collapsed: true,
          items: [{ text: '随机变量与分布', link: '/subjects/math/probability/random-variables' }]
        }
      ],

      '/subjects/chinese/': [
        { text: '语文总览', link: '/subjects/chinese/' },
        {
          text: '古代文学',
          collapsed: false,
          items: [
            { text: '古诗词鉴赏方法（模板）', link: '/subjects/chinese/classical/poetry-appreciation' },
            { text: '文言实词与虚词', link: '/subjects/chinese/classical/classical-words' }
          ]
        },
        {
          text: '现代文学',
          collapsed: true,
          items: [{ text: '现代散文阅读', link: '/subjects/chinese/modern/prose-reading' }]
        },
        {
          text: '写作方法',
          collapsed: true,
          items: [{ text: '议论文结构', link: '/subjects/chinese/writing/argumentative-essay' }]
        }
      ],

      '/subjects/economics/': [
        { text: '经济学总览', link: '/subjects/economics/' },
        {
          text: '微观经济学',
          collapsed: false,
          items: [
            { text: '供需与弹性（模板）', link: '/subjects/economics/micro/supply-demand-elasticity' },
            { text: '市场结构', link: '/subjects/economics/micro/market-structure' }
          ]
        },
        {
          text: '宏观经济学',
          collapsed: true,
          items: [{ text: 'GDP 与国民收入', link: '/subjects/economics/macro/gdp-and-national-income' }]
        }
      ],

      '/subjects/accounting/': [
        { text: '会计学总览', link: '/subjects/accounting/' },
        {
          text: '基础会计',
          collapsed: false,
          items: [
            { text: '会计要素与会计等式（模板）', link: '/subjects/accounting/fundamentals/accounting-elements' },
            { text: '借贷记账法与会计分录', link: '/subjects/accounting/fundamentals/journal-entries' }
          ]
        },
        {
          text: '财务报表',
          collapsed: true,
          items: [{ text: '资产负债表与利润表', link: '/subjects/accounting/statements/balance-sheet' }]
        }
      ],
      '/subjects/taxlaw/taxlaw1': [
        { text: '税法基本原理', link: '/subjects/taxlaw/taxlaw1/123.md' },
        {text: '《税法一》',collapsed: true,
          items: [
            { text: '一、增值税', link: '/subjects/taxlaw/taxlaw1/123.md',
                collapsed: true,
              items:[
                { text: '1.增值税概述', link: '/subjects/taxlaw/taxlaw1/02-01.md' },
                { text: '2.纳税人和扣缴义务人', link: '/subjects/taxlaw/taxlaw1/02-02.md' },
                { text: '3.征税范围', link: '/subjects/taxlaw/taxlaw1/02-03.md' },
                { text: '4.税率和征收率', link: '/subjects/taxlaw/taxlaw1/02-04.md' },
                { text: '5.税收优惠', link: '/subjects/taxlaw/taxlaw1/02-05.md' },
                { text: '6.一般计税方法应纳税额计算', link: '/subjects/taxlaw/taxlaw1/02-06.md' },
                { text: '7.简易计税方法应纳税额计算', link: '/subjects/taxlaw/taxlaw1/02-07.md' },
                { text: '8.进口环节增值税政策', link: '/subjects/taxlaw/taxlaw1/02-08.md' },
                { text: '9.出口业务增值税政策', link: '/subjects/taxlaw/taxlaw1/02-09.md' },
                { text: '10.预缴税款及特定应税交易的增值税政策', link: '/subjects/taxlaw/taxlaw1/02-10.md' },
                { text: '11.征收管理', link: '/subjects/taxlaw/taxlaw1/02-11.md' }
              ]
            },
            {text: '二、消费税',
              link: '/subjects/taxlaw/taxlaw1/123.md',
              collapsed: true,
            items: [
              { text: '1.消费税概述', link: '/subjects/taxlaw/taxlaw1/03-01.md' },
              { text: '2.纳税人和扣缴义务人', link: '/subjects/taxlaw/taxlaw1/03-02.md' },
              { text: '3.税目和税率', link: '/subjects/taxlaw/taxlaw1/03-03.md' },
              { text: '4.计税依据', link: '/subjects/taxlaw/taxlaw1/03-04.md' },
              { text: '5.生产销售应税消费品应纳税额的计算', link: '/subjects/taxlaw/taxlaw1/03-05.md' },
              { text: '6.委托加工应税消费品应纳税额的计算', link: '/subjects/taxlaw/taxlaw1/03-06.md' },
              { text: '7.进口应税消费品应纳消费税的计算', link: '/subjects/taxlaw/taxlaw1/03-07.md' },
              { text: '8.批发、零售环节应纳消费税的计算', link: '/subjects/taxlaw/taxlaw1/03-08.md' },
              { text: '9.出口应税消费品的相关政策', link: '/subjects/taxlaw/taxlaw1/03-09.md' },
              { text: '10.征收管理', link: '/subjects/taxlaw/taxlaw1/03-10.md' }
            ]
          },
          {
            text: '三、城市维护建设税',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.城市维护建设税概述', link: '/subjects/taxlaw/taxlaw1/04-01.md' },
              { text: '2.纳税人', link: '/subjects/taxlaw/taxlaw1/04-02.md' },
              { text: '3.征税范围', link: '/subjects/taxlaw/taxlaw1/04-03.md' },
              { text: '4.税率', link: '/subjects/taxlaw/taxlaw1/04-04.md' },
              { text: '5.税收优惠', link: '/subjects/taxlaw/taxlaw1/04-05.md' },
              { text: '6.计税依据', link: '/subjects/taxlaw/taxlaw1/04-06.md' },
              { text: '7.应纳税额的计算', link: '/subjects/taxlaw/taxlaw1/04-07.md' },
              { text: '8.征收管理', link: '/subjects/taxlaw/taxlaw1/04-08.md' }
            ]
          },
          {
            text: '四、土地增值税',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.土地增值税概述', link: '/subjects/taxlaw/taxlaw1/05-01.md' },
              { text: '2.纳税人', link: '/subjects/taxlaw/taxlaw1/05-02.md' },
              { text: '3.征税范围和税率', link: '/subjects/taxlaw/taxlaw1/05-03.md' },
              { text: '4.计税依据', link: '/subjects/taxlaw/taxlaw1/05-04.md' },
              { text: '5.税收优惠', link: '/subjects/taxlaw/taxlaw1/05-05.md' },
              { text: '6.应纳税额的计算', link: '/subjects/taxlaw/taxlaw1/05-06.md' },
              { text: '7.房地产开发企业土地增值税清算', link: '/subjects/taxlaw/taxlaw1/05-07.md' },
              { text: '8.征收管理', link: '/subjects/taxlaw/taxlaw1/05-08.md' }
            ]
          },
          {
            text: '五、资源税',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.资源税概述', link: '/subjects/taxlaw/taxlaw1/06-01.md' },
              { text: '2.纳税人', link: '/subjects/taxlaw/taxlaw1/06-02.md' },
              { text: '3.税目和税率', link: '/subjects/taxlaw/taxlaw1/06-03.md' },
              { text: '4.税收优惠', link: '/subjects/taxlaw/taxlaw1/06-04.md' },
              { text: '5.计税依据和应纳税额的计算', link: '/subjects/taxlaw/taxlaw1/06-05.md' },
              { text: '6.征收管理', link: '/subjects/taxlaw/taxlaw1/06-06.md' },
              { text: '7.水资源税', link: '/subjects/taxlaw/taxlaw1/06-07.md' }
            ]
          },
          {
            text: '六、车辆购置税',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.车辆购置税概述', link: '/subjects/taxlaw/taxlaw1/07-01.md' },
              { text: '2.纳税人', link: '/subjects/taxlaw/taxlaw1/07-02.md' },
              { text: '3.征税范围和税率', link: '/subjects/taxlaw/taxlaw1/07-03.md' },
              { text: '4.税收优惠', link: '/subjects/taxlaw/taxlaw1/07-04.md' },
              { text: '5.计税依据', link: '/subjects/taxlaw/taxlaw1/07-05.md' },
              { text: '6.应纳税额的计算', link: '/subjects/taxlaw/taxlaw1/07-06.md' },
              { text: '7.征收管理', link: '/subjects/taxlaw/taxlaw1/07-07.md' }
            ]
          },
          {
            text: '七、环境保护税',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.环境保护税概述', link: '/subjects/taxlaw/taxlaw1/08-01.md' },
              { text: '2.纳税人和征税对象', link: '/subjects/taxlaw/taxlaw1/08-02.md' },
              { text: '3.税目和税率', link: '/subjects/taxlaw/taxlaw1/08-03.md' },
              { text: '4.税收优惠', link: '/subjects/taxlaw/taxlaw1/08-04.md' },
              { text: '5.计税依据与应纳税额计算', link: '/subjects/taxlaw/taxlaw1/08-05.md' },
              { text: '6.征收管理', link: '/subjects/taxlaw/taxlaw1/08-06.md' }
            ]
          },
          {
            text: '八、烟叶税',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.烟叶税概述', link: '/subjects/taxlaw/taxlaw1/09-01.md' },
              { text: '2.纳税人', link: '/subjects/taxlaw/taxlaw1/09-02.md' },
              { text: '3.征税对象和税率', link: '/subjects/taxlaw/taxlaw1/09-03.md' },
              { text: '4.计税依据', link: '/subjects/taxlaw/taxlaw1/09-04.md' },
              { text: '5.应纳税额的计算', link: '/subjects/taxlaw/taxlaw1/09-05.md' },
              { text: '6.征收管理', link: '/subjects/taxlaw/taxlaw1/09-06.md' }
            ]
          },
          {
            text: '九、关税',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.关税概述', link: '/subjects/taxlaw/taxlaw1/10-01.md' },
              { text: '2.纳税人、扣缴义务人和征税对象', link: '/subjects/taxlaw/taxlaw1/10-02.md' },
              { text: '3.税率及税率适用', link: '/subjects/taxlaw/taxlaw1/10-03.md' },
              { text: '4.计税价格', link: '/subjects/taxlaw/taxlaw1/10-04.md' },
              { text: '5.应纳税额计算', link: '/subjects/taxlaw/taxlaw1/10-05.md' },
              { text: '6.税收优惠', link: '/subjects/taxlaw/taxlaw1/10-06.md' },
              { text: '7.征收管理', link: '/subjects/taxlaw/taxlaw1/10-07.md' }
            ]
          },
          {
            text: '十、社会保险费',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.社会保险费概述', link: '/subjects/taxlaw/taxlaw1/11-01.md' },
              { text: '2.基本养老保险费', link: '/subjects/taxlaw/taxlaw1/11-02.md' },
              { text: '3.基本医疗保险费和生育保险费', link: '/subjects/taxlaw/taxlaw1/11-03.md' },
              { text: '4.工伤保险费和职业伤害保障费', link: '/subjects/taxlaw/taxlaw1/11-04.md' },
              { text: '5.失业保险费', link: '/subjects/taxlaw/taxlaw1/11-05.md' },
              { text: '6.社会保险费征缴', link: '/subjects/taxlaw/taxlaw1/11-06.md' }
            ]
          },
          {
            text: '十一、非税收入',
            link: '/subjects/taxlaw/taxlaw1/123.md',
            collapsed: true,
            items: [
              { text: '1.非税收入概述', link: '/subjects/taxlaw/taxlaw1/12-01.md' },
              { text: '2.行政事业性收费', link: '/subjects/taxlaw/taxlaw1/12-02.md' },
              { text: '3.政府性基金', link: '/subjects/taxlaw/taxlaw1/12-03.md' },
              { text: '4.国有资源(资产)有偿使用收入', link: '/subjects/taxlaw/taxlaw1/12-04.md' },
              { text: '5.其他类别的非税收入', link: '/subjects/taxlaw/taxlaw1/12-05.md' }
            ]
          },
          ]
        },
      
        {text: '《税法二》',
          collapsed: true,
          items: [
            {
        text: '一、企业所得税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/01-01.md' },
          { text: '2.纳税人、征税对象与税率', link: '/subjects/taxlaw/taxlaw2/01-02.md' },
          { text: '3.应纳税所得额的计算', link: '/subjects/taxlaw/taxlaw2/01-03.md' },
          { text: '4.资产的所得税处理', link: '/subjects/taxlaw/taxlaw2/01-04.md' },
          { text: '5.资产损失税前扣除的所得税处理', link: '/subjects/taxlaw/taxlaw2/01-05.md' },
          { text: '6.企业重组的所得税处理', link: '/subjects/taxlaw/taxlaw2/01-06.md' },
          { text: '7.房地产开发经营业务的所得税处理', link: '/subjects/taxlaw/taxlaw2/01-07.md' },
          { text: '8.减免税优惠', link: '/subjects/taxlaw/taxlaw2/01-08.md' },
          { text: '9.应纳税额的计算', link: '/subjects/taxlaw/taxlaw2/01-09.md' },
          { text: '10.特别纳税调整', link: '/subjects/taxlaw/taxlaw2/01-10.md' },
          { text: '11.征收管理', link: '/subjects/taxlaw/taxlaw2/01-11.md' }
        ]
      },
      {
        text: '二、个人所得税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/02-01.md' },
          { text: '2.征税对象', link: '/subjects/taxlaw/taxlaw2/02-02.md' },
          { text: '3.纳税人、税率与应纳税所得额的确定', link: '/subjects/taxlaw/taxlaw2/02-03.md' },
          { text: '4.减免税优惠', link: '/subjects/taxlaw/taxlaw2/02-04.md' },
          { text: '5.应纳税额的计算', link: '/subjects/taxlaw/taxlaw2/02-05.md' },
          { text: '6.个人取得境外所得的计税方法和申报管理', link: '/subjects/taxlaw/taxlaw2/02-06.md' },
          { text: '7.征收管理', link: '/subjects/taxlaw/taxlaw2/02-07.md' }
        ]
      },
      {
        text: '三、国际税收',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/03-01.md' },
          { text: '2.国际税收协定', link: '/subjects/taxlaw/taxlaw2/03-02.md' },
          { text: '3.非居民企业税收管理', link: '/subjects/taxlaw/taxlaw2/03-03.md' },
          { text: '4.国际税收抵免制度', link: '/subjects/taxlaw/taxlaw2/03-04.md' },
          { text: '5.国际避税与反避税', link: '/subjects/taxlaw/taxlaw2/03-05.md' },
          { text: '6.国际税收征管协作', link: '/subjects/taxlaw/taxlaw2/03-06.md' }
        ]
      },
      {
        text: '四、印花税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/04-01.md' },
          { text: '2.征税范围、纳税人与税率', link: '/subjects/taxlaw/taxlaw2/04-02.md' },
          { text: '3.减免税优惠', link: '/subjects/taxlaw/taxlaw2/04-03.md' },
          { text: '4.计税依据与应纳税额的计算', link: '/subjects/taxlaw/taxlaw2/04-04.md' },
          { text: '5.征收管理', link: '/subjects/taxlaw/taxlaw2/04-05.md' },
          { text: '6.应纳税额的计算', link: '/subjects/taxlaw/taxlaw2/04-06.md' } // 注：最后一张图右侧接续部分
        ]
      },
      {
        text: '五、房产税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/05-01.md' },
          { text: '2.征税范围、纳税人与税率', link: '/subjects/taxlaw/taxlaw2/05-02.md' },
          { text: '3.减免税优惠', link: '/subjects/taxlaw/taxlaw2/05-03.md' },
          { text: '4.计税依据与应纳税额的计算', link: '/subjects/taxlaw/taxlaw2/05-04.md' },
          { text: '5.征收管理', link: '/subjects/taxlaw/taxlaw2/05-05.md' }
        ]
      },
      {
        text: '六、车船税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/06-01.md' },
          { text: '2.征税范围、纳税人、税目与税额', link: '/subjects/taxlaw/taxlaw2/06-02.md' },
          { text: '3.减免税优惠', link: '/subjects/taxlaw/taxlaw2/06-03.md' },
          { text: '4.应纳税额的计算与代收代缴', link: '/subjects/taxlaw/taxlaw2/06-04.md' },
          { text: '5.征收管理', link: '/subjects/taxlaw/taxlaw2/06-05.md' }
        ]
      },
      {
        text: '七、契税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/07-01.md' },
          { text: '2.征税范围、纳税人与税率', link: '/subjects/taxlaw/taxlaw2/07-02.md' },
          { text: '3.减免税优惠', link: '/subjects/taxlaw/taxlaw2/07-03.md' },
          { text: '4.计税依据与应纳税额的计算', link: '/subjects/taxlaw/taxlaw2/07-04.md' },
          { text: '5.征收管理', link: '/subjects/taxlaw/taxlaw2/07-05.md' }
        ]
      },
      {
        text: '八、城镇土地使用税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/08-01.md' },
          { text: '2.征税范围、纳税人与适用税额', link: '/subjects/taxlaw/taxlaw2/08-02.md' },
          { text: '3.减免税优惠', link: '/subjects/taxlaw/taxlaw2/08-03.md' },
          { text: '4.计税依据与应纳税额的计算', link: '/subjects/taxlaw/taxlaw2/08-04.md' },
          { text: '5.征收管理', link: '/subjects/taxlaw/taxlaw2/08-05.md' }
        ]
      },
      {
        text: '九、耕地占用税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/09-01.md' },
          { text: '2.纳税人与征税范围', link: '/subjects/taxlaw/taxlaw2/09-02.md' },
          { text: '3.减免税优惠', link: '/subjects/taxlaw/taxlaw2/09-03.md' }
        ]
      },
      {
        text: '十、船舶吨税',
        link: '/subjects/taxlaw/taxlaw2/123.md',
        collapsed: true,
        items: [
          { text: '1.概述', link: '/subjects/taxlaw/taxlaw2/10-01.md' },
          { text: '2.纳税人、征税范围与税率', link: '/subjects/taxlaw/taxlaw2/10-02.md' },
          { text: '3.减免税优惠', link: '/subjects/taxlaw/taxlaw2/10-03.md' },
          { text: '4.应纳税额的计算', link: '/subjects/taxlaw/taxlaw2/10-04.md' },
          { text: '5.征收管理', link: '/subjects/taxlaw/taxlaw2/10-05.md' }
        ]
      },
          ]
        }
      ],

      '/about/': [
        {
          text: '站点说明',
          items: [{ text: '写作与 frontmatter 规范', link: '/about/conventions' }]
        }
      ]
    },
    

    outline: { level: [2, 3], label: '本页目录' },

    // ---------- 本地全文搜索 ----------
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          // 中文没有空格分词，这里改为「汉字逐字 + 英数按词」切分
          tokenize: (text: string) => text.match(/[\u4e00-\u9fa5]|[a-zA-Z0-9]+/g) || [],
          options: {
            // 中文不做大小写折叠，英文统一转小写
            processTerm: (term: string) =>
              /[\u4e00-\u9fa5]/.test(term) ? term : term.toLowerCase()
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 1, titles: 2 }
          }
        },
        // 单语言站点直接写 translations，等价作用于当前 locale
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '未找到与',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
    },

    // ---------- 界面中文化 ----------
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '目录',
    outlineTitle: '本页目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    langMenuLabel: '语言',
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'medium', timeStyle: 'short' }
    },
    notFound: {
      title: '页面走丢了',
      quote: '这个地址下暂时没有内容，也许它已经被移动或重命名。',
      linkText: '返回首页'
    },
    footer: {
      message: '使用 VitePress 构建 · 全部内容以 Markdown 维护',
      copyright: 'Copyright © 2026 个人知识库'
    }
  },

  // ---------- Sitemap（可选） ----------
  sitemap: SITE_HOSTNAME ? { hostname: SITE_HOSTNAME } : undefined,

  vite: {
    server: { port: 5173 }
  }
})
