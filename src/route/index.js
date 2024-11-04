import UserManagement from "../views/Admin/UserManagement.vue";
import Scenic from "../views/Scenic/Scenic.vue";
import ScenicDetail from "../views/Scenic/ScenicDetail.vue";
import UserSetting from "../views/User/UserSetting.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import MyReserve from "../views/Reserve/MyReserve.vue";
import TripStrategy from "../views/Trip/TripStrategy.vue";
import TripStrategyDetail from "../views/Trip/TripStrategyDetail.vue";
import MyReserveDetail from "../views/Reserve/MyReserveDetail.vue";

const routes = [
    {path: '/', title: '景区预约', component: Scenic},
    {path: '/scenicDetail/:id', title: '景区预约', component: ScenicDetail},
    {path: '/trip/strategy', title: '旅游攻略', component: TripStrategy},
    {path: '/strategyDetail/:id', title: '旅游攻略详情', component: TripStrategyDetail},
    {path: '/myReServe/:id', title: '旅游攻略详情', component: MyReserveDetail},
    {path: '/my/reserve', title: '我的预约', component: MyReserve},
    {path: '/setting', title: '个人设置', component: UserSetting},
    {path: '/admin/userManagement', title: '用户管理', component: UserManagement},
    {path: '/user/login', title: '用户登录', component: LoginPage},
    {path: '/user/register', title: '用户注册', component: RegisterPage},
]

export default routes;