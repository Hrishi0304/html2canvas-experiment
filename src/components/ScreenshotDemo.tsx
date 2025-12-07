import React, { createRef, useState } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { PieChart, Pie } from 'recharts';
import { Download, Image as ImageIcon, Code, Layers, Speed } from '@mui/icons-material';

// Sample data for the chart
const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 }
];

const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 }
];

const ScreenshotDemo: React.FC = () => {
    // Refs
    const hookRef = createRef<HTMLDivElement>();
    const canvasRef = createRef<HTMLDivElement>();

    // State
    const [hookCapture, setHookCapture] = useState<string | null>(null);
    const [canvasCapture, setCanvasCapture] = useState<string | null>(null);

    // Hook implementation
    const [, takeScreenShot] = useScreenshot({
        type: 'image/jpeg',
        quality: 1.0
    });

    const handleHookCapture = async () => {
        if (hookRef.current) {
            const img = await takeScreenShot(hookRef.current);
            setHookCapture(img);
        }
    };

    // html2canvas implementation
    const handleCanvasCapture = async () => {
        if (canvasRef.current) {
            try {
                const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true });
                const img = canvas.toDataURL('image/jpeg', 1.0);
                setCanvasCapture(img);
            } catch (error) {
                console.error("html2canvas failed:", error);
            }
        }
    };

    return (
        <div className='min-h-screen bg-[#0f172a] text-white p-8 font-sans selection:bg-indigo-500 selection:text-white'>
            <div className="max-w-5xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center space-y-4 pt-10">
                    <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 pb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Legacy Capture
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Comparing traditional methods: React Hooks vs Direct html2canvas implementation.
                    </p>
                </div>

                {/* Showcase 1: React Screenshot Hook */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">

                            {/* Input Side */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-teal-500/10 rounded-lg text-teal-500">
                                        <Layers />
                                    </div>
                                    <h2 className="text-2xl font-bold">React Hook Approach</h2>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Using <code>use-react-screenshot</code> wrapper. Good for simple React-based workflows but may have limitations with complex CSS.
                                </p>

                                {/* The Element */}
                                <div ref={hookRef} className="p-8 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-2xl text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <AddAlertIcon className="w-8 h-8" />
                                            <span className="font-mono bg-black/20 px-3 py-1 rounded-full text-xs backdrop-blur-sm">HOOKS API</span>
                                        </div>
                                        <h3 className="text-3xl font-bold mb-2">Simple & Clean</h3>
                                        <p className="opacity-90 font-medium mb-4">React-native feel integration.</p>
                                        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-md text-sm">
                                            <code>const [image, takeScreenshot] = useScreenshot();</code>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleHookCapture}
                                    className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
                                >
                                    <ImageIcon fontSize="small" /> Capture with Hook
                                </button>
                            </div>

                            {/* Output Side */}
                            <div className="flex-1 w-full bg-black/30 rounded-xl border border-slate-800/50 p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                {hookCapture ? (
                                    <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                        <img src={hookCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-2xl mb-6" />
                                        <a href={hookCapture} download="hook-capture.jpg" className="text-teal-400 hover:text-teal-300 text-sm flex items-center gap-2 font-medium">
                                            <Download fontSize="small" /> Download Image
                                        </a>
                                    </div>
                                ) : (
                                    <div className="text-center text-slate-600">
                                        <ImageIcon style={{ fontSize: 48, opacity: 0.2 }} />
                                        <p className="mt-4 text-sm">Capture to see result</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Showcase 2: Direct html2canvas */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col gap-8">

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500">
                                        <Speed />
                                    </div>
                                    <h2 className="text-2xl font-bold">Direct html2canvas</h2>
                                </div>
                                <button
                                    onClick={handleCanvasCapture}
                                    className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2"
                                >
                                    <ImageIcon fontSize="small" /> Capture Direct
                                </button>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* The Element */}
                                <div
                                    ref={canvasRef}
                                    className="relative overflow-hidden rounded-2xl bg-[#1e1b4b] border border-indigo-900/50 p-6 shadow-2xl"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center justify-between border-b border-indigo-800/50 pb-4">
                                            <h3 className="text-lg font-semibold text-indigo-100">Performance Metrics</h3>
                                            <Code className="text-indigo-400" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-800/50">
                                                <p className="text-indigo-300 text-xs uppercase tracking-wider">Speed</p>
                                                <p className="text-2xl font-bold text-white mt-1">120ms</p>
                                            </div>
                                            <div className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-800/50">
                                                <p className="text-indigo-300 text-xs uppercase tracking-wider">Quality</p>
                                                <p className="text-2xl font-bold text-white mt-1">1.0</p>
                                            </div>
                                        </div>

                                        <div className="bg-indigo-950/50 rounded-xl border border-indigo-800/50 p-4 flex justify-center">
                                            <PieChart width={250} height={250}>
                                                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8b5cf6" stroke="none" />
                                                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#6366f1" stroke="none" label />
                                            </PieChart>
                                        </div>
                                    </div>
                                </div>

                                {/* Output Side */}
                                <div className="bg-black/30 rounded-xl border border-slate-800/50 p-6 flex flex-col items-center justify-center relative min-h-[400px]">
                                    <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                    {canvasCapture ? (
                                        <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                            <img src={canvasCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-2xl mb-6 border border-slate-800" />
                                            <a href={canvasCapture} download="canvas-capture.jpg" className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-2 font-medium">
                                                <Download fontSize="small" /> Download Image
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="text-center text-slate-600">
                                            <ImageIcon style={{ fontSize: 48, opacity: 0.2 }} />
                                            <p className="mt-4 text-sm">Capture to see result</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ScreenshotDemo;