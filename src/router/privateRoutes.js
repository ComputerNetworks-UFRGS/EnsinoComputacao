import AppFooter from "./../layout/AppFooter"
import DashHeader from "./../layout/dash/DashHeader"
import DashBase from "./../views/dash/DashBase"
import DashWelcome from "./../views/dash/DashWelcome"
import DashTasks from "./../views/dash/task/TaskHome"
import TaskForm from "./../views/dash/task/TaskForm"
import TaskAttachment from './../views/dash/task/TaskAttachment'
import RoleList from "./../views/dash/role/RoleList"
import RoleEdit from "./../views/dash/role/RoleEdit"
import RoleForm from "./../views/dash/role/RoleForm"
import UserList from "./../views/dash/user/UserList"
import UserForm from "./../views/dash/user/UserForm"
import ReviewList from "./../views/dash/review/ReviewList"
import ReviewEdit from "./../views/dash/review/ReviewEdit"
import TagList from "./../views/dash/tag/TagList"
import TagForm from "./../views/dash/tag/TagForm"
import ObjectList from "./../views/dash/object/ObjectList"
import ObjectForm from "./../views/dash/object/ObjectForm"
import SkillList from "./../views/dash/skill/SkillList"
import SkillForm from "./../views/dash/skill/SkillForm"
import GraphList from "./../views/dash/graph/GraphList"
import GraphForm from "./../views/dash/graph/GraphForm"
import GraphEdit from "./../views/dash/graph/GraphEdit"
import GraphEditPreview from "./../views/dash/graph/GraphEditPreview"

export default {
    path: "/dash",
    components: {
        header: DashHeader,
        default: DashBase,
        footer: AppFooter
    },
    props: {
        footer: { isBasic: true, }
    },
    meta: { requiresAuth: true, },
    children: [
        {
            path: 'welcome',
            component: DashWelcome,
        },
        {
            path: 'atividades',
            component: DashTasks,
        },
        {
            path: 'atividades/criar',
            component: TaskForm,
        },
        {
            path: 'atividades/editar/:id',
            component: TaskForm,
            props: true
        },
        {
            path: 'atividades/anexos/:id',
            component: TaskAttachment
        },
        {
            path: 'papeis',
            component: RoleList,
        },
        {
            path: 'papeis/criar',
            component: RoleForm,
        },
        {
            path: 'papeis/:id',
            component: RoleEdit,
        },
        {
            path: 'usuarios',
            component: UserList,
        },
        {
            path: 'usuarios/:id/:role_id',
            component: UserForm,
        },
        {
            path: 'revisao',
            component: ReviewList,
        },
        {
            path: 'revisao/:id',
            component: ReviewEdit,
        },
        {
            path: 'tags',
            component: TagList,
        },
        {
            path: 'tags/criar',
            component: TagForm,
        },
        {
            path: 'tags/editar/:id',
            component: TagForm,
        },
        {
            path: 'objetos',
            component: ObjectList,
        },
        {
            path: 'objetos/criar',
            component: ObjectForm,
        },
        {
            path: 'objetos/editar/:id',
            component: ObjectForm,
        },
        {
            path: 'habilidades',
            component: SkillList,
        },
        {
            path: 'habilidades/criar',
            component: SkillForm,
        },
        {
            path: 'habilidades/editar/:id',
            component: SkillForm,
            props: true
        },
        {
            path: 'curriculos',
            component: GraphList,
        },
        {
            path: 'curriculos/criar',
            component: GraphForm,
        },
        {
            path: 'curriculos/editar/:id',
            component: GraphForm,
            props: true
        },
        {
            path: 'curriculos/editar/:id/criar',
            component: GraphEdit,
            props: true
        },
        {
            path: 'curriculos/editar/:id/visual',
            component: GraphEditPreview,
            props: true
        },
    ]
}