import React, { useRef, useEffect } from 'react';

interface ClockFaceProps {
    width: number;
    height: number;
    colorHex: string
}

const ClockFace = ({ width, height, colorHex }: ClockFaceProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current?.getContext('2d')
            if (ctx) {
                ctx.font = width * 0.10 + "px Garuda"; //responisive fontSize
                ctx.fillStyle = "#" + colorHex;
                const divisions = 12;
                const degrees_per_iter = 360 / divisions; //30 degrees per number
                var radius = (width * 0.8) / 2;
                let center_x = width / 2 - width * 0.030 // center correction;
                let center_y = height / 2 + height * 0.035 // center correction;
                const start_angle_deg = - 60;
                for (var i = 0; i < divisions; i++) {
                    const angle_deg = start_angle_deg + (i * degrees_per_iter);
                    const x_correction = i >= 9 ? width * 0.015 : 0; // left shift for double digit numbers
                    const x = radius * Math.cos(angle_deg * Math.PI / 180) + center_x - x_correction;
                    const y = radius * Math.sin(angle_deg * Math.PI / 180) + center_y;
                    ctx.fillText("" + (i + 1), x, y);
                }
            }

        }
    }, [width, height, colorHex]);

    return <canvas ref={canvasRef} height={height} width={width} />;
};

ClockFace.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
    colorHex: "000"
};

export default ClockFace;