import { Loader, Text } from '@mantine/core';
import { RichTextEditorProps } from '@mantine/rte';
import { NoSSR } from '../no-ssr';
import RichTextEditor from './rte';

const SSRMockup = (props: RichTextEditorProps) => {
  const { value } = props
  if (typeof value === 'string') {
    return <Text style={props.style}>{value}</Text>
  }
  return <Loader style={{ minHeight: 200 }}/>
}

export default (props: RichTextEditorProps) => {
  return <NoSSR onSSR={<SSRMockup {...props} />}>
    <RichTextEditor {...props} />
  </NoSSR>
}
