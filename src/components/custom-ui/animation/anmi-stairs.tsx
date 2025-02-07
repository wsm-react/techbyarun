import { motion } from 'framer-motion';



const AnmateStair: React.FC = () => {
    const stairAnimate = {
        inital: {
            top: "0%"
        },
        animate: {
            top: "100%"
        },
        exit: {
            top: ["100%", "0"]
        }
    }


    const reverseIndex = (index: number) => {
        const totalSteps = 6;

        return totalSteps - index - 1;
    }


    return (
        <>
            {[...Array(6)].map((_, index) => {
                return (<motion.div
                    key={index}
                    variants={stairAnimate}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: reverseIndex(index) * 0.03
                    }}
                    className='h-full w-full bg-blue-600  relative'
                />)
            })}
        </>
    );
}

export default AnmateStair;
