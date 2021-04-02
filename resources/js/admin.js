import axios from 'axios'
import moment from 'moment'

export function initAdmin(){
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = []
    let markup
    axios.get('/admin/orders', {
        headers:{
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err =>{
        console.log(err)
    })

    function renderItems(items)
    {
        let parsedItems = Object.values(items)
        // console.log('PARS:',parsedItems)
        return parsedItems.map((menuItem) =>{
            return `
                <p>${ menuItem.item.name } - ${ menuItem.qty } pcs</p>
            `
        }).join('')
    }

    function generateMarkup(orders){
        return orders.map(order =>{
            return `
            <tr class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Orders</span>
                <p>${order._id}</p>
                <div>${ renderItems(order.items) }</div>
            </td>
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Address</span>
                ${ order.customerId.fname } ${ order.customerId.lname }
            </td>
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Address</span>
                ${ order.address }
            </td>
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                <div class="inline-block relative w-64">
                    <form action="/admin/order/status" method="POST">
                    <input type="hidden" name="orderId" value="${ order._id }">
                    <select name="status" onchange="this.form.submit()"
                        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="order_placed"
                            ${ order.status === 'order placed' ? 'selected' : '' }>
                            Placed</option>
                        <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                            Confirmed</option>
                        <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                            Prepared</option>
                        <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                            Delivered
                        </option>
                        <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                            Completed
                        </option>
                    </select>
                    </form>
                    <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                </div>
            </td>
            <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Time</span>
                ${ moment(order.createdAt).format('hh:mm A') }
            </td>
        </tr>
            `
        }).join('')
    }
}

// module.exports = initAdmin