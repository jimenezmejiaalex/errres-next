/*
 {
    "nid": [
        {
            "value": 28
        }
    ],
    "uuid": [
        {
            "value": "e26b44a5-1c54-4cea-ab60-dd6144399b98"
        }
    ],
    "vid": [
        {
            "value": 45
        }
    ],
    "langcode": [
        {
            "value": "en"
        }
    ],
    "type": [
        {
            "target_id": "orders",
            "target_type": "node_type",
            "target_uuid": "a7f55698-58b1-4bbc-a7f4-b9f6d779afd4"
        }
    ],
    "revision_timestamp": [
        {
            "value": "2021-02-26T05:25:27+00:00",
            "format": "Y-m-d\\TH:i:sP"
        }
    ],
    "revision_uid": [
        {
            "target_id": 2,
            "target_type": "user",
            "target_uuid": "6740929f-60c3-4d4d-864d-8d670fe2418f",
            "url": "/errres-admin/user/2"
        }
    ],
    "revision_log": [],
    "status": [
        {
            "value": true
        }
    ],
    "uid": [
        {
            "target_id": 2,
            "target_type": "user",
            "target_uuid": "6740929f-60c3-4d4d-864d-8d670fe2418f",
            "url": "/errres-admin/user/2"
        }
    ],
    "title": [
        {
            "value": "Order #1"
        }
    ],
    "created": [
        {
            "value": "2021-02-26T05:25:00+00:00",
            "format": "Y-m-d\\TH:i:sP"
        }
    ],
    "changed": [
        {
            "value": "2021-02-26T05:25:27+00:00",
            "format": "Y-m-d\\TH:i:sP"
        }
    ],
    "promote": [
        {
            "value": true
        }
    ],
    "sticky": [
        {
            "value": false
        }
    ],
    "default_langcode": [
        {
            "value": true
        }
    ],
    "revision_translation_affected": [
        {
            "value": true
        }
    ],
    "path": [
        {
            "alias": null,
            "pid": null,
            "langcode": "en"
        }
    ],
    "body": [
        {
            "value": "<p>Order Description</p>\r\n",
            "format": "basic_html",
            "processed": "<p>Order Description</p>",
            "summary": ""
        }
    ],
    "field_order_products": [
        {
            "target_id": 22,
            "target_type": "node",
            "target_uuid": "32a19d88-8d97-4e62-af5d-3e5f756aa2e0",
            "url": "/errres-admin/node/22"
        }
    ],
    "field_order_user": [
        {
            "target_id": 9,
            "target_type": "user",
            "target_uuid": "05b8372e-9e00-4f89-9053-d9a91fc91bad",
            "url": "/errres-admin/user/9"
        }
    ]
}
 */

export const createProduct = (id, uid, status = true) => {
  return {
    nid: [{ value: id }],
    field_product_for_sale: [{ value: status }],
    type: [
      {
        target_id: 'product',
        target_type: 'node_type'
      }
    ]
  }
}

const mapProduct = (product) => {
  return {
    target_id: product.id,
    target_type: 'node',
    target_uuid: product.uid,
    url: `/errres-admin/node/${product.id}`
  }
}
export function createOrder(
  title = Date.now(),
  description = '',
  products,
  user,
  state = true,
  fileReference
) {
  const order = {
    type: [
      {
        target_id: 'order',
        target_type: 'node_type'
      }
    ],
    title: [{ value: title }],
    body: [
      {
        value: description,
        format: 'basic_html',
        processed: description,
        summary: ''
      }
    ],
    field_order_products: products.map(mapProduct),
    field_order_state: [{ value: state }],
    field_order_user: [
      {
        target_id: user.id,
        target_type: 'user',
        target_uuid: user.uid,
        url: `/errres-admin/user/${user.id}`
      }
    ]
  }
  if (fileReference) {
    if (fileReference.id) {
      order.field_voucher = [
        {
          target_id: fileReference.id,
          description: 'Voucher of client tranfer'
        }
      ]
    }
    if (fileReference.idRef) {
      order.field_transfer_id_reference = [{ value: fileReference.idRef }]
    }
  }

  return order
}

export function generatePaypalUrl(clientID) {
  return `https://www.paypal.com/sdk/js?client-id=${clientID}&currency=USD&locale=es_CR`
}

export function getBinaryFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', (err) => reject(err))
    reader.readAsBinaryString(file)
  })
}

export function getReceiptID(fileReference) {
  const { fid } = fileReference
  return fid[0].value
}

export const authOBJ = {
  auth: {
    username: process.env.API_USER,
    password: process.env.API_PASS
  }
}
