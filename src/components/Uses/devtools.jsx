import Image from 'next/image';
import Link from 'next/link';
import { USES } from '../../../data/uses';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { getBase64 } from '@/common/libs/plaiceholder';

const DEVTOOLS = USES.DevTools;

const DevTools = async () => {
  const base64s = await Promise.all(
    DEVTOOLS.map((item) => getBase64(item.image)),
  );
  return (
    <section className='space-y-10'>
      <div className='flex items-center gap-3'>
        <div className='bg-success/10 text-success rounded-lg p-3'>
          <FontAwesomeIcon icon='fa-duotone fa-terminal' className='text-2xl' />
        </div>
        <h2 className='text-3xl font-bold'>Development Tools</h2>
      </div>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {DEVTOOLS?.map((item, index) => (
          <div
            key={index}
            className='card bg-base-100 border-base-300 group border shadow-md transition-all duration-300 hover:shadow-lg'
          >
            <Link href={item.href} target='_blank' className='block'>
              <figure className='px-4 pt-4'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={112}
                  height={112}
                  className='h-16 w-16 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110'
                  loading='lazy'
                  placeholder='blur'
                  blurDataURL={base64s[index]}
                />
              </figure>
              <div className='card-body p-4 text-center'>
                <h3 className='group-hover:text-success line-clamp-2 text-sm font-semibold transition-colors'>
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

export default DevTools;
