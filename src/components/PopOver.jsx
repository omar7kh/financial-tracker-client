import { useContext } from 'react';
import { Button } from './ui/button';
import { Context } from '@/context/ContextProvider';

const PopOver = () => {
  const { setIsPopUp, setIsDeleteConfirm, popUpText } = useContext(Context);
  console.log(popUpText);
  return (
    <div className='fixed inset-0 z-50 bg-black/70 flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-5 border py-5 px-14 rounded-sm bg-black text-white'>
        <p>{`Sure about deleting ${popUpText} ?`}</p>
        <div className='flex gap-2'>
          <Button
            variant='ghost'
            className='text-black bg-white'
            onClick={() => setIsDeleteConfirm(true)}
          >
            Yes
          </Button>
          <Button
            variant='ghost'
            className='text-black bg-white'
            onClick={() => setIsPopUp(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopOver;
