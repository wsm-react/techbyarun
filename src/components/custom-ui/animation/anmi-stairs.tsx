import { motion } from 'framer-motion';

const AnmateStair: React.FC = () => {
    const totalSteps = 6;

    const stairAnimate = {
        initial: {
            top: '0%',
        },
        animate: {
            top: '100%',
        },
        exit: {
            top: ['100%', '0%'],
        },
    };

    const reverseIndex = (index: number) => totalSteps - index - 1;

    return (
        <>
            {[...Array(totalSteps)].map((_, index) => (


                <motion.div
                    key={index}
                    variants={stairAnimate}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                        delay: reverseIndex(index) * 0.03,
                    }}
                    className="relative h-full w-full bg-primary"
                />
            ))}
        </>
    );
};

export default AnmateStair;
