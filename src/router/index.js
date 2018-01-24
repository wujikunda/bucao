import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const AdminLogin = (resolve) => {
  import('components/admin/login').then((module) => {
    resolve(module)
  })
}
const AdminHome = (resolve) => {
  import('components/admin/home').then((module) => {
    resolve(module)
  })
}
const Bucao = (resolve) => {
  import('components/bucao/bucao').then((module) => {
    resolve(module)
  })
}
const BucaoList = (resolve) => {
  import('components/bucao/bucao-list').then((module) => {
    resolve(module)
  })
}
const BucaoType = (resolve) => {
  import('components/bucao/bucao-type').then((module) => {
    resolve(module)
  })
}
const BucaoStore = (resolve) => {
  import('components/bucao/bucao-store').then((module) => {
    resolve(module)
  })
}
const BucaoStoreIn = (resolve) => {
  import('components/bucao/bucao-store-in').then((module) => {
    resolve(module)
  })
}
const BucaoTypeEdit = (resolve) => {
  import('components/bucao/bucao-type-edit').then((module) => {
    resolve(module)
  })
}
const BucaoEdit = (resolve) => {
  import('components/bucao/bucao-edit').then((module) => {
    resolve(module)
  })
}
const RFID = (resolve) => {
  import('components/rfid/rfid').then((module) => {
    resolve(module)
  })
}
const RFIDList = (resolve) => {
  import('components/rfid/rfid-list').then((module) => {
    resolve(module)
  })
}
const RFIDEdit = (resolve) => {
  import('components/rfid/rfid-edit').then((module) => {
    resolve(module)
  })
}
const Hotel = (resolve) => {
  import('components/hotel/hotel').then((module) => {
    resolve(module)
  })
}
const HotelEdit = (resolve) => {
  import('components/hotel/hotel-edit').then((module) => {
    resolve(module)
  })
}
const HotelDetial = (resolve) => {
  import('components/hotel/hotel-detial').then((module) => {
    resolve(module)
  })
}
const Washing = (resolve) => {
  import('components/washing/washing').then((module) => {
    resolve(module)
  })
}
const WashingDetial = (resolve) => {
  import('components/washing/washing-detial').then((module) => {
    resolve(module)
  })
}
const WashingEdit = (resolve) => {
  import('components/washing/washing-edit').then((module) => {
    resolve(module)
  })
}
const Order = (resolve) => {
  import('components/order/order').then((module) => {
    resolve(module)
  })
}
const OrderDetial = (resolve) => {
  import('components/order/order-detial').then((module) => {
    resolve(module)
  })
}
const OrderEdit = (resolve) => {
  import('components/order/order-edit').then((module) => {
    resolve(module)
  })
}
const MemberEdit = (resolve) => {
  import('components/member/member-edit').then((module) => {
    resolve(module)
  })
}
const MemberDetial = (resolve) => {
  import('components/member/member-detial').then((module) => {
    resolve(module)
  })
}
const Member = (resolve) => {
  import('components/member/member').then((module) => {
    resolve(module)
  })
}
const Fund = (resolve) => {
  import('components/fund/fund').then((module) => {
    resolve(module)
  })
}
const adminRouter = [
  {
    path: '/',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    component: AdminLogin,
    meta: { title: '后台登录' }
  },
  {
    path: '/admin',
    component: AdminHome,
    meta: { title: '后台首页' },
    children: [{
      path: '/admin/bucao',
      redirect: '/admin/bucao/list',
      component: Bucao,
      meta: { title: '布草' },
      children: [
        {
          path: 'list',
          component: BucaoList,
          meta: {title: '布草列表'}
        },
        {
          path: 'type',
          component: BucaoType,
          meta: {title: '布草类型'}
        },
        {
          path: 'store',
          component: BucaoStore,
          meta: {title: '布草库存日志'}
        },
        {
          path: 'edit/:id',
          component: BucaoEdit,
          meta: {title: '布草编辑'}
        },
        {
          path: 'detial/:id',
          component: BucaoEdit,
          meta: {title: '布草详情'}
        },
        {
          path: 'type/edit/:id',
          component: BucaoTypeEdit,
          meta: {title: '布草种类新增'}
        },
        {
          path: 'store/edit/:id',
          component: BucaoStoreIn,
          meta: {title: '出入库'}
        }
      ]
    },
    {
      path: '/admin/rfid',
      redirect: '/admin/rfid/list',
      component: RFID,
      meta: { title: 'RFID' },
      children: [
        {
          path: 'list',
          component: RFIDList,
          meta: {title: 'RFID列表'}
        },
        {
          path: 'edit/:id',
          component: RFIDEdit,
          meta: {title: 'RFID编辑'}
        }
      ]
    },
    {
      path: '/admin/hotel',
      component: Hotel,
      meta: { title: '酒店管理' },
      children: [
        {
          path: 'edit/:id',
          component: HotelEdit,
          meta: {title: '酒店编辑'}
        },
        {
          path: 'detial/:id',
          component: HotelDetial,
          meta: {title: '酒店详情'}
        }
      ]
    },
    {
      path: '/admin/washplant',
      component: Washing,
      meta: { title: '洗涤厂管理' },
      children: [
        {
          path: 'edit/:id',
          component: WashingEdit,
          meta: {title: '洗涤厂编辑'}
        },
        {
          path: 'detial/:id',
          component: WashingDetial,
          meta: {title: '洗涤厂详情'}
        }
      ]
    },
    {
      path: '/admin/washplant',
      component: Washing,
      meta: { title: '洗涤厂管理' },
      children: [
        {
          path: 'edit/:id',
          component: WashingEdit,
          meta: {title: '洗涤厂编辑'}
        },
        {
          path: 'detial/:id',
          component: WashingDetial,
          meta: {title: '洗涤厂详情'}
        }
      ]
    },
    {
      path: '/admin/member',
      component: Member,
      meta: { title: '用户管理' },
      children: [
        {
          path: 'edit/:id',
          component: MemberEdit,
          meta: {title: '用户编辑'}
        },
        {
          path: 'detial/:id',
          component: MemberDetial,
          meta: {title: '用户详情'}
        }
      ]
    },
    {
      path: '/admin/order',
      component: Order,
      meta: { title: '订单管理' },
      children: [
        {
          path: 'edit/:id',
          component: OrderEdit,
          meta: {title: '订单编辑'}
        },
        {
          path: 'detial/:id',
          component: OrderDetial,
          meta: {title: '订单详情'}
        }
      ]
    },
    {
      path: '/admin/fund',
      component: Fund,
      meta: { title: '资金管理' },
      children: [
        {
          path: 'edit/:id',
          component: OrderEdit,
          meta: {title: '资金编辑'}
        },
        {
          path: 'detial/:id',
          component: OrderDetial,
          meta: {title: '资金详情'}
        }
      ]
    }
    ]
  }
]
const allRouter = [].concat(adminRouter)

const vuerouter = new Router({ routes: allRouter })

vuerouter.beforeEach((to, from, next) => {
  // ...
  document.title = to.meta.title
  next()
})

export default vuerouter