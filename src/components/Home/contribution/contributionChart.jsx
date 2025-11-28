'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  getDailyChartData,
  getMonthlyChartData,
  getWeeklyChartData,
} from '@/common/helpers';
import Image from 'next/image';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

// Chart Loading Skeleton
const ChartSkeleton = () => (
  <div className='flex h-full animate-pulse items-center justify-center'>
    <div className='bg-base-300 h-full w-full rounded-lg' />
  </div>
);

const GET_CHART_DATA = {
  daily: getDailyChartData,
  weekly: getWeeklyChartData,
  monthly: getMonthlyChartData,
};

const CHART_TYPES = {
  line: {
    icon: <FontAwesomeIcon icon='fa-duotone fa-chart-line' />,
    name: 'Line',
  },
  bar: {
    icon: <FontAwesomeIcon icon='fa-duotone fa-chart-column' />,
    name: 'Bar',
  },
  doughnut: {
    icon: <FontAwesomeIcon icon='fa-duotone fa-donut' />,
    name: 'Doughnut',
  },
};

const DEFAULT_TIME_RANGE = Object.keys(GET_CHART_DATA)[0];
const DEFAULT_CHART_TYPE = Object.keys(CHART_TYPES)[0];

const ContributionChart = ({ contributionCollection }) => {
  const contrCalendar = contributionCollection.contributionCalendar;
  const [selectedTimeRange, setSelectedTimeRange] =
    useState(DEFAULT_TIME_RANGE);
  const [selectedChartType, setSelectedChartType] =
    useState(DEFAULT_CHART_TYPE);
  const [chartData, setChartData] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('');

  // Get the primary color from CSS variables and watch for theme changes
  useEffect(() => {
    const updatePrimaryColor = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const primary = computedStyle.getPropertyValue('--color-primary').trim();
      setPrimaryColor(primary || 'oklch(0.7206 0.191 231.3)');
    };

    // Initial color
    updatePrimaryColor();

    // Watch for theme changes via MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updatePrimaryColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Generate color variations based on primary color with better contrast
  const getColorVariations = () => {
    return [
      `oklch(from ${primaryColor} l c h)`, // Full primary
      `oklch(from ${primaryColor} calc(l * 1.15) calc(c * 0.8) h)`, // Lighter
      `oklch(from ${primaryColor} calc(l * 1.3) calc(c * 0.6) h)`, // Even lighter
      `oklch(from ${primaryColor} calc(l * 1.45) calc(c * 0.4) h)`, // Lightest
    ];
  };

  useEffect(() => {
    const data = GET_CHART_DATA[selectedTimeRange](contrCalendar);

    if (data && data.datasets && data.datasets[0]) {
      if (selectedChartType === 'doughnut') {
        const contributions = data.datasets[0].data;
        const ranges = {
          'High (10+)': contributions.filter((c) => c >= 10).length,
          'Medium (5-9)': contributions.filter((c) => c >= 5 && c < 10).length,
          'Low (1-4)': contributions.filter((c) => c >= 1 && c < 5).length,
          'None (0)': contributions.filter((c) => c === 0).length,
        };

        const pieData = Object.entries(ranges).map(([name, value]) => ({
          name,
          value,
        }));

        setChartData({ pieData });
      } else {
        const formattedData = data.labels.map((label, index) => ({
          name: label,
          contributions: data.datasets[0].data[index],
        }));

        setChartData({ lineBarData: formattedData });
      }
    }
  }, [selectedTimeRange, selectedChartType, contrCalendar]);

  const renderChart = () => {
    if (!chartData || !primaryColor) return null;
    const COLORS = getColorVariations();

    if (selectedChartType === 'line') {
      if (!chartData.lineBarData) return null;

      return (
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={chartData.lineBarData}>
            <defs>
              <linearGradient
                id='colorContributions'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='5%' stopColor={primaryColor} stopOpacity={0.3} />
                <stop
                  offset='95%'
                  stopColor={primaryColor}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' className='stroke-base-300' />
            <XAxis
              dataKey='name'
              tick={{ fontSize: 10 }}
              angle={0}
              textAnchor='middle'
              className='fill-base-content'
            />
            <YAxis tick={{ fontSize: 10 }} className='fill-base-content' />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(var(--b1))',
                border: `1px solid ${primaryColor}`,
                borderRadius: '6px',
                color: 'oklch(var(--bc))',
              }}
            />
            <Area
              type='monotone'
              dataKey='contributions'
              stroke={primaryColor}
              strokeWidth={2}
              fill='url(#colorContributions)'
              dot={{ fill: primaryColor, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (selectedChartType === 'bar') {
      if (!chartData.lineBarData) return null;

      return (
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData.lineBarData}>
            <CartesianGrid strokeDasharray='3 3' className='stroke-base-300' />
            <XAxis
              dataKey='name'
              tick={{ fontSize: 10 }}
              angle={0}
              textAnchor='middle'
              className='fill-base-content'
            />
            <YAxis tick={{ fontSize: 10 }} className='fill-base-content' />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(var(--b1))',
                border: `1px solid ${primaryColor}`,
                borderRadius: '6px',
                color: 'oklch(var(--bc))',
              }}
            />
            <Bar
              dataKey='contributions'
              fill={primaryColor}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (selectedChartType === 'doughnut') {
      if (!chartData.pieData || !Array.isArray(chartData.pieData)) return null;

      return (
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData.pieData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              innerRadius='60%'
              outerRadius='80%'
              paddingAngle={2}
            >
              {chartData.pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(var(--b1))',
                border: `1px solid ${primaryColor}`,
                borderRadius: '6px',
                color: 'oklch(var(--bc))',
              }}
              formatter={(value) => `${value} days`}
            />
            <Legend
              verticalAlign='bottom'
              height={36}
              iconType='circle'
              wrapperStyle={{ fontSize: '10px', paddingTop: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  const getStats = () => {
    if (!chartData || !chartData.lineBarData) return null;

    const contributions = chartData.lineBarData.map((d) => d.contributions);
    const average = Math.round(
      contributions.reduce((a, b) => a + b, 0) / contributions.length,
    );
    const peak = Math.max(...contributions);
    const activeDays = contributions.filter((d) => d > 0).length;

    return { average, peak, activeDays };
  };

  const stats = getStats();

  return (
    <div className='border-base-300 bg-base-100 rounded-box flex flex-col gap-3 border p-3'>
      {/* Header */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='h-8 w-8 rounded-full'>
              <Image
                src='/memoji/memojifocus-styled.png'
                alt='avatar'
                width={32}
                height={32}
                loading='lazy'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-sm font-bold'>
              {selectedTimeRange.charAt(0).toUpperCase() +
                selectedTimeRange.slice(1)}{' '}
              Contributions
            </h2>
            <p className='text-base-content/70 text-xs'>
              {contrCalendar.totalContributions} Total
            </p>
          </div>
        </div>

        <div className='flex gap-1.5'>
          {/* Chart Type */}
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn btn-sm btn-outline'>
              {CHART_TYPES[selectedChartType].icon}{' '}
              {CHART_TYPES[selectedChartType].name}
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu rounded-box bg-base-100 z-1 w-28 p-1.5 shadow'
            >
              {Object.entries(CHART_TYPES).map(([type, config]) => (
                <li key={type}>
                  <button
                    onClick={() => setSelectedChartType(type)}
                    className={`${selectedChartType === type ? 'active' : ''}`}
                  >
                    {config.icon} {config.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Time Range */}
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn btn-sm btn-outline'>
              <FontAwesomeIcon icon='fa-duotone fa-calendar' />{' '}
              {selectedTimeRange.charAt(0).toUpperCase() +
                selectedTimeRange.slice(1)}
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu rounded-box bg-base-100 z-1 w-28 p-1.5 shadow'
            >
              {Object.keys(GET_CHART_DATA).map((range) => (
                <li key={range}>
                  <button
                    onClick={() => setSelectedTimeRange(range)}
                    className={`${selectedTimeRange === range ? 'active' : ''}`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        className='rounded-box p-3'
        style={{ height: '220px', width: '100%' }}
      >
        {chartData ? renderChart() : <ChartSkeleton />}
      </div>

      {/* Stats */}
      {stats && selectedChartType !== 'doughnut' && (
        <div className='stats stats-horizontal bg-base-200 shadow-sm'>
          <div className='stat px-3 py-2'>
            <div className='stat-title text-base-content/70'>Average</div>
            <div className='stat-value text-base-content text-sm'>
              {stats.average}
            </div>
          </div>
          <div className='stat px-3 py-2'>
            <div className='stat-title text-base-content/70'>Peak</div>
            <div className='stat-value text-base-content text-sm'>
              {stats.peak}
            </div>
          </div>
          <div className='stat px-3 py-2'>
            <div className='stat-title text-base-content/70'>Active Days</div>
            <div className='stat-value text-base-content text-sm'>
              {stats.activeDays}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionChart;
