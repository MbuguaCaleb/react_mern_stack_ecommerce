import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>
}

//setting a default prop
Message.defaultProps = {
  variant: 'info',
}
export default Message
