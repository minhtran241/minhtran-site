'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userBasicInfo } from '@/common/constants/userBasic';
import { fileSystemInfo } from '@/common/constants/fileSystem';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import Loading from '@/app/loading';
import { SOCIAL_MEDIA } from '@/common/constants/menu';
// import ResumeViewer from './resumeViewer';

const ContactInfoModal = () => (
	<dialog id="contact_info_modal" className="modal">
		<div className="modal-box">
			<form method="dialog">
				{/* if there is a button in form, it will close the modal */}
				<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
					<FontAwesomeIcon icon="fa-solid fa-times" />
				</button>
			</form>
			<h3 className="text-lg font-bold flex items-center gap-2 mb-4">
				<span className="text-primary">
					<FontAwesomeIcon icon="fa-solid fa-info-circle" />
				</span>
				Contact Information
			</h3>
			<ul className="fa-ul space-y-3">
				{SOCIAL_MEDIA.map((item, index) => (
					<li key={index} className="flex items-center gap-3">
						<span className="fa-li">{item.icon}</span>
						<p className="font-medium">{item.name}:</p>
						<Link
							href={item.href}
							target="_blank"
							className="link link-primary link-hover"
						>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	</dialog>
);

const HeroComponent = () => {
	const handleShowModal = () => {
		document.getElementById('contact_info_modal')?.showModal();
	};

	return (
		<div className="pt-28 text-base-content container mx-auto">
			<div className="bg-base-100 rounded-box p-4 shadow-lg">
				<div className="hero-content flex flex-col lg:flex-row items-center gap-10">
					{/* Profile Picture */}
					<div className="avatar">
						<div className="ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2 w-32 h-32 overflow-hidden">
							<Image
								src="/home/headshot.png"
								alt={`${userBasicInfo.fullName} headshot`}
								width={128}
								height={128}
								className="object-cover"
							/>
						</div>
					</div>

					{/* User Information */}
					<div className="flex flex-col gap-6 text-center lg:text-left">
						{/* Name and Description */}
						<div className="space-y-2">
							<h1 className="text-3xl font-extrabold leading-tight">
								{userBasicInfo.fullName}
								<span className="text-sm font-normal ml-2">
									(He/Him)
								</span>
							</h1>
							<p className="text-lg">
								CS & MATH @ GVSU | SWE/DE @ GVSU Applied
								Computing Institute
							</p>
						</div>

						{/* Contact Information */}
						<div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start lg:justify-between">
							{/* Contact Details */}
							<ul className="fa-ul space-y-3">
								<li className="flex items-center gap-3">
									<span className="fa-li">
										<FontAwesomeIcon icon="fa-solid fa-map-marker-alt" />
									</span>
									<span>Grand Rapids, MI, USA</span>
								</li>
								<li className="flex items-center gap-3">
									<span className="fa-li">
										<FontAwesomeIcon icon="fa-solid fa-envelope" />
									</span>
									<Link
										href={`mailto:${userBasicInfo.email}`}
										className="link link-primary link-hover"
									>
										{userBasicInfo.email}
									</Link>
								</li>
								<li className="flex items-center gap-3">
									<span className="fa-li">
										<FontAwesomeIcon icon="fa-brands fa-linkedin" />
									</span>
									<Link
										href={userBasicInfo.linkedinLink}
										target="_blank"
										className="link link-primary link-hover"
									>
										{userBasicInfo.linkedinUsername}
									</Link>
								</li>
								<li className="flex items-center gap-3">
									<span className="fa-li">
										<FontAwesomeIcon icon="fa-solid fa-info-circle" />
									</span>
									<button
										onClick={handleShowModal}
										className="link link-primary link-hover font-medium"
									>
										Contact info
									</button>
								</li>
							</ul>

							{/* Call-to-Action Buttons */}
							<div className="flex flex-col gap-4">
								<Link
									href={fileSystemInfo.resumeLink}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-primary btn-md flex items-center gap-2"
								>
									<FontAwesomeIcon icon="fa-solid fa-file-pdf" />
									Download Resume
								</Link>
								{/* <ResumeViewer /> */}
								<Link
									href={userBasicInfo.bookACallLink}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-outline btn-primary btn-md flex items-center gap-2"
								>
									<FontAwesomeIcon icon="fa-solid fa-headset" />
									Book a Call
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ContactInfoModal />
		</div>
	);
};

const Hero = () => (
	<Suspense fallback={<Loading fullPage={false} />}>
		<HeroComponent />
	</Suspense>
);

export default Hero;
