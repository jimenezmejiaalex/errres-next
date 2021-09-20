import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/state'
import { generatePaypalUrl } from '../lib/utils'

function PaypalButton({ total, orderApprove }) {
  const buttonRef = useRef(null)
  const { general } = useAppContext()

  function setupPaypayButton() {
    window.paypal
      .Buttons({
        locale: 'es_CR',
        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: parseInt(total / general.tipoCambio.venta)
                }
              }
            ]
          })
        },
        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture().then(orderApprove)
        }
      })
      .render(buttonRef.current)
  }
  useEffect(() => {
    const script = document.createElement('script')
    script.src = generatePaypalUrl(general.paypalClientId)
    script.addEventListener('load', setupPaypayButton)
    document.body.appendChild(script)
  }, [])
  return <div className="z-20 relative" ref={buttonRef}></div>
}

export default PaypalButton
