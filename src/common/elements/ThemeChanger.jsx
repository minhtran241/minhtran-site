'use client';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeChanger = () => {
	const themeValues = [
		{ value: 'winter', label: 'Winter' },
		{ value: 'night', label: 'Night' },
		{ value: 'lofi', label: 'Lo-Fi' },
		{ value: 'corporate', label: 'Corporate' },
	];

	useEffect(() => {
		themeChange(false);
	}, []);

	return (
		<div className="dropdown dropdown-end" data-choose-theme>
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-square"
				aria-label="Choose theme"
			>
				<FontAwesomeIcon icon="fa-duotone fa-solid fa-droplet" />
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content menu rounded-box z-[1] p-2 shadow-lg bg-base-100 border border-base-200 min-w-40"
			>
				{themeValues.map((theme) => (
					<li key={theme.value}>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
							aria-label={theme.label}
							value={theme.value}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ThemeChanger;