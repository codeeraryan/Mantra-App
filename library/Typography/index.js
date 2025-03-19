import { Text } from 'react-native'
import React from 'react'

const Typography = ({children, style}) => {
  return (
      <Text
      allowFontScaling={false}
      style={style}>{children}</Text>
  )
}

export default Typography