import Image from 'next/image';
import Link from 'next/link';
import { USES } from '../../../data/uses';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const SOFTWARES = USES.Softwares;

const Softwares = () => {
  return (
    <section className='space-y-10'>
      <div className='flex items-center gap-3'>
        <div className='bg-info/10 text-info rounded-lg p-3'>
          <FontAwesomeIcon icon='fa-duotone fa-cubes' className='text-2xl' />
        </div>
        <h2 className='text-3xl font-bold'>Software</h2>
      </div>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {SOFTWARES?.map((item, index) => (
          <div
            key={index}
            className='card bg-base-100 group shadow-md transition-all duration-300 hover:shadow-lg'
          >
            <Link href={item.href} target='_blank' className='block'>
              <figure className='px-4 pt-4'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className='h-16 w-16 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110'
                  loading='lazy'
                />
              </figure>
              <div className='card-body p-4 text-center'>
                <h3 className='group-hover:text-info line-clamp-2 text-sm font-semibold transition-colors'>
                  {item.name}
                </h3>
                <p className='text-base-content/60 line-clamp-2 text-xs'>
                  {item.metadata}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Softwares;
