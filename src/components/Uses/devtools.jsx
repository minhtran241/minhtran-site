import Image from 'next/image';
import Link from 'next/link';
import { USES } from '../../../data/uses';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const DEVTOOLS = USES.DevTools;

const DevTools = () => {
	return (
		<section className="space-y-10">
			<div className="flex items-center gap-3">
				<div className="p-3 rounded-lg bg-success/10 text-success">
					<FontAwesomeIcon icon="fa-duotone fa-terminal" className="text-2xl" />
				</div>
				<h2 className="text-3xl font-bold">Development Tools</h2>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
				{DEVTOOLS?.map((item, index) => (
					<div key={index} className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 group">
						<Link href={item.href} target="_blank" className="block">
							<figure className="px-4 pt-4">
								<Image
									src={item.image}
									alt={item.name}
									width={112}
									height={112}
									className="rounded-lg w-16 h-16 object-cover group-hover:scale-110 transition-transform duration-300"
									loading="lazy"
								/>
							</figure>
							<div className="card-body p-4 text-center">
								<h3 className="font-semibold text-sm group-hover:text-success transition-colors line-clamp-2">
									{item.name}
								</h3>
								<p className="text-xs text-base-content/60 line-clamp-2">
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
