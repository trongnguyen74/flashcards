import { Statistic } from 'antd';
import type { CountdownProps } from 'antd';
import { useHomeContext } from '../context/HomeContext';

export function CountDown() {
  const { Countdown } = Statistic;
  const { countDown, setCountDown } = useHomeContext();

  const onFinish: CountdownProps['onFinish'] = () => {
    setCountDown(false);
  };

  if(countDown){
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Countdown format="s" value={Date.now() + 4000} onFinish={onFinish} valueStyle={{fontSize: '200px'}}/>
      </div>
    )
  }
  else{
    return null;
  }
}
