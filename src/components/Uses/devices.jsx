import Image from 'next/image';
import Link from 'next/link';
import { USES } from '../../../data/uses';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { getBase64 } from '@/common/libs/plaiceholder';

const DEVICES = USES.Devices;

const Devices = async () => {
  const base64s = await Promise.all(
    DEVICES.map((device) => getBase64(device.image)),
  );
  return (
    <section className='space-y-10'>
      <div className='mb-6 flex items-center gap-3'>
        <div className='bg-primary/10 text-primary rounded-box p-3'>
          <FontAwesomeIcon
            icon='fa-duotone fa-laptop-mobile'
            className='text-2xl'
          />
        </div>
        <h2 className='text-3xl font-bold'>Devices</h2>
      </div>

      <div className='space-y-12'>
        {/* Featured Device */}
        <div className='card bg-base-100 border-base-300 border shadow-xl transition-all duration-300 hover:shadow-2xl'>
          <Link
            href={DEVICES[0]?.href || '#'}
            target='_blank'
            className='group block'
          >
            <figure className='px-6 pt-6'>
              <Image
                src={DEVICES[0]?.image}
                alt={DEVICES[0]?.name}
                width={800}
                height={400}
                className='rounded-box object-cover'
                priority
                placeholder='blur'
                blurDataURL={base64s[0]}
              />
            </figure>
            <div className='card-body text-center'>
              <h3 className='card-title group-hover:text-primary justify-center text-2xl transition-colors'>
                {DEVICES[0]?.name}
              </h3>
              <p className='text-base-content/70'>{DEVICES[0]?.metadata}</p>
            </div>
          </Link>
        </div>

        {/* Other Devices Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {DEVICES?.slice(1)?.map((item, index) => (
            <div
              key={index}
              className='card bg-base-100 border-base-300 group border shadow-lg transition-all duration-300 hover:shadow-xl'
            >
              <Link href={item.href} target='_blank' className='block'>
                <figure className='px-4 pt-4'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={192}
                    height={192}
                    className='rounded-box h-48 w-48 object-cover'
                    priority
                    placeholder='blur'
                    blurDataURL={base64s[index + 1]}
                  />
                </figure>
                <div className='card-body text-center'>
                  <h3 className='card-title group-hover:text-primary justify-center text-lg transition-colors'>
                    {item.name}
                  </h3>
                  <p className='text-base-content/70 text-sm'>
                    {item.metadata}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Devices;
