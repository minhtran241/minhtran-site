'use client';

import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	Filler,
	CategoryScale,
	LinearScale,
	Tooltip,
	PointElement,
	LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
	getDailyChartData,
	getMonthlyChartData,
	getWeeklyChartData,
} from '@/common/helpers';
import Loading from '@/app/loading';
import Image from 'next/image';

// Register ChartJS components using ChartJS.register
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Filler
);

// Constants
const GET_CHART_DATA = {
	daily: getDailyChartData,
	weekly: getWeeklyChartData,
	monthly: getMonthlyChartData,
};
const DEFAULT_TIME_RANGE = Object.keys(GET_CHART_DATA)[0];

/**
 * ContributionChart component renders a line chart displaying user contributions over time.
 * @param {Object} contributionCollection - Collection of user contributions.
 */
const ContributionChart = ({ contributionCollection }) => {
	// State variables
	const contrCalendar = contributionCollection.contributionCalendar;
	const [selectedTimeRange, setSelectedTimeRange] =
		useState(DEFAULT_TIME_RANGE);
	const [chartData, setChartData] = useState(null);

	// Effect to update chart data when selected time range changes
	useEffect(() => {
		const data = GET_CHART_DATA[selectedTimeRange](contrCalendar);

		if (typeof window !== 'undefined' && data) {
			// Create gradient only once the data is available and window is defined
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (ctx) {
				const gradient = ctx.createLinearGradient(0, 0, 0, 300);
				gradient.addColorStop(0, 'rgba(45, 186, 78, 0.5)');
				gradient.addColorStop(1, 'rgba(45, 186, 78, 0)');

				// Update chartData with gradient in the backgroundColor
				setChartData({
					...data,
					datasets: [
						{
							...data.datasets[0],
							backgroundColor: gradient,
						},
					],
				});
			}
		}
	}, [selectedTimeRange, contrCalendar]); // Re-run on time range or contribution collection change

	// Chart options
	const options = {
		maintainAspectRatio: false, // Allow resizing to change chart height
		responsive: true,
		plugins: {
			legend: {
				labels: {
					color: 'white',
				},
				align: 'end',
				position: 'bottom',
			},
			tooltip: {
				mode: 'index',
				intersect: false,
				callbacks: {
					label: function (context) {
						return 'Contributions: ' + context.raw;
					},
				},
			},
		},
		scales: {
			x: {
				ticks: {
					maxRotation: 0,
					autoSkipPadding: 20,
				},
			},
			y: {
				beginAtZero: true,
				suggestedMax: chartData
					? Math.max(...chartData.datasets[0].data) + 5
					: 10, // Increase suggested max
			},
		},
	};

	// Render the ContributionChart component
	return (
		<div className="flex flex-col gap-4 rounded-box p-4  border border-base-300 bg-base-100">
			{/* Time range selector */}
			<div className="flex flex-wrap justify-between gap-4">
				<div className="flex flex-row items-center justify-center gap-4">
					<div className="avatar">
						<div className="w-10 h-10 rounded-full">
							<Image
								src="/memoji/memojifocus-styled.png"
								alt="avatar"
								width={100}
								height={100}
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<h2 className="card-title lg:text-lg text-base">
							{selectedTimeRange.charAt(0).toUpperCase() +
								selectedTimeRange.slice(1)}{' '}
							Contributions
						</h2>
						<p className="text-sm">
							{contrCalendar.totalContributions} Total
							Contributions
						</p>
					</div>
				</div>
				<select
					className="select select-bordered max-w-xs"
					onChange={(e) => setSelectedTimeRange(e.target.value)}
					defaultValue={selectedTimeRange}
					aria-label="Select time range"
					aria-labelledby="Select time range"
				>
					{Object.keys(GET_CHART_DATA).map((range, index) => (
						<option key={index} value={range}>
							{range.charAt(0).toUpperCase() + range.slice(1)}
						</option>
					))}
				</select>
			</div>
			{/* Chart */}
			<div style={{ height: '300px', width: '100%' }}>
				{chartData ? (
					<Line options={options} data={chartData} id="myChart" />
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};

export default ContributionChart;
