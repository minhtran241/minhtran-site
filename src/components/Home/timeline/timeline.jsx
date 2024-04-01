import Loading from '@/app/loading';
import Milestone from './milestone/milestone';
import fs from 'fs/promises';
import path from 'path';
import { Suspense } from 'react';
import SectionLabel from '../sectionLabel/sectionLabel';
import { fileSystemInfo } from '@/common/constants/fileSystem';

// * FETCH MILESTONES FROM LOCAL JSON
const DATA_ATTRS_DIR = path.join(
    process.cwd(),
    fileSystemInfo.dataFetchDir,
    'milestone'
);
const DATA_ATTRS_FILE = path.join(DATA_ATTRS_DIR, 'milestones.json');
const getMilestones = async () => {
    const milestonesData = await fs.readFile(
        path.join(DATA_ATTRS_FILE),
        'utf-8'
    );
    const milestones = JSON.parse(milestonesData);
    const sortedMilestones = milestones.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    return sortedMilestones;
};

const SECTION_TITLE = 'Employment History';
const SECTION_DESCRIPTION =
    'My working has been in the field of software development, performance optimization, and system design.';

const TimelineComponent = async () => {
    const milestones = await getMilestones();

    return (
        <div className="items-center justify-center mt-12 container">
            <SectionLabel
                title={SECTION_TITLE}
                description={SECTION_DESCRIPTION}
            />
            <div className="flex flex-col justify-center ">
                {/* lg:max-w-full */}
                <div className="w-full mx-auto">
                    <div className="relative">
                        <div className="absolute hidden w-1 h-full transform -translate-x-1/2 bg-[#0033A0] dark:bg-blue-600 lg:block left-1/2"></div>
                        <div className="space-y-2 lg:space-y-4">
                            {milestones.map((milestone, index) => (
                                <Milestone
                                    milestone={milestone}
                                    right={index % 2 === 0}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Timeline = () => {
    return (
        <Suspense fallback={<Loading />}>
            <TimelineComponent />
        </Suspense>
    );
};

export default Timeline;
