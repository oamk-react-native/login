import React from 'react'
import { Appbar } from 'react-native-paper';

export default function MainApplicationbar({title}) {
  return (
    <Appbar.Header
      elevated={true}
      mode="center-aligned"
    >
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}