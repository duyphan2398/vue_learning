import { notification } from 'ant-design-vue';


export default {
    method: {
        onSuccess (mess, des) {
            notification.success({
                message: mess,
                description: des,
                placement: 'topRight',
                duration: 1,
                style: {
                    'background': "#ca7474",
                    'font-size': 'large',
                    'width': '50%'
                }
            })
        },
        onError (mess, des) {
            notification.error({
                message: mess,
                description: des,
                placement: 'topRight',
                duration: 1,
                style: {
                    'background': "#000066",
                    'font-size': 'large',
                    'width': '50%'
                }
            })
        }
    }
}