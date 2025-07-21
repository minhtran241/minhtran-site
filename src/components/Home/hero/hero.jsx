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
		<div className="modal-box max-w-md">
			<form method="dialog">
				<button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-base-200 transition-colors">
					<FontAwesomeIcon icon="fa-solid fa-times" />
				</button>
			</form>

			<div className="mb-6">
				<h3 className="text-xl font-bold flex items-center gap-3">
					<FontAwesomeIcon icon="fa-solid fa-info-circle" />
					Contact Information
				</h3>
				<p className="text-sm text-base-content/60 mt-2">
					Get in touch through any of these channels
				</p>
			</div>

			<div className="space-y-4">
				{SOCIAL_MEDIA.map((item, index) => (
					<div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
						<div className="text-primary text-lg">
							{item.icon}
						</div>
						<div className="flex-1">
							<p className="font-medium text-sm text-base-content/80">{item.name}</p>
							<Link
								href={item.href}
								target="_blank"
								className="link link-primary link-hover font-semibold"
							>
								{item.title}
							</Link>
						</div>
						<FontAwesomeIcon
							icon="fa-solid fa-external-link"
							className="text-xs text-base-content/40"
						/>
					</div>
				))}
			</div>
		</div>
		<form method="dialog" className="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
);

const HeroComponent = () => {
	const handleShowModal = () => {
		document.getElementById('contact_info_modal')?.showModal();
	};

	return (
		<div className="pt-28 text-base-content container mx-auto">
			<div className="bg-gradient-to-br from-base-100 to-base-200/30 rounded-2xl p-6 md:p-8 shadow-xl border border-base-300/50">
				<div className="hero-content flex flex-col lg:flex-row items-center gap-12">
					{/* Profile Picture */}
					<div className="relative group">
						<div className="avatar">
							<div className="ring-primary ring-offset-base-100 rounded-full ring-4 ring-offset-4 w-40 h-40 overflow-hidden shadow-2xl transition-all duration-300 group-hover:ring-primary-focus group-hover:scale-105">
								<Image
									src="/home/headshot.png"
									alt={`${userBasicInfo.fullName} headshot`}
									width={160}
									height={160}
									className="object-cover transition-transform duration-300 group-hover:scale-110"
									priority
								/>
							</div>
						</div>
						{/* Decorative elements */}
						<div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
					</div>

					{/* User Information */}
					<div className="flex flex-col gap-8 text-center lg:text-left flex-1">
						{/* Name and Description */}
						<div className="space-y-4">
							<div>
								<h1 className="text-2xl lg:text-3xl font-extrabold leading-tight bg-gradient-to-r from-base-content to-base-content/80 bg-clip-text">
									{userBasicInfo.fullName}
								</h1>
								<span className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-base-200 rounded-full text-sm font-medium text-base-content/70">
									<FontAwesomeIcon icon="fa-solid fa-user" className="text-xs" />
									He/Him
								</span>
							</div>
							<p className="text-lg text-base-content/80 font-medium max-w-2xl leading-relaxed">
								CS & MATH @ GVSU | SWE/DE @ GVSU Applied Computing Institute
							</p>
						</div>

						{/* Contact Information */}
						<div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start xl:justify-between">
							{/* Contact Details */}
							<div className="space-y-4">
								<div className="flex items-center gap-4 group cursor-default">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
										<FontAwesomeIcon icon="fa-solid fa-map-marker-alt" />
									</div>
									<span className="font-medium">Grand Rapids, MI, USA</span>
								</div>

								<div className="flex items-center gap-4 group">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
										<FontAwesomeIcon icon="fa-solid fa-envelope" />
									</div>
									<Link
										href={`mailto:${userBasicInfo.email}`}
										className="link link-primary link-hover font-medium transition-colors"
									>
										{userBasicInfo.email}
									</Link>
								</div>

								{/* <div className="flex items-center gap-4 group">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
										<FontAwesomeIcon icon="fa-brands fa-linkedin" />
									</div>
									<Link
										href={userBasicInfo.linkedinLink}
										target="_blank"
										className="link link-primary link-hover font-medium transition-colors"
									>
										{userBasicInfo.linkedinUsername}
									</Link>
								</div> */}

								<div className="flex items-center gap-4 group">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
										<FontAwesomeIcon icon="fa-solid fa-info-circle" />
									</div>
									<button
										onClick={handleShowModal}
										className="link link-primary link-hover font-medium transition-colors"
									>
										More contact info
									</button>
								</div>
							</div>

							{/* Call-to-Action Buttons */}
							<div className="flex flex-col gap-4 min-w-fit">
								<Link
									href={fileSystemInfo.resumeLink}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-primary btn-lg"
								>
									<FontAwesomeIcon icon="fa-solid fa-file-pdf" />
									Download Resume
								</Link>
								{/* <ResumeViewer /> */}
								<Link
									href={userBasicInfo.bookACallLink}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-outline btn-primary btn-lg"
								>
									<FontAwesomeIcon icon="fa-solid fa-calendar-check" />
									Book a Call
								</Link>

								{/* Quick Stats */}
								<div className="flex gap-4 mt-2 justify-center lg:justify-start">
									<div className="text-center">
										<div className="font-bold text-lg text-primary">CS+MATH</div>
										<div className="text-xs text-base-content/60">Student</div>
									</div>
									<div className="text-center">
										<div className="font-bold text-lg text-primary">SWE/DE</div>
										<div className="text-xs text-base-content/60">@ GVSU ACI</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Subtle background pattern */}
				<div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-2xl pointer-events-none"></div>
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