import Vue from 'vue'
import Router from 'vue-router'
import {getPlatform} from 'api/login'
Vue.use(Router)

// mobileRouter
const HomePage = (resolve) => {
  import ('components/home-page/home-page').then((module) => {
    resolve(module)
  })
}

const HomeDetial = (resolve) => {
  import ('components/home-detial/home-detial').then((module) => {
    resolve(module)
  })
}

const CompareList = (resolve) => {
  import ('components/compare-list/compare-list').then((module) => {
    resolve(module)
  })
}

const CompareContent = (resolve) => {
  import ('components/compare-list/compare-content').then((module) => {
    resolve(module)
  })
}

const MyPublish = (resolve) => {
  import ('components/my-publish/my-publish').then((module) => {
    resolve(module)
  })
}

const PublishPage = (resolve) => {
  import ('components/my-publish/publish-page').then((module) => {
    resolve(module)
  })
}

const PublishType = (resolve) => {
  import ('components/my-publish/publish-type').then((module) => {
    resolve(module)
  })
}

const Setting = (resolve) => {
  import ('components/setting/setting').then((module) => {
    resolve(module)
  })
}

const SettingInput = (resolve) => {
  import ('components/setting/setting-input').then((module) => {
    resolve(module)
  })
}
const SettingOrder = (resolve) => {
  import ('components/setting/setting-order').then((module) => {
    resolve(module)
  })
}
const SettingCollect = (resolve) => {
  import ('components/setting/setting-collect').then((module) => {
    resolve(module)
  })
}
const SettingCompare = (resolve) => {
  import ('components/setting/setting-compare').then((module) => {
    resolve(module)
  })
}
const SettingWallet = (resolve) => {
  import ('components/setting/setting-wallet').then((module) => {
    resolve(module)
  })
}

const LoginPage = (resolve) => {
  import ('components/login/login').then((module) => {
    resolve(module)
  })
}
const Register = (resolve) => {
  import ('components/login/register').then((module) => {
    resolve(module)
  })
}
const SearchPage = (resolve) => {
  import ('components/search-page/search-page').then((module) => {
    resolve(module)
  })
}
const SearchType = (resolve) => {
  import ('components/search-page/search-type').then((module) => {
    resolve(module)
  })
}

const SearchResult = (resolve) => {
  import ('components/search-page/search-result').then((module) => {
    resolve(module)
  })
}
const mobileRouter = [
  {
    path: '/',
    redirect: getPlatform() ? '/home' : '/pc/home'
  }, {
    path: '/login',
    component: LoginPage,
    meta: { title: '登录' }
  },
  {
    path: '/register/:type',
    component: Register,
    meta: { title: '注册' }
  },
  {
    path: '/searchPage',
    component: SearchPage,
    meta: { title: '搜索类别' },
    children: [{
      path: ':id',
      component: SearchType,
      meta: { title: '高级筛选' }
    }]
  },
  {
    path: '/searchResult',
    component: SearchResult,
    meta: { title: '搜索结果' }
  }, {
    path: '/home',
    component: HomePage,
    meta: { title: '首页' },
    children: [{
      path: 'detail/:id',
      component: HomeDetial,
      meta: { title: '房源详情' }
    }]
  }, {
    path: '/homeList/:id',
    component: HomeDetial,
    meta: { title: '房源详情' }
  }, {
    path: '/compareList',
    component: CompareList,
    meta: { title: '房源对比' },
    children: [{
      path: 'comp',
      component: CompareContent,
      meta: { title: '对比结果' }
    }]
  }, {
    path: '/myPublish',
    component: MyPublish,
    meta: { title: '我的发布' },
    children: [{
      path: 'publishPage/:id',
      component: PublishPage,
      meta: { title: '上传类别' }
    }, {
      path: 'publishType',
      component: PublishType,
      meta: { title: '上传房源' }
    }]
  }, {
    path: '/setting',
    component: Setting,
    meta: { title: '个人中心' },
    children: [{
      path: 'member',
      component: SettingInput,
      meta: { title: '个人信息' }
    }, {
      path: 'order',
      component: SettingOrder,
      meta: { title: '我的订单' }
    }, {
      path: 'collect',
      component: SettingCollect,
      meta: { title: '我的收藏' }
    },
    {
      path: 'detail/:id',
      component: HomeDetial,
      meta: { title: '房源详情' }
    },
    {
      path: 'connect',
      component: SettingInput,
      meta: { title: '联系我们' }
    }, {
      path: 'compare',
      component: SettingCompare,
      meta: { title: '我的对比' }
    }, {
      path: 'wallet',
      component: SettingWallet,
      meta: { title: '我的钱包' }
    }, {
      path: 'suggest',
      component: SettingInput,
      meta: { title: '意见反馈' }
    }, {
      path: 'system',
      component: SettingInput,
      meta: { title: '系统设置' }
    }, {
      path: ':id',
      component: PublishPage,
      meta: { title: '我要预租' }
    }]
  }
]

// pcRouter
const PCHomePage = (resolve) => {
  import ('components/home-page/pc-home-page').then((module) => {
    resolve(module)
  })
}

const PCHomeDetial = (resolve) => {
  import ('components/home-detial/pc-home-detial').then((module) => {
    resolve(module)
  })
}

const PCCompareList = (resolve) => {
  import ('components/compare-list/pc-compare-list').then((module) => {
    resolve(module)
  })
}

const PCCompareContent = (resolve) => {
  import ('components/compare-list/pc-compare-content').then((module) => {
    resolve(module)
  })
}

const PCMyPublish = (resolve) => {
  import ('components/my-publish/pc-my-publish').then((module) => {
    resolve(module)
  })
}

const PCPublishPage = (resolve) => {
  import ('components/my-publish/pc-publish-page').then((module) => {
    resolve(module)
  })
}

const PCPublishType = (resolve) => {
  import ('components/my-publish/pc-publish-type').then((module) => {
    resolve(module)
  })
}

const PCSetting = (resolve) => {
  import ('components/setting/pc-setting').then((module) => {
    resolve(module)
  })
}

const PCSettingInput = (resolve) => {
  import ('components/setting/pc-setting-input').then((module) => {
    resolve(module)
  })
}
const PCSettingOrder = (resolve) => {
  import ('components/setting/pc-setting-order').then((module) => {
    resolve(module)
  })
}
const PCSettingCollect = (resolve) => {
  import ('components/setting/pc-setting-collect').then((module) => {
    resolve(module)
  })
}
const PCSettingCompare = (resolve) => {
  import ('components/setting/pc-setting-compare').then((module) => {
    resolve(module)
  })
}
const PCSettingWallet = (resolve) => {
  import ('components/setting/pc-setting-wallet').then((module) => {
    resolve(module)
  })
}

const PCLoginPage = (resolve) => {
  import ('components/login/pc-login').then((module) => {
    resolve(module)
  })
}
const PCRegister = (resolve) => {
  import ('components/login/pc-register').then((module) => {
    resolve(module)
  })
}
const PCSearchPage = (resolve) => {
  import ('components/search-page/pc-search-page').then((module) => {
    resolve(module)
  })
}
const PCSearchType = (resolve) => {
  import ('components/search-page/pc-search-type').then((module) => {
    resolve(module)
  })
}

const PCSearchResult = (resolve) => {
  import ('components/search-page/pc-search-result').then((module) => {
    resolve(module)
  })
}
const pcRouter = [
  {
    path: '/pc',
    redirect: '/pc/home'
  }, {
    path: '/pc/login',
    component: PCLoginPage,
    meta: { title: '登录' }
  }, {
    path: '/pc/register/:type',
    component: PCRegister,
    meta: { title: '修改密码' }
  }, {
    path: '/pc/searchPage',
    component: PCSearchPage,
    meta: { title: '高级筛选' }
  }, {
    path: '/pc/searchPage/:id',
    component: PCSearchType,
    meta: { title: '高级筛选' }
  }, {
    path: '/pc/searchResult',
    component: PCSearchResult,
    meta: { title: '搜索结果' }
  }, {
    path: '/pc/home',
    component: PCHomePage,
    meta: { title: '首页' }
  }, {
    path: '/pc/home/detail/:id',
    component: PCHomeDetial,
    meta: { title: '房源详情' }
  }, {
    path: '/pc/compareList',
    component: PCCompareList,
    meta: { title: '房源对比' }
  }, {
    path: '/pc/compareList/comp',
    component: PCCompareContent,
    meta: { title: '对比结果' }
  }, {
    path: '/pc/myPublish',
    component: PCMyPublish,
    meta: { title: '我的发布' }
  }, {
    path: '/pc/publishPage/:id',
    component: PCPublishPage,
    meta: { title: '房源发布' }
  }, {
    path: '/pc/setting',
    component: PCSetting,
    meta: { title: '个人中心' },
    children: [{
      path: 'member',
      component: PCSettingInput,
      meta: { title: '个人中心' }
    }, {
      path: 'order',
      component: PCSettingOrder,
      meta: { title: '我的订单' }
    }, {
      path: 'collect',
      component: PCSettingCollect,
      meta: { title: '我的收藏' }
    },
    {
      path: 'connect',
      component: PCSettingInput,
      meta: { title: '联系我们' }
    }, {
      path: 'compare',
      component: PCSettingCompare,
      meta: { title: '我的对比' }
    }, {
      path: 'wallet',
      component: PCSettingWallet,
      meta: { title: '我的钱包' }
    }, {
      path: 'suggest',
      component: PCSettingInput,
      meta: { title: '意见反馈' }
    }, {
      path: 'system',
      component: PCSettingInput,
      meta: { title: '设置' }
    }, {
      path: ':id',
      component: PCPublishPage,
      meta: { title: '我要预租' }
    }]
  }
]
// adminRouter 后台路由

const AdminLogin = (resolve) => {
  import ('components/admin/login').then((module) => {
    resolve(module)
  })
}
const AdminHome = (resolve) => {
  import ('components/admin/home').then((module) => {
    resolve(module)
  })
}
const AdminMember = (resolve) => {
  import ('components/admin/member').then((module) => {
    resolve(module)
  })
}
const AdminHouse = (resolve) => {
  import ('components/admin/house').then((module) => {
    resolve(module)
  })
}
const AdminHouseDetial = (resolve) => {
  import ('components/admin/house-detial').then((module) => {
    resolve(module)
  })
}
const AdminPreLease = (resolve) => {
  import ('components/admin/prelease').then((module) => {
    resolve(module)
  })
}
const AdminPreLeaseDetial = (resolve) => {
  import ('components/admin/prelease-detial').then((module) => {
    resolve(module)
  })
}
const AdminFund = (resolve) => {
  import ('components/admin/fund').then((module) => {
    resolve(module)
  })
}
const AdminFundDetial = (resolve) => {
  import ('components/admin/fund-detial').then((module) => {
    resolve(module)
  })
}
const AdminAdvertisement = (resolve) => {
  import ('components/admin/advertisement').then((module) => {
    resolve(module)
  })
}
const AdminAdvertisementDetial = (resolve) => {
  import ('components/admin/advertisement-detial').then((module) => {
    resolve(module)
  })
}
const AdminReply = (resolve) => {
  import ('components/admin/reply').then((module) => {
    resolve(module)
  })
}
const AdminReplyDetial = (resolve) => {
  import ('components/admin/reply-detial').then((module) => {
    resolve(module)
  })
}
const AdminDeposit = (resolve) => {
  import ('components/admin/deposit').then((module) => {
    resolve(module)
  })
}
const AdminDepositDetial = (resolve) => {
  import ('components/admin/deposit-detial').then((module) => {
    resolve(module)
  })
}

const adminRouter = [
  {
    path: '/admin/login',
    component: AdminLogin,
    meta: { title: '后台登录' }
  }, {
    path: '/admin',
    component: AdminHome,
    meta: { title: '后台首页' },
    children: [{
      path: 'member',
      component: AdminMember,
      meta: { title: '会员管理' }
    }, {
      path: 'house',
      component: AdminHouse,
      meta: { title: '房源管理' }
    }, {
      path: 'houseDetial/:id',
      component: AdminHouseDetial,
      meta: { title: '房源详情' }
    },
    {
      path: 'preLease',
      component: AdminPreLease,
      meta: { title: '预租管理' }
    }, {
      path: 'preLeaseDetial/:id',
      component: AdminPreLeaseDetial,
      meta: { title: '预租详情' }
    }, {
      path: 'fund',
      component: AdminFund,
      meta: { title: '资金管理' }
    }, {
      path: 'fundDetial',
      component: AdminFundDetial,
      meta: { title: '资金详情' }
    }, {
      path: 'advertisement',
      component: AdminAdvertisement,
      meta: { title: '广告管理' }
    }, {
      path: 'advertisementDetial',
      component: AdminAdvertisementDetial,
      meta: { title: '广告详情' }
    }, {
      path: 'addAdvertisement',
      component: AdminAdvertisementDetial,
      meta: { title: '广告详情' }
    }, {
      path: 'reply',
      component: AdminReply,
      meta: { title: '反馈管理' }
    }, {
      path: 'replyDetial',
      component: AdminReplyDetial,
      meta: { title: '反馈详情' }
    }, {
      path: 'deposit',
      component: AdminDeposit,
      meta: { title: '押金管理' }
    }, {
      path: 'depositDetial',
      component: AdminDepositDetial,
      meta: { title: '押金详情' }
    }]
  }
]
const allRouter = mobileRouter.concat(pcRouter, adminRouter)

const vuerouter = new Router({ routes: allRouter })

vuerouter.beforeEach((to, from, next) => {
  // ...
  document.title = to.meta.title
  next()
})

export default vuerouter