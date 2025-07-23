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
  BarElement,
  ArcElement,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  getDailyChartData,
  getMonthlyChartData,
  getWeeklyChartData,
} from '@/common/helpers';
import Loading from '@/app/loading';
import Image from 'next/image';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
);

// Constants
const GET_CHART_DATA = {
  daily: getDailyChartData,
  weekly: getWeeklyChartData,
  monthly: getMonthlyChartData,
};

const CHART_TYPES = {
  line: {
    component: Line,
    icon: <FontAwesomeIcon icon='fa-duotone fa-chart-line' />,
    name: 'Line',
  },
  bar: {
    component: Bar,
    icon: <FontAwesomeIcon icon='fa-duotone fa-chart-column' />,
    name: 'Bar',
  },
  doughnut: {
    component: Doughnut,
    icon: <FontAwesomeIcon icon='fa-duotone fa-donut' />,
    name: 'Doughnut',
  },
};

const DEFAULT_TIME_RANGE = Object.keys(GET_CHART_DATA)[0];
const DEFAULT_CHART_TYPE = Object.keys(CHART_TYPES)[0];

/**
 * ContributionChart component renders various chart types displaying user contributions over time.
 * @param {Object} contributionCollection - Collection of user contributions.
 */
const ContributionChart = ({ contributionCollection }) => {
  const contrCalendar = contributionCollection.contributionCalendar;
  const [selectedTimeRange, setSelectedTimeRange] =
    useState(DEFAULT_TIME_RANGE);
  const [selectedChartType, setSelectedChartType] =
    useState(DEFAULT_CHART_TYPE);
  const [chartData, setChartData] = useState(null);

  // Effect to update chart data when selected time range or chart type changes
  useEffect(() => {
    const data = GET_CHART_DATA[selectedTimeRange](contrCalendar);

    if (typeof window !== 'undefined' && data) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let processedData = { ...data };

        // Create different styling based on chart type
        if (selectedChartType === 'line') {
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(45, 186, 78, 0.3)');
          gradient.addColorStop(1, 'rgba(45, 186, 78, 0.02)');

          processedData.datasets[0] = {
            ...processedData.datasets[0],
            backgroundColor: gradient,
            borderColor: 'rgb(45, 186, 78)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(45, 186, 78)',
            pointBorderColor: 'rgb(255, 255, 255)',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
          };
        } else if (selectedChartType === 'bar') {
          const maxValue = Math.max(...data.datasets[0].data);
          const colors = data.datasets[0].data.map((value) => {
            const opacity = Math.max(0.3, value / maxValue);
            return `rgba(45, 186, 78, ${opacity})`;
          });

          processedData.datasets[0] = {
            ...processedData.datasets[0],
            backgroundColor: colors,
            borderColor: 'rgb(45, 186, 78)',
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false,
          };
        } else if (selectedChartType === 'doughnut') {
          // For doughnut, we'll show a summary of contribution ranges
          const contributions = data.datasets[0].data;
          const ranges = {
            'High (10+)': contributions.filter((c) => c >= 10).length,
            'Medium (5-9)': contributions.filter((c) => c >= 5 && c < 10)
              .length,
            'Low (1-4)': contributions.filter((c) => c >= 1 && c < 5).length,
            'None (0)': contributions.filter((c) => c === 0).length,
          };

          processedData = {
            labels: Object.keys(ranges),
            datasets: [
              {
                data: Object.values(ranges),
                backgroundColor: [
                  'rgb(45, 186, 78)',
                  'rgb(74, 222, 128)',
                  'rgb(134, 239, 172)',
                  'rgb(220, 252, 231)',
                ],
                borderColor: [
                  'rgb(34, 158, 62)',
                  'rgb(45, 186, 78)',
                  'rgb(74, 222, 128)',
                  'rgb(134, 239, 172)',
                ],
                borderWidth: 2,
              },
            ],
          };
        }

        setChartData(processedData);
      }
    }
  }, [selectedTimeRange, selectedChartType, contrCalendar]);

  // Chart options based on type
  const getChartOptions = () => {
    const baseOptions = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: selectedChartType === 'doughnut',
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgb(45, 186, 78)',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          callbacks: {
            label: function (context) {
              if (selectedChartType === 'doughnut') {
                return `${context.label}: ${context.raw} days`;
              }
              return `Contributions: ${context.raw}`;
            },
          },
        },
      },
    };

    if (selectedChartType === 'doughnut') {
      return {
        ...baseOptions,
        cutout: '60%',
        plugins: {
          ...baseOptions.plugins,
          legend: {
            ...baseOptions.plugins.legend,
            display: true,
          },
        },
      };
    }

    return {
      ...baseOptions,
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            maxRotation: 0,
            autoSkipPadding: 20,
            font: {
              size: 11,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            font: {
              size: 11,
            },
          },
          suggestedMax: chartData
            ? Math.max(...chartData.datasets[0].data) + 5
            : 10,
        },
      },
    };
  };

  const ChartComponent = CHART_TYPES[selectedChartType].component;

  return (
    <div className='rounded-box border-base-300 bg-base-100 flex flex-col gap-4 border p-4'>
      {/* Header with controls */}
      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex flex-row items-center justify-center gap-4'>
          <div className='avatar'>
            <div className='h-10 w-10 rounded-full'>
              <Image
                src='/memoji/memojifocus-styled.png'
                alt='avatar'
                width={100}
                height={100}
                loading='lazy'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='card-title text-base lg:text-lg'>
              {selectedTimeRange.charAt(0).toUpperCase() +
                selectedTimeRange.slice(1)}{' '}
              Contributions
            </h2>
            <p className='text-sm opacity-70'>
              {contrCalendar.totalContributions} Total Contributions
            </p>
          </div>
        </div>

        <div className='flex gap-2'>
          {/* Chart Type Selector */}
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn btn-outline btn-sm'>
              {CHART_TYPES[selectedChartType].icon}{' '}
              {CHART_TYPES[selectedChartType].name}
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow'
            >
              {Object.entries(CHART_TYPES).map(([type, config]) => (
                <li key={type}>
                  <a
                    onClick={() => setSelectedChartType(type)}
                    className={selectedChartType === type ? 'active' : ''}
                  >
                    {config.icon} {config.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Time Range Selector */}
          <div className='dropdown dropdown-end'>
            <div tabIndex={0} role='button' className='btn btn-outline btn-sm'>
              <FontAwesomeIcon icon='fa-duotone fa-calendar' />
              {selectedTimeRange.charAt(0).toUpperCase() +
                selectedTimeRange.slice(1)}
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow'
            >
              {Object.keys(GET_CHART_DATA).map((range) => (
                <li key={range}>
                  <a
                    onClick={() => setSelectedTimeRange(range)}
                    className={selectedTimeRange === range ? 'active' : ''}
                  >
                    <FontAwesomeIcon icon='fa-duotone fa-calendar' />
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div
        className='bg-base-50 rounded-lg p-4'
        style={{ height: '300px', width: '100%' }}
      >
        {chartData ? (
          <ChartComponent
            options={getChartOptions()}
            data={chartData}
            key={`${selectedChartType}-${selectedTimeRange}`}
          />
        ) : (
          <div className='flex h-full items-center justify-center'>
            <Loading />
          </div>
        )}
      </div>

      {/* Stats Footer */}
      {chartData && selectedChartType !== 'doughnut' && (
        <div className='stats stats-horizontal bg-base-200 shadow-sm'>
          <div className='stat px-4 py-2'>
            <div className='stat-title text-xs'>Average</div>
            <div className='stat-value text-sm'>
              {Math.round(
                chartData.datasets[0].data.reduce((a, b) => a + b, 0) /
                  chartData.datasets[0].data.length,
              )}
            </div>
          </div>
          <div className='stat px-4 py-2'>
            <div className='stat-title text-xs'>Peak</div>
            <div className='stat-value text-sm'>
              {Math.max(...chartData.datasets[0].data)}
            </div>
          </div>
          <div className='stat px-4 py-2'>
            <div className='stat-title text-xs'>Active Days</div>
            <div className='stat-value text-sm'>
              {chartData.datasets[0].data.filter((d) => d > 0).length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionChart;
