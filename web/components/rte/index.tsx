import { Loader, Text } from '@mantine/core';
import { RichTextEditorProps } from '@mantine/rte';
import { useEffect, useState } from 'react';
import RichTextEditor from './rte';

export default (props: RichTextEditorProps) => {
  const [canRender, setCanRender] = useState(false);
  useEffect(() => setCanRender(true), []);

  if (!canRender) {
    const { value } = props
    if (typeof value === 'string') {
      return <Text style={props.style}>{value}</Text>
    }
    return <Loader style={{ minHeight: 200 }}/>
  }

  return <RichTextEditor {...props} />;
}
