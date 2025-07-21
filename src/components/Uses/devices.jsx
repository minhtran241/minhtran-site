import Image from 'next/image';
import Link from 'next/link';
import { USES } from '../../../data/uses';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const DEVICES = USES.Devices;

const Devices = () => {
	return (
		<section className="space-y-10">
			<div className="flex items-center gap-3">
				<div className="p-3 rounded-lg bg-primary/10 text-primary">
					<FontAwesomeIcon icon="fa-duotone fa-laptop-mobile" className="text-2xl" />
				</div>
				<h2 className="text-3xl font-bold">Devices</h2>
			</div>

			<div className="space-y-12">
				{/* Featured Device */}
				<div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
					<Link
						href={DEVICES[0]?.href || '#'}
						target="_blank"
						className="block group"
					>
						<figure className="px-6 pt-6">
							<Image
								src={DEVICES[0]?.image}
								alt={DEVICES[0]?.name}
								width={800}
								height={400}
								className="rounded-xl object-cover"
								loading="lazy"
							/>
						</figure>
						<div className="card-body text-center">
							<h3 className="card-title text-2xl justify-center group-hover:text-primary transition-colors">
								{DEVICES[0]?.name}
							</h3>
							<p className="text-base-content/70">
								{DEVICES[0]?.metadata}
							</p>
						</div>
					</Link>
				</div>

				{/* Other Devices Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{DEVICES?.slice(1)?.map((item, index) => (
						<div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
							<Link href={item.href} target="_blank" className="block">
								<figure className="px-4 pt-4">
									<Image
										src={item.image}
										alt={item.name}
										width={192}
										height={192}
										className="rounded-lg h-48 w-48 object-cover"
									/>
								</figure>
								<div className="card-body text-center">
									<h3 className="card-title text-lg justify-center group-hover:text-primary transition-colors">
										{item.name}
									</h3>
									<p className="text-sm text-base-content/70">
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