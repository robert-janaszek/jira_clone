import { Center, Loader } from '@mantine/core';
import dynamic from 'next/dynamic';

export default dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => <Center>
    <Loader style={{ minHeight: 200 }}/>
  </Center>,
})
