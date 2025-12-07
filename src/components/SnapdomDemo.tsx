import React, { createRef, useState } from 'react';
import { snapdom } from '@zumer/snapdom';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { PieChart, Pie } from 'recharts';
import { Download, Image as ImageIcon, Code, AutoAwesome, BarChart } from '@mui/icons-material';

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

const SnapdomDemo: React.FC = () => {
    // Refs
    const simpleRef = createRef<HTMLDivElement>();
    const mainRef = createRef<HTMLDivElement>();
    const chartRef = createRef<HTMLDivElement>();
    const gradientRef = createRef<HTMLDivElement>();
    const fontRef = createRef<HTMLDivElement>();
    const bgRef = createRef<HTMLDivElement>();
    const corsRef = createRef<HTMLDivElement>();

    // State for each section's capture
    const [simpleCapture, setSimpleCapture] = useState<string | null>(null);
    const [mainCapture, setMainCapture] = useState<string | null>(null);
    const [chartCapture, setChartCapture] = useState<string | null>(null);
    const [gradientCapture, setGradientCapture] = useState<string | null>(null);
    const [fontCapture, setFontCapture] = useState<string | null>(null);
    const [bgCapture, setBgCapture] = useState<string | null>(null);
    const [corsCapture, setCorsCapture] = useState<string | null>(null);
    const [corsEnabled, setCorsEnabled] = useState<boolean>(false);
    const [selectedProxy, setSelectedProxy] = useState<string>('corsfix');
    const [isCapturing, setIsCapturing] = useState<boolean>(false);

    // Available CORS proxies
    const CORS_PROXIES = {
        corsfix: 'https://proxy.corsfix.com/?',
    };

    const handleCapture = async (
        ref: React.RefObject<HTMLElement | null>,
        setCapture: React.Dispatch<React.SetStateAction<string | null>>,
        type: 'png' | 'svg' = 'png',
        useProxy: boolean = false
    ) => {
        if (!ref.current) return;

        setIsCapturing(true);

        try {
            const options: any = {
                scale: 2, // Higher quality
                backgroundColor: '#ffffff',
            };

            // Add proxy if enabled
            if (useProxy) {
                options.useProxy = CORS_PROXIES[selectedProxy as keyof typeof CORS_PROXIES];
                console.log('Using CORS proxy:', options.useProxy);
            }

            let img;
            if (type === 'png') {
                img = await snapdom.toPng(ref.current, options);
            } else if (type === 'svg') {
                img = await snapdom.toSvg(ref.current, options);
            }

            if (img && img.src) {
                setCapture(img.src);
            }
        } catch (error) {
            console.error("Snapdom screenshot failed:", error);
            alert("Capture failed! See console for details. (Likely CORS issue)");
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <div className='min-h-screen bg-[#0f172a] text-white p-8 font-sans selection:bg-pink-500 selection:text-white'>
            <div className="max-w-5xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center space-y-4 pt-10">
                    <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 pb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Snapdom Showcase
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Experience the next generation of DOM capture. Pixel-perfect rendering with zero dependencies.
                    </p>
                </div>

                {/* Showcase 1: Simple Element */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">

                            {/* Input Side */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500">
                                        <AutoAwesome />
                                    </div>
                                    <h2 className="text-2xl font-bold">Gradients & Shadows</h2>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Snapdom handles complex CSS properties like gradients, box-shadows, and mixed blend modes with ease.
                                </p>

                                {/* The Element */}
                                <div ref={simpleRef} className="p-8 rounded-2xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 text-white">
                                    <div className="flex items-center justify-between mb-8">
                                        <AddAlertIcon className="w-8 h-8 opacity-80" />
                                        <span className="text-xs font-mono bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">LIVE DOM</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">Vibrant Cards</h3>
                                    <p className="opacity-90 font-medium">Capture me in high definition.</p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => handleCapture(simpleRef, setSimpleCapture, 'png')}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-slate-700"
                                    >
                                        <ImageIcon fontSize="small" /> Capture PNG
                                    </button>
                                    <button
                                        onClick={() => handleCapture(simpleRef, setSimpleCapture, 'svg')}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-slate-700"
                                    >
                                        <Code fontSize="small" /> Capture SVG
                                    </button>
                                </div>
                            </div>

                            {/* Output Side */}
                            <div className="flex-1 w-full bg-black/30 rounded-xl border border-slate-800/50 p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                {simpleCapture ? (
                                    <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                        <img src={simpleCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-2xl mb-6" />
                                        <a href={simpleCapture} download="card-capture.png" className="text-pink-400 hover:text-pink-300 text-sm flex items-center gap-2 font-medium">
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

                {/* Showcase 2: Complex Dashboard */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col gap-8">

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                        <BarChart />
                                    </div>
                                    <h2 className="text-2xl font-bold">Complex Dashboard</h2>
                                </div>
                                <button
                                    onClick={() => handleCapture(mainRef, setMainCapture, 'png')}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
                                >
                                    <ImageIcon fontSize="small" /> Snap Dashboard
                                </button>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* The Element */}
                                <div
                                    ref={mainRef}
                                    className="relative overflow-hidden rounded-2xl bg-[#0B1120] border border-slate-800 p-6 shadow-2xl"
                                >
                                    {/* Decorative Background */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                            <h3 className="text-lg font-semibold text-slate-200">Analytics</h3>
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                                <p className="text-slate-400 text-xs uppercase tracking-wider">Revenue</p>
                                                <p className="text-2xl font-bold text-white mt-1">$48,290</p>
                                                <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">▲ 12% vs last week</p>
                                            </div>
                                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                                <p className="text-slate-400 text-xs uppercase tracking-wider">Active Users</p>
                                                <p className="text-2xl font-bold text-white mt-1">1,234</p>
                                                <p className="text-blue-400 text-xs mt-2 flex items-center gap-1">● Live now</p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 flex justify-center">
                                            <PieChart width={250} height={250}>
                                                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#6366f1" stroke="none" />
                                                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#3b82f6" stroke="none" label />
                                            </PieChart>
                                        </div>
                                    </div>
                                </div>

                                {/* Output Side */}
                                <div className="bg-black/30 rounded-xl border border-slate-800/50 p-6 flex flex-col items-center justify-center relative min-h-[400px]">
                                    <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                    {mainCapture ? (
                                        <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                            <img src={mainCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-2xl mb-6 border border-slate-800" />
                                            <a href={mainCapture} download="dashboard-capture.png" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 font-medium">
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

                {/* Showcase 3: Isolated Component */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-12 items-center">

                            <div className="flex-1 w-full space-y-6 order-2 lg:order-1">
                                <div className="bg-black/30 rounded-xl border border-slate-800/50 p-6 min-h-[200px] flex flex-col items-center justify-center relative">
                                    <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                    {chartCapture ? (
                                        <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                            <img src={chartCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-lg mb-4" />
                                            <a href={chartCapture} download="chart-capture.png" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 font-medium">
                                                <Download fontSize="small" /> Download
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

                            <div className="flex-1 w-full space-y-6 order-1 lg:order-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                        <Code />
                                    </div>
                                    <h2 className="text-2xl font-bold">Component Isolation</h2>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Capture specific sub-components without capturing their parents. Perfect for generating shareable snippets.
                                </p>

                                {/* The Element */}
                                <div ref={chartRef} className="bg-white p-6 rounded-xl shadow-xl max-w-sm mx-auto">
                                    <h4 className="text-slate-800 text-center font-bold mb-4">Sales Distribution</h4>
                                    <div className="flex justify-center">
                                        <PieChart width={200} height={200}>
                                            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#10b981" stroke="white" strokeWidth={2} />
                                        </PieChart>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleCapture(chartRef, setChartCapture, 'png')}
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                                >
                                    <ImageIcon fontSize="small" /> Capture Component Only
                                </button>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Showcase 4: Gradients & Backgrounds */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">

                            {/* Input Side */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                                        <AutoAwesome />
                                    </div>
                                    <h2 className="text-2xl font-bold">Advanced Gradients</h2>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Testing linear, radial, and conic gradients capture fidelity.
                                </p>

                                {/* The Element */}
                                <div ref={gradientRef} className="p-8 rounded-2xl space-y-4 bg-slate-800/50 border border-slate-700">
                                    <div
                                        className="h-24 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                                        style={{ background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' }}
                                    >
                                        Linear Gradient
                                    </div>
                                    <div
                                        className="h-24 rounded-xl flex items-center justify-center text-white font-bold shadow-lg border border-slate-600"
                                        style={{ background: 'radial-gradient(circle at center, #374151 0%, #111827 100%)' }}
                                    >
                                        Radial Gradient
                                    </div>
                                    <div
                                        className="h-24 rounded-xl flex items-center justify-center text-slate-900 font-bold shadow-lg"
                                        style={{ background: 'conic-gradient(from 0deg at 50% 50%, #7c2d12 0deg, #fef3c7 180deg, #7c2d12 360deg)' }}
                                    >
                                        Conic Gradient
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleCapture(gradientRef, setGradientCapture, 'png')}
                                    className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                                >
                                    <ImageIcon fontSize="small" /> Capture Gradients
                                </button>
                            </div>

                            {/* Output Side */}
                            <div className="flex-1 w-full bg-black/30 rounded-xl border border-slate-800/50 p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                {gradientCapture ? (
                                    <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                        <img src={gradientCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-2xl mb-6" />
                                        <a href={gradientCapture} download="gradients-capture.png" className="text-orange-400 hover:text-orange-300 text-sm flex items-center gap-2 font-medium">
                                            <Download fontSize="small" /> Download
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

                {/* Showcase 5: Typography & Fonts */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">

                            {/* Input Side */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500">
                                        <Code />
                                    </div>
                                    <h2 className="text-2xl font-bold">Typography & Fonts</h2>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Testing Google Fonts rendering: Inter, Roboto, Playfair Display, and Montserrat.
                                </p>

                                {/* The Element */}
                                <div ref={fontRef} className="p-8 rounded-2xl bg-white text-slate-900 space-y-6 shadow-xl">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Inter Font</h3>
                                        <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>The quick brown fox jumps over the lazy dog.</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Playfair Display</h3>
                                        <p className="text-gray-600" style={{ fontFamily: 'Playfair Display, serif' }}>The quick brown fox jumps over the lazy dog.</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Montserrat</h3>
                                        <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>The quick brown fox jumps over the lazy dog.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Roboto</h3>
                                        <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>The quick brown fox jumps over the lazy dog.</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleCapture(fontRef, setFontCapture, 'png')}
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                                >
                                    <ImageIcon fontSize="small" /> Capture Fonts
                                </button>
                            </div>

                            {/* Output Side */}
                            <div className="flex-1 w-full bg-black/30 rounded-xl border border-slate-800/50 p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                {fontCapture ? (
                                    <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                        <img src={fontCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-2xl mb-6" />
                                        <a href={fontCapture} download="fonts-capture.png" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2 font-medium">
                                            <Download fontSize="small" /> Download
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

                {/* Showcase 6: Background Images & Icons */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">

                            {/* Input Side */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                                        <ImageIcon />
                                    </div>
                                    <h2 className="text-2xl font-bold">Backgrounds & Icons</h2>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Testing background images, overlay effects, and icon font rendering (Font Awesome & MUI).
                                </p>

                                {/* The Element */}
                                <div
                                    ref={bgRef}
                                    className="h-64 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-2xl group/card"
                                    style={{
                                        backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/50 transition-colors"></div>

                                    <div className="relative z-10 text-center text-white space-y-4 p-6 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20">
                                        <h3 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Event Horizon</h3>
                                        <div className="flex justify-center gap-4 text-2xl">
                                            {/* Font Awesome Icons */}
                                            <i className="fa-solid fa-star text-yellow-400"></i>
                                            <i className="fa-solid fa-heart text-red-500"></i>
                                            <i className="fa-solid fa-bolt text-blue-400"></i>
                                            {/* MUI Icon */}
                                            <AutoAwesome className="text-purple-400" />
                                        </div>
                                        <p className="text-sm tracking-widest uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>Live Experience</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleCapture(bgRef, setBgCapture, 'png')}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
                                >
                                    <ImageIcon fontSize="small" /> Capture Background
                                </button>
                            </div>

                            {/* Output Side */}
                            <div className="flex-1 w-full bg-black/30 rounded-xl border border-slate-800/50 p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                {bgCapture ? (
                                    <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                        <img src={bgCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-2xl mb-6" />
                                        <a href={bgCapture} download="bg-capture.png" className="text-green-400 hover:text-green-300 text-sm flex items-center gap-2 font-medium">
                                            <Download fontSize="small" /> Download
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

                {/* Showcase 7: CORS Handling */}
                <section className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">

                            {/* Input Side */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                                        <AutoAwesome />
                                    </div>
                                    <h2 className="text-2xl font-bold">CORS Handling</h2>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Testing Cross-Origin Resource Sharing (CORS) image capture using CORSFix proxy.
                                </p>

                                {/* The Element */}
                                <div ref={corsRef} className="p-8 rounded-2xl bg-white flex items-center justify-center shadow-xl">
                                    <img
                                        src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.png"
                                        alt="Stack Overflow Logo"
                                        className="max-w-full h-auto"
                                    />
                                </div>

                                {/* Capture Buttons */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => handleCapture(corsRef, setCorsCapture, 'png', false)}
                                        disabled={isCapturing}
                                        className="bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <ImageIcon fontSize="small" />
                                        {isCapturing ? '...' : 'No Proxy'}
                                    </button>

                                    <button
                                        onClick={() => handleCapture(corsRef, setCorsCapture, 'png', true)}
                                        disabled={isCapturing}
                                        className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <ImageIcon fontSize="small" />
                                        {isCapturing ? '...' : 'With Proxy'}
                                    </button>
                                </div>
                            </div>

                            {/* Output Side */}
                            <div className="flex-1 w-full bg-black/30 rounded-xl border border-slate-800/50 p-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">PREVIEW OUTPUT</div>
                                {corsCapture ? (
                                    <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
                                        <img src={corsCapture} alt="Captured" className="max-w-full h-auto rounded-lg shadow-2xl mb-6" />
                                        <a href={corsCapture} download="cors-capture.png" className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-2 font-medium">
                                            <Download fontSize="small" /> Download
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

            </div>
        </div>
    );
};

export default SnapdomDemo;
