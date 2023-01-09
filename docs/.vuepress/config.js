module.exports = {
    base: '/line/',
    title: 'Line',
    description: '',
    head: [
        // ['link', { rel: 'icon', href: '/assets/img/logo.png' }],
        // ['meta', { name: 'Keywords', content: '' }],
        // ['meta', { name: 'author', content: '刘照君' }],
        ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }], //解决站外图片引用失败的问题
        // ['link', { rel: 'manifest', href: '/assets/manifest.json' }]
    ],
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: false,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: false,
    theme: 'reco',
    themeConfig: {
        nav: [
            { text: '时间轴', link: '/timeline/', icon: 'reco-date' }
        ],
        // subSidebar: 'auto',
        // logo: '/assets/img/logo.png',
        author: '刘照君',
        startYear: '2023/1/7',
        type: 'blog',
        // 博客配置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认3
                text: '标签' // 默认文案 “标签”
            },
        }
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    }
}