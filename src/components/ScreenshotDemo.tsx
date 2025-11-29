import React, { createRef, useState } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { PieChart, Pie } from 'recharts';
import { Anchor } from '@mui/icons-material';

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
    const ref = createRef<HTMLDivElement>();
    const ref2 = createRef<HTMLDivElement>();
    const [image2, setImage2] = useState<string | null>(null);

    const [image, takeScreenShot] = useScreenshot({
        type: 'image/jpeg',
        quality: 1.0
    });

    const takeScreenshot = () => {
        if (ref.current) {
            takeScreenShot(ref.current, { scale: 2 });
        }
    };

    const takeScreenshotWithoutHook = async () => {
        if (ref2.current) {
            const canvas = await html2canvas(ref2.current, { scale: 2, useCORS: true });
            const image = canvas.toDataURL('image/jpeg', 1.0);
            setImage2(image);
        }
    };

    return (
        <div className='p-5'>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem' }}>Screenshot Demo</h1>
            <div className='flex gap-5'>
                <div>
                    <button
                        onClick={takeScreenshot}
                        className='bg-[#4CAF50] text-white px-5 py-2 rounded-lg cursor-pointer my-5'
                    >
                        📸 Take Screenshot
                    </button>
                    <div
                        ref={ref}
                        className='bg-[#2f1414ff] p-5 border border-[#ddd] rounded-lg'
                    >
                        <h2 className="font-open-sans"><AddAlertIcon />use react screenshot hook</h2>

                        <div className="mb-5">
                            <h3 className="font-roboto">Sample Text</h3>
                            <p className="font-playwrite">This is some sample text that will be captured in the screenshot with react screenshot hook.</p>
                        </div>

                        <div>
                            <h3 className="font-open-sans text-center">Charts</h3>
                            <PieChart width={730} height={250}>
                                <Pie
                                    data={data01}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                />
                                <Pie
                                    data={data02}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#82ca9d"
                                    label
                                />
                            </PieChart>
                        </div>
                    </div>
                    <div className='w-full'>{image && <img src={image} alt="Screenshot" />}</div>
                </div>
                <div>
                    <button
                        onClick={takeScreenshotWithoutHook}
                        className='bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-8 py-3 rounded-xl cursor-pointer my-5 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2'
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        📸 Capture Screenshot
                    </button>
                    <div
                        ref={ref2}
                        className='p-8 border border-[#ffffff15] rounded-2xl shadow-2xl backdrop-blur-sm'
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                        }}
                    >
                        {/* Header Section */}
                        <div className="mb-8 pb-6 border-b border-[#ffffff15]">
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="p-2 rounded-lg"
                                    style={{ background: 'linear-gradient(90deg, #f093fb, #f5576c)' }}
                                >
                                    <AddAlertIcon className="text-white" />
                                </div>
                                <h2
                                    className="text-4xl font-bold text-white font-nunito"
                                    style={{ background: 'linear-gradient(90deg, #ff0000, #0000ff)' }}
                                >
                                    HTML to Canvas
                                </h2>
                            </div>
                            <p className="text-[#a8b2d1] text-sm ml-14" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}>
                                Direct html2canvas implementation without hooks
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="mb-6">
                            <button
                                className='text-white px-6 py-3 rounded-xl cursor-pointer shadow-lg flex items-center gap-2 font-semibold transition-all duration-300'
                                onClick={() => { }}
                                style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 600,
                                    background: 'linear-gradient(90deg, #4CAF50, #2196F3)'
                                }}
                            >
                                <Anchor fontSize="small" />
                                Get Started
                            </button>
                        </div>

                        {/* Image Section */}
                        <div className="mb-8 overflow-hidden rounded-xl border border-[#ffffff15] bg-[#0a0e27] p-4">
                            <img src="https://images.unsplash.com/photo-1503264116251-35a269479413
" alt="Screenshot" className="w-full h-auto rounded-lg" />
                        </div>

                        {/* Content Card */}
                        <div
                            className="mb-8 backdrop-blur-md p-6 rounded-xl border border-[#ffffff15] transition-all duration-300"
                            style={{ background: 'linear-gradient(135deg, #ffffff08, #ffffff03)' }}
                        >
                            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>
                                Sample Content
                            </h3>
                            <p className="text-[#cbd5e1] leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}>
                                This is some sample text that will be captured in the screenshot using html2canvas without hook. Experience the power of direct canvas rendering with beautiful styling and smooth animations.
                            </p>
                        </div>

                        {/* Charts Section */}
                        <div
                            className="backdrop-blur-md p-6 rounded-xl border border-[#ffffff15]"
                            style={{ background: 'linear-gradient(135deg, #ffffff08, #ffffff03)' }}
                        >
                            <h3
                                className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent"
                                style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 600,
                                    background: 'linear-gradient(90deg, #a8edea, #fed6e3)'
                                }}
                            >
                                Data Visualization
                            </h3>
                            <div className="flex justify-center">
                                <PieChart width={730} height={250}>
                                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                    <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                                </PieChart>
                            </div>
                        </div>
                    </div>

                    <div className='w-full mt-5'>{image2 && <img src={image2} alt="Screenshot" className="rounded-xl shadow-2xl" />}</div>
                </div>
            </div>
        </div>
    );
};

export default ScreenshotDemo;