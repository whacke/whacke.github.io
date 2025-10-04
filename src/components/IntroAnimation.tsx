import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import earthImage from "../assets/earth.jpeg";
import zoomSound from "../assets/zoom.mp3";

export default function IntroAnimation({ onFinish }: { onFinish: () => void }) {
    const controls = useAnimation();
    const [audio] = useState(new Audio(zoomSound));

    async function runZoom(zoom: number, blurVal: number, deblurVal: number)
    {
        await audio.play();
        await controls.start({
            scale: zoom,
            y: 150 * (zoom - 1),
            filter: `blur(${blurVal}px)`,
            transition: { duration: 2, ease: "easeInOut" },
        });
        await controls.start({
            scale: zoom,
            filter: `blur(${deblurVal}px)`,
            transition: { duration: 2, ease: "easeInOut" },
        });
    }

    useEffect(() => {
        const sequence = async () => {

            // Step 1: Fade in Earth
            await controls.start({
                scale: 1,
                opacity: 1,
                filter: "blur(0px)"
            });

            // Step 2: “scan” pulse (brighten)
            await controls.start({
                filter: "brightness(1.5) blur(0px)",
                transition: { duration: 0.3 },
            });
            await controls.start({
                filter: "brightness(1) blur(0px)",
                transition: { duration: 0.4 },
            });

            // Step 3: Zooms with blur transitions
            await runZoom(2, 2, 0);   // Zoom out to show more of Earth
            await runZoom(4, 6, 0);   // Zoom in to show a continent
            await runZoom(8, 8, 0);  // Zoom in to show a country
            

            // Step 4: Fade to black
            await controls.start({
                opacity: 0,
                transition: { duration: 4 },
            });

            onFinish();
        };

        sequence();
    }, [controls, onFinish, audio]);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(6px)" }}
            animate={controls}
            className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden"
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Earth image */}
                <motion.img
                    src={earthImage}
                    className="object-cover w-full h-full"
                    alt="Earth"
                />
            </div>
        </motion.div>
    );
}
