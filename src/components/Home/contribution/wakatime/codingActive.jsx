import CodingActiveList from './codingActiveList';
import Overview from './overview';

const CodingActive = ({ data }) => {
  return (
    <section className='flex flex-col gap-y-3'>
      <Overview data={data} />
      <CodingActiveList data={data} />
    </section>
  );
};

export default CodingActive;
