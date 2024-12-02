import { cn } from '@/common/libs/cn';
// import { motion } from 'framer-motion';

const Progress = ({ data, className }) => {
    const { name, percent = 0 } = data;

    // const progressVariants = {
    //     initial: { width: 0 },
    //     animate: {
    //         width: `${percent}%`,
    //         transition: { delay: 0.8 },
    //     },
    // };

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="w-28 text-sm">{name}</div>
            <progress
                className={cn(className, 'flex-1 progress progress-primary')}
                value={percent}
                max="100"
            >
                {/* <motion.span
                    initial="initial"
                    animate="animate"
                    variants={progressVariants}
                    className={cn(
                        className,
                        'absolute left-0 top-0 h-2 rounded-full px-3'
                    )}
                >
                    &ensp;
                </motion.span> */}
            </progress>
            <div className="w-8 text-right text-sm">{percent.toFixed(0)}%</div>
        </div>
    );
};

export default Progress;
