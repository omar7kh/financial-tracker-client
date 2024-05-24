import BarChart from './Bar';

const ChartsContainer = ({ transactionsData }) => {
  return (
    <div className='flex justify-center items-center'>
      <BarChart rawData={transactionsData} />
    </div>
  );
};

export default ChartsContainer;
